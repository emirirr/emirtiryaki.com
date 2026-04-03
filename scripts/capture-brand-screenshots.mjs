/**
 * Canlı marka sitelerinin üst kısmını yakalar, public/brands/*.webp yazar.
 * Çalıştır: npx playwright install chromium && node scripts/capture-brand-screenshots.mjs
 */
import { chromium } from "playwright";
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "brands");

const targets = [
  { url: "https://tiryakiyazilim.com", file: "tiryakiyazilim" },
  { url: "https://odaksoftware.com", file: "odaksoftware" },
  { url: "https://kodlasa.com", file: "kodlasa" },
];

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  locale: "tr-TR",
});
const page = await context.newPage();

for (const { url, file } of targets) {
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page
      .waitForLoadState("networkidle", { timeout: 25000 })
      .catch(() => {});
    await page.waitForTimeout(2000);
    const png = await page.screenshot({ type: "png", fullPage: false });
    await sharp(png)
      .resize(1200, 520, { fit: "cover", position: "top" })
      .webp({ quality: 82, effort: 4 })
      .toFile(join(outDir, `${file}.webp`));
    console.log("OK", file, "→", `public/brands/${file}.webp`);
  } catch (e) {
    console.error("FAIL", url, e instanceof Error ? e.message : e);
    process.exitCode = 1;
  }
}

await browser.close();
