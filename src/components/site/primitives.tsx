import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

/* ───────────── Sözdizimi renkleri ─────────────
   Tek harfli bileşenler kod satırlarını JSX içinde okunur tutar:
   <K>const</K> emir = <S>"..."</S> */
export const K = ({ children }: { children: ReactNode }) => <span className="tk-k">{children}</span>;
export const S = ({ children }: { children: ReactNode }) => <span className="tk-s">{children}</span>;
export const Pr = ({ children }: { children: ReactNode }) => <span className="tk-p">{children}</span>;
export const F = ({ children }: { children: ReactNode }) => <span className="tk-f">{children}</span>;
export const N = ({ children }: { children: ReactNode }) => <span className="tk-n">{children}</span>;
export const C = ({ children }: { children: ReactNode }) => <span className="tk-c">{children}</span>;
export const T = ({ children }: { children: ReactNode }) => <span className="tk-t">{children}</span>;

/* ───────────── Giriş animasyonu ───────────── */
export function Reveal({
  children,
  delay = 0,
  y = 22,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article";
}) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </M>
  );
}

/* ───────────── Daktilo ─────────────
   `total` karakteri `speed` ms aralıklarla açar. Hareket azaltılmışsa
   hemen sona atlar. `start` false iken bekler (görünür olunca başlatmak için). */
export function useTypewriter(total: number, { speed = 16, step = 2, start = true } = {}) {
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? total : 0);

  useEffect(() => {
    if (reduce) {
      setN(total);
      return;
    }
    if (!start) return;
    let i = 0;
    const id = window.setInterval(() => {
      i = Math.min(total, i + step);
      setN(i);
      if (i >= total) window.clearInterval(id);
    }, speed);
    return () => window.clearInterval(id);
  }, [total, speed, step, start, reduce]);

  return n;
}

/** Kelimeleri sırayla yazıp silen döngü (hero başlığı). */
export function useRotatingType(words: string[], { type = 70, erase = 35, hold = 1600 } = {}) {
  const reduce = useReducedMotion();
  // İlk çizimde (ve sunucuda üretilen HTML'de) ilk kelime tam görünür; döngü
  // önce onu tutup silmekle başlar — arama motorları boş başlık görmez.
  const [state, setState] = useState({ w: 0, n: words[0].length, del: false });

  useEffect(() => {
    if (reduce) return;
    const word = words[state.w] ?? words[0];
    let delay = state.del ? erase : type;
    if (!state.del && state.n === word.length) delay = hold;
    if (state.del && state.n === 0) delay = 260;

    const id = window.setTimeout(() => {
      setState((s) => {
        const w = words[s.w] ?? words[0];
        if (!s.del && s.n < w.length) return { ...s, n: s.n + 1 };
        if (!s.del) return { ...s, del: true };
        if (s.n > 0) return { ...s, n: s.n - 1 };
        return { w: (s.w + 1) % words.length, n: 0, del: false };
      });
    }, delay);
    return () => window.clearTimeout(id);
  }, [state, words, type, erase, hold, reduce]);

  return (words[state.w] ?? words[0]).slice(0, state.n);
}

/** Görünür olunca 0'dan hedefe sayan metrik ("9+", "40+" gibi). */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const target = parseInt(value, 10);
  const suffix = value.replace(/^\d+/, "");
  // Sunucu HTML'i ve ilk çizim son değeri gösterir; görünür olunca 0'dan sayar.
  const [n, setN] = useState(target);

  useEffect(() => {
    if (Number.isNaN(target)) return;
    if (reduce) {
      setN(target);
      return;
    }
    if (!inView) return;
    setN(0);
    const t0 = performance.now();
    const dur = 1100;
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / dur);
      setN(Math.round(target * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, target]);

  if (Number.isNaN(target)) return <span ref={ref}>{value}</span>;
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

/* ───────────── Küçük pencere ─────────────
   Hero'daki kod kartı ve Heybe'deki özet aynı çerçeveyi kullanır. */
export function Window({
  title,
  children,
  className = "",
  right,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  right?: ReactNode;
}) {
  return (
    <div className={"s-win " + className}>
      <div className="s-win-bar">
        <span className="lights" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="ttl">{title}</span>
        {right ? <span className="r">{right}</span> : null}
      </div>
      {children}
    </div>
  );
}

/* ───────────── Bölüm başlığı ───────────── */
export function SectionHead({
  index,
  eyebrow,
  title,
  lead,
  as: H = "h2",
  center = false,
}: {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  as?: "h1" | "h2";
  center?: boolean;
}) {
  return (
    <Reveal className={"s-head" + (center ? " center" : "")}>
      <div className="s-eyebrow">
        {index ? <span className="ix">{index}</span> : null}
        {eyebrow}
      </div>
      <H className="s-h2">{title}</H>
      {lead ? <p className="s-lead">{lead}</p> : null}
    </Reveal>
  );
}

/** Kartlarda fareyi izleyen ışık: --mx/--my CSS değişkenlerini günceller. */
export const spotlight = (e: React.MouseEvent<HTMLElement>) => {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
};
