import { useMemo } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/projects";
import {
  isKortbulSlug,
  KORTBUL_SLUG_TO_IMAGE_KEY,
  kortbulStoreUrl,
} from "@/data/kortbulProjectRoutes";

export default function KortbulProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const project = useMemo(() => {
    if (!slug || !isKortbulSlug(slug)) return null;
    const key = KORTBUL_SLUG_TO_IMAGE_KEY[slug];
    return projects.find((p) => p.imageKey === key) ?? null;
  }, [slug]);

  if (!slug || !isKortbulSlug(slug)) {
    return <Navigate to="/projects" replace />;
  }

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const Icon = project.icon;
  const storeUrl = kortbulStoreUrl(slug);

  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-background/80 backdrop-blur-lg backdrop-saturate-125">
        <div className="container mx-auto flex items-center justify-between px-4 py-4 sm:px-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/projects")}
            className="gap-2 rounded-xl text-muted-foreground hover:bg-white/[0.06] hover:text-foreground"
            data-cursor="pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Projeler
          </Button>
          <span className="text-sm font-medium text-muted-foreground">Kortbul</span>
          <Button variant="ghost" size="sm" className="rounded-xl" asChild>
            <a href="/">Ana sayfa</a>
          </Button>
        </div>
      </header>

      <div className="pointer-events-none fixed inset-x-0 top-0 h-[40vh] bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,hsl(var(--primary)/0.12),transparent)]" />

      <main className="container relative mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <Badge variant="secondary" className="rounded-lg border border-white/10">
            {project.category}
          </Badge>
          <Icon className="h-8 w-8 text-primary/90" strokeWidth={1.25} aria-hidden />
        </div>

        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{project.title}</h1>
        <p className="mt-3 text-lg text-muted-foreground">{project.description}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="rounded-lg border border-white/5 bg-white/[0.06] px-2.5 py-0.5 text-xs font-medium"
            >
              {tech}
            </Badge>
          ))}
        </div>

        <section className="mt-10 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Proje özeti
          </h2>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
            {project.longDescription}
          </p>
        </section>

        <section className="mt-10">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Öne çıkanlar
          </h2>
          <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
            {project.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </section>

        <section className="mt-8 grid gap-6 sm:grid-cols-2">
          <div>
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Zorluklar
            </h2>
            <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
              {project.challenges.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Çözümler
            </h2>
            <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
              {project.solutions.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </section>

        <div className="mt-10 flex flex-wrap gap-3 text-sm text-muted-foreground">
          <span>Süre: {project.duration}</span>
          <span aria-hidden>·</span>
          <span>Ekip: {project.teamSize}</span>
        </div>

        {(project.github || storeUrl) && (
          <div className="mt-10 flex flex-wrap gap-3">
            {storeUrl && (
              <Button
                className="rounded-xl hero-gradient"
                data-cursor="pointer"
                onClick={() => window.open(storeUrl, "_blank", "noopener,noreferrer")}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Google Play
              </Button>
            )}
            {project.github && (
            <Button
              variant="outline"
              className="rounded-xl border-white/15 bg-white/[0.03] hover:bg-white/[0.08]"
              data-cursor="pointer"
              onClick={() =>
                window.open(project.github!, "_blank", "noopener,noreferrer")
              }
            >
              <Github className="mr-2 h-4 w-4" />
              GitHub deposu
            </Button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
