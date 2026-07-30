import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Layer = "edge" | "api" | "data" | "jobs";

const layers: { id: Layer; label: string; sub: string }[] = [
  {
    id: "edge",
    label: "Edge & istemci",
    sub: "CDN, TLS, React/Vite, mobil istemciler",
  },
  {
    id: "api",
    label: "API katmanı",
    sub: "Node.js / Express — auth, rate limit, validation",
  },
  {
    id: "data",
    label: "Veri katmanı",
    sub: "PostgreSQL, Redis, Prisma / migration",
  },
  {
    id: "jobs",
    label: "Arka plan işleri",
    sub: "Kuyruklar, webhook’lar, cron, gözlemlenebilirlik",
  },
];

export function SystemArchitecture() {
  const [active, setActive] = useState<Layer>("api");

  return (
    <section
      id="architecture"
      className="relative px-4 py-24 sm:px-6"
      aria-labelledby="architecture-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,_hsl(var(--accent)/0.08),transparent_50%)]" />
      <motion.div
        className="container relative mx-auto max-w-6xl"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.div variants={fadeUp} className="mb-14 text-center">
          <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
            // full stack
          </p>
          <h2
            id="architecture-heading"
            className="font-display text-4xl font-semibold tracking-tight md:text-5xl"
          >
            <span className="text-gradient">Sistem </span>
            <span className="text-foreground">mimarisi</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Üretimde kullandığım tipik katmanları tek diyagramda birleştiriyorum: güvenli
            sınır, net API sözleşmesi, tutarlı şema ve izlenebilir operasyon.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="grid gap-8 lg:grid-cols-12 lg:items-stretch"
        >
          <div className="glass-strong relative overflow-hidden rounded-3xl p-8 lg:col-span-7">
            <svg
              viewBox="0 0 640 420"
              className="h-auto w-full text-foreground"
              role="img"
              aria-label="Katmanlı sistem mimarisi şeması"
            >
              <defs>
                <linearGradient id="archLine" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity="0.85" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <rect
                x="40"
                y="32"
                width="560"
                height="72"
                rx="20"
                className={cn(
                  "cursor-pointer transition-all duration-300",
                  active === "edge"
                    ? "fill-primary/15 stroke-primary/60"
                    : "fill-white/[0.04] stroke-white/10 hover:stroke-white/25",
                )}
                strokeWidth="1.5"
                onClick={() => setActive("edge")}
              />
              <text x="64" y="68" className="fill-current text-[15px] font-semibold">
                Edge — CDN / TLS / Client
              </text>
              <text x="64" y="92" className="fill-muted-foreground text-[12px]">
                Statik varlıklar, edge cache, güvenli transport
              </text>

              <motion.path
                d="M320 104 V132"
                stroke="url(#archLine)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="3 7"
                animate={{ strokeDashoffset: [0, -20] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
              />

              <rect
                x="40"
                y="132"
                width="560"
                height="88"
                rx="20"
                className={cn(
                  "cursor-pointer transition-all duration-300",
                  active === "api"
                    ? "fill-accent/15 stroke-accent/60"
                    : "fill-white/[0.04] stroke-white/10 hover:stroke-white/25",
                )}
                strokeWidth="1.5"
                onClick={() => setActive("api")}
              />
              <text x="64" y="172" className="fill-current text-[15px] font-semibold">
                API — REST / GraphQL / WebSocket
              </text>
              <text x="64" y="196" className="fill-muted-foreground text-[12px]">
                JWT/OAuth, Zod validation, idempotent işlemler
              </text>

              <motion.path
                d="M320 220 V248"
                stroke="url(#archLine)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="3 7"
                animate={{ strokeDashoffset: [0, -20] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "linear", delay: 0.2 }}
              />

              <rect
                x="40"
                y="248"
                width="360"
                height="88"
                rx="20"
                className={cn(
                  "cursor-pointer transition-all duration-300",
                  active === "data"
                    ? "fill-primary/15 stroke-primary/60"
                    : "fill-white/[0.04] stroke-white/10 hover:stroke-white/25",
                )}
                strokeWidth="1.5"
                onClick={() => setActive("data")}
              />
              <text x="64" y="288" className="fill-current text-[15px] font-semibold">
                PostgreSQL + migration
              </text>
              <text x="64" y="312" className="fill-muted-foreground text-[12px]">
                İlişkisel şema, indeksler, yedekleme
              </text>

              <rect
                x="420"
                y="248"
                width="180"
                height="88"
                rx="20"
                className={cn(
                  "cursor-pointer transition-all duration-300",
                  active === "data"
                    ? "fill-accent/12 stroke-accent/55"
                    : "fill-white/[0.04] stroke-white/10 hover:stroke-white/25",
                )}
                strokeWidth="1.5"
                onClick={() => setActive("data")}
              />
              <text x="444" y="288" className="fill-current text-[14px] font-semibold">
                Redis
              </text>
              <text x="444" y="312" className="fill-muted-foreground text-[11px]">
                Cache · session · rate limit
              </text>

              <motion.path
                d="M320 336 V364"
                stroke="url(#archLine)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeDasharray="3 7"
                animate={{ strokeDashoffset: [0, -20] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "linear", delay: 0.4 }}
              />

              <rect
                x="40"
                y="364"
                width="560"
                height="56"
                rx="18"
                className={cn(
                  "cursor-pointer transition-all duration-300",
                  active === "jobs"
                    ? "fill-tech-cyan/10 stroke-tech-cyan/50"
                    : "fill-white/[0.04] stroke-white/10 hover:stroke-white/25",
                )}
                strokeWidth="1.5"
                onClick={() => setActive("jobs")}
              />
              <text x="64" y="398" className="fill-current text-[14px] font-semibold">
                Workers — kuyruk, cron, webhook ingress
              </text>
            </svg>
          </div>

          <div className="flex flex-col gap-3 lg:col-span-5">
            {layers.map((l) => (
              <button
                key={l.id}
                type="button"
                data-cursor="pointer"
                onClick={() => setActive(l.id)}
                className={cn(
                  "rounded-2xl border px-5 py-4 text-left transition-all duration-300",
                  active === l.id
                    ? "glass-strong border-primary/35 shadow-[0_0_0_1px_hsl(var(--primary)/0.2)]"
                    : "glass border-white/5 hover:border-white/15",
                )}
              >
                <p className="font-medium tracking-tight">{l.label}</p>
                <p className="mt-1 text-sm text-muted-foreground">{l.sub}</p>
              </button>
            ))}
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
                className="glass mt-2 rounded-2xl border border-white/10 p-5 text-sm text-muted-foreground"
              >
                {active === "edge" &&
                  "Performans ve güvenlik sınırında çalışırım: HTTP/2, gzip/brotli, WAF kuralları ve önbellek stratejisi."}
                {active === "api" &&
                  "Sözleşmeyi netleştirir, hataları anlamlı döndürür ve gözlemlenebilirlik için yapılandırılmış loglar eklerim."}
                {active === "data" &&
                  "Normalizasyon, indeksleme ve migration disiplini; Redis ile sıcak veri ve oturum katmanı."}
                {active === "jobs" &&
                  "Uzun süren işleri API’den ayırır, tekrar deneme ve dead-letter ile dayanıklılık sağlarım."}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
