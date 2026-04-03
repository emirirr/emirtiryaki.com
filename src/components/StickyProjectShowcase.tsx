import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import { projects } from "@/data/projects";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { isMobileAppProject } from "@/lib/projectDisplay";
import { IPhone17ProFrame } from "@/components/IPhone17ProFrame";
import { PortfolioImage } from "@/components/PortfolioImage";
import {
  hasProjectVisitLink,
  navigateOrOpenProjectLink,
} from "@/lib/portfolioLink";
import { resolvePortfolioGallerySrc } from "@/lib/portfolioBundled";

const FEATURED = projects.filter((p) => p.featured === true).slice(0, 6);
const SHOWCASE = FEATURED.length > 0 ? FEATURED : projects.slice(0, 6);

function ProjectCard({
  project,
  index,
  total,
  scrollYProgress,
}: {
  project: (typeof projects)[number];
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const navigate = useNavigate();
  const Icon = project.icon;
  const gallery = project.additionalImages ?? [];
  const isMobile = isMobileAppProject(project);
  const stickyPhoneSize: "md" | "lg" = gallery.length >= 3 ? "md" : "lg";
  const segment = 1 / total;
  const start = index * segment;
  const end = start + segment;
  const progress = useTransform(scrollYProgress, [start, end], [0, 1]);

  const scale = useTransform(progress, [0, 1], [1, 0.94]);
  const y = useTransform(progress, [0, 1], [0, -12]);
  const dim = useTransform(progress, [0, 0.65, 1], [0, 0, 0.45]);

  return (
    <div
      className="sticky top-24 z-[1] flex min-h-[82vh] items-center justify-center px-2 py-8 sm:px-4"
      style={{ zIndex: index + 1 }}
    >
      <motion.article
        style={{ scale, y }}
        className={cn(
          "glass-strong relative w-full max-w-4xl overflow-hidden rounded-[2rem] border border-white/10",
          "shadow-[0_24px_80px_rgba(0,0,0,0.45)] [contain:layout_paint]",
        )}
      >
        <motion.div
          className="pointer-events-none absolute inset-0 bg-background/40"
          style={{ opacity: dim }}
        />
        <div className="grid gap-0 md:grid-cols-[1.1fr_0.9fr]">
          <div className="relative flex min-h-[220px] items-center justify-center overflow-hidden bg-gradient-to-br from-primary/20 via-background/40 to-accent/15 p-6 md:min-h-[320px] md:p-8">
            {isMobile && gallery.length > 0 && (
              <div className="relative z-[1] flex max-w-full gap-3 overflow-x-auto px-1 py-2 [scrollbar-width:thin] snap-x snap-mandatory md:gap-5">
                {gallery.map((src, i) => (
                  <IPhone17ProFrame
                    key={src}
                    size={stickyPhoneSize}
                    src={resolvePortfolioGallerySrc(project.imageKey, src, i)}
                    alt={`${project.title} — ekran ${i + 1}`}
                    className="snap-center shrink-0"
                  />
                ))}
              </div>
            )}
            {isMobile && gallery.length === 0 && (
              <IPhone17ProFrame
                size="lg"
                fallbackIcon={Icon}
                className="relative z-[1]"
              />
            )}
            {!isMobile && gallery.length === 1 && (
              <>
                <PortfolioImage
                  src={resolvePortfolioGallerySrc(
                    project.imageKey,
                    gallery[0],
                    0,
                  )}
                  alt={`${project.title} — ekran görüntüsü`}
                  className="absolute inset-0 h-full w-full object-cover object-top"
                  fetchPriority="low"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/20 to-transparent" />
              </>
            )}
            {!isMobile && gallery.length > 1 && (
              <div className="relative z-[1] flex h-full min-h-[200px] w-full gap-3 overflow-x-auto p-2 snap-x snap-mandatory md:min-h-[260px] md:gap-4">
                {gallery.map((src, i) => (
                  <div
                    key={src}
                    className="relative h-full min-h-[180px] w-[42%] min-w-[160px] shrink-0 snap-center overflow-hidden rounded-2xl border border-white/10 sm:min-w-[200px]"
                  >
                    <PortfolioImage
                      src={resolvePortfolioGallerySrc(
                        project.imageKey,
                        src,
                        i,
                      )}
                      alt={`${project.title} — ekran ${i + 1}`}
                      className="h-full w-full object-cover object-top"
                      fetchPriority="low"
                    />
                  </div>
                ))}
              </div>
            )}
            {!isMobile && gallery.length === 0 && (
              <>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_hsl(var(--primary)/0.35),transparent_55%)]" />
                <Icon className="relative h-20 w-20 text-primary md:h-28 md:w-28" strokeWidth={1.25} />
              </>
            )}
            <span className="absolute left-6 top-6 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-md">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>
          <div className="flex flex-col justify-center p-8 md:p-10">
            <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
              {project.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
              {project.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.technologies.slice(0, 5).map((t) => (
                <Badge
                  key={t}
                  variant="secondary"
                  className="rounded-lg border border-white/5 bg-white/[0.06] px-2.5 py-0.5 text-[11px] font-medium"
                >
                  {t}
                </Badge>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {project.github && (
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl border-white/15 bg-white/[0.04] hover:bg-white/[0.08]"
                  data-cursor="pointer"
                  onClick={() =>
                    window.open(project.github!, "_blank", "noopener,noreferrer")
                  }
                >
                  <Github className="mr-2 h-4 w-4" />
                  Kaynak
                </Button>
              )}
              {hasProjectVisitLink(project.link) && (
                <Button
                  size="sm"
                  className="rounded-xl hero-gradient"
                  data-cursor="pointer"
                  onClick={() =>
                    navigateOrOpenProjectLink(project.link, navigate)
                  }
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  {project.link.startsWith("/") ? "Detay" : "Canlı / detay"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export function StickyProjectShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
    layoutEffect: false,
  });

  return (
    <section id="projects" className="relative px-4 py-16 sm:px-6">
      <motion.div
        className="container relative mx-auto max-w-6xl"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        <motion.div variants={fadeUp} className="mb-4 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Seçilmiş işler
          </p>
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            <span className="text-gradient">Sticky scroll</span>
            <span className="text-foreground"> deneyimi</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Öne çıkan projeler (featured). Kaydırdıkça kartlar üst üste biniyor; tam liste için
            Projeler sayfasına geçin.
          </p>
        </motion.div>
      </motion.div>

      <div ref={containerRef} className="relative pb-32 pt-8">
        {SHOWCASE.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            total={SHOWCASE.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
