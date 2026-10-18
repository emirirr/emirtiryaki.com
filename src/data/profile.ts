/**
 * Ana sayfada gösterilen kişisel içerik — bileşenlerden ayrı tutulur ki metin
 * değişikliği için JSX'e girmek gerekmesin. İki dilli alanlar `{ tr, en }`.
 * Proje verisi `projects.ts`, araç ailesi `carFamily.ts`, iş geçmişi
 * `experience.ts`, marka ikonları `techBrands.ts` içinde.
 */
import type { Lang } from "@/i18n/lang";

export type L10n = { tr: string; en: string };
export const pick = (v: L10n, lang: Lang) => v[lang];

export const CONTACT = {
  name: "İsmail Emir Tiryaki",
  email: "info@emirtiryaki.com",
  phone: "+90 543 447 6245",
  phoneHref: "tel:+905434476245",
  city: { tr: "İstanbul, Türkiye", en: "Istanbul, Türkiye" },
  cv: { tr: "/cv.html", en: "/cv-en.html" },
} as const;

export const SOCIALS = [
  { key: "github", label: "GitHub", handle: "@emirirr", href: "https://github.com/emirirr" },
  { key: "linkedin", label: "LinkedIn", handle: "@emir-tiryaki", href: "https://www.linkedin.com/in/emir-tiryaki" },
  { key: "instagram", label: "Instagram", handle: "@emirscode", href: "https://instagram.com/emirscode" },
  { key: "youtube", label: "YouTube", handle: "@emirtiryaki", href: "https://youtube.com/@emirtiryaki" },
] as const;

/** Hero'da yazılıp silinen kelimeler: "<kelime> tasarlıyor, geliştiriyor…" */
export const HERO_ROLES: Record<Lang, string[]> = {
  tr: ["web uygulamaları", "mobil uygulamalar", "yönetim panelleri", "e-ticaret siteleri", "API'ler"],
  en: ["web apps", "mobile apps", "admin panels", "e-commerce sites", "APIs"],
};

/** Puan/yüzde YOK — ne işe yaradığına göre gruplanmış yığın. */
export const STACK_GROUPS = [
  {
    key: "arayuz",
    title: { tr: "Arayüz", en: "Frontend" },
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vite", "Framer Motion"],
  },
  {
    key: "backend",
    title: { tr: "Backend & veri", en: "Backend & data" },
    items: ["Node.js", "PostgreSQL", "Supabase", "Firebase", "Redis", "REST"],
  },
  {
    key: "mobil",
    title: { tr: "Mobil", en: "Mobile" },
    items: ["React Native", "Expo", "Flutter", "Swift", "SwiftUI"],
  },
  {
    key: "altyapi",
    title: { tr: "Altyapı & araçlar", en: "Infrastructure & tools" },
    items: ["Docker", "Vercel", "AWS", "Git & GitHub", "Edge Functions"],
  },
];

/** Ajans hizmetleri — her biri somut teslimatlarla. */
export const SERVICES = [
  {
    key: "web",
    title: { tr: "Web uygulaması", en: "Web apps" },
    body: {
      tr: "Pazaryeri, SaaS, rezervasyon veya iç araç — React/Next.js ile hızlı, erişilebilir ve aramada bulunan web ürünleri.",
      en: "Marketplaces, SaaS, booking or internal tools — fast, accessible and search-friendly web products with React/Next.js.",
    },
    items: {
      tr: ["Arayüz tasarımı ve tasarım sistemi", "Next.js / React + TypeScript", "Teknik SEO ve şehir/ilçe sayfaları", "Vercel üzerinde yayın"],
      en: ["Interface design and design system", "Next.js / React + TypeScript", "Technical SEO and city/district pages", "Deployment on Vercel"],
    },
  },
  {
    key: "mobile",
    title: { tr: "Mobil uygulama", en: "Mobile apps" },
    body: {
      tr: "iOS ve Android için tek kod tabanından uygulama; mağaza başvurusu ve güncellemeler dahil.",
      en: "iOS and Android apps from a single codebase, including store submission and updates.",
    },
    items: {
      tr: ["React Native / Expo veya Flutter", "Bildirim, harita, ödeme, abonelik", "App Store + Google Play yayını", "Widget ve canlı bildirimler"],
      en: ["React Native / Expo or Flutter", "Notifications, maps, payments, subscriptions", "App Store + Google Play release", "Widgets and live notifications"],
    },
  },
  {
    key: "commerce",
    title: { tr: "E-ticaret & kurumsal site", en: "E-commerce & corporate sites" },
    body: {
      tr: "Ürün kataloğu, teklif formu ve yerel aramada öne çıkan sayfalarla satış getiren siteler.",
      en: "Sites that bring sales with product catalogs, quote forms and pages that rank in local search.",
    },
    items: {
      tr: ["Katalog ve teklif akışları", "Çok markalı tek kod tabanı", "Yerel SEO (il / ilçe sayfaları)", "Analitik ve dönüşüm takibi"],
      en: ["Catalog and quote flows", "Multi-brand single codebase", "Local SEO (city / district pages)", "Analytics and conversion tracking"],
    },
  },
  {
    key: "backend",
    title: { tr: "Backend & yönetim paneli", en: "Backend & admin panels" },
    body: {
      tr: "Ürünün arkasındaki veri, yetki ve operasyon: API, veritabanı şeması ve ekibin kullanacağı panel.",
      en: "The data, permissions and operations behind the product: API, database schema and the panel your team uses.",
    },
    items: {
      tr: ["Supabase / Firebase / PostgreSQL", "Rol tabanlı yetki, denetim kaydı", "Bildirim ve içerik yönetimi", "Çok ülkeli tek panel"],
      en: ["Supabase / Firebase / PostgreSQL", "Role-based access, audit log", "Notifications and content management", "One panel for many countries"],
    },
  },
];

/** Çalışma süreci. */
export const PROCESS = [
  {
    title: { tr: "Keşif", en: "Discovery" },
    body: {
      tr: "Hedefi, kullanıcıyı ve ölçülecek sonucu birlikte netleştiriyoruz; kapsam ve takvim yazılı hale geliyor.",
      en: "We clarify the goal, the users and the outcome to measure; scope and timeline are put in writing.",
    },
  },
  {
    title: { tr: "Tasarım", en: "Design" },
    body: {
      tr: "Akışlar ve ekranlar tıklanabilir taslakla doğrulanıyor; geliştirmeye onaylı tasarımla geçiliyor.",
      en: "Flows and screens are validated with a clickable prototype; development starts from an approved design.",
    },
  },
  {
    title: { tr: "Geliştirme", en: "Development" },
    body: {
      tr: "Haftalık teslimlerle ilerliyoruz; her aşamada canlı bir önizleme adresi üzerinden takip edebiliyorsunuz.",
      en: "We move in weekly deliveries; you can follow every step on a live preview link.",
    },
  },
  {
    title: { tr: "Yayın & bakım", en: "Launch & care" },
    body: {
      tr: "Site yayına, uygulama mağazaya çıkıyor. Sonrasında ölçüm, güncelleme ve yeni özelliklerle devam.",
      en: "The site goes live and the app ships to the stores, followed by measurement, updates and new features.",
    },
  },
];

export type BrandEntry = {
  name: string;
  by: L10n;
  /** null → site şu an erişilemiyor, kart dışarı link vermez. */
  href: string | null;
  logo: string;
};

export const BRANDS: BrandEntry[] = [
  { name: "Tiryaki Yazılım", by: { tr: "Web, mobil & kurumsal çözümler stüdyosu", en: "Web, mobile & business software studio" }, href: "https://tiryakiyazilim.com", logo: "/brands/logos/tiryakiyazilim.jpg" },
  // odaksoftware.com ayakta ama SSL sertifikası süresi dolmuş; yenilenince href geri verilebilir.
  { name: "Odak Software", by: { tr: "İşletmeler için CRM platformu", en: "CRM platform for businesses" }, href: null, logo: "/brands/logos/odaksoftware.svg" },
  { name: "Kodlasa", by: { tr: "Eğitim & geliştirme platformu, mentorluk", en: "Learning & development platform, mentoring" }, href: "https://kodlasa.com", logo: "/brands/logos/kodlasa.png" },
];

export const PRINCIPLE: L10n = {
  tr: "Bir işi teslim etmenin tek ölçüsü var: kullanıcının elinde çalışıyor mu? Tasarımı da, API'yi de, mağaza sürecini de bu yüzden aynı kişi olarak takip ediyorum — arada kaybolan bir şey kalmasın diye.",
  en: "There is only one measure of delivery: does it work in the user's hands? That's why I own the design, the API and the store release myself — so nothing gets lost in between.",
};
