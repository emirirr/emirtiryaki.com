import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { builtWithLine, categoryLabel, localizeProject } from "@/lib/projectDisplay";
import { useLang, useT } from "@/i18n/lang";
import { trackEvent } from "@/lib/analytics";
import { PortfolioImage, ProjectPlaceholder } from "@/components/PortfolioImage";
import { Section, SectionHeading } from "@/components/SectionHeading";
import { hasProjectVisitLink, navigateOrOpenProjectLink } from "@/lib/portfolioLink";

const FEATURED = projects
  .filter((p) => p.featured === true)
  .sort((a, b) => (a.featuredOrder ?? 999) - (b.featuredOrder ?? 999) || a.id - b.id)
  .slice(0, 6);
const SHOWCASE = FEATURED.length > 0 ? FEATURED : projects.slice(0, 6);

/** Ana sayfa vitrini için daha temsili kapak görselleri. */
const COVER_OVERRIDE: Record<string, string> = {
  "kortbul-expo": "/portfolio/images/kortbul-web1.png",
};

/** Listede gösterilen kısa ad (uzun başlıkların “—” sonrası kesilir). */
const shortTitle = (title: string) => title.split(" — ")[0];

const domainOf = (link: string) => {
  if (link.startsWith("/")) return "emirtiryaki.com" + link;
  try {
    return new URL(link).host.replace(/^www\./, "");
  } catch {
    return link;
  }
};

const CYCLE_MS = 6500;

export function FeaturedProjects() {
  const navigate = useNavigate();
  const lang = useLang();
  const t = useT();
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  // Yalnız bölüm ekrandayken otomatik ilerle
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.35,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = inView && !paused && !reduceMotion;

  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => setActive((i) => (i + 1) % SHOWCASE.length), CYCLE_MS);
    return () => window.clearTimeout(t);
  }, [active, running]);

  // Telefonda yatay şeritte seçili sekmeyi görünür tut (sayfayı kaydırmadan)
  useEffect(() => {
    const strip = tabsRef.current;
    const tab = strip?.children[active] as HTMLElement | undefined;
    if (!strip || !tab || strip.scrollWidth <= strip.clientWidth) return;
    strip.scrollTo({ left: tab.offsetLeft - 16, behavior: reduceMotion ? "auto" : "smooth" });
  }, [active, reduceMotion]);

  const select = useCallback((i: number) => setActive(i), []);

  const project = SHOWCASE[active];
  const loc = localizeProject(project, lang);
  const cover = COVER_OVERRIDE[project.imageKey] ?? project.additionalImages?.[0];
  const canVisit = hasProjectVisitLink(project.link);
  const open = () => {
    if (!canVisit) return;
    trackEvent(`proje-ac/${project.imageKey}`);
    navigateOrOpenProjectLink(project.link, navigate);
  };

  return (
    <Section id="projects" tone="surface">
      <motion.div
        className="mx-auto max-w-6xl"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            align="left"
            className="mb-0 md:mb-0"
            eyebrow={t("Seçilmiş işler", "Selected work")}
            title={t("Öne çıkan", "Featured")}
            highlight={t("projeler", "projects")}
            description={t(
              "Gerçek müşteri ihtiyaçlarından doğan, bugün canlıda çalışan ürünler: rezervasyon platformu, araç pazaryeri, klinik yönetimi, kurye takibi ve endüstriyel otomasyon.",
              "Products born from real client needs and running live today: a booking platform, a car marketplace, clinic management, courier tracking and industrial automation.",
            )}
          />
          <motion.button
            variants={fadeUp}
            type="button"
            onClick={() => navigate("/projects")}
            className="group inline-flex h-11 shrink-0 items-center gap-1.5 rounded-lg border border-border bg-card px-5 text-sm font-semibold text-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            {t("Tüm projeler", "All projects")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </motion.button>
        </div>

        <motion.div
          ref={boxRef}
          variants={fadeUp}
          className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.7fr)] lg:gap-8"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          {/* Proje listesi */}
          <div
            ref={tabsRef}
            className="relative -mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] lg:mx-0 lg:flex-col lg:gap-2.5 lg:overflow-visible lg:px-0 lg:pb-0"
            role="tablist"
            aria-label={t("Öne çıkan projeler", "Featured projects")}
          >
            {SHOWCASE.map((p, i) => {
              const isActive = i === active;
              const Icon = p.icon;
              return (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="featured-preview"
                  onClick={() => select(i)}
                  className={cn(
                    "relative w-60 shrink-0 snap-start overflow-hidden rounded-xl border bg-card px-4 py-3.5 text-left transition-all duration-300 lg:w-full",
                    isActive
                      ? "border-primary/40 shadow-[var(--shadow-lift)]"
                      : "border-border hover:border-primary/25",
                  )}
                >
                  <span className="flex items-center gap-3.5">
                    <span
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors",
                        isActive ? "bg-primary text-primary-foreground" : "bg-primary-soft text-primary",
                      )}
                    >
                      <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-[15px] font-bold tracking-tight text-foreground">
                        {shortTitle(localizeProject(p, lang).title)}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {categoryLabel(p.category, lang)}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "ml-auto hidden text-xs font-bold tabular-nums lg:block",
                        isActive ? "text-primary" : "text-muted-foreground/50",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </span>
                  {/* İlerleme çubuğu */}
                  <span className="absolute inset-x-0 bottom-0 h-[3px] bg-transparent" aria-hidden>
                    {isActive && (
                      <span
                        key={`${active}-${running}`}
                        className={cn("block h-full bg-primary", running ? "fx-progress" : "w-full")}
                        style={{ animationDuration: `${CYCLE_MS}ms` }}
                      />
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Önizleme */}
          <div id="featured-preview" role="tabpanel" className="card-surface min-w-0 overflow-hidden">
            {/* Tarayıcı çubuğu */}
            <div className="flex items-center gap-1.5 border-b border-border bg-surface px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 flex min-w-0 flex-1 items-center gap-2 rounded-md bg-background px-3 py-1 text-[11px] font-medium text-muted-foreground">
                <span className="truncate">{domainOf(project.link)}</span>
                <span className="ml-auto flex shrink-0 items-center gap-1 text-success">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />
                  {t("canlı", "live")}
                </span>
              </span>
            </div>

            <button
              type="button"
              onClick={open}
              disabled={!canVisit}
              aria-label={`${loc.title} — ${t("aç", "open")}`}
              className="group relative block aspect-[16/9] w-full overflow-hidden bg-surface text-left"
            >
              <AnimatePresence initial={false}>
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  {cover ? (
                    <PortfolioImage
                      src={cover}
                      alt={`${loc.title} — ${t("önizleme", "preview")}`}
                      className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                      fallback={<ProjectPlaceholder title={loc.title} icon={project.icon} />}
                    />
                  ) : (
                    <ProjectPlaceholder title={loc.title} icon={project.icon} />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="border-t border-border p-6 sm:p-7"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <span className="eyebrow">{categoryLabel(project.category, lang)}</span>
                    <h3 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-[1.7rem]">
                      {shortTitle(loc.title)}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={t("Kaynak kod", "Source code")}
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
                      >
                        <GithubIcon className="h-4 w-4" />
                      </a>
                    )}
                    {canVisit && (
                      <button
                        type="button"
                        onClick={open}
                        className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-[0_8px_24px_-10px_hsl(var(--primary)/0.7)] transition-transform hover:-translate-y-0.5"
                      >
                        {project.link.startsWith("/")
                          ? t("Vaka çalışması", "Case study")
                          : t("Canlı siteyi aç", "Open live site")}
                        <ArrowUpRight className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>

                <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
                  {loc.description}
                </p>

                {loc.features.length > 0 && (
                  <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                    {loc.features.slice(0, 4).map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm font-medium text-foreground/85">
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                          <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
                        </span>
                        {f}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-6 flex items-center justify-between gap-4 border-t border-border pt-4">
                  <p className="text-xs font-semibold text-primary">{builtWithLine(project.technologies, 3, lang)}</p>
                  <span className="flex shrink-0 gap-1.5">
                    {SHOWCASE.map((p, i) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => select(i)}
                        aria-label={t(`${shortTitle(p.title)} projesine geç`, `Show ${shortTitle(localizeProject(p, lang).title)}`)}
                        className={cn(
                          "h-1.5 rounded-full transition-all duration-300",
                          i === active ? "w-6 bg-primary" : "w-1.5 bg-border hover:bg-muted-foreground/40",
                        )}
                      />
                    ))}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
}

export default FeaturedProjects;
