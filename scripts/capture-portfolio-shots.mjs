/**
 * Portföy ekran görüntülerini TEK TİP çeker.
 *
 *   web  → 1440x900 @2x, sayfanın üst 16:10'u        → 1600x1000 png + webp
 *   mobil → 390x844 @2x (iPhone 15 Pro ölçüsü)        →  780x1688 png + webp
 *
 * Hedefler `src/data/projects.ts`ten türetilir; çıktı yolu `cover()` ile
 * birebir aynı kuralı izler, böylece site otomatik yeni görseli kullanır.
 *
 * Kullanım:
 *   node scripts/capture-portfolio-shots.mjs --list          # sadece hedefleri yaz
 *   node scripts/capture-portfolio-shots.mjs                 # hepsini çek
 *   node scripts/capture-portfolio-shots.mjs --only=kuta,inda
 *   node scripts/capture-portfolio-shots.mjs --kind=web|mobile
 */
import { chromium, devices } from "playwright";
import sharp from "sharp";
import { readFile, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const imagesDir = join(root, "public", "portfolio", "images");

const WEB = { w: 1440, h: 900, out: [1600, 1000] };
const MOBILE = { w: 390, h: 844, out: [780, 1688] };

/** Ölü/erişilemeyen adresler — check-project-links.mjs çıktısına göre. */
const SKIP_LINKS = new Set([
  "https://odaksoftware.com",
  "https://doctor-site-phi.vercel.app/",
  "https://charge-map-nu.vercel.app/",
  "https://nemaxnakliyat.com/",
]);

/** Gerçek bir ürün adresi değil, portföyün kendisine bakan yer tutucular. */
const PLACEHOLDER_LINKS = new Set(["https://emirtiryaki.com"]);

/** portfolioMock.ts ile aynı override. */
const LOCAL_OVERRIDE = { "kortbul-expo": "/portfolio/images/kortbul-mobile1.png" };

const args = process.argv.slice(2);
const flag = (n) => args.find((a) => a.startsWith(`--${n}=`))?.split("=")[1];
const listOnly = args.includes("--list");
const only = flag("only")?.split(",").map((s) => s.trim()).filter(Boolean);
const kindFilter = flag("kind");

const raw = await readFile(join(root, "src", "data", "projects.ts"), "utf8");
const src = raw.split("\r\n").join("\n");
const field = (b, k) => {
  const m = b.match(new RegExp(`${k}:\\s*'([^']*)'`)) ?? b.match(new RegExp(`${k}:\\s*"([^"]*)"`));
  return m ? m[1] : null;
};

const targets = [];
const seenOut = new Set();
for (const b of src.split(/\n  \{\n/).slice(1)) {
  const key = field(b, "imageKey");
  const link = field(b, "link");
  const category = field(b, "category");
  if (!key || !link || !/^https?:\/\//.test(link)) continue;
  if (SKIP_LINKS.has(link) || PLACEHOLDER_LINKS.has(link)) continue;

  const firstLocal = b.match(/additionalImages:\s*\[\s*'(\/[^']*)'/)?.[1];
  const out = LOCAL_OVERRIDE[key] ?? firstLocal ?? `/portfolio/images/${key}1.png`;
  if (seenOut.has(out)) continue; // patipati/patipatigo gibi aynı dosyayı paylaşanlar
  seenOut.add(out);

  const kind = category === "Mobil Uygulama" ? "mobile" : "web";
  if (kindFilter && kindFilter !== kind) continue;
  if (only && !only.includes(key)) continue;
  targets.push({ key, link, kind, file: out.replace("/portfolio/images/", "") });
}

console.log(`${targets.length} hedef (web: ${targets.filter((t) => t.kind === "web").length}, mobil: ${targets.filter((t) => t.kind === "mobile").length})`);
if (listOnly) {
  targets.forEach((t) => console.log(`  ${t.kind.padEnd(6)} ${t.key.padEnd(28)} ${t.file.padEnd(28)} ${t.link}`));
  process.exit(0);
}

await mkdir(imagesDir, { recursive: true });
const browser = await chromium.launch({ headless: true });

/** Tembel yüklenen görseller ve giriş animasyonları için sayfayı bir tur gezdirir. */
const settle = async (page) => {
  await page.waitForLoadState("networkidle", { timeout: 25000 }).catch(() => {});
  await page.evaluate(async () => {
    await new Promise((r) => {
      let y = 0;
      const step = () => {
        y += window.innerHeight * 0.9;
        window.scrollTo(0, y);
        if (y < Math.min(document.body.scrollHeight, window.innerHeight * 4)) {
          setTimeout(step, 120);
        } else {
          window.scrollTo(0, 0);
          setTimeout(r, 400);
        }
      };
      step();
    });
  }).catch(() => {});
  await page.waitForTimeout(1200);
};

/** Çerez bandı / bildirim izni gibi kapakları kapatmayı dener. */
const dismissOverlays = async (page) => {
  const labels = [
    "Kabul Et", "Kabul et", "Tümünü kabul et", "Accept all", "Accept", "Tamam", "OK",
    "Anladım", "Got it", "Kapat", "Close", "Reddet", "Decline",
  ];
  for (const label of labels) {
    const btn = page.getByRole("button", { name: label, exact: false }).first();
    if (await btn.isVisible().catch(() => false)) {
      await btn.click({ timeout: 2000 }).catch(() => {});
      await page.waitForTimeout(400);
    }
  }
};

const results = [];
for (const t of targets) {
  const cfg = t.kind === "mobile" ? MOBILE : WEB;
  const context = await browser.newContext({
    ...(t.kind === "mobile" ? devices["iPhone 13 Pro"] : {}),
    viewport: { width: cfg.w, height: cfg.h },
    deviceScaleFactor: 2,
    locale: "tr-TR",
    timezoneId: "Europe/Istanbul",
    geolocation: { latitude: 41.0082, longitude: 28.9784 }, // İstanbul
    permissions: ["geolocation"],
    colorScheme: "light",
  });
  const page = await context.newPage();
  try {
    await page.goto(t.link, { waitUntil: "domcontentloaded", timeout: 60000 });
    await settle(page);
    await dismissOverlays(page);
    const png = await page.screenshot({ type: "png", fullPage: false, animations: "disabled" });

    const [ow, oh] = cfg.out;
    const base = sharp(png).resize(ow, oh, { fit: "cover", position: "top" });
    await base.clone().png({ compressionLevel: 9 }).toFile(join(imagesDir, t.file));
    await base
      .clone()
      .webp({ quality: 82, effort: 5 })
      .toFile(join(imagesDir, t.file.replace(/\.png$/i, ".webp")));

    results.push({ ...t, ok: true });
    console.log(`OK   ${t.kind.padEnd(6)} ${t.key.padEnd(28)} → ${t.file}`);
  } catch (e) {
    results.push({ ...t, ok: false, error: e instanceof Error ? e.message : String(e) });
    console.error(`FAIL ${t.kind.padEnd(6)} ${t.key.padEnd(28)} ${t.link}\n     ${e?.message ?? e}`);
  } finally {
    await context.close();
  }
}

await browser.close();

const bad = results.filter((r) => !r.ok);
console.log(`\nBitti: ${results.length - bad.length} basarili, ${bad.length} hatali.`);
if (bad.length) {
  bad.forEach((r) => console.log(`  - ${r.key}: ${r.error}`));
  process.exitCode = 1;
}
