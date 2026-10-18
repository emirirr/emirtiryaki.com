import { Code2 } from "lucide-react";
import type { PortfolioProject } from "@/lib/projectDisplay";
import type { GitHubRepo } from "@/lib/githubApi";

/** GitHub’dan otomatik eklenen kartlarda gösterilmeyecek depo adları (tire/nokta birleştirilerek karşılaştırılır). */
const EXCLUDED_GITHUB_REPO_NAMES_NORMALIZED = new Set(
  [
    "emirirr",
    "coloro",
    "enoca",
    "gosbik",
    "gosbikk",
    "adhanprivacy",
    "adhan-privacy",
    /* Elle eklenen Kortbul web vitrin kartı ile çakışan depolar (ekransız ikinci kart oluşmasın) */
    "kortbulweb",
    "kortbulwebsite",
    "kortbulcomtr",
    "kortbulkulupadmin",
  ].map((s) => s.toLowerCase().replace(/[-_.]/g, "")),
);

function normalizedRepoName(name: string): string {
  return name.toLowerCase().replace(/[-_.]/g, "");
}

function isExcludedFromPortfolioMerge(repo: GitHubRepo): boolean {
  const n = repo.name.toLowerCase();
  const norm = normalizedRepoName(repo.name);
  if (EXCLUDED_GITHUB_REPO_NAMES_NORMALIZED.has(norm)) return true;
  /* coloro, coloro-app, ColorO-Mobile vb. tek listede tam yazılamayacağı için önek */
  if (norm.startsWith("coloro")) return true;
  if (n.includes("adhan") && n.includes("privacy")) return true;
  return false;
}

function githubSlugFromUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    const u = url.replace(/\.git$/i, "").split("#")[0].split("?")[0];
    const m = u.match(/github\.com\/([^/]+)\/([^/]+)$/i);
    return m ? `${m[1]}/${m[2]}`.toLowerCase() : null;
  } catch {
    return null;
  }
}

function curatedGithubSlugs(curated: PortfolioProject[]): Set<string> {
  const set = new Set<string>();
  for (const p of curated) {
    const s = githubSlugFromUrl(p.github);
    if (s) set.add(s);
  }
  return set;
}

function formatRepoTitle(name: string): string {
  return name
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .trim();
}

function formatPushedAt(iso: string): string {
  try {
    return new Intl.DateTimeFormat("tr-TR", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function inferCategory(repo: GitHubRepo): PortfolioProject["category"] {
  const lang = repo.language || "";
  const topics = (repo.topics || []).map((t) => t.toLowerCase());
  const name = repo.name.toLowerCase();

  if (
    ["Swift", "Kotlin", "Dart", "Objective-C"].includes(lang) ||
    topics.some((t) => t.includes("android") || t.includes("ios")) ||
    name.includes("expo") ||
    name.includes("react-native")
  ) {
    return "Mobil Uygulama";
  }

  if (
    topics.some((t) => t.includes("ecommerce") || t.includes("e-commerce")) ||
    name.includes("ecommerce") ||
    name.includes("e-commerce") ||
    name.includes("shop")
  ) {
    return "E-ticaret";
  }

  return "Web Uygulaması";
}

function inferTechnologies(repo: GitHubRepo): string[] {
  const out: string[] = [];
  if (repo.language) out.push(repo.language);
  const topics = repo.topics || [];
  for (const t of topics.slice(0, 4)) {
    const label = t
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    if (!out.includes(label)) out.push(label);
  }
  if (repo.archived) out.push("Arşiv");
  return out.length > 0 ? out : ["GitHub"];
}

function isValidHttpUrl(s: string | null | undefined): s is string {
  if (!s || !s.trim()) return false;
  try {
    const u = new URL(s);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

export function githubRepoToPortfolioProject(repo: GitHubRepo): PortfolioProject {
  const desc =
    repo.description?.trim() ||
    "GitHub public deposu — kısa açıklama ekleyebilirsiniz.";
  const pushed = formatPushedAt(repo.pushed_at);
  const longDescription = `${desc} Son push: ${pushed}. Bu kart GitHub API ile otomatik oluşturuldu.`;

  const homepage = isValidHttpUrl(repo.homepage) ? repo.homepage! : repo.html_url;

  return {
    id: repo.id,
    title: formatRepoTitle(repo.name),
    description: desc,
    longDescription,
    technologies: inferTechnologies(repo),
    category: inferCategory(repo),
    icon: Code2,
    link: homepage,
    github: repo.html_url,
    features: repo.archived ? ["Arşivlenmiş repo"] : ["Public GitHub deposu"],
    imageKey: `gh-${repo.name}`,
    additionalImages: [],
    challenges: [],
    solutions: [],
    duration: "GitHub",
    teamSize: "—",
    logo: null,
  };
}

/**
 * Önce elle tanımlı portföy (sıra korunur), ardından yalnızca GitHub’da olan ve fork olmayan repolar.
 */
export function mergePortfolioWithGitHub(
  curated: PortfolioProject[],
  githubRepos: GitHubRepo[] | undefined,
): PortfolioProject[] {
  if (!githubRepos?.length) return [...curated];

  const slugs = curatedGithubSlugs(curated);
  const extraRepos = githubRepos.filter((repo) => {
    if (repo.fork) return false;
    if (isExcludedFromPortfolioMerge(repo)) return false;
    return !slugs.has(repo.full_name.toLowerCase());
  });

  extraRepos.sort(
    (a, b) =>
      new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
  );

  const extras = extraRepos.map(githubRepoToPortfolioProject);
  return [...curated, ...extras];
}
