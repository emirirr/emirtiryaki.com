/**
 * Tüm projelerin `link` alanını HTTP ile yoklar; hangisi canlı, hangisi ölü raporlar.
 * Çalıştır: node scripts/check-project-links.mjs
 */
import { readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const raw = await readFile(join(__dirname, "..", "src", "data", "projects.ts"), "utf8");
const src = raw.split("\r\n").join("\n");

const blocks = src.split(/\n  \{\n/).slice(1);
const field = (b, k) => {
  const m = b.match(new RegExp(`${k}:\\s*'([^']*)'`)) ?? b.match(new RegExp(`${k}:\\s*"([^"]*)"`));
  return m ? m[1] : null;
};

const projects = blocks.map((b) => ({
  key: field(b, "imageKey"),
  title: field(b, "title"),
  category: field(b, "category"),
  link: field(b, "link"),
}));

const check = async (url) => {
  const attempt = async (method) => {
    const ac = new AbortController();
    const t = setTimeout(() => ac.abort(), 20000);
    try {
      const r = await fetch(url, { method, redirect: "follow", signal: ac.signal });
      return { status: r.status, finalUrl: r.url };
    } finally {
      clearTimeout(t);
    }
  };
  try {
    const head = await attempt("HEAD");
    if (head.status >= 400) return await attempt("GET");
    return head;
  } catch {
    try {
      return await attempt("GET");
    } catch (e) {
      return { status: 0, error: e instanceof Error ? e.message : String(e) };
    }
  }
};

const rows = [];
for (const p of projects) {
  if (!p.link || !/^https?:\/\//.test(p.link)) {
    rows.push({ ...p, status: "-", note: "canlı adres yok" });
    continue;
  }
  const r = await check(p.link);
  const redirected =
    r.finalUrl && new URL(r.finalUrl).hostname.replace(/^www\./, "") !==
      new URL(p.link).hostname.replace(/^www\./, "");
  rows.push({
    ...p,
    status: r.status,
    note: r.error ?? (redirected ? `yönlendi → ${r.finalUrl}` : ""),
  });
  process.stdout.write(".");
}
process.stdout.write("\n");

const ok = rows.filter((r) => typeof r.status === "number" && r.status >= 200 && r.status < 400);
const dead = rows.filter((r) => !ok.includes(r));

const line = (r) =>
  `${String(r.key).padEnd(28)} ${String(r.status).padStart(3)}  ${r.category ?? ""}  ${r.link ?? ""} ${r.note}`;

console.log(`\n=== CANLI (${ok.length}) ===`);
ok.forEach((r) => console.log(line(r)));
console.log(`\n=== SORUNLU / ADRESSIZ (${dead.length}) ===`);
dead.forEach((r) => console.log(line(r)));
