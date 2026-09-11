import { chromium } from "playwright";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "portfolio", "images");

const targets = [
  { url: "https://adhan.vercel.app", file: "adhan", type: "mobile" },
  { url: "https://appcarfy.com", file: "appcarfy", type: "web" },
  { url: "https://asiaotomasyon.com", file: "asiaotomasyon", type: "web" },
  { url: "https://cody.vercel.app", file: "cody", type: "web" },
  { url: "https://collecta.vercel.app", file: "collecta", type: "mobile" },
  { url: "https://isac.vercel.app", file: "isac", type: "web" },
  { url: "https://gtamaps.vercel.app", file: "gtamaps", type: "web" },
  { url: "https://ruview.vercel.app", file: "ruview", type: "web" },
  { url: "https://selcuktiryaki.vercel.app", file: "selcuktiryaki", type: "web" },
  { url: "https://kodlasa.com", file: "kodlasa-store", type: "web" },
];

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
    const title = await page.title();
    const txt = (await page.evaluate(() => document.body.innerText.replace(/\s+/g, " ").slice(0, 90))) || "";
    console.log(`OK | ${file} | ${title} | ${txt}`);
  } catch (e) {
    console.error("FAIL", file, e instanceof Error ? e.message.slice(0, 50) : e);
  }
  await context.close();
}
await browser.close();
