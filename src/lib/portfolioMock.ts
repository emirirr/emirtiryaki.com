import { projects } from "@/data/projects";
import { PROJECT_LOGOS } from "@/data/projectLogos";
import { publicAssetUrl } from "@/lib/publicAssetUrl";

export type P = (typeof projects)[number] & {
  featured?: boolean;
  featuredOrder?: number;
  additionalImages?: string[];
  github?: string | null;
  /** Adres var ama erişilemiyor (404, süresi dolmuş sertifika vb.) */
  offline?: boolean;
  /** Doğrulanmış ekran görüntüsü yok — sahte görsel yerine yer tutucu çizilir.
   *  Bu projelerin eski Vercel adresleri başka uygulamalara devredilmiş,
   *  otomatik çekilen görseller o uygulamalara ait olduğu için silindi. */
  noShot?: boolean;
  /** Ürün ailesi etiketi — şu an yalnızca 'car' (araç pazaryeri ailesi). */
  family?: string;
  challenges?: string[];
  solutions?: string[];
  duration?: string;
  teamSize?: string;
};

const LOCAL_OVERRIDE: Record<string, string> = {
  "kortbul-expo": "/portfolio/images/kortbul-mobile1.png",
};

export const cover = (p: P) => {
  if (LOCAL_OVERRIDE[p.imageKey]) return LOCAL_OVERRIDE[p.imageKey];
  const first = p.additionalImages?.[0];
  if (first && first.startsWith("/")) return first;
  return `/portfolio/images/${p.imageKey}1.png`;
};

export const coverWebp = (p: P) => {
  const src = cover(p);
  if (!src.startsWith("/")) return src;
  return publicAssetUrl(src.replace(/\.png$/i, ".webp"));
};

export const imgWebp = (path: string) =>
  path.startsWith("/") ? publicAssetUrl(path.replace(/\.png$/i, ".webp")) : path;

const LOGO_KEYS = new Set(PROJECT_LOGOS);

/** Ürünün kendi markasının logosu — `scripts/fetch-project-logos.mjs` ile
 *  toplanır. Logosu olmayan projede null döner, kart baş harf rozetine düşer. */
export const logoOf = (p: P): string | null =>
  LOGO_KEYS.has(p.imageKey) ? publicAssetUrl(`/portfolio/logos/${p.imageKey}.webp`) : null;

/** imageKey'den doğrudan logo — carFamily gibi proje nesnesi olmayan yerler için. */
export const logoByKey = (key: string): string | null =>
  LOGO_KEYS.has(key) ? publicAssetUrl(`/portfolio/logos/${key}.webp`) : null;

export const isPhone = (p: P) => p.category === "Mobil Uygulama";
export const isExternal = (href?: string | null) =>
  !!href && /^https?:\/\//.test(href);

/** Dışarı açılabilir, gerçekten ayakta olan bir adres var mı? */
export const isLive = (p: P) => isExternal(p.link) && !p.offline;

export const domainOf = (p: P) => {
  try {
    if (p.link && /^https?:\/\//.test(p.link))
      return new URL(p.link).hostname.replace(/^www\./, "");
  } catch {
    /* noop */
  }
  return "emirtiryaki.com";
};

export const initials = (t: string) =>
  t
    .replace(/[^A-Za-zÇĞİÖŞÜçğıöşü ]/g, "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

export const slugOf = (p: P) => p.imageKey;

export const all = projects as P[];
export const featured = all
  .filter((p) => p.featured)
  .sort((a, b) => (a.featuredOrder ?? 999) - (b.featuredOrder ?? 999));
export const spotlight =
  all.find((p) => p.imageKey === "marocar-web") ?? featured[0] ?? all[0];

export const bySlug = (s?: string): P | undefined =>
  all.find((p) => p.imageKey === s);

/** "Araç Pazaryeri" kategoriye göre değil, `family` alanına göre süzer. */
export const CAR_FAMILY_LABEL = "Araç Pazaryeri";
export const categories = [
  "Tümü",
  CAR_FAMILY_LABEL,
  "Web Uygulaması",
  "Mobil Uygulama",
  "E-ticaret",
];

export const matchesCategory = (p: P, cat: string) => {
  if (cat === "Tümü") return true;
  if (cat === CAR_FAMILY_LABEL) return p.family === "car";
  return p.category === cat;
};
