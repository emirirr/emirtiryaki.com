/**
 * Ana sayfa bölümleri — üst menü, komut paleti ve kaydırma takibi bu listeden
 * beslenir. `id` bölümün DOM id'sidir; eski bağlantılar (/#about, /#work …)
 * bozulmasın diye değiştirme. `nav: true` olanlar üst menüde görünür.
 */
import type { L10n } from "@/data/profile";

export type Section = { id: string; label: L10n; nav?: boolean };

export const SECTIONS: Section[] = [
  { id: "services", label: { tr: "Hizmetler", en: "Services" }, nav: true },
  { id: "work", label: { tr: "İşler", en: "Work" }, nav: true },
  { id: "pazaryeri", label: { tr: "Ürün aileleri", en: "Product families" }, nav: true },
  { id: "process", label: { tr: "Süreç", en: "Process" }, nav: true },
  { id: "about", label: { tr: "Hakkımda", en: "About" }, nav: true },
  { id: "heybe", label: { tr: "Heybe", en: "Heybe" } },
  { id: "dacargo", label: { tr: "Dacargo", en: "Dacargo" } },
  { id: "experience", label: { tr: "İş geçmişi", en: "Experience" } },
  { id: "skills", label: { tr: "Teknolojiler", en: "Technologies" } },
  { id: "faq", label: { tr: "Sık sorulanlar", en: "FAQ" } },
  { id: "contact", label: { tr: "Proje başlat", en: "Start a project" } },
];

export const NAV_SECTIONS = SECTIONS.filter((s) => s.nav);
