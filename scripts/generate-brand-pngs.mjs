/**
 * Marka görsellerini public/favicon.svg işaretinden üretir:
 *  - apple-touch-icon.png (180, kenarsız — iOS köşeleri kendisi yuvarlar)
 *  - favicon.ico (16/32/48 PNG gömülü)
 *  - icon-192.png / icon-512.png (PWA / Google)
 *  - og-image.png (1200×630 sosyal paylaşım; Plus Jakarta Sans için Playwright ile çizilir)
 * Çalıştır: node scripts/generate-brand-pngs.mjs
 */
import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");
const mark = readFileSync(join(publicDir, "favicon.svg"), "utf8");
// Kenarsız varyant: yuvarlatılmış köşeyi kaldır (iOS / Android maskeler)
const markSquare = mark.replace('rx="28"', 'rx="0"');

const png = (svg, size) => sharp(Buffer.from(svg)).resize(size, size).png().toBuffer();

writeFileSync(join(publicDir, "apple-touch-icon.png"), await png(markSquare, 180));
writeFileSync(join(publicDir, "icon-192.png"), await png(markSquare, 192));
writeFileSync(join(publicDir, "icon-512.png"), await png(markSquare, 512));

// ICO: PNG gömülü girişler (tüm modern tarayıcılar destekler)
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map((s) => png(mark, s)));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
sizes.forEach((s, i) => {
  const e = 6 + i * 16;
  header.writeUInt8(s, e);
  header.writeUInt8(s, e + 1);
  header.writeUInt8(0, e + 2);
  header.writeUInt8(0, e + 3);
  header.writeUInt16LE(1, e + 4);
  header.writeUInt16LE(32, e + 6);
  header.writeUInt32LE(images[i].length, e + 8);
  header.writeUInt32LE(offset, e + 12);
  offset += images[i].length;
});
writeFileSync(join(publicDir, "favicon.ico"), Buffer.concat([header, ...images]));

// Sosyal paylaşım görseli — sitenin açık tasarım dili
const ogHtml = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0}
body{width:1200px;height:630px;font-family:"Plus Jakarta Sans",sans-serif;color:#0b1220;background:#fff;position:relative;overflow:hidden}
.dots{position:absolute;inset:0;background-image:radial-gradient(rgba(11,18,32,.09) 1.5px,transparent 1.5px);background-size:26px 26px;-webkit-mask-image:radial-gradient(ellipse 70% 80% at 85% 10%,#000 20%,transparent 70%)}
.glow{position:absolute;top:-220px;right:-160px;width:720px;height:620px;border-radius:50%;background:rgba(26,108,240,.10);filter:blur(60px)}
.wrap{position:relative;padding:72px 80px;height:100%;display:flex;flex-direction:column}
.top{display:flex;align-items:center;gap:18px}
.top svg{width:72px;height:72px}
.top b{display:block;font-size:26px;font-weight:800;letter-spacing:-.01em}
.top small{font-size:18px;color:#5b6577;font-weight:600}
.pill{margin-top:56px;display:inline-flex;align-self:flex-start;align-items:center;gap:10px;padding:8px 16px;border-radius:99px;background:#eaf2ff;border:1px solid rgba(26,108,240,.18);color:#1a6cf0;font-weight:700;font-size:19px}
.pill i{width:9px;height:9px;border-radius:50%;background:#16a34a}
h1{margin-top:22px;font-size:76px;line-height:1.02;font-weight:800;letter-spacing:-.03em}
h1 span{color:#1a6cf0}
.stats{margin-top:auto;display:flex;gap:14px}
.stats div{border:1px solid #e3e8ef;border-radius:14px;padding:14px 22px;font-size:19px;color:#5b6577;font-weight:600}
.stats b{color:#1a6cf0;font-weight:800;margin-right:6px}
.domain{position:absolute;right:80px;bottom:84px;font-size:22px;font-weight:700}
</style></head><body><div class="dots"></div><div class="glow"></div>
<div class="wrap">
  <div class="top">${mark}<span><b>İsmail Emir Tiryaki</b><small>Full-Stack &amp; Mobil Geliştirici</small></span></div>
  <span class="pill"><i></i>Yeni projelere açık · İstanbul</span>
  <h1>Fikirden yayına,<br><span>uçtan uca</span> dijital ürünler.</h1>
  <div class="stats"><div><b>8</b>mağazada uygulama</div><div><b>15</b>canlı site</div><div><b>40+</b>proje</div></div>
</div>
<div class="domain">emirtiryaki.com</div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(ogHtml, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: join(publicDir, "og-image.png") });
await browser.close();

console.log("Wrote apple-touch-icon.png, icon-192.png, icon-512.png, favicon.ico, og-image.png");
