import { motion } from "framer-motion";
import { ArrowUpRight, Globe } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { Section, SectionHeading } from "@/components/SectionHeading";
import { PortfolioImage, ProjectPlaceholder } from "@/components/PortfolioImage";
import { builtWithFor, useLang, useT } from "@/i18n/lang";

type LiveSite = {
  name: string;
  domain: string;
  url: string;
  sector: string;
  sectorEn: string;
  image: string;
  builtWith: string;
};

/** Kendi alan adında yayında olan siteler (Ekim 2026 itibarıyla erişilebilir). */
const sites: LiveSite[] = [
  {
    name: "daCAR",
    domain: "dacar.sn",
    url: "https://www.dacar.sn",
    sector: "Senegal · Araç pazaryeri",
    sectorEn: "Senegal · Car marketplace",
    image: "/portfolio/images/dacar-web1.png",
    builtWith: "React, Vite & Supabase ile geliştirildi",
  },
  {
    name: "Marocar",
    domain: "marocar.ma",
    url: "https://www.marocar.ma",
    sector: "Fas · Araç pazaryeri",
    sectorEn: "Morocco · Car marketplace",
    image: "/portfolio/images/marocar-web1.png",
    builtWith: "React, Vite & Supabase ile geliştirildi",
  },
  {
    name: "AvtoUzbek",
    domain: "avtouzbek.uz",
    url: "https://www.avtouzbek.uz",
    sector: "Özbekistan · Araç pazaryeri",
    sectorEn: "Uzbekistan · Car marketplace",
    image: "/portfolio/images/avtouzbek-web1.png",
    builtWith: "React, Vite & Supabase ile geliştirildi",
  },
  {
    name: "BharatKaar",
    domain: "bharatkaar.com",
    url: "https://www.bharatkaar.com",
    sector: "Hindistan · Araç pazaryeri",
    sectorEn: "India · Car marketplace",
    image: "/portfolio/images/bharatkaar-web1.png",
    builtWith: "React, Vite & Supabase ile geliştirildi",
  },
  {
    name: "NaijaCar",
    domain: "naijacar.ng",
    url: "https://www.naijacar.ng",
    sector: "Nijerya · Araç pazaryeri",
    sectorEn: "Nigeria · Car marketplace",
    image: "/portfolio/images/naijacar-web1.png",
    builtWith: "React, Vite & Supabase ile geliştirildi",
  },
  {
    name: "AvtoBozor",
    domain: "avtobozor.app",
    url: "https://www.avtobozor.app",
    sector: "Özbekistan · Araç pazaryeri",
    sectorEn: "Uzbekistan · Car marketplace",
    image: "/portfolio/images/avtobozor-web1.png",
    builtWith: "React, Vite & Supabase ile geliştirildi",
  },
  {
    name: "Satılık",
    domain: "satilikapp.com",
    url: "https://satilikapp.com",
    sector: "Türkiye · İlan platformu",
    sectorEn: "Türkiye · Classifieds",
    image: "/portfolio/images/satilik-web1.png",
    builtWith: "React, Vite & Supabase ile geliştirildi",
  },
  {
    name: "Heybe",
    domain: "heybeapp.com",
    url: "https://heybeapp.com",
    sector: "Eğitim · Mobil uygulama sitesi",
    sectorEn: "Education · App website",
    image: "/portfolio/images/heybe-web1.png",
    builtWith: "Astro ile geliştirildi",
  },
  {
    name: "Kortbul",
    domain: "kortbul.com.tr",
    url: "https://kortbul.com.tr/",
    sector: "Spor · Kort rezervasyonu",
    sectorEn: "Sports · Court booking",
    image: "/portfolio/images/kortbul-web1.png",
    builtWith: "React & TypeScript ile geliştirildi",
  },
  {
    name: "İnda Otomasyon",
    domain: "indaautomation.com",
    url: "https://www.indaautomation.com/",
    sector: "Endüstriyel otomasyon",
    sectorEn: "Industrial automation",
    image: "/portfolio/images/inda1.png",
    builtWith: "React & TypeScript ile geliştirildi",
  },
  {
    name: "Karaca Yapı Market",
    domain: "karacayapimarket.com",
    url: "https://karacayapimarket.com",
    sector: "Yapı malzemesi · E-ticaret",
    sectorEn: "Building materials · E-commerce",
    image: "/portfolio/images/karacayapimarket1.png",
    builtWith: "React & TypeScript ile geliştirildi",
  },
  {
    name: "Karaca Yapı Dekorasyon",
    domain: "karacayapidekorasyon.com",
    url: "https://karacayapidekorasyon.com",
    sector: "Dekorasyon & tadilat",
    sectorEn: "Interior design & renovation",
    image: "/portfolio/images/karacayapidekorasyon1.png",
    builtWith: "React & TypeScript ile geliştirildi",
  },
  {
    name: "Kodlasa",
    domain: "kodlasa.com",
    url: "https://kodlasa.com",
    sector: "Yazılım ajansı",
    sectorEn: "Software agency",
    image: "/portfolio/images/kodlasa-store1.png",
    builtWith: "React, Vite & TypeScript ile geliştirildi",
  },
  {
    name: "Appcarfy",
    domain: "appcarfy.com",
    url: "https://appcarfy.com",
    sector: "Ürün stüdyosu",
    sectorEn: "Product studio",
    image: "/portfolio/images/appcarfy1.png",
    builtWith: "Next.js & TypeScript ile geliştirildi",
  },
  {
    name: "Tiryaki Yazılım",
    domain: "tiryakiyazilim.com",
    url: "https://tiryakiyazilim.com/",
    sector: "Yazılım şirketi",
    sectorEn: "Software company",
    image: "/portfolio/images/tiryakiyazilim1.png",
    builtWith: "React, Vite & TypeScript ile geliştirildi",
  },
];

const LiveSites = () => {
  const lang = useLang();
  const t = useT();
  return (
    <Section id="sites" tone="surface">
      <motion.div
        className="mx-auto max-w-6xl"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <SectionHeading
          eyebrow={t(`${sites.length} site yayında`, `${sites.length} sites live`)}
          title={t("Şu an canlı olan", "Live")}
          highlight={t("web siteleri", "websites")}
          description={t(
            "Müşterilerim ve kendi markalarım için geliştirdiğim, kendi alan adında yayında olan siteler. Tıklayıp inceleyebilirsiniz.",
            "Sites I've built for clients and my own brands, live on their own domains. Click through to explore.",
          )}
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sites.map((site) => (
            <motion.a
              key={site.domain}
              variants={fadeUp}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="card-surface card-lift group flex flex-col overflow-hidden"
            >
              <div className="flex items-center gap-2 border-b border-border bg-surface px-3 py-2">
                <span className="flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-foreground/15" />
                  <span className="h-2 w-2 rounded-full bg-foreground/15" />
                  <span className="h-2 w-2 rounded-full bg-foreground/15" />
                </span>
                <span className="flex min-w-0 flex-1 items-center gap-1.5 rounded-md bg-card px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                  <Globe className="h-3 w-3 shrink-0" />
                  <span className="truncate">{site.domain}</span>
                </span>
              </div>
              <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                <PortfolioImage
                  src={site.image}
                  alt={t(`${site.name} — ${site.domain} ana sayfası`, `${site.name} — ${site.domain} homepage`)}
                  className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  fallback={<ProjectPlaceholder title={site.name} icon={Globe} />}
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate font-bold tracking-tight text-foreground">{site.name}</h3>
                    <p className="truncate text-xs text-muted-foreground">{lang === "en" ? site.sectorEn : site.sector}</p>
                  </div>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
                <p className="mt-auto pt-4 text-xs font-semibold text-primary">{builtWithFor(site.builtWith, lang)}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </Section>
  );
};

export default LiveSites;
