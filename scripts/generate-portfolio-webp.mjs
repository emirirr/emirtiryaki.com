import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { existsSync } from "node:fs";

const dir = join(process.cwd(), "public", "portfolio", "images");
if (!existsSync(dir)) {
  console.log("generate-portfolio-webp: klasör yok, atlanıyor:", dir);
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

const files = await readdir(dir);
const pngs = files.filter((f) => f.toLowerCase().endsWith(".png"));
let n = 0;
for (const f of pngs) {
  const input = join(dir, f);
  const out = join(dir, f.replace(/\.png$/i, ".webp"));
  await sharp(input).webp({ quality: 82, effort: 4 }).toFile(out);
  n += 1;
}
console.log(`generate-portfolio-webp: ${n} WebP oluşturuldu.`);
