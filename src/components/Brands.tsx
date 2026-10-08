import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { Section, SectionHeading } from "@/components/SectionHeading";
import { useLang, useT } from "@/i18n/lang";

const brands = [
  {
    name: "Tiryaki Yazılım",
    description: "Kurumsal web, mobil uygulama ve e-ticaret çözümleri sunan yazılım şirketi.",
    logo: "/brands/logos/tiryakiyazilim.jpg",
    website: "https://tiryakiyazilim.com",
    domain: "tiryakiyazilim.com",
    category: "Yazılım şirketi",
    en: { description: "Software company delivering corporate websites, mobile apps and e-commerce solutions.", category: "Software company" },
  },
  {
    name: "Odak Software",
    description: "İşletmeler için müşteri, satış ve süreç yönetimi sunan CRM sistemi.",
    logo: "/brands/logos/odaksoftware.svg",
    website: "https://odak-crm.vercel.app",
    domain: "odak-crm.vercel.app",
    category: "CRM / SaaS",
    en: { description: "A CRM system for businesses covering customers, sales and processes.", category: "CRM / SaaS" },
  },
  {
    name: "Kodlasa",
    description: "Kurumsal firmalara ve girişimlere özel yazılım çözümleri geliştiren ajans.",
    logo: "/brands/logos/kodlasa.png",
    website: "https://kodlasa.com",
    domain: "kodlasa.com",
    category: "Yazılım ajansı",
    en: { description: "Software agency building custom solutions for companies and startups.", category: "Software agency" },
  },
];

const Brands = () => {
  const lang = useLang();
  const t = useT();
  return (
    <Section id="brands" tone="surface">
      <motion.div
        className="mx-auto max-w-6xl"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <SectionHeading
          eyebrow={t("Markalar", "Brands")}
          title={t("Kurduğum", "Brands I")}
          highlight={t("markalar", "founded")}
          description={t("Kendi kurduğum ve büyüttüğüm dijital markalar.", "Digital brands I founded and grew.")}
        />

        <div className="grid gap-5 md:grid-cols-3">
          {brands.map((brand) => (
            <motion.a
              key={brand.name}
              variants={fadeUp}
              href={brand.website}
              target="_blank"
              rel="noopener noreferrer"
              className="card-surface card-lift group flex items-start gap-4 p-6"
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-white p-2">
                <img
                  src={brand.logo}
                  alt={t(`${brand.name} logosu`, `${brand.name} logo`)}
                  className="h-full w-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center justify-between gap-2">
                  <span className="font-bold tracking-tight text-foreground">{brand.name}</span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                </span>
                <span className="block text-xs font-semibold text-primary">{lang === "en" ? brand.en.category : brand.category}</span>
                <span className="mt-2 block text-sm leading-relaxed text-muted-foreground">
                  {lang === "en" ? brand.en.description : brand.description}
                </span>
                <span className="mt-3 block text-xs font-medium text-muted-foreground">
                  {brand.domain}
                </span>
              </span>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </Section>
  );
};

export default Brands;
