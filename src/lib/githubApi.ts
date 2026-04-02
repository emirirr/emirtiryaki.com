/** Ortak GitHub REST çağrıları — GitHubLive ve portföy senkronu. */

export const GITHUB_USERNAME =
  import.meta.env.VITE_GITHUB_USERNAME?.trim() || "emirirr";

export type GitHubUser = {
  public_repos: number;
  followers: number;
  following: number;
  login: string;
  avatar_url: string;
  html_url: string;
};

export type GitHubRepo = {
  id: number;
  name: string;
  full_name: string;
  owner: { login: string };
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  language: string | null;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
  topics: string[];
};

export function githubHeaders(): HeadersInit {
  const token = import.meta.env.VITE_GITHUB_TOKEN?.trim();
  if (!token) return { Accept: "application/vnd.github+json" };
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
  };
}

export async function fetchGitHubUser(): Promise<GitHubUser> {
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}`,
    { headers: githubHeaders() },
  );
  if (!res.ok) throw new Error("GitHub kullanıcı verisi alınamadı");
  return res.json();
}

export async function fetchGitHubReposRecent(
  limit = 6,
): Promise<GitHubRepo[]> {
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=${Math.min(limit, 100)}`,
    { headers: githubHeaders() },
  );
  if (!res.ok) throw new Error("GitHub repo listesi alınamadı");
  return res.json();
}

/**
 * Tüm repolar (sayfalama).
 * Token yok: yalnızca public (`/users/{username}/repos`).
 * `VITE_GITHUB_TOKEN` var: `/user/repos?affiliation=owner` ile private dahil (token sahibinin repoları).
 */
export async function fetchGitHubReposAll(): Promise<GitHubRepo[]> {
  const headers = githubHeaders();
  const token = import.meta.env.VITE_GITHUB_TOKEN?.trim();
  const all: GitHubRepo[] = [];
  let page = 1;
  const authenticated = Boolean(token);

  for (;;) {
    const url = authenticated
      ? new URL("https://api.github.com/user/repos")
      : new URL(`https://api.github.com/users/${GITHUB_USERNAME}/repos`);
    url.searchParams.set("per_page", "100");
    url.searchParams.set("sort", "updated");
    url.searchParams.set("page", String(page));
    if (authenticated) {
      url.searchParams.set("affiliation", "owner");
    }

    const res = await fetch(url.toString(), { headers });
    if (!res.ok) {
      throw new Error(`GitHub repo listesi alınamadı (${res.status})`);
    }

    let batch: GitHubRepo[] = await res.json();
    if (!Array.isArray(batch) || batch.length === 0) break;

    if (authenticated) {
      const u = GITHUB_USERNAME.toLowerCase();
      batch = batch.filter((r) => r.owner?.login?.toLowerCase() === u);
    }

    all.push(...batch);
    if (batch.length < 100) break;
    page += 1;
  }

  return all;
}
