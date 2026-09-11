/**
 * Görseli olmayan projelerden CANLI sitesi olanların görüntüsünü yakalar.
 * type: "web" -> masaüstü hero; type: "mobile" -> telefon dikey.
 * public/portfolio/images/<file>1.png yazar.
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "portfolio", "images");

const targets = [
  { url: "https://inomasyon.com", file: "inomasyon", type: "web" },
  { url: "https://altin-net.vercel.app", file: "altinnet", type: "web" },
  { url: "https://cebinde.kodlasa.com", file: "cebinde", type: "mobile" },
  { url: "https://farkeder.kodlasa.com", file: "farkeder", type: "mobile" },
  { url: "https://fishero.kodlasa.com", file: "fishero", type: "mobile" },
  { url: "https://therapy-web.emirtiryaki.com", file: "therapy-web", type: "mobile" },
  { url: "https://pvmesage.vercel.app", file: "pvmesage", type: "mobile" },
];

await mkdir(outDir, { recursive: true });
const browser = await chromium.launch({ headless: true });

for (const { url, file, type } of targets) {
  const context = await browser.newContext(
    type === "mobile"
      ? { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true }
      : { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 },
  );
  const page = await context.newPage();
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForLoadState("networkidle", { timeout: 20000 }).catch(() => {});
    await page.waitForTimeout(2500);
    const out = join(outDir, `${file}1.png`);
    await page.screenshot({ path: out, type: "png", fullPage: false });
    console.log("OK", file, `(${type})`, "→", `public/portfolio/images/${file}1.png`);
  } catch (e) {
    console.error("FAIL", url, e instanceof Error ? e.message : e);
    process.exitCode = 1;
  }
  await context.close();
}

await browser.close();
