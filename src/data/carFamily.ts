/**
 * Araç pazaryeri ürün ailesi — aynı ürünün yedi marka altında altı ülke için
 * kurulmuş sürümleri (Özbekistan'da iki ayrı marka var: AvtoUzbek ve AvtoBozor).
 * Her markada üç uygulama var: mobil (Expo), web pazaryeri ve yönetim paneli;
 * daCAR/MaroCar/AvtoUzbek/BharatKaar/NaijaCar `central-admin` üzerinden tek panelden
 * yönetiliyor; AvtoBozor kendi panelini kullanıyor, BanglaGari henüz bağlı değil.
 *
 * `key` alanı `projects.ts` içindeki `imageKey` ile eşleşir — ekran görüntüsü,
 * canlı adres ve yayın durumu oradan okunur, burada tekrarlanmaz.
 */
export type CarStore = { label: string; url: string };

export type CarCountry = {
  key: string;
  /** ISO 3166-1 alpha-2. Bayrak emojisi kullanmiyoruz: Windows'ta
   *  bolgesel gosterge karakterleri bayrak yerine harf cifti olarak ciziliyor. */
  code: string;
  country: string;
  brand: string;
  /** Canlı web adresi — henüz yayında olmayan markada boş. */
  domain?: string;
  /** Mobil uygulamanın yayınlandığı mağazalar — yalnızca yayınlanmış olanda dolu. */
  stores?: CarStore[];
  /** Mobil uygulamanın portföy kaydı (`projects.ts` imageKey). Web ve mobil
   *  tek kayıtta anlatılıyorsa boş kalır. */
  mobileKey?: string;
  /** Henüz yayında olmayan marka için durum etiketi (kartta bağlantı yerine gösterilir). */
  status?: string;
};

const PLAY = (id: string): CarStore => ({
  label: "Google Play",
  url: `https://play.google.com/store/apps/details?id=${id}`,
});
/** App Store'un kendi verdiği tam adres (itunes lookup trackViewUrl), kısa /app/id biçimi değil. */
const APPSTORE = (url: string): CarStore => ({
  label: "App Store",
  url,
});

export const CAR_FAMILY: CarCountry[] = [
  {
    key: "dacar-web",
    code: "SN",
    country: "Senegal",
    brand: "daCAR",
    domain: "dacar.sn",
    stores: [PLAY("com.ismailtiryaki.dacar"), APPSTORE("https://apps.apple.com/tr/app/dacar-achat-vente-de-voitures/id6761602043")],
    mobileKey: "dacar-mobile",
  },
  {
    key: "marocar-web",
    code: "MA",
    country: "Fas",
    brand: "MaroCar",
    domain: "marocar.ma",
    stores: [PLAY("com.appcarfy.marocar"), APPSTORE("https://apps.apple.com/tr/app/marocar-voitures-doccasion/id6773120581")],
    mobileKey: "marocar-mobile",
  },
  {
    key: "avtouzbek-web",
    code: "UZ",
    country: "Özbekistan",
    brand: "AvtoUzbek",
    domain: "avtouzbek.uz",
    stores: [PLAY("com.appcarfy.avtouzbek")],
    mobileKey: "avtouzbek-mobile",
  },
  { key: "avtobozor-web", code: "UZ", country: "Özbekistan", brand: "AvtoBozor", domain: "avtobozor.app", mobileKey: "avtobozor-mobile" },
  { key: "bharatkaar-web", code: "IN", country: "Hindistan", brand: "BharatKaar", domain: "bharatkaar.com", mobileKey: "bharatkaar-mobile" },
  { key: "naijacar-web", code: "NG", country: "Nijerya", brand: "NaijaCar", domain: "naijacar.ng", mobileKey: "naijacar-mobile" },
  { key: "banglagari", code: "BD", country: "Bangladeş", brand: "BanglaGari", status: "Geliştirme aşamasında" },
];

/** Her markada tekrarlanan üç katman. */
export const CAR_LAYERS = [
  {
    icon: "Smartphone",
    title: "Mobil uygulama",
    body: "Expo & React Native ile iOS ve Android. İlan verme, arama, favoriler ve satıcıyla iletişim.",
  },
  {
    icon: "Globe",
    title: "Web pazaryeri",
    body: "React + Vite ile ülkeye özel dil, para birimi ve ilan akışı. WhatsApp bağlantı önizlemesi dahil.",
  },
  {
    icon: "LayoutDashboard",
    title: "Yönetim paneli",
    body: "İlan, kullanıcı, bayi ve içerik yönetimi için 19 ekranlık admin arayüzü.",
  },
];

export const CAR_SUMMARY = {
  brands: CAR_FAMILY.length,
  countries: new Set(CAR_FAMILY.map((c) => c.code)).size,
  /** Yayındaki web siteleri — durum etiketi taşıyan (henüz yayında olmayan) marka hariç. */
  liveSites: CAR_FAMILY.filter((c) => c.domain && !c.status).length,
  /** Mağazada yayınlanmış mobil uygulama sayısı. */
  storeApps: CAR_FAMILY.filter((c) => c.stores?.length).length,
  adminScreens: 19,
};
