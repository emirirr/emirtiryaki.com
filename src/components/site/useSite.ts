import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/** Sabit üst menünün yüksekliği; bölüme kaydırırken bu kadar boşluk bırakılır. */
export const HEADER_OFFSET = 84;

const prefersReduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const scrollToId = (id: string, smooth = !prefersReduced()) => {
  const behavior = smooth ? "smooth" : "auto";
  if (id === "top") {
    window.scrollTo({ top: 0, behavior });
    return;
  }
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET, behavior });
};

/** Ana sayfadaysa bölüme kaydırır, değilse ana sayfaya hash ile gider. */
export function useGoSection() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return useCallback(
    (id: string) => {
      if (pathname === "/") {
        scrollToId(id);
        history.replaceState(null, "", id === "top" ? "/" : `/#${id}`);
      } else {
        navigate(id === "top" ? "/" : `/#${id}`);
      }
    },
    [pathname, navigate],
  );
}

/** Görünür bölüm: üst kenarı ekranın üst %35'ini geçmiş son bölüm. */
export function useScrollSpy(ids: string[], enabled = true) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    const measure = () => {
      raf = 0;
      const line = window.innerHeight * 0.35;
      let cur: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - line <= 0) cur = id;
      }
      setActive(cur);
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, [ids, enabled]);

  return active;
}

/** Sayfa kaydırma oranı (0–1) — üstteki ince ilerleme çubuğu için. */
export function useScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    let raf = 0;
    const measure = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setP(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);
  return p;
}

/** Komut paletini ve terminali kabuk dışından açmak için olaylar. */
export const SITE_EVENTS = { palette: "site:palette", terminal: "site:terminal" } as const;
export const openPalette = () => window.dispatchEvent(new Event(SITE_EVENTS.palette));
export const toggleTerminal = () => window.dispatchEvent(new Event(SITE_EVENTS.terminal));
