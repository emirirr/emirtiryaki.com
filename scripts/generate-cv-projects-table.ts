/**
 * Portföy verisinden cv.html <tbody> satırlarını üretir.
 * Çıktıyı terminale yazdırır; cv.html içindeki <tbody> … </tbody> ile değiştirin.
 *
 *   npx tsx scripts/generate-cv-projects-table.ts
 */
import { projects } from "../src/data/projects.ts";

type Row = {
  title: string;
  description: string;
  link: string;
  github: string | null;
};

const extra: Row[] = [
  {
    title: "Kodlasa",
    description: "Eğitim ve geliştirme platformu; alt uygulamalar ve vitrin.",
    link: "https://kodlasa.com",
    github: null,
  },
  {
    title: "emirtiryaki.com (portföy)",
    description: "Kişisel portföy sitesi: React, TypeScript, Vite, proje vitrini.",
    link: "https://emirtiryaki.com",
    github: "https://github.com/emirirr/emirtiryaki.com",
  },
];

const rows: Row[] = [
  ...projects.map((p) => ({
    title: p.title,
    description: (p.description ?? "").replace(/\s+/g, " ").trim(),
    link: p.link ?? "",
    github: p.github ?? null,
  })),
  ...extra,
].sort((a, b) => a.title.localeCompare(b.title, "tr", { sensitivity: "base" }));

function normalizeHref(link: string): string {
  if (!link) return "#";
  if (link.startsWith("/")) return `https://emirtiryaki.com${link}`;
  return link;
}

function faviconDomain(link: string, github: string | null): string {
  if (link.startsWith("http")) {
    try {
      const h = new URL(link).hostname;
      if (h && h !== "emirtiryaki.com") return h;
    } catch {
      /* ignore */
    }
  }
  if (github) {
    try {
      return new URL(github).hostname;
    } catch {
      /* ignore */
    }
  }
  return "emirtiryaki.com";
}

function linkLabel(href: string): string {
  try {
    const u = new URL(href);
    return (
      u.hostname.replace(/^www\./, "") +
      (u.pathname && u.pathname !== "/" ? u.pathname.replace(/\/$/, "") : "")
    );
  } catch {
    return href;
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function linksCell(p: Row): string {
  const href = normalizeHref(p.link);
  const pieces: string[] = [];
  const isPortfolioPlaceholder = p.link === "https://emirtiryaki.com";

  if (!isPortfolioPlaceholder || p.title.includes("portföy")) {
    pieces.push(
      `<a href="${escapeHtml(href)}" target="_blank" rel="noopener">${escapeHtml(linkLabel(href))}</a>`,
    );
  } else if (p.link.startsWith("/")) {
    pieces.push(`<a href="${escapeHtml(href)}" target="_blank" rel="noopener">Detay</a>`);
  }

  if (p.github) {
    pieces.push(
      `<a href="${escapeHtml(p.github)}" target="_blank" rel="noopener">GitHub</a>`,
    );
  }

  if (isPortfolioPlaceholder && !p.title.includes("portföy")) {
    if (pieces.length === 0 && p.github) {
      pieces.push(
        `<a href="${escapeHtml(p.github)}" target="_blank" rel="noopener">GitHub</a>`,
      );
    }
    pieces.push(
      `<a href="https://emirtiryaki.com/projects" target="_blank" rel="noopener">Vitrin</a>`,
    );
  }

  if (pieces.length === 0) {
    pieces.push("—");
  }

  return pieces.join("<br />\n                  ");
}

const body = rows
  .map((p) => {
    const domain = faviconDomain(p.link, p.github);
    return `              <tr>
                <td>
                  <span class="proj-name">
                    <img src="https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&amp;sz=64" alt="" />
                    ${escapeHtml(p.title)}
                  </span>
                </td>
                <td>${escapeHtml(p.description)}</td>
                <td>
                  ${linksCell(p)}
                </td>
              </tr>`;
  })
  .join("\n");

console.log(body);
