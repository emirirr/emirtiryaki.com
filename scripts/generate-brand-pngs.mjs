import sharp from "sharp";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");

await sharp(readFileSync(join(publicDir, "favicon.svg")))
  .resize(180, 180)
  .png()
  .toFile(join(publicDir, "apple-touch-icon.png"));

await sharp(readFileSync(join(publicDir, "og-image.svg")))
  .png()
  .toFile(join(publicDir, "og-image.png"));

console.log("Wrote public/apple-touch-icon.png, public/og-image.png");
