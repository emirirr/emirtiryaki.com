/**
 * Araba pazaryeri (freelance) sitelerinin görüntülerini yakalar.
 * public/portfolio/images/<file>.png yazar; sonra `npm run generate:portfolio-webp` webp üretir.
 * Çalıştır: node scripts/capture-car-screenshots.mjs
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "portfolio", "images");

const targets = [
  { url: "https://www.dacar.sn", file: "dacar-web" },
  { url: "https://www.marocar.ma", file: "marocar-web" },
  { url: "https://www.bharatkaar.com", file: "bharatkaar-web" },
  { url: "https://www.avtouzbek.uz", file: "avtouzbek-web" },
  { url: "https://www.naijacar.ng", file: "naijacar-web" },
];

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
});
const page = await context.newPage();

for (const { url, file } of targets) {
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForLoadState("networkidle", { timeout: 25000 }).catch(() => {});
    await page.waitForTimeout(2500);
    const out = join(outDir, `${file}1.png`);
    await page.screenshot({ path: out, type: "png", fullPage: false });
    console.log("OK", file, "→", `public/portfolio/images/${file}1.png`);
  } catch (e) {
    console.error("FAIL", url, e instanceof Error ? e.message : e);
    process.exitCode = 1;
  }
}

await browser.close();
