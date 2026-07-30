import {
  isKortbulSlug,
  kortbulPageTitle,
} from "@/data/kortbulProjectRoutes";

const SITE = "https://emirtiryaki.com";

const HOME = {
  title: "İsmail Emir Tiryaki - Full Stack Developer",
  description:
    "Full Stack Developer portföyü: React, React Native, Node.js ve bulut ile web ve mobil ürünler. Projeler ve iletişim — emirtiryaki.com.",
  ogTitle: "İsmail Emir Tiryaki - Full Stack Developer",
  ogDescription:
    "Web ve mobil geliştirme, portföy ve iletişim. Türkiye.",
};

const PROJECTS = {
  title: "Projeler | İsmail Emir Tiryaki",
  description:
    "Portföy: web uygulamaları, mobil uygulamalar ve e-ticaret. Teknolojiler, süre ve özetler.",
  ogTitle: "Projeler | İsmail Emir Tiryaki",
  ogDescription:
    "Seçili işler, kullanılan stack ve proje detayları.",
};

const NOT_FOUND = {
  title: "Sayfa bulunamadı | İsmail Emir Tiryaki",
  description: "Aradığınız sayfa mevcut değil veya taşınmış olabilir.",
  ogTitle: "404 | İsmail Emir Tiryaki",
  ogDescription: "Sayfa bulunamadı.",
};

const DACAR_MOBILE = {
  title: "daCAR Mobile | İsmail Emir Tiryaki",
  description:
    "daCAR Mobile: Expo + React Native ve Supabase tabanlı araç pazar yeri uygulaması. İlan, chat, rezervasyon ve release süreci detayları.",
  ogTitle: "daCAR Mobile | İsmail Emir Tiryaki",
  ogDescription:
    "Araç pazar yeri mobil uygulaması: ilan, mesajlaşma, bildirim ve uzman rezervasyonu akışları.",
};

function kortbulMeta(pathname: string) {
  const m = pathname.match(/^\/projects\/kortbul\/([^/]+)\/?$/);
  const slug = m?.[1];
  if (!slug || !isKortbulSlug(slug)) return null;
  const titleBase = kortbulPageTitle(slug);
  return {
    title: `${titleBase} | İsmail Emir Tiryaki`,
    description: `Kortbul — ${titleBase}: mobil ve kulüp yönetimi ekosistemi, teknolojiler ve özet.`,
    ogTitle: `${titleBase} | İsmail Emir Tiryaki`,
    ogDescription: `Kortbul projesi: ${titleBase}.`,
  };
}

function setMetaContent(selector: string, content: string) {
  document.querySelector(selector)?.setAttribute("content", content);
}

function canonicalHref(pathname: string): string {
  if (pathname === "/") return `${SITE}/`;
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${SITE}${path}`;
}

/** Route değişince title, açıklama, Open Graph, Twitter ve canonical senkronlanır. */
export function syncRouteDocumentHead(pathname: string) {
  const normalized = pathname.replace(/\/$/, "") || "/";
  const kortbul = kortbulMeta(normalized);
  const dacarMobile = normalized === "/projects/dacar/mobile";
  const isIndexedRoute =
    normalized === "/" ||
    normalized === "/projects" ||
    kortbul !== null ||
    dacarMobile;
  const pack =
    kortbul !== null
      ? kortbul
      : dacarMobile
        ? DACAR_MOBILE
      : normalized === "/projects"
        ? PROJECTS
        : normalized === "/"
          ? HOME
          : NOT_FOUND;

  document.title = pack.title;

  setMetaContent('meta[name="description"]', pack.description);
  setMetaContent('meta[property="og:title"]', pack.ogTitle);
  setMetaContent('meta[property="og:description"]', pack.ogDescription);
  setMetaContent('meta[property="og:url"]', canonicalHref(pathname));
  setMetaContent('meta[name="twitter:title"]', pack.ogTitle);
  setMetaContent('meta[name="twitter:description"]', pack.ogDescription);

  document
    .querySelector('link[rel="canonical"]')
    ?.setAttribute("href", canonicalHref(pathname));

  let robots = document.querySelector(
    'meta[name="robots"][data-route-sync="1"]',
  ) as HTMLMetaElement | null;
  if (!robots) {
    robots = document.createElement("meta");
    robots.setAttribute("name", "robots");
    robots.setAttribute("data-route-sync", "1");
    document.head.appendChild(robots);
  }
  robots.setAttribute(
    "content",
    isIndexedRoute ? "index, follow" : "noindex, follow",
  );
}
