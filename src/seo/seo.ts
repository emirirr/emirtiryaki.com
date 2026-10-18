/**
 * Sayfa başına SEO/GEO bilgisi — tek kaynak.
 * Hem tarayıcıda (routeMeta → document.head) hem build'de (scripts/prerender.mjs → statik HTML) kullanılır.
 */
import { apps } from "@/data/apps";
import { sites } from "@/data/liveSites";
import { faq } from "@/data/faq";
import { projects } from "@/data/projects";
import { all as allProjects, bySlug, coverWebp, type P } from "@/lib/portfolioMock";
import { impactOf } from "@/data/impact";
import { isKortbulSlug, kortbulPageTitle } from "@/data/kortbulProjectRoutes";

export const SITE = "https://emirtiryaki.com";
const PERSON_ID = `${SITE}/#person`;
const WEBSITE_ID = `${SITE}/#website`;

export type Lang = "tr" | "en";

export type RouteSeo = {
  path: string;
  lang: Lang;
  title: string;
  description: string;
  canonical: string;
  /** hreflang alternatifleri (yalnız TR/EN eşi olan sayfalar) */
  alternates: { hreflang: string; href: string }[];
  robots: string;
  ogType: "website" | "profile" | "article";
  image: string;
  jsonLd: Record<string, unknown>;
  indexable: boolean;
};

const OG_IMAGE = `${SITE}/og-image.png`;

const person = (lang: Lang) => ({
  "@type": "Person",
  "@id": PERSON_ID,
  name: "İsmail Emir Tiryaki",
  alternateName: ["Emir Tiryaki", "Ismail Emir Tiryaki"],
  givenName: "İsmail Emir",
  familyName: "Tiryaki",
  url: `${SITE}/`,
  image: `${SITE}/emir-profile.jpg`,
  jobTitle: lang === "en" ? "Full-Stack & Mobile Developer" : "Full-Stack & Mobil Geliştirici",
  description:
    lang === "en"
      ? `Istanbul-based full-stack and mobile developer. Builds websites, mobile apps and admin panels end to end; ${apps.length} apps live on the App Store and Google Play, ${sites.length} live websites.`
      : `İstanbul merkezli full-stack ve mobil geliştirici. Web sitesi, mobil uygulama ve yönetim paneli geliştiriyor; App Store ve Google Play'de ${apps.length} yayında uygulaması, ${sites.length} canlı web sitesi var.`,
  email: "mailto:info@emirtiryaki.com",
  telephone: "+90-543-447-6245",
  address: { "@type": "PostalAddress", addressLocality: "İstanbul", addressCountry: "TR" },
  nationality: { "@type": "Country", name: "Türkiye" },
  knowsLanguage: ["tr", "en"],
  alumniOf: { "@type": "CollegeOrUniversity", name: "Anadolu Üniversitesi" },
  knowsAbout: [
    "Mobile app development",
    "iOS development",
    "Android development",
    "React Native",
    "Expo",
    "Swift",
    "SwiftUI",
    "Flutter",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Supabase",
    "Firebase",
    "Web development",
    "Marketplace platforms",
    "CRM systems",
  ],
  worksFor: { "@id": `${SITE}/#tiryaki-yazilim` },
  sameAs: [
    "https://github.com/emirirr",
    "https://www.linkedin.com/in/emir-tiryaki/",
    "https://instagram.com/emirscode",
    "https://youtube.com/@emirtiryaki",
    "https://apps.apple.com/tr/developer/emir-tiryaki/id1852537743",
  ],
});

const organizations = () => [
  {
    "@type": "Organization",
    "@id": `${SITE}/#tiryaki-yazilim`,
    name: "Tiryaki Yazılım",
    url: "https://tiryakiyazilim.com",
    founder: { "@id": PERSON_ID },
  },
  {
    "@type": "Organization",
    "@id": `${SITE}/#kodlasa`,
    name: "Kodlasa",
    url: "https://kodlasa.com",
    founder: { "@id": PERSON_ID },
  },
];

const website = () => ({
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${SITE}/`,
  name: "İsmail Emir Tiryaki",
  alternateName: "emirtiryaki.com",
  inLanguage: ["tr-TR", "en"],
  publisher: { "@id": PERSON_ID },
});

const service = (lang: Lang) => ({
  "@type": "ProfessionalService",
  "@id": `${SITE}/#service`,
  name: lang === "en" ? "Emir Tiryaki — Web & Mobile App Development" : "Emir Tiryaki — Web ve Mobil Uygulama Geliştirme",
  url: lang === "en" ? `${SITE}/en` : `${SITE}/`,
  image: OG_IMAGE,
  email: "info@emirtiryaki.com",
  telephone: "+90-543-447-6245",
  address: { "@type": "PostalAddress", addressLocality: "İstanbul", addressCountry: "TR" },
  areaServed: [{ "@type": "Country", name: "Türkiye" }, "Worldwide"],
  founder: { "@id": PERSON_ID },
  knowsLanguage: ["tr", "en"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: lang === "en" ? "Services" : "Hizmetler",
    itemListElement: (lang === "en"
      ? ["Web development", "iOS and Android app development", "CRM and business systems", "E-commerce and marketplace platforms"]
      : ["Web geliştirme", "iOS ve Android uygulama geliştirme", "CRM ve kurumsal sistemler", "E-ticaret ve pazaryeri platformları"]
    ).map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
  },
});

const APP_CATEGORY: Record<string, string> = {
  Heybe: "EducationalApplication",
  Kortbul: "SportsApplication",
  CarLog: "UtilitiesApplication",
  Adhan: "LifestyleApplication",
};

const mobileApps = (lang: Lang) =>
  apps.map((a) => ({
    "@type": "MobileApplication",
    name: a.name,
    description: lang === "en" ? a.en.tagline : a.tagline,
    applicationCategory: APP_CATEGORY[a.name] ?? "ShoppingApplication",
    operatingSystem: [a.appStore && "iOS", a.googlePlay && "Android"].filter(Boolean).join(", "),
    url: a.appStore ?? a.googlePlay,
    sameAs: [a.appStore, a.googlePlay, a.website].filter(Boolean),
    image: `${SITE}${a.icon}`,
    author: { "@id": PERSON_ID },
  }));

const liveSitesList = (lang: Lang) => ({
  "@type": "ItemList",
  "@id": `${SITE}/#live-sites`,
  name: lang === "en" ? "Live websites built by Emir Tiryaki" : "Emir Tiryaki'nin geliştirdiği canlı web siteleri",
  itemListElement: sites.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "WebSite",
      name: s.name,
      url: s.url,
      description: lang === "en" ? s.sectorEn : s.sector,
      creator: { "@id": PERSON_ID },
    },
  })),
});

const faqPage = (lang: Lang, url: string) => ({
  "@type": "FAQPage",
  "@id": `${url}#faq`,
  inLanguage: lang === "en" ? "en" : "tr-TR",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: lang === "en" ? f.en.q : f.q,
    acceptedAnswer: { "@type": "Answer", text: lang === "en" ? f.en.a : f.a },
  })),
});

const breadcrumb = (items: { name: string; url: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: it.url })),
});

const graph = (...nodes: unknown[]) => ({ "@context": "https://schema.org", "@graph": nodes });

function homeSeo(lang: Lang): RouteSeo {
  const url = lang === "en" ? `${SITE}/en` : `${SITE}/`;
  const title =
    lang === "en"
      ? "İsmail Emir Tiryaki — Full-Stack & Mobile Developer in Istanbul"
      : "İsmail Emir Tiryaki — Full-Stack & Mobil Uygulama Geliştirici · İstanbul";
  const description =
    lang === "en"
      ? `Istanbul-based developer building websites, iOS & Android apps and admin panels end to end. ${apps.length} apps on the App Store and Google Play, ${sites.length} live websites. Get a quote.`
      : `İstanbul'da web sitesi, iOS & Android mobil uygulama ve yönetim paneli geliştiriyorum. App Store ve Google Play'de ${apps.length} uygulama, ${sites.length} canlı site. Ücretsiz ön görüşme ve teklif.`;
  return {
    path: lang === "en" ? "/en" : "/",
    lang,
    title,
    description,
    canonical: url,
    alternates: [
      { hreflang: "tr", href: `${SITE}/` },
      { hreflang: "en", href: `${SITE}/en` },
      { hreflang: "x-default", href: `${SITE}/` },
    ],
    robots: "index, follow, max-image-preview:large",
    ogType: "profile",
    image: OG_IMAGE,
    indexable: true,
    jsonLd: graph(
      person(lang),
      website(),
      {
        "@type": "ProfilePage",
        "@id": `${url}#profilepage`,
        url,
        name: title,
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: { "@id": PERSON_ID },
        inLanguage: lang === "en" ? "en" : "tr-TR",
        dateModified: BUILD_DATE,
      },
      service(lang),
      ...organizations(),
      ...mobileApps(lang),
      liveSitesList(lang),
      faqPage(lang, url),
    ),
  };
}

/** Build sırasında güncellenen tarih (dateModified için). */
const BUILD_DATE = new Date().toISOString().slice(0, 10);

function projectsSeo(): RouteSeo {
  const url = `${SITE}/projects`;
  const listed = projects.filter((p) => p.link && !p.link.startsWith("https://emirtiryaki.com"));
  return {
    path: "/projects",
    lang: "tr",
    title: "Projeler — Web Siteleri ve Mobil Uygulamalar | İsmail Emir Tiryaki",
    description:
      "İsmail Emir Tiryaki'nin geliştirdiği web siteleri, mobil uygulamalar, araç pazaryerleri, CRM ve e-ticaret projeleri: ekran görüntüleri, canlı linkler ve kullanılan teknolojiler.",
    canonical: url,
    alternates: [],
    robots: "index, follow, max-image-preview:large",
    ogType: "website",
    image: OG_IMAGE,
    indexable: true,
    jsonLd: graph(
      person("tr"),
      website(),
      {
        "@type": "CollectionPage",
        "@id": `${url}#page`,
        url,
        name: "Projeler",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": PERSON_ID },
        inLanguage: "tr-TR",
        mainEntity: {
          "@type": "ItemList",
          itemListElement: listed.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "CreativeWork",
              name: p.title,
              description: p.description,
              url: p.link.startsWith("/") ? `${SITE}${p.link}` : p.link,
              keywords: p.technologies.join(", "),
              creator: { "@id": PERSON_ID },
            },
          })),
        },
      },
      breadcrumb([
        { name: "Ana sayfa", url: `${SITE}/` },
        { name: "Projeler", url },
      ]),
    ),
  };
}

function caseStudySeo(path: string, name: string, description: string): RouteSeo {
  const url = `${SITE}${path}`;
  return {
    path,
    lang: "tr",
    title: `${name} — Vaka Çalışması | İsmail Emir Tiryaki`,
    description,
    canonical: url,
    alternates: [],
    robots: "index, follow, max-image-preview:large",
    ogType: "article",
    image: OG_IMAGE,
    indexable: true,
    jsonLd: graph(
      person("tr"),
      website(),
      {
        "@type": "WebPage",
        "@id": `${url}#page`,
        url,
        name,
        description,
        isPartOf: { "@id": WEBSITE_ID },
        author: { "@id": PERSON_ID },
        inLanguage: "tr-TR",
      },
      breadcrumb([
        { name: "Ana sayfa", url: `${SITE}/` },
        { name: "Projeler", url: `${SITE}/projects` },
        { name, url },
      ]),
    ),
  };
}

/** /is/<imageKey> — her projenin vaka çalışması sayfası. Görsel: projenin kendi ekran görüntüsü. */
function projectPageSeo(p: P): RouteSeo {
  const path = `/is/${p.imageKey}`;
  const url = `${SITE}${path}`;
  const cover = coverWebp(p);
  const image = p.noShot ? OG_IMAGE : cover.startsWith("http") ? cover : `${SITE}${cover}`;
  const im = impactOf(p.imageKey);
  const description = (p.description + (im ? ` Kullananlar: ${im.audience}.` : "")).slice(0, 300);
  const isApp = p.category === "Mobil Uygulama";
  return {
    path,
    lang: "tr",
    title: `${p.title} — Vaka Çalışması | İsmail Emir Tiryaki`,
    description,
    canonical: url,
    alternates: [],
    robots: "index, follow, max-image-preview:large",
    ogType: "article",
    image,
    indexable: true,
    jsonLd: graph(
      person("tr"),
      website(),
      {
        "@type": isApp ? "MobileApplication" : "CreativeWork",
        "@id": `${url}#work`,
        name: p.title,
        description: p.description,
        url: p.link && /^https?:/.test(p.link) ? p.link : url,
        image,
        keywords: p.technologies.join(", "),
        ...(isApp ? { operatingSystem: "iOS, Android", applicationCategory: "MobileApplication" } : {}),
        ...(p.stores?.length ? { sameAs: p.stores.map((s) => s.url) } : {}),
        author: { "@id": PERSON_ID },
        inLanguage: "tr-TR",
      },
      {
        "@type": "WebPage",
        "@id": `${url}#page`,
        url,
        name: p.title,
        description,
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: { "@id": `${url}#work` },
        author: { "@id": PERSON_ID },
        inLanguage: "tr-TR",
      },
      breadcrumb([
        { name: "Ana sayfa", url: `${SITE}/` },
        { name: "Projeler", url: `${SITE}/projects` },
        { name: p.title, url },
      ]),
    ),
  };
}

function notFoundSeo(path: string): RouteSeo {
  return {
    path,
    lang: "tr",
    title: "Sayfa bulunamadı | İsmail Emir Tiryaki",
    description: "Aradığınız sayfa mevcut değil veya taşınmış olabilir.",
    canonical: `${SITE}${path}`,
    alternates: [],
    robots: "noindex, follow",
    ogType: "website",
    image: OG_IMAGE,
    indexable: false,
    jsonLd: graph(website()),
  };
}

/** Statik HTML olarak üretilen sayfalar (sitemap ve prerender bu listeyi kullanır). */
export const PRERENDER_PATHS: string[] = [
  "/",
  "/en",
  "/projects",
  "/projects/kortbul/expo",
  "/projects/dacar/mobile",
  ...allProjects.map((p) => `/is/${p.imageKey}`),
];

export function getRouteSeo(pathname: string): RouteSeo {
  const path = pathname.replace(/\/$/, "") || "/";
  if (path === "/") return homeSeo("tr");
  if (path === "/en") return homeSeo("en");
  if (path === "/projects") return projectsSeo();
  const work = path.match(/^\/is\/([^/]+)$/);
  if (work) {
    const p = bySlug(work[1]);
    if (p) return projectPageSeo(p);
  }
  const kortbul = path.match(/^\/projects\/kortbul\/([^/]+)$/);
  if (kortbul && isKortbulSlug(kortbul[1])) {
    return caseStudySeo(
      path,
      kortbulPageTitle(kortbul[1]),
      "Kortbul: tenis, padel, pickleball, squash ve badminton için kort keşfi, partner bulma, maç teklifi, sohbet ve turnuva modüllerini birleştiren Expo + React Native mobil uygulama.",
    );
  }
  if (path === "/projects/dacar/mobile") {
    return caseStudySeo(
      path,
      "daCAR Mobile",
      "daCAR Mobile: Senegal için Expo + React Native ve Supabase tabanlı araç pazaryeri uygulaması — ilan, mesajlaşma, bildirim ve ekspertiz akışları.",
    );
  }
  return notFoundSeo(path);
}
