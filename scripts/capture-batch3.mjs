import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "portfolio", "images");

const targets = [
  { url: "https://fisherman.vercel.app", file: "fishero", type: "mobile" },
  { url: "https://bizekatil.vercel.app", file: "bizekatil", type: "web" },
  { url: "https://fallo.vercel.app", file: "fallio", type: "mobile" },
  { url: "https://golge.vercel.app", file: "golge", type: "mobile" },
  { url: "https://kuta.vercel.app", file: "kutamobil", type: "mobile" },
  { url: "https://nerede.vercel.app", file: "eczanenerede", type: "mobile" },
  { url: "https://pati.vercel.app", file: "patipati", type: "mobile" },
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
