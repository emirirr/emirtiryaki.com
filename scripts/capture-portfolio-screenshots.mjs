/**
 * Canlı proje sitelerinin ilk ekranını yakalar → public/portfolio/images/<file>.png (+ .webp).
 * Çalıştır: node scripts/capture-portfolio-screenshots.mjs
 */
import { chromium } from "playwright";
import sharp from "sharp";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "portfolio", "images");

const targets = [
  { url: "https://www.dacar.sn", file: "dacar-web1" },
  { url: "https://www.marocar.ma", file: "marocar-web1" },
  { url: "https://www.avtouzbek.uz", file: "avtouzbek-web1" },
  { url: "https://www.bharatkaar.com", file: "bharatkaar-web1" },
  { url: "https://www.naijacar.ng", file: "naijacar-web1" },
  { url: "https://appcarfy.com", file: "appcarfy1" },
  { url: "https://kodlasa.com", file: "kodlasa-store1" },
  { url: "https://www.avtobozor.app", file: "avtobozor-web1" },
  { url: "https://satilikapp.com", file: "satilik-web1" },
  { url: "https://heybeapp.com", file: "heybe-web1" },
  { url: "https://tiryakiyazilim.com", file: "tiryakiyazilim-live" },
];

const only = process.argv.slice(2);
const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await context.newPage();

for (const { url, file } of targets.filter((t) => only.length === 0 || only.includes(t.file))) {
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForLoadState("networkidle", { timeout: 20000 }).catch(() => {});
    await page.waitForTimeout(2500);
    // Açılış modallarını (şehir seçimi, çerez vb.) kapat
    await page.keyboard.press("Escape").catch(() => {});
    await page.waitForTimeout(600);
    const png = await page.screenshot({ type: "png", fullPage: false });
    const img = sharp(png).resize(1440, 900, { fit: "cover", position: "top" });
    await img.clone().png({ compressionLevel: 9 }).toFile(join(outDir, `${file}.png`));
    await img.clone().webp({ quality: 82 }).toFile(join(outDir, `${file}.webp`));
    console.log("OK", file);
  } catch (e) {
    console.error("FAIL", url, e instanceof Error ? e.message : e);
  }
}
await browser.close();
