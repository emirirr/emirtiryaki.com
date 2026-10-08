/** public/portfolio/images içindeki mevcut görselleri listeler → src/data/portfolioManifest.json
 *  (Projeler sayfası görseli olan projeleri öne alır, olmayanları "Arşiv"e koyar.) */
import { readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const dir = join(process.cwd(), "public", "portfolio", "images");
const files = readdirSync(dir)
  .filter((f) => /\.(png|jpe?g|webp)$/i.test(f))
  .map((f) => `/portfolio/images/${f}`)
  .sort();
writeFileSync(join(process.cwd(), "src", "data", "portfolioManifest.json"), JSON.stringify(files, null, 2) + "\n");
console.log(`portfolio-manifest: ${files.length} görsel`);
