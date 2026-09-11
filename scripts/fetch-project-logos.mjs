/**
 * Her proje icin marka logosu toplar -> public/portfolio/logos/<imageKey>.png (+ .webp)
 *
 * Kaynak sirasi:
 *  1) LOCAL_LOGO haritasindaki yerel dosya (mobil uygulamalarin kendi app icon'u)
 *  2) Canli sitenin apple-touch-icon / <link rel=icon> / manifest ikonu
 *  3) <origin>/favicon.ico
 *
 * Hicbiri bulunamazsa o proje atlanir; projects.ts'te `logo` alani bos kalir ve
 * kart eskisi gibi bas harf rozetine duser.
 *
 * Kullanim: node scripts/fetch-project-logos.mjs [imageKey ...]
 */
import { mkdir, writeFile, readFile, readdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const GITHUB = join(root, "..");
const OUT = join(root, "public", "portfolio", "logos");
// PNG kaynagi yayina cikmaz — site yalnizca .webp servis ediyor (logoOf).
const SRC = join(root, "assets-src", "portfolio", "logos");
const SIZE = 192;

/** Canli adresi olmayan / sitesi logoyu tasimayan projeler icin yerel kaynak.
 *  Sirayla denenir, ilk bulunan kullanilir. */
const LOCAL_LOGO = {
  "dacar-mobile": ["daCAR/assets/icon.png", "daCAR/assets/play-store-icon-512.png"],
  "marocar-mobile": ["MAROCAR/store-assets/icon-512.png", "MAROCAR/assets/icon.png"],
  "bharatkaar-mobile": ["indiencar/store-assets/icon-512.png", "indiencar/assets/icon.png"],
  "avtouzbek-mobile": ["avtouzbek-mobile/store-assets/icon-512.png", "avtouzbek-mobile/assets/icon.png"],
  "naijacar-mobile": ["nigeriacar-mobile/store-assets/icon-512.png", "nigeriacar-mobile/assets/icon.png"],
  "banglagari-mobile": ["banglagari-mobile/store-assets/icon-512.png", "banglagari-mobile/assets/icon.png"],
  "banglagari-web": ["banglagari-web/public/favicon.png", "banglagari-web/public/logo.png"],
  "kortbul-expo": ["krtbl-expo/src/assets/kortbul-logo.jpg", "krtbl-expo/icon.jpg"],
  historicme: ["HistoricMe/assets/icon.png", "historicme-site/public/favicon.png"],
  rafim: ["rafim/assets/favicon.png", "rafim/assets/android-icon-foreground.png"],
  patipati: ["patipatigo/shared/assets/icon.png"],
  patipatigo: ["patipatigo/shared/assets/icon.png"],
  "ecommerce-audio": ["audio-site/public/favicon.svg"],
  kutamobile: ["KUTA/assets/icon.png"],
  chargemap: ["ChargeMapiOS/ChargeMapiOS/Assets.xcassets/AppIcon.appiconset/icon-1024.png", "ChargeMap/public/favicon.svg"],
  cebinde: ["cebindeAPP/assets/icon.png"],
  adhan: ["adhan-site/public/app/icon.png"],
  appcarfy: ["appcarfy-site/app/icon.svg"],
  "kodlasa-store": ["kodlasa-ecommerce/src/app/favicon.ico"],
  selcuktiryaki: ["asiaotomasyon/assets/asia-otomasyon-logo-renkli.png"],
  odaksoftware: ["odak-crm/public/favicon.svg"],
  doctorsite: ["doctor-site/src/app/favicon.ico"],
  conseptphotos: ["ConseptPhotos/assets/icon.png"],
  "offline-rescue-communication": ["native-socket-main/assets/icon.png"],
};

const ICON_RE =
  /<link[^>]+rel=["']([^"']*(?:apple-touch-icon|shortcut icon|icon|mask-icon)[^"']*)["'][^>]*>/gi;

const attr = (tag, name) => {
  const m = tag.match(new RegExp(`${name}=["']([^"']+)["']`, "i"));
  return m ? m[1] : null;
};

/** rel/sizes degerine gore kabaca puanlar; buyuk apple-touch-icon en iyisi. */
function score(rel, sizes, href) {
  let s = 0;
  if (/apple-touch-icon/i.test(rel)) s += 60;
  if (/mask-icon/i.test(rel)) s -= 20;
  if (/\.svg($|\?)/i.test(href)) s += 25;
  if (/\.png($|\?)/i.test(href)) s += 15;
  if (/\.ico($|\?)/i.test(href)) s -= 10;
  const n = sizes && /(\d+)x(\d+)/.exec(sizes);
  if (n) s += Math.min(Number(n[1]), 512) / 8;
  return s;
}

async function get(url, as = "buffer") {
  const res = await fetch(url, {
    redirect: "follow",
    headers: { "user-agent": "Mozilla/5.0 (compatible; portfolio-logo-fetch/1.0)" },
    signal: AbortSignal.timeout(20000),
  });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return as === "text" ? res.text() : Buffer.from(await res.arrayBuffer());
}

async function candidatesFromSite(url) {
  const origin = new URL(url).origin;
  const out = [];
  let html = "";
  try {
    html = await get(url, "text");
  } catch {
    /* site kapali olabilir, yine de favicon.ico denenecek */
  }

  for (const m of html.matchAll(ICON_RE)) {
    const tag = m[0];
    const href = attr(tag, "href");
    if (!href || href.startsWith("data:")) continue;
    out.push({ url: new URL(href, url).href, s: score(m[1], attr(tag, "sizes"), href) });
  }

  // web manifest ikonlari
  const man = /<link[^>]+rel=["'][^"']*manifest[^"']*["'][^>]*>/i.exec(html);
  if (man) {
    const href = attr(man[0], "href");
    if (href) {
      try {
        const j = JSON.parse(await get(new URL(href, url).href, "text"));
        for (const ic of j.icons ?? []) {
          out.push({
            url: new URL(ic.src, new URL(href, url).href).href,
            s: score("manifest", ic.sizes, ic.src) + 10,
          });
        }
      } catch {
        /* manifest okunamadi */
      }
    }
  }

  // og:image son care (logo degil ama cogu kurumsal sitede marka gorseli)
  out.push({ url: `${origin}/apple-touch-icon.png`, s: 40 });
  out.push({ url: `${origin}/favicon.ico`, s: 0 });
  return out.sort((a, b) => b.s - a.s);
}

/** sharp .ico cozemez: ICONDIR'i elle okuyup en buyuk kaydi PNG ya da 32bpp DIB
 *  olarak cikarir. Cogu favicon bu iki bicimden biridir. */
function icoToImage(buf) {
  if (buf.readUInt16LE(0) !== 0 || buf.readUInt16LE(2) !== 1) return null;
  const count = buf.readUInt16LE(4);
  let best = null;
  for (let i = 0; i < count; i++) {
    const o = 6 + i * 16;
    const w = buf[o] || 256;
    const h = buf[o + 1] || 256;
    const size = buf.readUInt32LE(o + 8);
    const off = buf.readUInt32LE(o + 12);
    if (!best || w * h > best.w * best.h) best = { w, h, size, off };
  }
  if (!best) return null;
  const data = buf.subarray(best.off, best.off + best.size);
  if (data.readUInt32BE(0) === 0x89504e47) return sharp(data); // PNG gomulu

  // BMP/DIB: basligi atla, alt-ustten BGRA satirlari RGBA'ya cevir
  const headerSize = data.readUInt32LE(0);
  const bpp = data.readUInt16LE(14);
  if (bpp !== 32) return null;
  const px = data.subarray(headerSize);
  const out = Buffer.alloc(best.w * best.h * 4);
  for (let y = 0; y < best.h; y++) {
    for (let x = 0; x < best.w; x++) {
      const src = ((best.h - 1 - y) * best.w + x) * 4;
      const dst = (y * best.w + x) * 4;
      out[dst] = px[src + 2];
      out[dst + 1] = px[src + 1];
      out[dst + 2] = px[src];
      out[dst + 3] = px[src + 3];
    }
  }
  return sharp(out, { raw: { width: best.w, height: best.h, channels: 4 } });
}

/** Kare, seffaf zeminli, SIZE px PNG + WebP yazar. */
async function save(key, buf) {
  const ico = buf.length > 22 && buf.readUInt16LE(0) === 0 && buf.readUInt16LE(2) === 1
    ? icoToImage(buf)
    : null;
  if (ico) {
    const png = await ico
      .resize(SIZE, SIZE, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
    await writeFile(join(SRC, `${key}.png`), png);
    await writeFile(join(OUT, `${key}.webp`), await sharp(png).webp({ quality: 92 }).toBuffer());
    return "ico";
  }
  const img = sharp(buf, { density: 384 });
  const meta = await img.metadata();
  if (!meta.width || meta.width < 24) throw new Error("cok kucuk");
  const png = await sharp(buf, { density: 384 })
    .resize(SIZE, SIZE, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  await writeFile(join(SRC, `${key}.png`), png);
  await writeFile(join(OUT, `${key}.webp`), await sharp(png).webp({ quality: 92 }).toBuffer());
  return `${meta.width}x${meta.height}`;
}

async function firstLocal(key) {
  for (const rel of LOCAL_LOGO[key] ?? []) {
    const p = join(GITHUB, rel);
    if (existsSync(p)) return { buf: await readFile(p), from: rel };
  }
  return null;
}

/** Hedef listesini projects.ts'ten okur — ayri bir liste dosyasi tutmuyoruz. */
async function projectTargets() {
  const src = await readFile(join(root, "src", "data", "projects.ts"), "utf8");
  const out = [];
  // projects.ts CRLF ile kayitli olabilir; satir sonunu regex ile esitliyoruz.
  for (const block of src.split(/\r?\n {2}\{\r?\n/).slice(1)) {
    const key = /imageKey: '([^']+)'/.exec(block);
    if (!key) continue;
    const link = /\r?\n {4}link: '([^']+)'/.exec(block);
    out.push({ imageKey: key[1], link: link ? link[1] : null });
  }
  return out;
}

async function main() {
  await mkdir(OUT, { recursive: true });
  await mkdir(SRC, { recursive: true });
  const list = await projectTargets();
  const only = process.argv.slice(2);
  const ok = [];
  const miss = [];

  for (const p of list) {
    if (only.length && !only.includes(p.imageKey)) continue;

    const local = await firstLocal(p.imageKey);
    if (local) {
      try {
        const dim = await save(p.imageKey, local.buf);
        ok.push(`${p.imageKey}  <- ${local.from} (${dim})`);
        continue;
      } catch (e) {
        /* yerel dosya bozuksa siteye dus */
      }
    }

    if (!p.link || !/^https?:/.test(p.link)) {
      miss.push(`${p.imageKey}  (yerel kaynak yok, canli adres yok)`);
      continue;
    }

    let done = false;
    let cands = [];
    try {
      cands = await candidatesFromSite(p.link);
    } catch {
      /* yoksay */
    }
    for (const c of cands.slice(0, 6)) {
      try {
        const dim = await save(p.imageKey, await get(c.url));
        ok.push(`${p.imageKey}  <- ${c.url} (${dim})`);
        done = true;
        break;
      } catch {
        /* sonraki adayi dene */
      }
    }
    if (!done) miss.push(`${p.imageKey}  (${p.link})`);
  }

  await writeManifest();

  console.log(`\n== ${ok.length} logo indirildi ==`);
  ok.forEach((l) => console.log("  " + l));
  console.log(`\n== ${miss.length} bulunamadi ==`);
  miss.forEach((l) => console.log("  " + l));
}

/** Logosu olan projelerin listesini uygulama tarafina yazar; boylece
 *  projects.ts'te tek tek `logo` alani tutmak gerekmiyor. */
async function writeManifest() {
  const keys = (await readdir(OUT))
    .filter((f) => f.endsWith(".webp"))
    .map((f) => f.replace(/\.webp$/, ""))
    .sort();
  const body = [
    "/** OTOMATIK URETILDI — `node scripts/fetch-project-logos.mjs`.",
    " *  public/portfolio/logos/ altinda logosu olan projelerin imageKey listesi. */",
    "export const PROJECT_LOGOS: string[] = [",
    ...keys.map((k) => `  ${JSON.stringify(k)},`),
    "];",
    "",
  ].join("\n");
  await writeFile(join(root, "src", "data", "projectLogos.ts"), body, "utf8");
  console.log(`manifest: ${keys.length} logo -> src/data/projectLogos.ts`);
}

main();
