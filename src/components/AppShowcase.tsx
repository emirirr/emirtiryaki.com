import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { fadeUp, staggerContainer } from "@/lib/motion";

const DEVELOPER_URL = "https://apps.apple.com/tr/developer/emir-tiryaki/id1852537743";

const AppleGlyph = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
    <path d="M16.365 1.43c0 1.14-.42 2.2-1.12 2.99-.79.9-2.08 1.6-3.2 1.51-.13-1.09.42-2.24 1.09-2.98.76-.84 2.1-1.48 3.23-1.52zM20.5 17.2c-.55 1.27-.81 1.84-1.52 2.96-.99 1.56-2.39 3.51-4.12 3.52-1.54.02-1.94-1-4.03-.99-2.09.01-2.53 1.01-4.07.99-1.73-.02-3.05-1.78-4.04-3.34C-.29 16.02-.63 10.1 1.7 7.25 2.72 5.98 4.34 5.17 5.86 5.17c1.55 0 2.52 1 3.8 1 1.24 0 2-1 3.8-1 1.36 0 2.8.74 3.83 2.02-3.36 1.84-2.82 6.64.21 8.01z" />
  </svg>
);

const PlayGlyph = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
    <path d="M3.6 2.3c-.3.2-.5.6-.5 1.1v17.2c0 .5.2.9.5 1.1l9.2-9.7L3.6 2.3zm11 8.4 2.6-2.7L6.4 1.8c-.4-.2-.8-.2-1.1-.1l9.3 9zm0 2.6-9.3 9c.3.1.7.1 1.1-.1l10.8-6.2-2.6-2.7zm5.9-3.3-2.3-1.3-2.9 3 2.9 3 2.3-1.3c.9-.5.9-1.9 0-2.4z" />
  </svg>
);

type App = {
  name: string;
  tagline: string;
  icon: string;
  tags: string[];
  url: string;
  platform: "ios" | "android";
};

const apps: App[] = [
  {
    name: "CarLog",
    tagline:
      "Aracın bakım, yakıt ve resmî evrak bilgilerini tek yerden takip; satarken alıcıya rapor.",
    icon: "/apps/carlog.jpg",
    tags: ["Swift", "SwiftUI", "iOS"],
    url: "https://apps.apple.com/tr/app/carlog/id6760318180",
    platform: "ios",
  },
  {
    name: "Adhan — Namaz Vakti",
    tagline:
      "GPS veya manuel şehir seçimiyle hassas namaz vakitleri, bildirim ve sade, modern arayüz.",
    icon: "/apps/adhan.jpg",
    tags: ["Swift", "SwiftUI", "iOS"],
    url: "https://apps.apple.com/tr/app/adhan/id6755198431",
    platform: "ios",
  },
  {
    name: "daCAR",
    tagline:
      "Senegal için uçtan uca araç pazaryeri: ilan yayınlama, gelişmiş arama ve doğrulanmış satıcılar.",
    icon: "/apps/dacar.png",
    tags: ["React Native", "Expo", "Supabase"],
    url: "https://play.google.com/store/apps/details?id=com.ismailtiryaki.dacar",
    platform: "android",
  },
];

const platformMeta = {
  ios: {
    label: "App Store",
    Glyph: AppleGlyph,
    badge: "border-sky-400/25 bg-sky-400/10 text-sky-300",
    cta: "App Store'da aç",
  },
  android: {
    label: "Google Play",
    Glyph: PlayGlyph,
    badge: "border-emerald-400/25 bg-emerald-400/10 text-emerald-300",
    cta: "Play Store'da aç",
  },
} as const;

const AppShowcase = () => {
  return (
    <section id="apps" className="relative px-4 py-24 sm:px-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-1/3 h-[340px] bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.07),transparent_65%)]" />

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
              // mağazada yayında
            </p>
            <h2 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
              <span className="text-gradient">Yayınlanmış </span>
              <span className="text-foreground">uygulamalar</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground md:mx-0">
              Fikirden mağaza yayınına kadar tek sorumlu olarak geliştirdiğim, App Store ve Google
              Play'de canlı uygulamalar.
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
            App Store geliştirici sayfam
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3 lg:gap-5">
          {apps.map((app) => {
            const meta = platformMeta[app.platform];
            return (
              <motion.a
                key={app.name}
                variants={fadeUp}
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="pointer"
                whileHover={{ y: -4, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } }}
                className="glass-strong group flex h-full flex-col rounded-3xl border border-white/10 p-6 transition-shadow duration-300 hover:border-primary/25 hover:shadow-[0_24px_60px_-24px_hsl(var(--primary)/0.4)]"
              >
                <div className="flex items-start justify-between gap-3">
                  <img
                    src={app.icon}
                    alt={`${app.name} uygulama simgesi`}
                    width={64}
                    height={64}
                    loading="lazy"
                    decoding="async"
                    className="h-16 w-16 rounded-[22%] border border-white/15 object-cover shadow-lg shadow-black/40"
                  />
                  <Badge
                    className={`gap-1.5 rounded-lg border px-2.5 py-1 text-[10px] font-medium ${meta.badge}`}
                  >
                    <meta.Glyph className="h-3 w-3" />
                    {meta.label}
                  </Badge>
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
                  {meta.cta}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </motion.a>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default AppShowcase;
