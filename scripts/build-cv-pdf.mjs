/**
 * public/cv.html ve public/cv-en.html → A4 PDF (public/Ismail-Emir-Tiryaki-CV.pdf, …-CV-EN.pdf).
 * Sayfa taşmasını da kontrol eder. Çalıştır: node scripts/sync-cv.mjs && node scripts/build-cv-pdf.mjs
 */
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { join, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public");
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".jpg": "image/jpeg", ".png": "image/png", ".svg": "image/svg+xml" };

const server = createServer(async (req, res) => {
  try {
    const path = decodeURIComponent(new URL(req.url, "http://x").pathname);
    const body = await readFile(join(root, path));
    res.writeHead(200, { "content-type": types[extname(path)] ?? "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404).end();
  }
}).listen(0);
const base = `http://localhost:${server.address().port}`;

const targets = [
  { page: "cv.html", out: "Ismail-Emir-Tiryaki-CV.pdf" },
  { page: "cv-en.html", out: "Ismail-Emir-Tiryaki-CV-EN.pdf" },
];

const browser = await chromium.launch();
let failed = false;
for (const { page: file, out } of targets) {
  const page = await browser.newPage();
  await page.goto(`${base}/${file}`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.emulateMedia({ media: "print" });
  const overflow = await page.$$eval(".page", (pages) =>
    pages.map((p, i) => ({ i: i + 1, over: p.scrollHeight - p.clientHeight })).filter((x) => x.over > 1),
  );
  if (overflow.length) {
    failed = true;
    console.error(`TAŞMA ${file}:`, overflow.map((o) => `sayfa ${o.i} +${o.over}px`).join(", "));
  }
  await page.pdf({ path: join(root, out), format: "A4", printBackground: true, preferCSSPageSize: true });
  console.log("OK", out);
  await page.close();
}
await browser.close();
server.close();
if (failed) process.exitCode = 1;
