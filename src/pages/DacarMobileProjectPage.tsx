import { useMemo } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ArrowLeft, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/data/projects";

export default function DacarMobileProjectPage() {
  const navigate = useNavigate();

  const project = useMemo(
    () => projects.find((p) => p.imageKey === "dacar-mobile") ?? null,
    [],
  );

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const Icon = project.icon;

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
          <span className="text-sm font-medium text-muted-foreground">daCAR Mobile</span>
          <Button variant="ghost" size="sm" className="rounded-xl" asChild>
            <a href="/">Ana sayfa</a>
          </Button>
        </div>
      </header>

      <div className="pointer-events-none fixed inset-x-0 top-0 h-[40vh] bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,hsl(var(--primary)/0.12),transparent)]" />

      <main className="container relative mx-auto max-w-4xl px-4 py-12 sm:px-6">
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

        <section className="mt-10 grid gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Mimari
            </h2>
            <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
              <li>Expo + React Native tabanlı çok platform mimari</li>
              <li>Supabase: Auth, Postgres, Realtime, Storage ve Edge Functions</li>
              <li>Context katmanı: Auth, Theme ve Language yönetimi</li>
              <li>Ekran, bileşen ve servis katmanlarının ayrık organizasyonu</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Ana akışlar
            </h2>
            <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
              <li>İlan keşfi, filtreleme, karşılaştırma ve favoriler</li>
              <li>Detay sayfası, satıcı profili ve raporlama</li>
              <li>Gerçek zamanlı chat, soru-cevap ve bildirim merkezi</li>
              <li>Uzman listeleme, rezervasyon ve rapor görüntüleme</li>
            </ul>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Servis katmanı
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Uygulama servisleri Supabase etrafında kurgulandı: ilan yönetimi, sohbet, bildirim,
            soru-cevap, profil, storage ve uzman rezervasyon süreçleri modüler servis dosyalarıyla
            ayrıştırıldı. Realtime odaklı kullanım sayesinde mesajlaşma ve bildirim akışlarında düşük
            gecikmeli deneyim hedeflendi.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Release notları
          </h2>
          <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
            <li>Yerel APK/AAB build akışları ve EAS preview/production profilleri hazır</li>
            <li>Release öncesi ortam doğrulaması için `checkReleaseEnv` scripti kullanılıyor</li>
            <li>Production için gerçek Android keystore ve imzalama zorunlu</li>
            <li>RLS migration sırası ve native build stabilitesi düzenli takip ediliyor</li>
          </ul>
        </section>

        <section className="mt-10 grid gap-6 sm:grid-cols-2">
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

        {project.github && (
          <div className="mt-10">
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
          </div>
        )}
      </main>
    </div>
  );
}
