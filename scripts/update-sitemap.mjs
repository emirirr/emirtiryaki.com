import { writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

/** projects.ts'teki her kaydin kendi detay sayfasi var (/is/<imageKey>).
 *  Listeyi elle tutmamak icin dosyadan okuyoruz. */
function projectSlugs() {
  const src = readFileSync(join(process.cwd(), "src", "data", "projects.ts"), "utf8");
  return [...src.matchAll(/imageKey: '([^']+)'/g)].map((m) => m[1]);
}

const detailUrls = projectSlugs()
  .map(
    (slug) => `  <url>
    <loc>https://emirtiryaki.com/is/${slug}</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`,
  )
  .join("\n");

const d = new Date().toISOString().slice(0, 10);
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://emirtiryaki.com/</loc>
    <lastmod>${d}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1</priority>
  </url>
  <url>
    <loc>https://emirtiryaki.com/projects</loc>
    <lastmod>${d}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://emirtiryaki.com/cv.html</loc>
    <lastmod>${d}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="tr" href="https://emirtiryaki.com/cv.html" xmlns:xhtml="http://www.w3.org/1999/xhtml" />
    <xhtml:link rel="alternate" hreflang="en" href="https://emirtiryaki.com/cv-en.html" xmlns:xhtml="http://www.w3.org/1999/xhtml" />
  </url>
  <url>
    <loc>https://emirtiryaki.com/cv-en.html</loc>
    <lastmod>${d}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
    <xhtml:link rel="alternate" hreflang="tr" href="https://emirtiryaki.com/cv.html" xmlns:xhtml="http://www.w3.org/1999/xhtml" />
    <xhtml:link rel="alternate" hreflang="en" href="https://emirtiryaki.com/cv-en.html" xmlns:xhtml="http://www.w3.org/1999/xhtml" />
  </url>
  <url>
    <loc>https://emirtiryaki.com/projects/kortbul/expo</loc>
    <lastmod>${d}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://emirtiryaki.com/projects/dacar/mobile</loc>
    <lastmod>${d}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
${detailUrls}
</urlset>
`;

const out = join(process.cwd(), "public", "sitemap.xml");
writeFileSync(out, xml, "utf8");
console.log("update-sitemap:", out, "lastmod=", d);
