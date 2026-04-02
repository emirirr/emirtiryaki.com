import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Github,
  ExternalLink,
  Eye,
  ArrowLeft,
  Clock,
  Users as TeamIcon,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { projects, categories } from "@/data/projects";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { isMobileAppProject } from "@/lib/projectDisplay";
import { IPhone17ProFrame } from "@/components/IPhone17ProFrame";
import { PortfolioImage } from "@/components/PortfolioImage";
import {
  GITHUB_USERNAME,
  fetchGitHubReposAll,
} from "@/lib/githubApi";
import { mergePortfolioWithGitHub } from "@/lib/portfolioGithubMerge";

const ProjectsPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [searchQuery, setSearchQuery] = useState("");

  const ghReposQ = useQuery({
    queryKey: ["github-repos-all", GITHUB_USERNAME],
    queryFn: fetchGitHubReposAll,
    staleTime: 15 * 60 * 1000,
    retry: 1,
  });

  const allProjects = useMemo(
    () => mergePortfolioWithGitHub(projects, ghReposQ.data),
    [ghReposQ.data],
  );

  const filteredProjects = useMemo(() => {
    const byCat =
      selectedCategory === "Tümü"
        ? allProjects
        : allProjects.filter((p) => p.category === selectedCategory);
    const q = searchQuery.trim().toLowerCase();
    if (!q) return byCat;
    return byCat.filter((p) => {
      const hay = [p.title, p.description, ...p.technologies].join(" ").toLowerCase();
      return hay.includes(q);
    });
  }, [allProjects, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-lg backdrop-saturate-125">
        <div className="container mx-auto flex items-center justify-between px-4 py-4 sm:px-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="gap-2 rounded-xl text-muted-foreground hover:bg-white/[0.06] hover:text-foreground"
            data-cursor="pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Ana sayfa
          </Button>
          <h1 className="text-lg font-semibold tracking-tight sm:text-xl">
            <span className="text-gradient">Projeler</span>
          </h1>
          <Button
            variant="ghost"
            size="sm"
            className="rounded-xl text-muted-foreground hover:bg-white/[0.06]"
            data-cursor="pointer"
            asChild
          >
            <a href="/#contact">İletişim</a>
          </Button>
        </div>
      </header>

      <div className="pointer-events-none fixed inset-x-0 top-0 h-[40vh] bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,hsl(var(--primary)/0.12),transparent)]" />

      <main className="container relative mx-auto px-4 py-12 sm:px-6">
        <motion.div
          className="mb-12 text-center"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={fadeUp}
            className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground"
          >
            Portföy
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="text-4xl font-semibold tracking-tight md:text-5xl"
          >
            <span className="text-gradient">Tüm </span>
            <span className="text-foreground">projeler</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground"
          >
            Kullandığım teknolojiler ve teslim süreleri. Arayın veya kategori seçin.
          </motion.p>
          {ghReposQ.isError && (
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-4 max-w-xl rounded-2xl border border-amber-500/25 bg-amber-500/10 px-4 py-3 text-center text-sm text-amber-200/90"
            >
              GitHub listesi yüklenemedi; yalnızca sitedeki sabit projeler gösteriliyor.
              Oran sınırı için{" "}
              <code className="rounded bg-black/30 px-1.5 py-0.5 text-xs">
                VITE_GITHUB_TOKEN
              </code>{" "}
              tanımlayın.
            </motion.p>
          )}
          {ghReposQ.isLoading && (
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-4 text-center text-sm text-muted-foreground"
            >
              GitHub repoları yükleniyor…
            </motion.p>
          )}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mx-auto mb-8 max-w-md px-1"
        >
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Proje adı veya teknoloji ara…"
              className="rounded-xl border-white/10 bg-white/[0.04] pl-10 placeholder:text-muted-foreground/70"
              aria-label="Projelerde ara"
            />
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-12 flex justify-center"
        >
          <div className="glass inline-flex flex-wrap justify-center gap-1 rounded-2xl border border-white/10 p-1.5">
            {categories.map((category) => (
              <Button
                key={category}
                variant="ghost"
                size="sm"
                onClick={() => setSelectedCategory(category)}
                data-cursor="pointer"
                className={cn(
                  "rounded-xl px-4 transition-all duration-300",
                  selectedCategory === category
                    ? "bg-white/[0.1] text-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-white/[0.05] hover:text-foreground",
                )}
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {filteredProjects.length === 0 && (
            <p className="col-span-full text-center text-muted-foreground">
              Bu filtre / arama için sonuç yok. Aramayı temizleyip tekrar deneyin.
            </p>
          )}
          {filteredProjects.map((project) => {
            const IconComponent = project.icon;
            const gallery = project.additionalImages ?? [];
            const isMobile = isMobileAppProject(project);
            const phoneSize: "sm" | "md" = gallery.length >= 3 ? "sm" : "md";
            return (
              <motion.div
                key={project.id}
                variants={fadeUp}
                className="[content-visibility:auto] [contain-intrinsic-size:420px]"
              >
                <Card className="glass-strong group h-full overflow-hidden rounded-3xl border border-white/10 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_24px_60px_-20px_hsl(var(--primary)/0.25)]">
                  <div className="relative overflow-hidden">
                    <div
                      className={cn(
                        "relative flex items-center justify-center bg-gradient-to-br from-primary/20 via-background/50 to-accent/15",
                        gallery.length > 0
                          ? isMobile
                            ? "min-h-[240px] py-6 sm:min-h-[260px] sm:py-8"
                            : gallery.length === 1
                              ? "h-48"
                              : "min-h-[200px] py-5 sm:min-h-[220px]"
                          : isMobile
                            ? "min-h-[260px] py-8 sm:min-h-[280px] sm:py-10"
                            : "h-48",
                      )}
                    >
                      {gallery.length > 0 && isMobile && (
                        <div
                          className={cn(
                            "flex w-full items-stretch justify-start gap-4 overflow-x-auto px-4 py-1 [scrollbar-width:thin] sm:justify-center",
                            "snap-x snap-mandatory",
                          )}
                        >
                          {gallery.map((src, i) => (
                            <IPhone17ProFrame
                              key={src}
                              size={phoneSize}
                              src={src}
                              alt={`${project.title} — ekran ${i + 1}`}
                              className="snap-center"
                            />
                          ))}
                        </div>
                      )}
                      {gallery.length > 0 && !isMobile && gallery.length === 1 && (
                        <>
                          <PortfolioImage
                            src={gallery[0]}
                            alt={`${project.title} — ekran görüntüsü`}
                            className="absolute inset-0 h-full w-full"
                            fetchPriority="low"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                        </>
                      )}
                      {gallery.length > 1 && !isMobile && (
                        <div
                          className={cn(
                            "flex w-full items-stretch justify-start gap-4 overflow-x-auto px-4 py-1 [scrollbar-width:thin] sm:justify-center",
                            "snap-x snap-mandatory",
                          )}
                        >
                          {gallery.map((src, i) => (
                            <div
                              key={src}
                              className="relative h-[11rem] w-[6.25rem] shrink-0 snap-center overflow-hidden rounded-2xl border border-white/15 shadow-md sm:h-[12.5rem] sm:w-[7rem]"
                            >
                              <PortfolioImage
                                src={src}
                                alt={`${project.title} — ekran ${i + 1}`}
                                className="h-full w-full"
                                fetchPriority="low"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                      {gallery.length === 0 && isMobile && (
                        <IPhone17ProFrame size="md" fallbackIcon={IconComponent} />
                      )}
                      {gallery.length === 0 && !isMobile && (
                        <IconComponent className="relative h-16 w-16 text-primary/80" strokeWidth={1.25} />
                      )}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute right-4 top-4 flex translate-y-2 gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      {project.github && (
                        <Button
                          size="sm"
                          variant="secondary"
                          className="h-9 w-9 rounded-xl border border-white/10 bg-black/40 p-0 backdrop-blur-md"
                          data-cursor="pointer"
                          onClick={() =>
                            window.open(project.github!, "_blank", "noopener,noreferrer")
                          }
                        >
                          <Github className="h-4 w-4" />
                        </Button>
                      )}
                      {project.link !== "https://emirtiryaki.com" && (
                        <Button
                          size="sm"
                          variant="secondary"
                          className="h-9 w-9 rounded-xl border border-white/10 bg-black/40 p-0 backdrop-blur-md"
                          data-cursor="pointer"
                          onClick={() =>
                            window.open(project.link, "_blank", "noopener,noreferrer")
                          }
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
                      <Badge
                        variant="secondary"
                        className="rounded-lg border border-white/10 bg-black/35 text-[10px] font-medium backdrop-blur-md"
                      >
                        {project.category}
                      </Badge>
                      {project.imageKey.startsWith("gh-") && (
                        <Badge
                          variant="outline"
                          className="rounded-lg border-primary/30 bg-primary/10 text-[10px] font-medium text-primary backdrop-blur-md"
                        >
                          GitHub
                        </Badge>
                      )}
                    </div>
                  </div>

                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-semibold tracking-tight">
                      {project.title}
                    </CardTitle>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {project.duration}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <TeamIcon className="h-3.5 w-3.5" />
                        {project.teamSize}
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                      {project.description}
                    </p>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="rounded-lg border border-white/5 bg-white/[0.06] px-2 py-0.5 text-[11px] font-medium"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      {project.github && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 rounded-xl border-white/15 bg-white/[0.03] hover:bg-white/[0.08]"
                          data-cursor="pointer"
                          onClick={() =>
                            window.open(project.github!, "_blank", "noopener,noreferrer")
                          }
                        >
                          <Github className="mr-2 h-4 w-4" />
                          Kod
                        </Button>
                      )}
                      {project.link !== "https://emirtiryaki.com" && (
                        <Button
                          size="sm"
                          className={cn(
                            "rounded-xl hero-gradient",
                            project.github ? "flex-1" : "w-full",
                          )}
                          data-cursor="pointer"
                          onClick={() =>
                            window.open(project.link, "_blank", "noopener,noreferrer")
                          }
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          Demo
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="glass-strong rounded-3xl border border-white/10 p-8 md:p-10">
            <div className="grid gap-8 text-center md:grid-cols-4">
              <div>
                <div className="text-3xl font-semibold tabular-nums text-gradient md:text-4xl">
                  {allProjects.length}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">Toplam proje</div>
              </div>
              <div>
                <div className="text-3xl font-semibold tabular-nums text-gradient md:text-4xl">
                  {allProjects.filter((p) => p.category === "Web Uygulaması").length}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">Web</div>
              </div>
              <div>
                <div className="text-3xl font-semibold tabular-nums text-gradient md:text-4xl">
                  {allProjects.filter((p) => p.category === "Mobil Uygulama").length}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">Mobil</div>
              </div>
              <div>
                <div className="text-3xl font-semibold tabular-nums text-gradient md:text-4xl">
                  {allProjects.filter((p) => p.category === "E-ticaret").length}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">E-ticaret</div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-16 text-center">
          <p className="mb-6 text-muted-foreground">
            Güncel kod ve sürümler için GitHub profilime göz atın.
          </p>
          <Button
            size="lg"
            variant="outline"
            className="rounded-2xl border-white/15 bg-white/[0.03] px-8 backdrop-blur-md hover:bg-white/[0.07]"
            data-cursor="pointer"
            onClick={() =>
              window.open(
                `https://github.com/${GITHUB_USERNAME}`,
                "_blank",
                "noopener,noreferrer",
              )
            }
          >
            <Github className="mr-2 h-5 w-5" />
            GitHub profili
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ProjectsPage;
