export type StoreApp = {
  name: string;
  category: string;
  tagline: string;
  icon: string;
  builtWith: string;
  appStore?: string;
  googlePlay?: string;
  /** Müşteri hesabıyla yayınlanan uygulamalar */
  client?: string;
  /** Mağaza yayını öncesi uygulamalar için canlı web sitesi */
  website?: string;
  en: { category: string; tagline: string; client?: string };
};

/**
 * Mağazalarda yayında olan uygulamalar (Ekim 2026 kontrolü).
 * App Store hesapları: Emir Tiryaki (CarLog, Adhan), araç pazaryeri hesabı (daCAR, AvtoUzbek, Marocar, NaijaCar),
 * Kortbul ve Heybe müşteri hesapları. Google Play: Afrikaapp + Kortbul + Heybe.
 */
export const apps: StoreApp[] = [
  {
    name: "Heybe",
    category: "Eğitim · Din",
    tagline:
      "Kur'an ve dini eğlenerek öğreten uygulama: elifba ve ibadet dersleri, namaz takibi, sure ezberi, lig ve topluluk.",
    icon: "/apps/heybe.jpg",
    builtWith: "Flutter & Firebase ile geliştirildi",
    appStore: "https://apps.apple.com/tr/app/heybe-i-slami-%C3%B6%C4%9Fren/id6807960856",
    googlePlay: "https://play.google.com/store/apps/details?id=com.charduck.heybe",
    client: "Heybe markası için",
    en: {
      category: "Education · Religion",
      tagline:
        "A gamified app for learning the Quran and Islam: alphabet and worship lessons, prayer tracking, surah memorization, leagues and community.",
      client: "Built for the Heybe brand",
    },
  },
  {
    name: "Kortbul",
    category: "Spor · Rezervasyon",
    tagline:
      "Tenis, padel, pickleball, squash ve badminton için kort ve partner bulma; maç teklifi, sohbet ve turnuvalar.",
    icon: "/apps/kortbul.png",
    builtWith: "React Native & Expo ile geliştirildi",
    appStore: "https://apps.apple.com/tr/app/kortbul-tenis-padel-ke%C5%9Ffet/id6758905599",
    googlePlay: "https://play.google.com/store/apps/details?id=com.krtbl.expo",
    client: "Kortbul markası için",
    en: {
      category: "Sports · Booking",
      tagline:
        "Find courts and partners for tennis, padel, pickleball, squash and badminton; match invites, chat and tournaments.",
      client: "Built for the Kortbul brand",
    },
  },
  {
    name: "CarLog",
    category: "Araç · Kişisel",
    tagline:
      "Aracın bakım, yakıt ve resmî evrak bilgilerini tek yerden takip; satarken alıcıya rapor sunar.",
    icon: "/apps/carlog.jpg",
    builtWith: "Swift & SwiftUI ile geliştirildi",
    appStore: "https://apps.apple.com/tr/app/carlog/id6760318180",
    en: {
      category: "Cars · Personal",
      tagline:
        "Track your car's maintenance, fuel and paperwork in one place; share a report with the buyer when you sell.",
    },
  },
  {
    name: "Adhan",
    category: "Namaz vakitleri",
    tagline:
      "GPS veya manuel şehir seçimiyle hassas namaz vakitleri, vakit bildirimleri ve sade, modern arayüz.",
    icon: "/apps/adhan.jpg",
    builtWith: "Swift & SwiftUI ile geliştirildi",
    appStore: "https://apps.apple.com/tr/app/adhan/id6755198431",
    en: {
      category: "Prayer times",
      tagline:
        "Accurate prayer times via GPS or manual city selection, prayer reminders and a clean, modern interface.",
    },
  },
  {
    name: "daCAR",
    category: "Senegal · Araç pazaryeri",
    tagline:
      "Senegal için araç alım-satım: ilan yayınlama, gelişmiş arama ve doğrulanmış satıcılar.",
    icon: "/apps/dacar.png",
    builtWith: "React Native, Expo & Supabase ile geliştirildi",
    appStore: "https://apps.apple.com/tr/app/dacar-achat-vente-de-voitures/id6761602043",
    googlePlay: "https://play.google.com/store/apps/details?id=com.ismailtiryaki.dacar",
    en: {
      category: "Senegal · Car marketplace",
      tagline:
        "Buy and sell cars in Senegal: post listings, advanced search and verified sellers.",
    },
  },
  {
    name: "AvtoUzbek",
    category: "Özbekistan · Araç pazaryeri",
    tagline:
      "Özbekistan'ın araç ilan pazarı: ikinci el ve sıfır araç ilanları, filtreli arama ve satıcıyla iletişim.",
    icon: "/apps/avtouzbek.png",
    builtWith: "React Native, Expo & Supabase ile geliştirildi",
    appStore: "https://apps.apple.com/tr/app/avtouzbek-avto-elon-bozor/id6799088463",
    googlePlay: "https://play.google.com/store/apps/details?id=com.appcarfy.avtouzbek",
    en: {
      category: "Uzbekistan · Car marketplace",
      tagline:
        "Uzbekistan's car listing market: used and new car listings, filtered search and direct contact with sellers.",
    },
  },
  {
    name: "Marocar",
    category: "Fas · Araç pazaryeri",
    tagline:
      "Fas için ikinci el araç pazaryeri: ilan verme, marka-model filtreleri ve güvenli iletişim.",
    icon: "/apps/marocar.png",
    builtWith: "React Native, Expo & Supabase ile geliştirildi",
    appStore: "https://apps.apple.com/tr/app/marocar-voitures-doccasion/id6773120581",
    googlePlay: "https://play.google.com/store/apps/details?id=com.appcarfy.marocar",
    en: {
      category: "Morocco · Car marketplace",
      tagline:
        "Used car marketplace for Morocco: post listings, make–model filters and safe contact.",
    },
  },
  {
    name: "NaijaCar",
    category: "Nijerya · Araç pazaryeri",
    tagline:
      "Nijerya için araç alım-satım: doğrulanmış satıcılar, bütçeye göre arama ve uygulama içi mesajlaşma.",
    icon: "/apps/naijacar.png",
    builtWith: "React Native, Expo & Supabase ile geliştirildi",
    appStore: "https://apps.apple.com/tr/app/naijacar-buy-sell-cars/id6775273788",
    en: {
      category: "Nigeria · Car marketplace",
      tagline:
        "Buy and sell cars in Nigeria: verified sellers, budget-based search and in-app messaging.",
    },
  },
];

/** Geliştirmesi tamamlanan, mağaza yayını öncesindeki uygulamalar. */
export const upcoming: StoreApp[] = [
  {
    name: "BharatKaar",
    category: "Hindistan · Araç pazaryeri",
    tagline: "Hindistan için araç alım-satım: komisyonsuz ilan, plakadan otomatik doldurma, şehir bazlı arama.",
    icon: "/apps/bharatkaar.png",
    builtWith: "React Native, Expo & Supabase ile geliştirildi",
    website: "https://www.bharatkaar.com",
    en: {
      category: "India · Car marketplace",
      tagline:
        "Buy and sell cars in India: commission-free listings, number-plate autofill and city-based search.",
    },
  },
  {
    name: "AvtoBozor",
    category: "Özbekistan · Araç pazaryeri",
    tagline: "Özbekistan'ın komisyonsuz araç pazarı: doğrulanmış satıcılar, hızlı ilan ve detaylı filtreler.",
    icon: "/apps/avtobozor.png",
    builtWith: "React Native, Expo & Supabase ile geliştirildi",
    website: "https://www.avtobozor.app",
    en: {
      category: "Uzbekistan · Car marketplace",
      tagline:
        "Uzbekistan's commission-free car market: verified sellers, quick listings and detailed filters.",
    },
  },
  {
    name: "Satılık",
    category: "Türkiye · İlan platformu",
    tagline: "Otomobilden emlağa, elektronikten iş makinelerine Türkiye'nin ilan platformu; web, mobil ve admin paneli.",
    icon: "/apps/satilik.png",
    builtWith: "React Native, Expo & Supabase ile geliştirildi",
    website: "https://satilikapp.com",
    en: {
      category: "Türkiye · Classifieds",
      tagline:
        "Türkiye's classifieds platform from cars to real estate, electronics and machinery; web, mobile and admin panel.",
    },
  },
  {
    name: "BanglaGari",
    category: "Bangladeş · Araç pazaryeri",
    tagline: "Bangladeş için Bengalce/İngilizce araç alım-satım uygulaması; pazaryeri ailesinin yedinci ülkesi.",
    icon: "/apps/banglagari.png",
    builtWith: "React Native, Expo & Supabase ile geliştirildi",
    en: {
      category: "Bangladesh · Car marketplace",
      tagline:
        "A Bengali/English car marketplace app for Bangladesh; the seventh country of the marketplace family.",
    },
  },
];
