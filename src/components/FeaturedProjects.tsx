import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { PortfolioImage } from "@/components/PortfolioImage";
import {
  hasProjectVisitLink,
  navigateOrOpenProjectLink,
} from "@/lib/portfolioLink";

const FEATURED = projects
  .filter((p) => p.featured === true)
  .sort(
    (a, b) => (a.featuredOrder ?? 999) - (b.featuredOrder ?? 999) || a.id - b.id,
  )
  .slice(0, 6);
const SHOWCASE = FEATURED.length > 0 ? FEATURED : projects.slice(0, 6);

export function FeaturedProjects() {
  const navigate = useNavigate();

  return (
    <section id="projects" className="relative px-4 py-24 sm:px-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-1/4 h-[360px] bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.06),transparent_65%)]" />

      <motion.div
        className="container relative mx-auto max-w-6xl"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.div variants={fadeUp} className="mb-14 text-center">
          <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
            // seçilmiş işler
          </p>
          <h2 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
            <span className="text-gradient">Öne çıkan</span>
            <span className="text-foreground"> projeler</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Her biri farklı bir problemi ve çözümünü anlatan seçili işler — web, mobil ve kurumsal.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {SHOWCASE.map((project, index) => {
            const Icon = project.icon;
            const cover = project.additionalImages?.[0];
            return (
              <motion.article
                key={project.id}
                variants={fadeUp}
                whileHover={{ y: -5, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } }}
                className="glass-strong group flex flex-col overflow-hidden rounded-3xl border border-white/10 transition-shadow duration-300 hover:border-primary/25 hover:shadow-[0_28px_70px_-28px_hsl(var(--primary)/0.4)]"
              >
                <div className="relative h-60 overflow-hidden bg-gradient-to-br from-primary/15 via-background/50 to-accent/10">
                  {cover ? (
                    <>
                      <PortfolioImage
                        src={cover}
                        alt={`${project.title} — önizleme`}
                        className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                        fetchPriority="low"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                    </>
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Icon className="h-16 w-16 text-primary/80" strokeWidth={1.25} />
                    </div>
                  )}
                  <span className="absolute left-4 top-4 rounded-lg border border-white/10 bg-black/35 px-2.5 py-1 font-mono text-[11px] font-medium text-muted-foreground backdrop-blur-md">
                    {String(index + 1).padStart(2, "0")} / {String(SHOWCASE.length).padStart(2, "0")}
                  </span>
                  <Badge
                    variant="secondary"
                    className="absolute right-4 top-4 rounded-lg border border-white/10 bg-black/35 text-[10px] font-medium text-foreground backdrop-blur-md"
                  >
                    {project.category}
                  </Badge>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-semibold tracking-tight text-foreground">
                    {project.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map((t) => (
                      <Badge
                        key={t}
                        variant="secondary"
                        className="rounded-lg border border-white/5 bg-white/[0.06] px-2.5 py-0.5 text-[11px] font-medium"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-auto flex flex-wrap gap-3 pt-6">
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
                        onClick={() => navigateOrOpenProjectLink(project.link, navigate)}
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        {project.link.startsWith("/") ? "Detay" : "Canlı / detay"}
                      </Button>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div variants={fadeUp} className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            variant="outline"
            className="min-w-[200px] rounded-2xl border-white/15 bg-white/[0.03] px-8 backdrop-blur-md hover:bg-white/[0.07]"
            data-cursor="pointer"
            onClick={() => window.open("https://github.com/emirirr", "_blank", "noopener,noreferrer")}
          >
            <Github className="mr-2 h-5 w-5" />
            GitHub
          </Button>
          <Button
            size="lg"
            className="min-w-[200px] rounded-2xl px-8 hero-gradient shadow-lg shadow-primary/15"
            data-cursor="pointer"
            onClick={() => navigate("/projects")}
          >
            Tüm projeleri gör
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default FeaturedProjects;
