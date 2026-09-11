/**
 * Araç pazaryeri ürün ailesi — aynı ürünün beş ülke için kurulmuş sürümleri.
 * Her ülkede üç uygulama var: mobil (Expo), web pazaryeri ve yönetim paneli;
 * hepsi `central-admin` üzerinden tek panelden yönetiliyor.
 *
 * `key` alanı `projects.ts` içindeki `imageKey` ile eşleşir — ekran görüntüsü,
 * canlı adres ve yayın durumu oradan okunur, burada tekrarlanmaz.
 */
export type CarCountry = {
  key: string;
  /** ISO 3166-1 alpha-2. Bayrak emojisi kullanmiyoruz: Windows'ta
   *  bolgesel gosterge karakterleri bayrak yerine harf cifti olarak ciziliyor. */
  code: string;
  country: string;
  brand: string;
  domain: string;
  /** Mobil uygulamanın mağaza adresi — yalnızca yayınlanmış olanda dolu. */
  store?: string;
  storeLabel?: string;
  /** Mobil uygulamanın portföy kaydı (`projects.ts` imageKey). */
  mobileKey: string;
};

export const CAR_FAMILY: CarCountry[] = [
  {
    key: "dacar-web",
    code: "SN",
    country: "Senegal",
    brand: "daCAR",
    domain: "dacar.sn",
    store: "https://play.google.com/store/apps/details?id=com.ismailtiryaki.dacar",
    storeLabel: "Google Play",
    mobileKey: "dacar-mobile",
  },
  { key: "marocar-web", code: "MA", country: "Fas", brand: "MaroCar", domain: "marocar.ma", mobileKey: "marocar-mobile", store: "https://play.google.com/store/apps/details?id=com.appcarfy.marocar", storeLabel: "Google Play" },
  { key: "bharatkaar-web", code: "IN", country: "Hindistan", brand: "BharatKaar", domain: "bharatkaar.com", mobileKey: "bharatkaar-mobile" },
  { key: "avtouzbek-web", code: "UZ", country: "Özbekistan", brand: "AvtoUzbek", domain: "avtouzbek.uz", mobileKey: "avtouzbek-mobile" },
  { key: "naijacar-web", code: "NG", country: "Nijerya", brand: "NaijaCar", domain: "naijacar.ng", mobileKey: "naijacar-mobile" },
];

/** Her ülkede tekrarlanan üç katman. */
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
  countries: CAR_FAMILY.length,
  apps: CAR_FAMILY.length * 3,
  adminScreens: 19,
};
