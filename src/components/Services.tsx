import { motion } from "framer-motion";
import { Globe, Smartphone, Database, ShoppingCart, Check } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { Section, SectionHeading } from "@/components/SectionHeading";
import { useLang, useT } from "@/i18n/lang";

type Service = {
  Icon: typeof Globe;
  title: string;
  description: string;
  points: string[];
  example: string;
  en: { title: string; description: string; points: string[] };
};

const services: Service[] = [
  {
    Icon: Globe,
    title: "Web Geliştirme",
    description:
      "Kurumsal siteler, landing page ve web uygulamaları; hızlı açılır, SEO uyumlu, büyümeye hazır.",
    points: ["React / Next.js", "SEO & performans", "CMS & yönetim paneli"],
    example: "Karaca Yapı, İnda Otomasyon, Kodlasa",
    en: {
      title: "Web Development",
      description:
        "Corporate sites, landing pages and web apps that load fast, rank well and are ready to grow.",
      points: ["React / Next.js", "SEO & performance", "CMS & admin panel"],
    },
  },
  {
    Icon: Smartphone,
    title: "Mobil Uygulama",
    description:
      "iOS ve çapraz platform uygulamalar; fikirden App Store ve Google Play yayınına kadar.",
    points: ["Swift / SwiftUI", "React Native / Expo", "Mağaza yayını"],
    example: "Kortbul, CarLog, Adhan",
    en: {
      title: "Mobile Apps",
      description:
        "iOS and cross-platform apps, from idea to App Store and Google Play release.",
      points: ["Swift / SwiftUI", "React Native / Expo", "Store release"],
    },
  },
  {
    Icon: Database,
    title: "CRM & Kurumsal Sistem",
    description:
      "Müşteri, satış ve süreç yönetimi; rol bazlı paneller, raporlama ve entegrasyonlar.",
    points: ["Rol bazlı yetki", "Raporlama & dashboard", "API entegrasyonu"],
    example: "Odak Software, Klinik Takip",
    en: {
      title: "CRM & Business Systems",
      description:
        "Customer, sales and process management; role-based dashboards, reporting and integrations.",
      points: ["Role-based access", "Reporting & dashboards", "API integrations"],
    },
  },
  {
    Icon: ShoppingCart,
    title: "E-ticaret & Pazaryeri",
    description:
      "Ürün vitrini, ilan, sepet ve ödeme akışları; dönüşüm odaklı, mobil öncelikli.",
    points: ["Ürün & sipariş", "Ödeme entegrasyonu", "Satıcı / yönetim paneli"],
    example: "daCAR, Marocar, AvtoUzbek",
    en: {
      title: "E-commerce & Marketplaces",
      description:
        "Product catalog, listings, cart and payment flows; conversion-focused and mobile-first.",
      points: ["Products & orders", "Payment integration", "Seller / admin panel"],
    },
  },
];

const steps = [
  { n: "01", title: "Keşif", text: "İhtiyacı dinler, kapsamı ve önceliği netleştiririm.", en: { title: "Discovery", text: "I listen to the need and clarify scope and priorities." } },
  { n: "02", title: "Tasarım", text: "Ekran akışı ve arayüz taslağı; onayınızla ilerleriz.", en: { title: "Design", text: "Screen flows and UI drafts; we move on with your approval." } },
  { n: "03", title: "Geliştirme", text: "Haftalık demo ile şeffaf ilerleme, test edilmiş kod.", en: { title: "Development", text: "Transparent progress with weekly demos and tested code." } },
  { n: "04", title: "Yayın & destek", text: "Canlıya alma, mağaza yayını ve sonrası bakım.", en: { title: "Launch & support", text: "Go-live, store release and ongoing maintenance." } },
];

const Services = () => {
  const lang = useLang();
  const t = useT();
  return (
    <Section id="services">
      <motion.div
        className="mx-auto max-w-6xl"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <SectionHeading
          eyebrow={t("Hizmetler", "Services")}
          title={t("İşinize uygun", "Digital solutions")}
          highlight={t("dijital çözümler", "that fit your business")}
          description={t(
            "Freelance projeler, ekip iş birlikleri ve uzun vadeli danışmanlık. Tek muhatap, uçtan uca teslim.",
            "Freelance projects, team collaborations and long-term consulting. One point of contact, end-to-end delivery.",
          )}
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <motion.div
              key={s.title}
              variants={fadeUp}
              className="card-surface card-lift flex h-full flex-col p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-soft text-primary">
                <s.Icon className="h-5 w-5" strokeWidth={2} />
              </div>
              <h3 className="mt-5 text-lg font-bold tracking-tight text-foreground">{lang === "en" ? s.en.title : s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{lang === "en" ? s.en.description : s.description}</p>
              <ul className="mb-6 mt-5 space-y-2.5">
                {(lang === "en" ? s.en.points : s.points).map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm font-medium text-foreground/85">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              <p className="mt-auto border-t border-border pt-4 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground/70">{t("Örnek: ", "e.g. ")}</span>
                {s.example}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Çalışma süreci */}
        <motion.div variants={fadeUp} className="mt-16">
          <h3 className="text-center text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {t("Nasıl çalışıyorum", "How I work")}
          </h3>
          <ol className="relative mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            <div
              className="absolute left-[12.5%] right-[12.5%] top-5 hidden h-px bg-border lg:block"
              aria-hidden
            />
            {steps.map((s) => (
              <li key={s.n} className="relative text-center">
                <span className="relative mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-card text-sm font-bold text-primary shadow-sm">
                  {s.n}
                </span>
                <p className="mt-4 font-bold text-foreground">{lang === "en" ? s.en.title : s.title}</p>
                <p className="mx-auto mt-1.5 max-w-[15rem] text-sm leading-relaxed text-muted-foreground">
                  {lang === "en" ? s.en.text : s.text}
                </p>
              </li>
            ))}
          </ol>
        </motion.div>
      </motion.div>
    </Section>
  );
};

export default Services;
