/**
 * Sayfa başına SEO/GEO bilgisi — tek kaynak.
 * Hem tarayıcıda (routeMeta → document.head) hem build'de (scripts/prerender.mjs → statik HTML) kullanılır.
 */
import { apps } from "@/data/apps";
import { sites } from "@/data/liveSites";
import { faq } from "@/data/faq";
import { projects } from "@/data/projects";
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
      ? "Istanbul-based full-stack and mobile developer. Builds websites, mobile apps and admin panels end to end; 8 apps live on the App Store and Google Play, 15 live websites."
      : "İstanbul merkezli full-stack ve mobil geliştirici. Web sitesi, mobil uygulama ve yönetim paneli geliştiriyor; App Store ve Google Play'de 8 yayında uygulaması, 15 canlı web sitesi var.",
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
      ? "Istanbul-based developer building websites, iOS & Android apps and admin panels end to end. 8 apps on the App Store and Google Play, 15 live websites. Get a quote."
      : "İstanbul'da web sitesi, iOS & Android mobil uygulama ve yönetim paneli geliştiriyorum. App Store ve Google Play'de 8 uygulama, 15 canlı site. Ücretsiz ön görüşme ve teklif.";
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
export const PRERENDER_PATHS = ["/", "/en", "/projects", "/projects/kortbul/expo", "/projects/dacar/mobile"] as const;

export function getRouteSeo(pathname: string): RouteSeo {
  const path = pathname.replace(/\/$/, "") || "/";
  if (path === "/") return homeSeo("tr");
  if (path === "/en") return homeSeo("en");
  if (path === "/projects") return projectsSeo();
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
