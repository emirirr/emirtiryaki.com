/** Kortbul alt sayfaları: URL slug → projects.ts içindeki imageKey */
export const KORTBUL_SLUG_TO_IMAGE_KEY = {
  expo: "kortbul-expo",
} as const;

export type KortbulSlug = keyof typeof KORTBUL_SLUG_TO_IMAGE_KEY;

export function isKortbulSlug(s: string): s is KortbulSlug {
  return s in KORTBUL_SLUG_TO_IMAGE_KEY;
}

export function kortbulPageTitle(_slug: KortbulSlug): string {
  return "Kortbul (Expo)";
}
