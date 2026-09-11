/**
 * Portföy görsellerini WebP'ye çevirir.
 *
 * Kaynak PNG'ler `assets-src/portfolio/images` altında durur ve YAYINA ÇIKMAZ —
 * site yalnızca WebP servis ediyor (`coverWebp`/`imgWebp` her .png yolunu .webp'ye
 * çeviriyor). PNG'ler `public/` içindeyken 29 MB gereksiz yere deploy ediliyordu.
 *
 * Çıktı `public/portfolio/images` altına yazılır. Kaynak klasör yoksa (ör. eski
 * bir checkout) public içindeki PNG'lere düşer, böylece script kırılmaz.
 */
import { readdir, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { existsSync } from "node:fs";

const OUT = join(process.cwd(), "public", "portfolio", "images");
const SRC_CANDIDATES = [
  join(process.cwd(), "assets-src", "portfolio", "images"),
  OUT,
];

const dir = SRC_CANDIDATES.find((d) => existsSync(d));
if (!dir) {
  console.log("generate-portfolio-webp: kaynak klasör yok, atlanıyor.");
  process.exit(0);
}

let sharp;
try {
  sharp = (await import("sharp")).default;
} catch (e) {
  console.warn(
    "generate-portfolio-webp: sharp yüklenemedi (ör. CI’da native modül yok), WebP adımı atlanıyor.",
    e instanceof Error ? e.message : e,
  );
  process.exit(0);
}

await mkdir(OUT, { recursive: true });

/** Kart ~400px, detay kapağı ~600px genişlikte gösteriliyor; 1200px retina için
 *  fazlasıyla yeter. Dikey telefon çekimlerinde genişlik zaten küçük. */
const MAX_WIDTH = 1200;

const files = await readdir(dir);
const pngs = files.filter((f) => f.toLowerCase().endsWith(".png"));
let n = 0;
let bytes = 0;

for (const f of pngs) {
  const out = join(OUT, f.replace(/\.png$/i, ".webp"));
  const info = await sharp(join(dir, f))
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: 82, effort: 5 })
    .toFile(out);
  bytes += info.size;
  n += 1;
}

console.log(
  `generate-portfolio-webp: ${n} WebP oluşturuldu (${(bytes / 1024 / 1024).toFixed(1)} MB, max ${MAX_WIDTH}px) — kaynak: ${dir}`,
);
