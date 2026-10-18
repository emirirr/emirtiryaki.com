/**
 * Ana sayfa bölümleri — üst menü, komut paleti ve kaydırma takibi bu listeden
 * beslenir. `id` bölümün DOM id'sidir; eski bağlantılar (/#about, /#work …)
 * bozulmasın diye değiştirme. `nav: true` olanlar üst menüde görünür.
 */
export type Section = { id: string; label: string; nav?: boolean };

export const SECTIONS: Section[] = [
  { id: "services", label: "Hizmetler", nav: true },
  { id: "work", label: "İşler", nav: true },
  { id: "pazaryeri", label: "Ürün aileleri", nav: true },
  { id: "process", label: "Süreç", nav: true },
  { id: "about", label: "Hakkımda", nav: true },
  { id: "skills", label: "Teknolojiler" },
  { id: "heybe", label: "Heybe" },
  { id: "dacargo", label: "Dacargo" },
  { id: "experience", label: "İş geçmişi" },
  { id: "contact", label: "Proje başlat" },
];

export const NAV_SECTIONS = SECTIONS.filter((s) => s.nav);
