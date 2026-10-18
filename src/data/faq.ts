/**
 * Sık sorulan sorular — sayfada görünür ve FAQPage yapılandırılmış verisine dönüşür.
 * Yapay zekâ aramaları (ChatGPT, Perplexity, Google AI) bu net soru-cevapları alıntılar;
 * cevapları kısa, olgusal ve güncel tut.
 */
export type FaqItem = { q: string; a: string; en: { q: string; a: string } };

export const faq: FaqItem[] = [
  {
    q: "Emir Tiryaki kimdir?",
    a: "İsmail Emir Tiryaki, İstanbul'da yaşayan full-stack ve mobil geliştiricidir. 2017'den bu yana yazılım geliştiriyor; web siteleri, mobil uygulamalar ve yönetim panellerini arayüzden backend'e ve App Store / Google Play yayınına kadar uçtan uca üstleniyor. App Store ve Google Play'de 8 yayında uygulaması, kendi alan adında yayında 15 web sitesi var.",
    en: {
      q: "Who is Emir Tiryaki?",
      a: "İsmail Emir Tiryaki is a full-stack and mobile developer based in Istanbul, Türkiye. He has been building software since 2017 and delivers websites, mobile apps and admin panels end to end, from the interface and backend to the App Store and Google Play release. He has 8 apps live on the App Store and Google Play and 15 live websites on their own domains.",
    },
  },
  {
    q: "Hangi hizmetleri veriyorsunuz?",
    a: "Web geliştirme (kurumsal site, landing page, web uygulaması), iOS ve Android mobil uygulama geliştirme, CRM ve kurumsal yönetim sistemleri, e-ticaret ve ilan/pazaryeri platformları. Tasarım, geliştirme, yayın ve sonrasındaki bakım tek elden yürütülür.",
    en: {
      q: "What services do you offer?",
      a: "Web development (corporate sites, landing pages, web apps), iOS and Android mobile app development, CRM and business management systems, and e-commerce and classifieds/marketplace platforms. Design, development, launch and ongoing maintenance are handled by one person.",
    },
  },
  {
    q: "Hangi mobil uygulamaları geliştirdiniz?",
    a: "Yayında olanlar: Heybe (Kur'an ve din eğitimi), Kortbul (tenis ve padel kort/partner bulma), CarLog (araç bakım takibi), Adhan (namaz vakitleri) ve araç pazaryeri uygulamaları daCAR (Senegal), AvtoUzbek (Özbekistan), Marocar (Fas) ve NaijaCar (Nijerya). Yayına hazırlananlar: BharatKaar (Hindistan), AvtoBozor (Özbekistan), Satılık (Türkiye) ve BanglaGari (Bangladeş).",
    en: {
      q: "Which mobile apps have you built?",
      a: "Live apps: Heybe (learning the Quran and Islam), Kortbul (tennis and padel court/partner finder), CarLog (car maintenance log), Adhan (prayer times) and the car marketplace apps daCAR (Senegal), AvtoUzbek (Uzbekistan), Marocar (Morocco) and NaijaCar (Nigeria). Coming soon: BharatKaar (India), AvtoBozor (Uzbekistan), Satılık (Türkiye) and BanglaGari (Bangladesh).",
    },
  },
  {
    q: "Hangi teknolojileri kullanıyorsunuz?",
    a: "Mobilde React Native ve Expo, Swift ve SwiftUI, Flutter; web'de React, Next.js, TypeScript ve Tailwind CSS; backend ve veri tarafında Node.js, Supabase, Firebase ve PostgreSQL.",
    en: {
      q: "Which technologies do you use?",
      a: "On mobile: React Native and Expo, Swift and SwiftUI, Flutter. On the web: React, Next.js, TypeScript and Tailwind CSS. For backend and data: Node.js, Supabase, Firebase and PostgreSQL.",
    },
  },
  {
    q: "Yurt dışındaki müşterilerle uzaktan çalışıyor musunuz?",
    a: "Evet. İstanbul'dan uzaktan ve hibrit çalışıyorum; Senegal, Fas, Özbekistan, Nijerya, Hindistan ve Bangladeş pazarları için ürünler geliştirdim. Türkçe ve İngilizce iletişim kuruyorum.",
    en: {
      q: "Do you work remotely with international clients?",
      a: "Yes. I work remotely and hybrid from Istanbul and have built products for the Senegalese, Moroccan, Uzbek, Nigerian, Indian and Bangladeshi markets. I communicate in Turkish and English.",
    },
  },
  {
    q: "Proje süreci nasıl işliyor, nasıl teklif alabilirim?",
    a: "Süreç dört adımdan oluşur: keşif (ihtiyaç ve kapsam), tasarım (ekran akışı ve arayüz), geliştirme (haftalık demolar) ve yayın & destek. Teklif için emirtiryaki.com'daki iletişim formunu, info@emirtiryaki.com adresini veya WhatsApp'ı (+90 543 447 6245) kullanabilirsiniz; genellikle 24 saat içinde dönüş yapılır.",
    en: {
      q: "How does a project work and how do I get a quote?",
      a: "The process has four steps: discovery (needs and scope), design (screen flows and UI), development (weekly demos) and launch & support. For a quote, use the contact form on emirtiryaki.com, email info@emirtiryaki.com or WhatsApp (+90 543 447 6245); replies usually come within 24 hours.",
    },
  },
];
