import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { Section, SectionHeading } from "@/components/SectionHeading";
import { AppleLogo, GooglePlayLogo, StoreBadge } from "@/components/StoreBadge";

type StoreApp = {
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
};

/**
 * Mağazalarda yayında olan uygulamalar (Ekim 2026 kontrolü).
 * App Store hesapları: Emir Tiryaki (CarLog, Adhan), araç pazaryeri hesabı (daCAR, AvtoUzbek, Marocar, NaijaCar),
 * Kortbul ve Heybe müşteri hesapları. Google Play: Afrikaapp + Kortbul + Heybe.
 */
const apps: StoreApp[] = [
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
  },
  {
    name: "CarLog",
    category: "Araç · Kişisel",
    tagline:
      "Aracın bakım, yakıt ve resmî evrak bilgilerini tek yerden takip; satarken alıcıya rapor sunar.",
    icon: "/apps/carlog.jpg",
    builtWith: "Swift & SwiftUI ile geliştirildi",
    appStore: "https://apps.apple.com/tr/app/carlog/id6760318180",
  },
  {
    name: "Adhan",
    category: "Namaz vakitleri",
    tagline:
      "GPS veya manuel şehir seçimiyle hassas namaz vakitleri, vakit bildirimleri ve sade, modern arayüz.",
    icon: "/apps/adhan.jpg",
    builtWith: "Swift & SwiftUI ile geliştirildi",
    appStore: "https://apps.apple.com/tr/app/adhan/id6755198431",
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
  },
  {
    name: "NaijaCar",
    category: "Nijerya · Araç pazaryeri",
    tagline:
      "Nijerya için araç alım-satım: doğrulanmış satıcılar, bütçeye göre arama ve uygulama içi mesajlaşma.",
    icon: "/apps/naijacar.png",
    builtWith: "React Native, Expo & Supabase ile geliştirildi",
    appStore: "https://apps.apple.com/tr/app/naijacar-buy-sell-cars/id6775273788",
  },
];

/** Geliştirmesi tamamlanan, mağaza yayını öncesindeki uygulamalar. */
const upcoming: StoreApp[] = [
  {
    name: "BharatKaar",
    category: "Hindistan · Araç pazaryeri",
    tagline: "Hindistan için araç alım-satım: komisyonsuz ilan, plakadan otomatik doldurma, şehir bazlı arama.",
    icon: "/apps/bharatkaar.png",
    builtWith: "React Native, Expo & Supabase ile geliştirildi",
    website: "https://www.bharatkaar.com",
  },
  {
    name: "AvtoBozor",
    category: "Özbekistan · Araç pazaryeri",
    tagline: "Özbekistan'ın komisyonsuz araç pazarı: doğrulanmış satıcılar, hızlı ilan ve detaylı filtreler.",
    icon: "/apps/avtobozor.png",
    builtWith: "React Native, Expo & Supabase ile geliştirildi",
    website: "https://www.avtobozor.app",
  },
  {
    name: "Satılık",
    category: "Türkiye · İlan platformu",
    tagline: "Otomobilden emlağa, elektronikten iş makinelerine Türkiye'nin ilan platformu; web, mobil ve admin paneli.",
    icon: "/apps/satilik.png",
    builtWith: "React Native, Expo & Supabase ile geliştirildi",
    website: "https://satilikapp.com",
  },
  {
    name: "BanglaGari",
    category: "Bangladeş · Araç pazaryeri",
    tagline: "Bangladeş için Bengalce/İngilizce araç alım-satım uygulaması; pazaryeri ailesinin yedinci ülkesi.",
    icon: "/apps/banglagari.png",
    builtWith: "React Native, Expo & Supabase ile geliştirildi",
  },
];

const AppShowcase = () => {
  const iosCount = apps.filter((a) => a.appStore).length;
  const androidCount = apps.filter((a) => a.googlePlay).length;

  return (
    <Section id="apps">
      <motion.div
        className="mx-auto max-w-6xl"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <SectionHeading
          eyebrow="Mağazada yayında"
          title="Yayınlanmış"
          highlight="uygulamalar"
          description="Fikirden mağaza yayınına kadar geliştirdiğim, bugün App Store ve Google Play'de indirilebilen uygulamalar."
        >
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground">
              <AppleLogo className="h-4 w-4" />
              App Store'da {iosCount} uygulama
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground">
              <GooglePlayLogo className="h-4 w-4" />
              Google Play'de {androidCount} uygulama
            </span>
          </div>
        </SectionHeading>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {apps.map((app) => (
            <motion.article
              key={app.name}
              variants={fadeUp}
              className="card-surface card-lift flex h-full flex-col p-6"
            >
              <div className="flex items-center gap-4">
                <img
                  src={app.icon}
                  alt={`${app.name} uygulama simgesi`}
                  width={64}
                  height={64}
                  loading="lazy"
                  decoding="async"
                  className="h-16 w-16 shrink-0 rounded-[22%] border border-border object-cover shadow-[0_10px_24px_-12px_hsl(222_47%_9%/0.4)]"
                />
                <div className="min-w-0">
                  <h3 className="truncate text-lg font-bold tracking-tight text-foreground">
                    {app.name}
                  </h3>
                  <p className="truncate text-xs font-medium text-muted-foreground">
                    {app.category}
                  </p>
                </div>
              </div>

              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                {app.tagline}
              </p>

              <p className="mt-4 text-xs font-semibold text-primary">
                {app.builtWith}
                {app.client && (
                  <span className="font-medium text-muted-foreground"> · {app.client}</span>
                )}
              </p>

              <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
                {app.appStore && <StoreBadge store="appstore" href={app.appStore} size="sm" />}
                {app.googlePlay && (
                  <StoreBadge store="googleplay" href={app.googlePlay} size="sm" />
                )}
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div variants={fadeUp} className="mt-16 flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/25 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
            <Clock className="h-3.5 w-3.5" />
            Yakında mağazada
          </span>
          <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-foreground">
            Yayına hazırlanan uygulamalar
          </h3>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Geliştirmesi tamamlandı, mağaza incelemesi bekleniyor. Web siteleri şimdiden yayında.
          </p>
        </motion.div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {upcoming.map((app) => (
            <motion.article
              key={app.name}
              variants={fadeUp}
              className="flex h-full flex-col rounded-2xl border border-dashed border-border bg-surface p-6"
            >
              <div className="flex items-center gap-4">
                <img
                  src={app.icon}
                  alt={`${app.name} uygulama simgesi`}
                  width={56}
                  height={56}
                  loading="lazy"
                  decoding="async"
                  className="h-14 w-14 shrink-0 rounded-[22%] border border-border bg-white object-cover"
                />
                <div className="min-w-0">
                  <h4 className="truncate font-bold tracking-tight text-foreground">{app.name}</h4>
                  <p className="truncate text-xs font-medium text-muted-foreground">{app.category}</p>
                </div>
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{app.tagline}</p>
              <p className="mt-4 text-xs font-semibold text-primary">{app.builtWith}</p>
              <div className="mt-4 flex items-center justify-between gap-2 border-t border-border pt-4">
                <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <AppleLogo className="h-3.5 w-3.5" />
                  <GooglePlayLogo className="h-3.5 w-3.5" />
                  Yakında
                </span>
                {app.website ? (
                  <a
                    href={app.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                  >
                    Web sitesi
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                ) : (
                  <span className="text-xs text-muted-foreground">Site hazırlanıyor</span>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </Section>
  );
};

export default AppShowcase;
