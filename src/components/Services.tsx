import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Globe, Smartphone, Database, ShoppingCart, ArrowRight, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { scrollToSection } from "@/lib/utils";

type Service = {
  Icon: typeof Globe;
  title: string;
  description: string;
  points: string[];
  stack: string[];
};

const services: Service[] = [
  {
    Icon: Globe,
    title: "Web Geliştirme",
    description:
      "Kurumsal siteler, landing page ve web uygulamaları — hızlı, SEO uyumlu, ölçeklenebilir.",
    points: ["React / Next.js", "SEO & performans", "CMS & panel"],
    stack: ["React", "Next.js", "TypeScript"],
  },
  {
    Icon: Smartphone,
    title: "Mobil Uygulama",
    description:
      "iOS ve çapraz platform uygulamalar; fikirden App Store yayınına uçtan uca.",
    points: ["Swift / SwiftUI", "React Native / Expo", "App Store yayını"],
    stack: ["Swift", "React Native", "Firebase"],
  },
  {
    Icon: Database,
    title: "CRM & Kurumsal Sistem",
    description:
      "Müşteri, satış ve süreç yönetimi; rol bazlı paneller, raporlama ve entegrasyonlar.",
    points: ["Rol bazlı yetki", "Raporlama & dashboard", "API entegrasyon"],
    stack: ["Node.js", "PostgreSQL", "REST"],
  },
  {
    Icon: ShoppingCart,
    title: "E-ticaret",
    description:
      "Ürün vitrini, sepet ve ödeme akışları; dönüşüm odaklı, mobil öncelikli mağazalar.",
    points: ["Ürün & sipariş", "Ödeme entegrasyonu", "Yönetim paneli"],
    stack: ["React", "Node.js", "Stripe"],
  },
];

const Services = () => {
  return (
    <section id="services" className="relative px-4 py-24 sm:px-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <motion.div
        className="container relative mx-auto max-w-6xl"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.div variants={fadeUp} className="mb-14 text-center">
          <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
            // hizmetler
          </p>
          <h2 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
            <span className="text-gradient">Ne </span>
            <span className="text-foreground">sunuyorum</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Freelance projeler, ekip iş birlikleri ve uzun vadeli danışmanlık — uçtan uca teslim.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {services.map((s) => (
            <motion.div
              key={s.title}
              variants={fadeUp}
              whileHover={{ y: -4, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } }}
              className="glass flex h-full flex-col rounded-3xl border border-white/10 p-6 transition-colors hover:border-primary/25"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-primary">
                <s.Icon className="h-6 w-6" strokeWidth={1.75} />
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.description}
              </p>
              <ul className="mt-4 space-y-2">
                {s.points.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm text-foreground/90">
                    <Check className="h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} />
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-1.5 border-t border-white/10 pt-4">
                {s.stack.map((t) => (
                  <Badge
                    key={t}
                    variant="outline"
                    className="rounded-lg border-white/10 bg-transparent px-2 py-0.5 text-[10px]"
                  >
                    {t}
                  </Badge>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeUp}
          className="glass-strong relative mt-8 overflow-hidden rounded-3xl border border-white/10 p-8 md:p-10"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.14),transparent_55%)]" />
          <div className="relative flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
            <div>
              <h3 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
                Bir projeniz mi var?
              </h3>
              <p className="mt-2 max-w-xl text-muted-foreground">
                Fikrinizi yazın; kapsamı netleştirip en kısa sürede net bir yol haritası ve teklifle
                dönüş yapayım.
              </p>
            </div>
            <Button
              size="lg"
              className="shrink-0 rounded-2xl px-8 hero-gradient shadow-lg shadow-primary/20"
              data-cursor="pointer"
              onClick={() => scrollToSection("contact")}
            >
              İletişime geç
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Services;
