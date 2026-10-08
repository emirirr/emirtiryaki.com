import { motion } from "framer-motion";
import { ArrowUpRight, Globe } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { Section, SectionHeading } from "@/components/SectionHeading";
import { PortfolioImage, ProjectPlaceholder } from "@/components/PortfolioImage";
import { builtWithFor, useLang, useT } from "@/i18n/lang";
import { trackEvent } from "@/lib/analytics";
import { sites } from "@/data/liveSites";

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
              onClick={() => trackEvent(`site-ac/${site.domain}`)}
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
