/**
 * /en ana sayfasında görünen proje ve kullanım metinlerinin İngilizcesi.
 * Kaynak metinler Türkçe kalır (projects.ts, impact.ts); burada yalnız ana
 * sayfada gösterilen kayıtlar var. Eksik alan Türkçeye düşer.
 */
import type { Lang } from "@/i18n/lang";
import type { P } from "@/lib/portfolioMock";
import { impactOf, type Impact } from "@/data/impact";

type ProjectEn = { title?: string; description?: string };
type ImpactEn = { sector?: string; audience?: string; client?: string; metrics?: string[] };

const PROJECT_EN: Record<string, ProjectEn> = {
  "dacar-web": {
    title: "daCAR — Senegal Car Marketplace",
    description: "A car marketplace for Senegal: French interface, local SEO pages for 46 cities and account sign-up over WhatsApp.",
  },
  "satilik-mobile": {
    title: "Satılık — Classifieds App (iOS)",
    description: "A general classifieds app where everything from cars and real estate to electronics and machinery is bought and sold; live on the App Store.",
  },
  "kortbul-expo": {
    title: "Kortbul",
    description: "Discover courts, find partners and send match requests for tennis, padel and other racket sports; with chat and tournaments.",
  },
  karacayapimarket: {
    title: "Karaca Yapı Market",
    description: "A corporate site that runs three brands from one codebase and generates local SEO pages for 39 Istanbul districts.",
  },
  kliniktakip: {
    title: "Klinik Takip",
    description: "A clinic management system with separate panels for managers, doctors and patients: appointments, prescriptions, lab results and reports.",
  },
  printprice: {
    title: "PrintPrice — 3D Print Cost Calculator",
    description: "A fully in-browser 3D printing cost tool that computes volume and weight from an STL file and produces a PDF quote.",
  },
  "altin-net": {
    title: "Altın.net — Gold, FX & Crypto Tracker",
    description: "A Next.js site that tracks gold, currency and crypto prices live, with charts, a converter and a separate Expo mobile app.",
  },
  "heybe-mobile": { title: "Heybe — Learn Islam (Mobile)" },
  "heybe-web": { title: "Heybe Web — app.heybeapp.com" },
  "heybe-site": { title: "Heybe — Landing & Content Site" },
  "heybe-admin": { title: "Heybe Admin Panel" },
  dacargo: { title: "Dacargo — Mobility Marketplace (Rider)" },
  "dacargo-partenaire": { title: "Dacargo Partenaire (Driver)" },
  "dacargo-admin": { title: "Dacargo Ops Console" },
};

const IMPACT_EN: Record<string, ImpactEn> = {
  "dacar-web": {
    sector: "Automotive · Marketplace",
    audience: "Individuals, car dealers and showrooms buying and selling cars in Senegal",
    metrics: ["cities with a local page", "in stores: Google Play + App Store", "apps: web, mobile, admin"],
  },
  "satilik-mobile": {
    sector: "Marketplace · Classifieds",
    audience: "People and shops in Türkiye buying and selling cars, property, electronics and second-hand goods",
    metrics: ["categories in a multi-level tree", "car brands, 1,077 series", "live on the App Store"],
  },
  "kortbul-expo": {
    sector: "Sports · Booking",
    audience: "Tennis, padel and other racket-sport players, and court operators",
    metrics: ["apps: mobile, web, 2 admin panels"],
  },
  karacayapimarket: {
    sector: "Construction · E-commerce",
    audience: "Retail and business customers looking for hardware and building materials in Istanbul",
    metrics: ["Istanbul districts with a local page", "brands on one codebase"],
  },
  kliniktakip: {
    sector: "Healthcare",
    audience: "Clinic managers, doctors and patients",
    metrics: ["separate panels: manager, doctor, patient"],
  },
  printprice: {
    sector: "Manufacturing · 3D printing",
    audience: "3D printing workshops and the customers asking them for quotes",
  },
  "altin-net": {
    sector: "Finance",
    audience: "People who follow gold, currency and crypto prices daily",
    metrics: ["markets: gold, FX, crypto", "platforms: web + mobile"],
  },
  "heybe-mobile": {
    sector: "Education · Religion",
    audience: "People learning to read the Quran and the basics of Islam from scratch",
    metrics: ["App Store rating (7 ratings)", "Google Play downloads", "languages: tr, en, de, ar"],
  },
  dacargo: {
    sector: "Mobility · Marketplace",
    audience: "People in Senegal who need a taxi, moto, ride share, horse cart or courier",
    metrics: ["services: taxi, moto, ride share, horse cart, delivery", "apps: rider, driver, ops console", "languages: fr, en"],
  },
};

/** Sektör adlarının İngilizcesi (Sektörler listesi). */
export const SECTOR_EN: Record<string, string> = {
  Otomotiv: "Automotive",
  Spor: "Sports",
  Yapı: "Construction",
  Sağlık: "Healthcare",
  Üretim: "Manufacturing",
  Finans: "Finance",
  Eğitim: "Education",
  Ulaşım: "Mobility",
  Pazaryeri: "Marketplaces",
};

const MONTH_EN: Record<string, string> = { "Ekim 2026": "Oct 2026", "Eylül 2026": "Sep 2026" };

/** Projenin gösterilecek başlık ve açıklaması. */
export function projectText(p: P, lang: Lang) {
  const en = lang === "en" ? PROJECT_EN[p.imageKey] : undefined;
  return { title: en?.title ?? p.title, description: en?.description ?? p.description };
}

/** Kullanım bilgisinin dile göre hali (metrik değerleri aynı, etiketleri çevrilir). */
export function impactText(key: string, lang: Lang): Impact | undefined {
  const im = impactOf(key);
  if (!im || lang === "tr") return im;
  const en = IMPACT_EN[key];
  if (!en) return im;
  return {
    ...im,
    sector: en.sector ?? im.sector,
    audience: en.audience ?? im.audience,
    client: en.client ?? im.client,
    metrics: im.metrics?.map((m, i) => ({
      ...m,
      label: en.metrics?.[i] ?? m.label,
      asOf: m.asOf ? MONTH_EN[m.asOf] ?? m.asOf : undefined,
    })),
  };
}
