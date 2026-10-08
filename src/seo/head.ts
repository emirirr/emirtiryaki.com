import type { RouteSeo } from "./seo";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Sayfaya özel <head> etiketleri. Hepsi data-seo taşır; tarayıcıda rota değişince yenilenir. */
export function headTags(seo: RouteSeo): string {
  const locale = seo.lang === "en" ? "en_US" : "tr_TR";
  const altLocale = seo.lang === "en" ? "tr_TR" : "en_US";
  const tags = [
    `<meta name="description" content="${esc(seo.description)}" data-seo>`,
    `<meta name="robots" content="${seo.robots}" data-seo>`,
    ...(seo.indexable ? [`<link rel="canonical" href="${seo.canonical}" data-seo>`] : []),
    ...seo.alternates.map((a) => `<link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" data-seo>`),
    `<meta property="og:type" content="${seo.ogType}" data-seo>`,
    `<meta property="og:site_name" content="İsmail Emir Tiryaki" data-seo>`,
    `<meta property="og:title" content="${esc(seo.title)}" data-seo>`,
    `<meta property="og:description" content="${esc(seo.description)}" data-seo>`,
    `<meta property="og:url" content="${seo.canonical}" data-seo>`,
    `<meta property="og:locale" content="${locale}" data-seo>`,
    `<meta property="og:locale:alternate" content="${altLocale}" data-seo>`,
    `<meta property="og:image" content="${seo.image}" data-seo>`,
    `<meta property="og:image:width" content="1200" data-seo>`,
    `<meta property="og:image:height" content="630" data-seo>`,
    `<meta property="og:image:alt" content="${esc(seo.title)}" data-seo>`,
    `<meta name="twitter:card" content="summary_large_image" data-seo>`,
    `<meta name="twitter:title" content="${esc(seo.title)}" data-seo>`,
    `<meta name="twitter:description" content="${esc(seo.description)}" data-seo>`,
    `<meta name="twitter:image" content="${seo.image}" data-seo>`,
    // </script> kaçışı: JSON içinde "<" güvenli hale getirilir
    `<script type="application/ld+json" data-seo>${JSON.stringify(seo.jsonLd).replace(/</g, "\\u003c")}</script>`,
  ];
  return tags.join("\n    ");
}
