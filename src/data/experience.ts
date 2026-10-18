/**
 * İş geçmişi ve eğitim — iki dilli. Ana sayfadaki "Hakkımda" zaman çizelgesi
 * buradan okur. (Kaynak: önceki Experience bileşeni, Ekim 2026 güncellemesi.)
 */
export type Role = {
  company: string;
  title: string;
  period: string;
  current?: boolean;
  points: string[];
  en: { company?: string; title: string; period: string; points: string[] };
};

export const ROLES: Role[] = [
  {
    company: "İstanbul Sensörler",
    title: "Mobil Geliştirme & Satın Alma",
    period: "Mart 2026 — günümüz",
    current: true,
    points: [
      "Şirket içi dashboard için mobil uygulama; Excel kaynaklı verilerin okunaklı bileşenlerle sunulması, manuel tablo bağımlılığını azaltma.",
      "Tedarik ve satın alma: teklif toplama/değerlendirme, sipariş–stok, tedarikçi ilişkileri (endüstriyel sensör ve ölçüm bileşenleri).",
    ],
    en: {
      title: "Mobile Development & Procurement",
      period: "Mar 2026 — present",
      points: [
        "Internal dashboard mobile app presenting Excel-based data through readable components, reducing reliance on manual spreadsheets.",
        "Procurement: quotation collection and evaluation, order–stock and supplier relations (industrial sensors and measurement components).",
      ],
    },
  },
  {
    company: "Kortbul — Freelance",
    title: "Full-Stack Developer",
    period: "Eylül 2025 — Mart 2026",
    points: [
      "Raket sporları için tesis arama ve online kort/saha rezervasyon platformunu uçtan uca geliştirdim (kortbul.com.tr).",
      "React & Node.js ile modüler mimari; tesis yöneticisi ve sporcu için ayrı paneller, uygunluk takvimi, online rezervasyon ve raporlama.",
      "Gerçek zamanlı bildirimler ve rol bazlı yetkilendirme ile anlık bilgi akışı ve veri güvenliği.",
    ],
    en: {
      title: "Full-Stack Developer",
      period: "Sep 2025 — Mar 2026",
      points: [
        "Built the venue search and online court booking platform for racket sports end to end (kortbul.com.tr).",
        "Modular React & Node.js architecture; separate venue-manager and player dashboards, availability calendar, online booking and reporting.",
        "Real-time notifications and role-based authorization for instant updates and data security.",
      ],
    },
  },
  {
    company: "Bionluk — Freelance",
    title: "iOS & Web Developer",
    period: "Ocak 2024 — Mart 2026",
    points: [
      "Web ve iOS platformlarında farklı sektörlerden müşteriler için uçtan uca ürün geliştirdim.",
      "iOS: Swift & SwiftUI ile App Store'da yayınlanan uygulamalar (CarLog, Adhan, Terapi Asistanı).",
      "Web: React & TypeScript arayüzler; Firebase ile kimlik doğrulama ve gerçek zamanlı veri yönetimi.",
    ],
    en: {
      title: "iOS & Web Developer",
      period: "Jan 2024 — Mar 2026",
      points: [
        "Delivered end-to-end web and iOS products for clients across industries.",
        "iOS: apps published on the App Store with Swift & SwiftUI (CarLog, Adhan, Therapy Assistant).",
        "Web: React & TypeScript interfaces; authentication and real-time data with Firebase.",
      ],
    },
  },
  {
    company: "Cebinde",
    title: "Co-Founder",
    period: "Eylül 2023 — Mart 2026",
    points: [
      "Cebinde platformunun mobil arayüzlerini geliştiren ekipte liderlik; kullanıcı deneyimini iyileştiren kullanıcı dostu arayüz tasarımı.",
    ],
    en: {
      title: "Co-Founder",
      period: "Sep 2023 — Mar 2026",
      points: ["Led the team building Cebinde's mobile interfaces; user-friendly UI design that improved the user experience."],
    },
  },
  {
    company: "Han Endüstri Otomasyon",
    title: "Satış",
    period: "Aralık 2023 — Ocak 2026",
    points: [
      "Endüstriyel ürün portföyünde pazarlama ve satış; müşteri ihtiyaçlarına teknik çözüm önerileri ve satış operasyonlarının yürütülmesi.",
    ],
    en: {
      title: "Sales",
      period: "Dec 2023 — Jan 2026",
      points: ["Marketing and sales of industrial products; technical solution proposals for customer needs and sales operations."],
    },
  },
  {
    company: "CK Tedarik — Freelance",
    title: "Web Tasarımı & E-ticaret",
    period: "Ağustos 2023 — Aralık 2023",
    points: [
      "Ürünleri etkili biçimde sergileyen, kullanıcı dostu e-ticaret sitesi tasarımı; firmanın dijital varlığını güçlendirme ve müşteri etkileşimini artırma.",
    ],
    en: {
      title: "Web Design & E-commerce",
      period: "Aug 2023 — Dec 2023",
      points: ["Designed a user-friendly e-commerce site that showcases products effectively, strengthening the company's digital presence."],
    },
  },
  {
    company: "Hamle Mühendislik",
    title: "Web, Mobil ve Multimedya",
    period: "2019 — 2024",
    points: [
      "Kurumsal web (sağlık sektörü): performans, SEO, kullanılabilirlik ve dijital dönüşüm.",
      "Mobil ve web için UX/UI stratejisi ve arayüz standartları; sosyal medya içeriği ve video prodüksiyonu.",
    ],
    en: {
      title: "Web, Mobile & Multimedia",
      period: "2019 — 2024",
      points: [
        "Corporate web for the healthcare sector: performance, SEO, usability and digital transformation.",
        "UX/UI strategy and interface standards for web and mobile; social media content and video production.",
      ],
    },
  },
  {
    company: "Hamle Mühendislik",
    title: "Yazılım Stajyeri",
    period: "2017 — 2019",
    points: [
      "Endüstriyel cihaz programlama ve gömülü uygulamalar; eğitim materyali ve teknik dokümantasyon; web/mobil projelerde destek.",
    ],
    en: {
      title: "Software Intern",
      period: "2017 — 2019",
      points: ["Industrial device programming and embedded applications; training material and technical documentation; support on web/mobile projects."],
    },
  },
];

export const EDUCATION = [
  {
    school: "Anadolu Üniversitesi",
    detail: "Yapay Zekâ ile Kodlama — devam ediyor",
    en: { school: "Anadolu University", detail: "AI-Assisted Coding — in progress" },
  },
  {
    school: "BTK Akademi",
    detail: "iOS Geliştirme sertifikası",
    en: { school: "BTK Academy", detail: "iOS Development certificate" },
  },
  {
    school: "BTK Akademi",
    detail: "React ile Web Geliştirme sertifikası",
    en: { school: "BTK Academy", detail: "Web Development with React certificate" },
  },
];
