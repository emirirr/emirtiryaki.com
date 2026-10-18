import { motion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { Section, SectionHeading } from "@/components/SectionHeading";
import { AppleLogo, GooglePlayLogo, StoreBadge } from "@/components/StoreBadge";
import { builtWithFor, useLang, useT } from "@/i18n/lang";
import { apps, upcoming } from "@/data/apps";

const AppShowcase = () => {
  const lang = useLang();
  const t = useT();
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
          eyebrow={t("Mağazada yayında", "Live in stores")}
          title={t("Yayınlanmış", "Published")}
          highlight={t("uygulamalar", "apps")}
          description={t(
            "Fikirden mağaza yayınına kadar geliştirdiğim, bugün App Store ve Google Play'de indirilebilen uygulamalar.",
            "Apps I took from idea to store release, available today on the App Store and Google Play.",
          )}
        >
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground">
              <AppleLogo className="h-4 w-4" />
              {t(`App Store'da ${iosCount} uygulama`, `${iosCount} apps on the App Store`)}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground">
              <GooglePlayLogo className="h-4 w-4" />
              {t(`Google Play'de ${androidCount} uygulama`, `${androidCount} apps on Google Play`)}
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
                  alt={t(`${app.name} uygulama simgesi`, `${app.name} app icon`)}
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
                    {lang === "en" ? app.en.category : app.category}
                  </p>
                </div>
              </div>

              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                {lang === "en" ? app.en.tagline : app.tagline}
              </p>

              <p className="mt-4 text-xs font-semibold text-primary">
                {builtWithFor(app.builtWith, lang)}
                {app.client && (
                  <span className="font-medium text-muted-foreground">
                    {" "}
                    · {lang === "en" ? app.en.client : app.client}
                  </span>
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
            {t("Yakında mağazada", "Coming to stores")}
          </span>
          <h3 className="mt-3 text-2xl font-extrabold tracking-tight text-foreground">
            {t("Yayına hazırlanan uygulamalar", "Apps getting ready for launch")}
          </h3>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            {t(
              "Geliştirmesi tamamlandı, mağaza incelemesi bekleniyor. Web siteleri şimdiden yayında.",
              "Development is done and store review is pending. Their websites are already live.",
            )}
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
                  alt={t(`${app.name} uygulama simgesi`, `${app.name} app icon`)}
                  width={56}
                  height={56}
                  loading="lazy"
                  decoding="async"
                  className="h-14 w-14 shrink-0 rounded-[22%] border border-border bg-white object-cover"
                />
                <div className="min-w-0">
                  <h4 className="truncate font-bold tracking-tight text-foreground">{app.name}</h4>
                  <p className="truncate text-xs font-medium text-muted-foreground">{lang === "en" ? app.en.category : app.category}</p>
                </div>
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{lang === "en" ? app.en.tagline : app.tagline}</p>
              <p className="mt-4 text-xs font-semibold text-primary">{builtWithFor(app.builtWith, lang)}</p>
              <div className="mt-4 flex items-center justify-between gap-2 border-t border-border pt-4">
                <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <AppleLogo className="h-3.5 w-3.5" />
                  <GooglePlayLogo className="h-3.5 w-3.5" />
                  {t("Yakında", "Soon")}
                </span>
                {app.website ? (
                  <a
                    href={app.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                  >
                    {t("Web sitesi", "Website")}
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                ) : (
                  <span className="text-xs text-muted-foreground">{t("Site hazırlanıyor", "Site coming soon")}</span>
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
