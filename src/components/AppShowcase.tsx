import { motion } from "framer-motion";
import { Car, MoonStar, HeartPulse, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { fadeUp, staggerContainer } from "@/lib/motion";

const DEVELOPER_URL = "https://apps.apple.com/tr/developer/emir-tiryaki/id1852537743";

const AppleGlyph = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
    <path d="M16.365 1.43c0 1.14-.42 2.2-1.12 2.99-.79.9-2.08 1.6-3.2 1.51-.13-1.09.42-2.24 1.09-2.98.76-.84 2.1-1.48 3.23-1.52zM20.5 17.2c-.55 1.27-.81 1.84-1.52 2.96-.99 1.56-2.39 3.51-4.12 3.52-1.54.02-1.94-1-4.03-.99-2.09.01-2.53 1.01-4.07.99-1.73-.02-3.05-1.78-4.04-3.34C-.29 16.02-.63 10.1 1.7 7.25 2.72 5.98 4.34 5.17 5.86 5.17c1.55 0 2.52 1 3.8 1 1.24 0 2-1 3.8-1 1.36 0 2.8.74 3.83 2.02-3.36 1.84-2.82 6.64.21 8.01z" />
  </svg>
);

type App = {
  name: string;
  tagline: string;
  Icon: typeof Car;
  tags: string[];
  url: string;
  live: boolean;
};

const apps: App[] = [
  {
    name: "CarLog",
    tagline:
      "Aracın bakım, yakıt ve resmi evrak bilgilerini tek yerden takip; satarken alıcıya rapor.",
    Icon: Car,
    tags: ["Swift", "SwiftUI", "iOS"],
    url: "https://apps.apple.com/tr/app/carlog/id6760318180",
    live: true,
  },
  {
    name: "Adhan — Namaz Vakti",
    tagline:
      "GPS veya manuel şehir seçimiyle hassas namaz vakitleri, bildirim ve modern arayüz.",
    Icon: MoonStar,
    tags: ["Swift", "SwiftUI", "iOS"],
    url: "https://apps.apple.com/tr/app/adhan/id6755198431",
    live: true,
  },
  {
    name: "Terapi Asistanı",
    tagline:
      "Göğüs terapisi cihazına bağlanıp seans yönetimi; HealthKit ile ilerleme takibi.",
    Icon: HeartPulse,
    tags: ["Swift", "HealthKit", "Bluetooth"],
    url: "https://therapy.vercel.app",
    live: false,
  },
];

const AppShowcase = () => {
  return (
    <section id="apps" className="relative px-4 py-24 sm:px-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-1/3 h-[320px] bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.06),transparent_65%)]" />

      <motion.div
        className="container relative mx-auto max-w-6xl"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.div
          variants={fadeUp}
          className="mb-14 flex flex-col items-center gap-6 text-center md:flex-row md:items-end md:justify-between md:text-left"
        >
          <div>
            <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
              // app store
            </p>
            <h2 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
              <span className="text-gradient">Yayınlanmış </span>
              <span className="text-foreground">uygulamalar</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground md:mx-0">
              Fikirden App Store yayınına kadar tek sorumlu olarak geliştirdiğim iOS uygulamaları.
            </p>
          </div>
          <a
            href={DEVELOPER_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="pointer"
            className="inline-flex shrink-0 items-center gap-2 rounded-2xl border border-white/15 bg-white/[0.03] px-4 py-2.5 text-sm font-medium backdrop-blur-md transition-colors hover:border-primary/30 hover:bg-white/[0.07]"
          >
            <AppleGlyph className="h-4 w-4" />
            Geliştirici sayfam
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3 lg:gap-5">
          {apps.map((app) => (
            <motion.a
              key={app.name}
              variants={fadeUp}
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="pointer"
              whileHover={{ y: -4, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } }}
              className="glass-strong group flex h-full flex-col rounded-3xl border border-white/10 p-6 transition-shadow duration-300 hover:border-primary/25 hover:shadow-[0_20px_50px_-20px_hsl(var(--primary)/0.3)]"
            >
              <div className="flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-primary">
                  <app.Icon className="h-7 w-7" strokeWidth={1.75} />
                </div>
                {app.live ? (
                  <Badge className="gap-1.5 rounded-lg border border-emerald-400/25 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-medium text-emerald-300">
                    <AppleGlyph className="h-3 w-3" />
                    App Store
                  </Badge>
                ) : (
                  <Badge
                    variant="secondary"
                    className="rounded-lg border border-white/10 bg-white/[0.05] px-2.5 py-1 text-[10px] font-medium text-muted-foreground"
                  >
                    Medikal · iOS
                  </Badge>
                )}
              </div>

              <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                {app.name}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {app.tagline}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {app.tags.map((t) => (
                  <Badge
                    key={t}
                    variant="outline"
                    className="rounded-lg border-white/10 bg-transparent px-2 py-0.5 text-[10px]"
                  >
                    {t}
                  </Badge>
                ))}
              </div>

              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                {app.live ? "App Store'da aç" : "Canlı demo"}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </motion.a>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default AppShowcase;
