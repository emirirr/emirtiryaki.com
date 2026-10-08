import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Star } from "lucide-react";
import profileImage from "@/assets/emir-profile.jpg";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { scrollToSection } from "@/lib/utils";
import { LiveSitePreview } from "@/components/LiveSitePreview";
import livePreview from "@/data/livePreview.json";

const TIRYAKI_URL = "https://tiryakiyazilim.com";

const trust = ["40+ teslim edilmiş proje", "App Store & Google Play'de yayında", "24 saat içinde dönüş"];

const stats = [
  { value: "5+", label: "Yıl deneyim" },
  { value: "40+", label: "Tamamlanan proje" },
  { value: "8", label: "Mağazada uygulama" },
  { value: "6+", label: "Farklı sektör" },
];

const clients = [
  "Heybe",
  "Kortbul",
  "daCAR",
  "Klinik Takip",
  "Kuta",
  "Odak Software",
  "Karaca Yapı",
  "AvtoUzbek",
  "Marocar",
  "NaijaCar",
  "BharatKaar",
  "AvtoBozor",
  "Satılık",
  "İnda Otomasyon",
  "Tiryaki Yazılım",
  "CarLog",
  "Adhan",
];

const Hero = () => {
  return (
    <section id="hero" className="relative overflow-hidden px-4 pb-0 pt-28 sm:px-6 md:pt-36">
      <div className="bg-dots pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000_30%,transparent_75%)]" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-primary/[0.07] blur-3xl" />

      <motion.div
        className="relative mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-10"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <div>
          <motion.span variants={fadeUp} className="eyebrow">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            Yeni projelere açık · İstanbul
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mt-5 font-display text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-[4.1rem]"
          >
            Fikirden yayına,{" "}
            <span className="text-primary">uçtan uca</span> dijital ürünler.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            Ben <strong className="font-semibold text-foreground">İsmail Emir Tiryaki</strong>.
            Web sitesi, mobil uygulama ve yönetim paneli geliştiriyorum. Arayüzü, backend'i ve App
            Store yayınını tek başıma üstleniyorum.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              className="h-12 rounded-lg px-6 text-[15px] font-semibold shadow-[0_8px_24px_-10px_hsl(var(--primary)/0.7)]"
              onClick={() => scrollToSection("projects")}
            >
              Projeleri incele
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-lg px-6 text-[15px] font-semibold"
              onClick={() => scrollToSection("contact")}
            >
              Ücretsiz ön görüşme
            </Button>
          </motion.div>

          <motion.ul variants={fadeUp} className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
            {trust.map((t) => (
              <li key={t} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-primary" strokeWidth={2.5} />
                {t}
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Görsel: gerçek bir iş ekranı + yüzen bilgi kartları */}
        <motion.div variants={fadeUp} className="relative mx-auto w-full max-w-[560px] lg:mr-0">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_40px_80px_-32px_hsl(218_60%_25%/0.35)]">
            <div className="flex items-center gap-1.5 border-b border-border bg-surface px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 flex min-w-0 flex-1 items-center gap-2 rounded-md bg-background px-3 py-1 text-[11px] font-medium text-muted-foreground">
                <span className="truncate">tiryakiyazilim.com</span>
                <span className="ml-auto flex shrink-0 items-center gap-1 text-success">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success" />
                  </span>
                  canlı
                </span>
              </span>
            </div>
            <LiveSitePreview
              url={TIRYAKI_URL}
              poster="/portfolio/images/tiryakiyazilim-live.png"
              title="Tiryaki Yazılım"
              live={livePreview.enabled}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="card-surface absolute -bottom-8 -left-3 flex items-center gap-3 p-3 pr-5 sm:-left-8"
          >
            <img
              src={profileImage}
              alt="İsmail Emir Tiryaki"
              width={48}
              height={48}
              className="h-12 w-12 rounded-xl object-cover"
            />
            <div>
              <p className="text-sm font-bold text-foreground">İsmail Emir Tiryaki</p>
              <p className="flex items-center gap-1.5 text-xs font-medium text-success">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                Projelere müsait
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="card-surface absolute -right-2 -top-6 hidden items-center gap-3 p-3 pr-4 sm:flex md:-right-6"
          >
            <div className="flex -space-x-2">
              {["/apps/heybe.jpg", "/apps/kortbul.png", "/apps/carlog.jpg", "/apps/dacar.png"].map((src) => (
                <img
                  key={src}
                  src={src}
                  alt=""
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-lg border-2 border-card object-cover"
                />
              ))}
            </div>
            <div>
              <p className="text-xs font-bold text-foreground">Mağazada yayında</p>
              <p className="flex items-center gap-0.5 text-[11px] text-muted-foreground">
                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                8 uygulama · App Store & Google Play
              </p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Rakam şeridi */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto mt-24 grid max-w-6xl grid-cols-2 divide-border rounded-2xl border border-border bg-card md:grid-cols-4 md:divide-x"
        style={{ boxShadow: "var(--shadow-card)" }}
      >
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={
              "px-6 py-6 text-center md:py-7 " +
              (i < 2 ? "border-b border-border md:border-b-0 " : "") +
              (i % 2 === 0 ? "border-r border-border md:border-r-0" : "")
            }
          >
            <div className="font-display text-3xl font-extrabold tracking-tight text-primary md:text-4xl">
              {s.value}
            </div>
            <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Teslim edilen işler — kayan şerit */}
      <div className="relative mx-auto mt-14 max-w-6xl pb-16">
        <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          Geliştirdiğim ürünlerden bazıları
        </p>
        <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
          <div className="animate-marquee flex w-max gap-12">
            {[...clients, ...clients].map((c, i) => (
              <span
                key={`${c}-${i}`}
                className="whitespace-nowrap text-lg font-bold tracking-tight text-foreground/35"
                aria-hidden={i >= clients.length}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
