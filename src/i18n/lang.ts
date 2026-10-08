import { useCallback } from "react";
import { useLocation } from "react-router-dom";

export type Lang = "tr" | "en";

/** /en ve /en/... İngilizce; geri kalan her şey Türkçe. */
export const langOf = (pathname: string): Lang =>
  pathname === "/en" || pathname.startsWith("/en/") ? "en" : "tr";

export function useLang(): Lang {
  return langOf(useLocation().pathname);
}

/** Satır içi çeviri: t("Projeler", "Projects"). Metin bileşenin yanında kalır. */
export function useT() {
  const lang = useLang();
  return useCallback(<T,>(tr: T, en: T): T => (lang === "en" ? en : tr), [lang]);
}

export const homePath = (lang: Lang) => (lang === "en" ? "/en" : "/");

/** “React & Vite ile geliştirildi” → “Built with React & Vite” */
export const builtWithFor = (tr: string, lang: Lang) =>
  lang === "en" ? `Built with ${tr.replace(/ ile geliştirildi$/, "")}` : tr;
