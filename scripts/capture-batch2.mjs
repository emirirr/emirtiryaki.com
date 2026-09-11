import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "portfolio", "images");

const targets = [
  { url: "https://cardvault.vercel.app", file: "cardvault", type: "mobile" },
  { url: "https://carlog.vercel.app", file: "carlog", type: "mobile" },
  { url: "https://chargeway.vercel.app", file: "chargeway", type: "mobile" },
  { url: "https://aciklise.vercel.app", file: "aciklise", type: "mobile" },
  { url: "https://rescue.vercel.app", file: "rescue", type: "mobile" },
  { url: "https://therapy.vercel.app", file: "therapy", type: "mobile" },
  { url: "https://printprice.vercel.app", file: "printprice", type: "web" },
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
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
    await page.waitForTimeout(2500);
    await page.screenshot({ path: join(outDir, `${file}1.png`), type: "png", fullPage: false });
    console.log("OK", file, `(${type})`);
  } catch (e) {
    console.error("FAIL", url, e instanceof Error ? e.message : e);
  }
  await context.close();
}
await browser.close();
