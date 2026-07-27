import { copyFileSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const cvSrc = join(root, "cv.html");
const cvDest = join(root, "public", "cv.html");
const cvEnSrc = join(root, "cv-en.html");
const cvEnDest = join(root, "public", "cv-en.html");
const profileSrc = join(root, "src", "assets", "emir-profile.jpg");
const profileDest = join(root, "public", "emir-profile.jpg");

if (!existsSync(cvSrc)) {
  console.error("sync-cv: cv.html not found at repo root");
  process.exit(1);
}
if (!existsSync(profileSrc)) {
  console.error("sync-cv: src/assets/emir-profile.jpg not found");
  process.exit(1);
}

let html = readFileSync(cvSrc, "utf8");
html = html.replaceAll("./src/assets/emir-profile.jpg", "/emir-profile.jpg");
writeFileSync(cvDest, html, "utf8");

if (existsSync(cvEnSrc)) {
  let htmlEn = readFileSync(cvEnSrc, "utf8");
  htmlEn = htmlEn.replaceAll("./src/assets/emir-profile.jpg", "/emir-profile.jpg");
  writeFileSync(cvEnDest, htmlEn, "utf8");
  console.log("sync-cv:", cvEnDest);
}

copyFileSync(profileSrc, profileDest);
console.log("sync-cv:", cvDest, profileDest);
