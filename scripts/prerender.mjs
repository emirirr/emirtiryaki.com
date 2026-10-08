/**
 * Statik HTML üretimi (SEO/GEO): her rota için tam içerik + sayfaya özel <head>.
 * JavaScript çalıştırmayan botlar (ChatGPT, Claude, Perplexity, sosyal önizlemeler) içeriği doğrudan görür.
 * Sıra: vite build → vite build --ssr src/entry-server.tsx → bu script.
 */
import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { join, dirname } from "node:path";
import { pathToFileURL } from "node:url";

const dist = join(process.cwd(), "dist");
const ssrDir = join(process.cwd(), "dist-ssr");
const { render, getRouteSeo, headTags, PRERENDER_PATHS } = await import(
  pathToFileURL(join(ssrDir, "entry-server.js")).href
);

const template = await readFile(join(dist, "index.html"), "utf8");
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

async function page(url, outFile) {
  const seo = getRouteSeo(url);
  const app = await render(url);
  const html = template
    .replace(/<html lang="[^"]*">/, `<html lang="${seo.lang}">`)
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(seo.title)}</title>`)
    .replace("<!--seo-head-->", headTags(seo))
    .replace('<div id="root">', `<div id="root" data-ssr-path="${url}">`)
    .replace("<!--app-html-->", app);
  if (!app || app.length < 500) throw new Error(`prerender: ${url} boş render edildi`);
  await mkdir(dirname(outFile), { recursive: true });
  await writeFile(outFile, html);
  const text = app.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  console.log(`prerender: ${url.padEnd(26)} → ${outFile.replace(dist, "dist")} (${text.length} karakter metin)`);
}

for (const url of PRERENDER_PATHS) {
  await page(url, url === "/" ? join(dist, "index.html") : join(dist, url, "index.html"));
}
// Gerçek 404 (Vercel bilinmeyen adreslerde 404 durum koduyla bunu döner)
await page("/404", join(dist, "404.html"));

await rm(ssrDir, { recursive: true, force: true });
