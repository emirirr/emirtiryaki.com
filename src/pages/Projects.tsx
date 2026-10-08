import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Search, Globe } from "lucide-react";
import { GithubIcon } from "@/components/BrandIcons";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/Navbar";
import { projects, categories } from "@/data/projects";
import manifest from "@/data/portfolioManifest.json";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { builtWithLine, isMobileAppProject } from "@/lib/projectDisplay";
import { IPhone17ProFrame } from "@/components/IPhone17ProFrame";
import { PortfolioImage, ProjectPlaceholder } from "@/components/PortfolioImage";
import { GITHUB_USERNAME, fetchGitHubReposAll } from "@/lib/githubApi";
import { mergePortfolioWithGitHub } from "@/lib/portfolioGithubMerge";
import { hasProjectVisitLink, navigateOrOpenProjectLink } from "@/lib/portfolioLink";

type Project = ReturnType<typeof mergePortfolioWithGitHub>[number];

const available = new Set<string>(manifest);
const imagesOf = (p: Project) =>
  (p.additionalImages ?? []).filter((src) => src.startsWith("http") || available.has(src));

const domainOf = (link: string) => {
  if (link.startsWith("/")) return "emirtiryaki.com" + link;
  try {
    return new URL(link).host.replace(/^www\./, "");
  } catch {
    return link;
  }
};

const visitLabel = (link: string) =>
  link.startsWith("/") ? "Vaka çalışması" : link.includes("github.com") ? "GitHub" : "Canlı aç";

function ProjectCard({ project }: { project: Project }) {
  const navigate = useNavigate();
  const images = imagesOf(project);
  const isMobile = isMobileAppProject(project);
  const canVisit = hasProjectVisitLink(project.link);
  const open = () => canVisit && navigateOrOpenProjectLink(project.link, navigate);

  return (
    <motion.article variants={fadeUp} className="card-surface card-lift group flex flex-col overflow-hidden">
      {isMobile ? (
        <div className="relative flex min-h-[260px] items-end justify-center gap-3 overflow-hidden bg-surface px-4 pt-8">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.10),transparent_65%)]" />
          {images.slice(0, 3).map((src, i) => (
            <IPhone17ProFrame
              key={src}
              size={images.length >= 3 ? "sm" : "md"}
              src={src}
              alt={`${project.title} — ekran ${i + 1}`}
              fallbackIcon={project.icon}
              className="relative -mb-16"
            />
          ))}
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2 border-b border-border bg-surface px-3 py-2">
            <span className="flex gap-1">
              <span className="h-2 w-2 rounded-full bg-foreground/15" />
              <span className="h-2 w-2 rounded-full bg-foreground/15" />
              <span className="h-2 w-2 rounded-full bg-foreground/15" />
            </span>
            <span className="flex min-w-0 flex-1 items-center gap-1.5 rounded-md bg-card px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
              <Globe className="h-3 w-3 shrink-0" />
              <span className="truncate">{canVisit ? domainOf(project.link) : project.title}</span>
            </span>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden bg-surface">
            <PortfolioImage
              src={images[0]}
              alt={`${project.title} — ekran görüntüsü`}
              className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              fallback={<ProjectPlaceholder title={project.title} icon={project.icon} />}
            />
          </div>
        </>
      )}

      <div className="relative flex flex-1 flex-col border-t border-border bg-card p-5">
        <p className="text-xs font-semibold text-muted-foreground">{project.category}</p>
        <h3 className="mt-1 text-lg font-bold tracking-tight text-foreground">{project.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        <p className="mb-4 mt-4 text-xs font-semibold text-primary">{builtWithLine(project.technologies)}</p>
        {(canVisit || project.github) && (
          <div className="mt-auto flex items-center gap-4 border-t border-border pt-4">
            {canVisit && (
              <button
                type="button"
                onClick={open}
                className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
              >
                {visitLabel(project.link)}
                <ArrowUpRight className="h-4 w-4" />
              </button>
            )}
            {project.github && !project.link.includes("github.com") && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                <GithubIcon className="h-4 w-4" />
                Kaynak
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}

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

  const allProjects = useMemo(() => mergePortfolioWithGitHub(projects, ghReposQ.data), [ghReposQ.data]);

  const filtered = useMemo(() => {
    const byCat =
      selectedCategory === "Tümü" ? allProjects : allProjects.filter((p) => p.category === selectedCategory);
    const q = searchQuery.trim().toLocaleLowerCase("tr");
    if (!q) return byCat;
    return byCat.filter((p) =>
      [p.title, p.description, ...p.technologies].join(" ").toLocaleLowerCase("tr").includes(q),
    );
  }, [allProjects, selectedCategory, searchQuery]);

  // Görseli olanlar vitrinde (canlı linki olanlar önce); görselsizler kompakt "Arşiv" listesinde
  const showcase = filtered
    .filter((p) => imagesOf(p).length > 0)
    .sort((a, b) => Number(hasProjectVisitLink(b.link)) - Number(hasProjectVisitLink(a.link)));
  const archive = filtered.filter((p) => imagesOf(p).length === 0);

  const liveCount = allProjects.filter((p) => hasProjectVisitLink(p.link) && imagesOf(p).length > 0).length;

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Logo />
          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="hidden h-9 items-center gap-1.5 rounded-lg px-3 text-sm font-medium text-muted-foreground hover:text-foreground sm:inline-flex"
            >
              <ArrowLeft className="h-4 w-4" />
              Ana sayfa
            </Link>
            <a
              href="/#contact"
              className="inline-flex h-9 items-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground"
            >
              Teklif al
            </a>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden px-4 pb-10 pt-14 sm:px-6 md:pt-20">
        <div className="bg-dots pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_30%,transparent_75%)]" />
        <motion.div
          className="relative mx-auto max-w-6xl"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.span variants={fadeUp} className="eyebrow">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
            Portföy
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="mt-4 font-display text-4xl font-extrabold tracking-tight text-foreground md:text-5xl"
          >
            Tüm <span className="text-primary">projeler</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="mt-4 max-w-2xl text-lg text-muted-foreground">
            Müşteri işleri, kendi ürünlerim ve denemeler. {liveCount} proje canlı olarak incelenebilir.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="inline-flex flex-wrap gap-1 rounded-xl border border-border bg-card p-1">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setSelectedCategory(c)}
                  className={cn(
                    "rounded-lg px-4 py-2 text-sm font-semibold transition-colors",
                    selectedCategory === c
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                  )}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="relative w-full md:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
              <Input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Proje veya teknoloji ara…"
                className="h-11 rounded-lg bg-card pl-10"
                aria-label="Projelerde ara"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      <main className="px-4 pb-24 sm:px-6">
        <div className="mx-auto max-w-6xl">
          {filtered.length === 0 && (
            <p className="py-16 text-center text-muted-foreground">
              Bu filtre için sonuç yok. Aramayı temizleyip tekrar deneyin.
            </p>
          )}

          {showcase.length > 0 && (
            <motion.div
              key={`${selectedCategory}-${searchQuery}`}
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {showcase.map((p) => (
                <ProjectCard key={`${p.imageKey}-${p.id}`} project={p} />
              ))}
            </motion.div>
          )}

          {archive.length > 0 && (
            <section className="mt-16">
              <div className="flex items-baseline justify-between gap-4 border-b border-border pb-3">
                <h2 className="text-lg font-extrabold tracking-tight text-foreground">
                  Arşiv <span className="font-semibold text-muted-foreground">· {archive.length}</span>
                </h2>
                <p className="text-sm text-muted-foreground">Ekran görüntüsü olmayan denemeler ve depolar</p>
              </div>
              <ul className="divide-y divide-border">
                {archive.map((p) => {
                  const canVisit = hasProjectVisitLink(p.link);
                  const Icon = p.icon;
                  return (
                    <li key={`${p.imageKey}-${p.id}`} className="flex items-center gap-4 py-4">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
                        <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-bold text-foreground">{p.title}</p>
                        <p className="truncate text-sm text-muted-foreground">
                          {p.category} · {builtWithLine(p.technologies, 2)}
                        </p>
                      </div>
                      {canVisit && (
                        <button
                          type="button"
                          onClick={() => navigateOrOpenProjectLink(p.link, navigate)}
                          className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-primary hover:underline"
                        >
                          {visitLabel(p.link)}
                          <ArrowUpRight className="h-4 w-4" />
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProjectsPage;
