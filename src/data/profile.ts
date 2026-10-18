/**
 * Ana sayfada gösterilen kişisel içerik — bileşenlerden ayrı tutulur ki metin
 * değişikliği için JSX'e girmek gerekmesin. Proje verisi `projects.ts`,
 * araç ailesi `carFamily.ts`, marka ikonları `techBrands.ts` içinde.
 */
import { experienceLabel } from "@/lib/experience";

export const CONTACT = {
  name: "İsmail Emir Tiryaki",
  email: "info@emirtiryaki.com",
  phone: "+90 543 447 6245",
  phoneHref: "tel:+905434476245",
  city: "İstanbul, Türkiye",
  cv: "/cv.html",
} as const;

export const SOCIALS = [
  { key: "github", label: "GitHub", handle: "@emirirr", href: "https://github.com/emirirr" },
  { key: "linkedin", label: "LinkedIn", handle: "@emir-tiryaki", href: "https://www.linkedin.com/in/emir-tiryaki" },
  { key: "instagram", label: "Instagram", handle: "@emirscode", href: "https://instagram.com/emirscode" },
  { key: "youtube", label: "YouTube", handle: "@emirtiryaki", href: "https://youtube.com/@emirtiryaki" },
] as const;

/** Hero'da yazılıp silinen kelimeler: "<kelime> kuruyorum." */
export const HERO_ROLES = [
  "web uygulamaları",
  "mobil uygulamalar",
  "yönetim panelleri",
  "e-ticaret siteleri",
  "API'ler",
];

export const STATS = [
  { value: experienceLabel(), label: "Yıl deneyim" },
  { value: "40+", label: "Tamamlanan proje" },
  { value: "6+", label: "Sektör" },
  { value: "25+", label: "Teknoloji" },
];

/** Puan/yüzde YOK — ne işe yaradığına göre gruplanmış yığın. */
export const STACK_GROUPS = [
  {
    key: "arayuz",
    title: "Arayüz",
    body: "Tasarım sisteminden üretime: erişilebilir, hızlı ve akıcı arayüzler.",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vite", "Framer Motion"],
  },
  {
    key: "backend",
    title: "Backend & veri",
    body: "API sözleşmesi, şema tasarımı, kimlik doğrulama ve yetkilendirme.",
    items: ["Node.js", "PostgreSQL", "Supabase", "Firebase", "Redis", "REST"],
  },
  {
    key: "mobil",
    title: "Mobil",
    body: "Mağazaya çıkan iOS/Android uygulamaları — build ve yayın dahil.",
    items: ["React Native", "Expo", "Swift", "SwiftUI", "EAS / Play Console"],
  },
  {
    key: "altyapi",
    title: "Altyapı & araçlar",
    body: "Dağıtım hattı, ortam yönetimi ve teknik SEO tarafı.",
    items: ["Docker", "Vercel", "AWS", "Git & GitHub", "Edge Functions"],
  },
];

/** Ajans hizmetleri — her biri somut teslimatlarla. `icon` lucide adı. */
export const SERVICES = [
  {
    key: "web",
    title: "Web uygulaması",
    body: "Pazaryeri, SaaS, rezervasyon veya iç araç — React/Next.js ile hızlı, erişilebilir ve aramada bulunan web ürünleri.",
    items: ["Arayüz tasarımı ve tasarım sistemi", "Next.js / React + TypeScript", "Teknik SEO ve şehir/ilçe sayfaları", "Vercel üzerinde yayın"],
  },
  {
    key: "mobile",
    title: "Mobil uygulama",
    body: "iOS ve Android için tek kod tabanından uygulama; mağaza başvurusu ve güncellemeler dahil.",
    items: ["React Native / Expo veya Flutter", "Bildirim, harita, ödeme, abonelik", "App Store + Google Play yayını", "Widget ve canlı bildirimler"],
  },
  {
    key: "commerce",
    title: "E-ticaret & kurumsal site",
    body: "Ürün kataloğu, teklif formu ve yerel aramada öne çıkan sayfalarla satış getiren siteler.",
    items: ["Katalog ve teklif akışları", "Çok markalı tek kod tabanı", "Yerel SEO (il / ilçe sayfaları)", "Analitik ve dönüşüm takibi"],
  },
  {
    key: "backend",
    title: "Backend & yönetim paneli",
    body: "Ürünün arkasındaki veri, yetki ve operasyon: API, veritabanı şeması ve ekibin kullanacağı panel.",
    items: ["Supabase / Firebase / PostgreSQL", "Rol tabanlı yetki, denetim kaydı", "Bildirim ve içerik yönetimi", "Çok ülkeli tek panel"],
  },
];

/** Çalışma süreci — vaka çalışmalarındaki gerçek akışın özeti. */
export const PROCESS = [
  { title: "Keşif", body: "Hedefi, kullanıcıyı ve ölçülecek sonucu birlikte netleştiriyoruz; kapsam ve takvim yazılı hale geliyor." },
  { title: "Tasarım", body: "Akışlar ve ekranlar tıklanabilir taslakla doğrulanıyor; geliştirmeye onaylı tasarımla geçiliyor." },
  { title: "Geliştirme", body: "Haftalık teslimlerle ilerliyoruz; her aşamada canlı bir önizleme adresi üzerinden takip edebiliyorsunuz." },
  { title: "Yayın & bakım", body: "Site yayına, uygulama mağazaya çıkıyor. Sonrasında ölçüm, güncelleme ve yeni özelliklerle devam." },
];

export type BrandEntry = {
  name: string;
  cat: string;
  by: string;
  stack: string[];
  /** null → site şu an erişilemiyor, kart dışarı link vermez. */
  href: string | null;
  logo: string;
};

export const BRANDS: BrandEntry[] = [
  { name: "Tiryaki Yazılım", cat: "Teknoloji", by: "Web, mobil & kurumsal çözümler stüdyosu", stack: ["React", "Node.js", "Swift", "PostgreSQL"], href: "https://tiryakiyazilim.com", logo: "/brands/logos/tiryakiyazilim.jpg" },
  // odaksoftware.com ayakta ama SSL sertifikası süresi dolmuş; yenilenince href geri verilebilir.
  { name: "Odak Software", cat: "Kurumsal", by: "İşletmeler için CRM platformu", stack: ["React", "Node.js", "PostgreSQL", "TypeScript"], href: null, logo: "/brands/logos/odaksoftware.svg" },
  { name: "Kodlasa", cat: "Eğitim", by: "Eğitim & geliştirme platformu, mentorluk", stack: ["React", "Node.js", "MongoDB", "Socket.io"], href: "https://kodlasa.com", logo: "/brands/logos/kodlasa.png" },
];

/** git log görünümü — en yeni üstte. `tag` satırın yanındaki etiket. */
export const CREDITS = [
  { yr: "2026 →", role: "Mobil Geliştirme & Satın Alma", org: "İstanbul Sensörler", tag: "HEAD → main" },
  { yr: "2024—26", role: "Satış Danışmanı", org: "Han Endüstri Otomasyon" },
  { yr: "2019—24", role: "Web · Mobil · Multimedya", org: "Hamle Mühendislik" },
  { yr: "2017—19", role: "Yazılım Stajyeri", org: "Hamle Mühendislik" },
  { yr: "2017 →", role: "Kurucu / Full Stack Developer", org: "Tiryaki Yazılım — Freelance", tag: "freelance" },
  { yr: "2026", role: "Bilgisayar Programcılığı (ön lisans)", org: "Hoca Ahmet Yesevi Üniv.", tag: "eğitim" },
];

export const PRINCIPLE =
  "Bir işi teslim etmenin tek ölçüsü var: kullanıcının elinde çalışıyor mu? Tasarımı da, API'yi de, mağaza sürecini de bu yüzden aynı kişi olarak takip ediyorum — arada kaybolan bir şey kalmasın diye.";
