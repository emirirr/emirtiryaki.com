import kortbulWeb1 from "@/assets/portfolio/kortbulweb1.png";

/** public/ yerine bundle’a alınan görseller (deploy’da kesin gelsin). */
export function resolvePortfolioGallerySrc(
  imageKey: string | undefined,
  path: string,
  index: number,
): string {
  if (imageKey === "kortbul-web" && index === 0) return kortbulWeb1;
  return path;
}
