import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Github, GitBranch, Star, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";
import {
  GITHUB_USERNAME,
  fetchGitHubUser,
  fetchGitHubReposRecent,
} from "@/lib/githubApi";

export function GitHubLive() {
  const userQ = useQuery({
    queryKey: ["gh-user", GITHUB_USERNAME],
    queryFn: fetchGitHubUser,
  });
  const reposQ = useQuery({
    queryKey: ["gh-repos", GITHUB_USERNAME],
    queryFn: () => fetchGitHubReposRecent(6),
  });

  const loading = userQ.isLoading || reposQ.isLoading;
  const err = userQ.error || reposQ.error;

  return (
    <section
      id="github-live"
      className="relative py-24 px-6"
      aria-labelledby="github-live-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_hsl(var(--primary)/0.12),transparent_55%)]" />
      <motion.div
        className="container relative mx-auto max-w-6xl"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.div variants={fadeUp} className="mb-12 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Canlı veri
          </p>
          <h2
            id="github-live-heading"
            className="text-4xl font-semibold tracking-tight md:text-5xl"
          >
            <span className="text-gradient">GitHub</span>
            <span className="text-foreground"> akışı</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            API üzerinden çekilen açık profil ve güncel repolar — backend entegrasyonu ve
            gerçek zamanlı içerik örneği. Tüm repolar{" "}
            <a href="/projects" className="text-primary underline-offset-4 hover:underline">
              Projeler
            </a>{" "}
            sayfasında listelenir.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-12">
          <motion.div
            variants={fadeUp}
            className="glass-strong relative overflow-hidden rounded-3xl p-8 lg:col-span-5"
          >
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
            {loading && (
              <p className="text-sm text-muted-foreground">Yükleniyor…</p>
            )}
            {err && (
              <p className="text-sm text-destructive">
                GitHub verisi şu an gösterilemiyor. İsterseniz{" "}
                <code className="rounded bg-muted px-1 py-0.5 text-xs">
                  VITE_GITHUB_TOKEN
                </code>{" "}
                ile oran sınırını yükseltebilirsiniz.
              </p>
            )}
            {!loading && !err && userQ.data && (
              <>
                <div className="flex items-center gap-4">
                  <img
                    src={userQ.data.avatar_url}
                    alt=""
                    width={72}
                    height={72}
                    className="h-[72px] w-[72px] rounded-2xl border border-white/10 object-cover shadow-lg"
                    loading="lazy"
                  />
                  <div>
                    <p className="text-sm text-muted-foreground">@{userQ.data.login}</p>
                    <h3 className="text-2xl font-semibold tracking-tight">
                      Açık kaynak aktivite
                    </h3>
                  </div>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-4">
                  {[
                    {
                      label: "Public repo",
                      value: userQ.data.public_repos,
                      icon: GitBranch,
                    },
                    {
                      label: "Takipçi",
                      value: userQ.data.followers,
                      icon: Users,
                    },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                    >
                      <s.icon className="mb-2 h-5 w-5 text-primary" />
                      <div className="text-3xl font-semibold tabular-nums">
                        {s.value}
                      </div>
                      <div className="text-xs text-muted-foreground">{s.label}</div>
                    </div>
                  ))}
                </div>
                <Button
                  className="mt-8 w-full rounded-xl bg-foreground text-background hover:bg-foreground/90"
                  data-cursor="pointer"
                  onClick={() =>
                    window.open(userQ.data!.html_url, "_blank", "noopener,noreferrer")
                  }
                >
                  <Github className="mr-2 h-4 w-4" />
                  Profili aç
                </Button>
              </>
            )}
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="glass relative rounded-3xl p-2 lg:col-span-7"
          >
            <div className="rounded-2xl border border-white/5 bg-black/20 p-6">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Son güncellenen repolar
                </span>
                <Star className="h-4 w-4 text-amber-400/90" />
              </div>
              <ul className="space-y-3">
                {(reposQ.data ?? []).map((r) => (
                  <li key={r.id}>
                    <button
                      type="button"
                      onClick={() =>
                        window.open(r.html_url, "_blank", "noopener,noreferrer")
                      }
                      data-cursor="pointer"
                      className={cn(
                        "group flex w-full items-start justify-between gap-4 rounded-2xl border border-transparent px-4 py-3 text-left",
                        "transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04]",
                      )}
                    >
                      <div className="min-w-0">
                        <p className="truncate font-medium tracking-tight group-hover:text-primary">
                          {r.name}
                        </p>
                        <p className="line-clamp-2 text-sm text-muted-foreground">
                          {r.description || "Açıklama yok"}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {r.language && (
                            <Badge variant="secondary" className="text-[10px]">
                              {r.language}
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-[10px] tabular-nums">
                            ★ {r.stargazers_count}
                          </Badge>
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
                {!loading && !err && (reposQ.data?.length ?? 0) === 0 && (
                  <li className="px-4 py-6 text-sm text-muted-foreground">
                    Repo bulunamadı.
                  </li>
                )}
              </ul>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
