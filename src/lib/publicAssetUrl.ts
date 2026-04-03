/** `public/` kökündeki yollar için Vite `base` önekini ekler (alt dizinde barındırma senaryosu). */
export function publicAssetUrl(path: string): string {
  if (!path.startsWith("/")) return path;
  const base = import.meta.env.BASE_URL;
  if (!base || base === "/") return path;
  const trimmed = base.endsWith("/") ? base.slice(0, -1) : base;
  return `${trimmed}${path}`;
}
