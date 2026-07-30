import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { FileText, Mail, ArrowRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/BrandIcons";
import profileImage from "@/assets/emir-profile.jpg";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { cn, scrollToSection } from "@/lib/utils";

const tech = ["React", "Node.js", "TypeScript", "Swift", "PostgreSQL", "Docker", "AWS"];
const stats = [
  { value: "5+", label: "yıl" },
  { value: "40+", label: "proje" },
  { value: "3", label: "app store" },
];

/** Fare konumuna göre yumuşak 3B eğim (magnetic tilt). */
function useTilt(strength = 8) {
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 150, damping: 18 });
  const rotateY = useSpring(ry, { stiffness: 150, damping: 18 });

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * strength);
    rx.set(-py * strength);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };
  return { rotateX, rotateY, onMove, onLeave };
}

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // Scroll ilerledikçe içerik hafifçe yukarı süzülür ve soner (sinematik çıkış)
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const auroraY = useTransform(scrollYProgress, [0, 1], [0, 120]);

  const mainTilt = useTilt(7);
  const profileTilt = useTilt(9);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen overflow-hidden px-4 pb-24 pt-28 sm:px-6 sm:pt-32"
    >
      <motion.div className="aurora" aria-hidden style={{ y: auroraY }}>
        <div className="aurora-blob aurora-blob--1" />
        <div className="aurora-blob aurora-blob--2" />
        <div className="aurora-blob aurora-blob--3" />
      </motion.div>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(hsl(var(--foreground))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground))_1px,transparent_1px)] [background-size:46px_46px] [mask-image:radial-gradient(ellipse_75%_60%_at_50%_30%,black,transparent)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-background" />

      <motion.div
        className="container relative z-10 mx-auto max-w-6xl"
        style={{ y: contentY, opacity: contentOpacity }}
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="grid auto-rows-[minmax(120px,auto)] grid-cols-12 gap-4 md:gap-5">
          {/* Ana kart — 3B tilt */}
          <motion.div
            variants={fadeUp}
            onMouseMove={mainTilt.onMove}
            onMouseLeave={mainTilt.onLeave}
            style={{
              rotateX: mainTilt.rotateX,
              rotateY: mainTilt.rotateY,
              transformPerspective: 1200,
            }}
            className={cn(
              "glass-strong relative col-span-12 flex flex-col justify-center overflow-hidden rounded-3xl p-8 md:col-span-7 md:p-10",
              "border border-white/10 shadow-[0_1px_0_rgba(255,255,255,0.06)_inset] [transform-style:preserve-3d]",
            )}
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Yeni projelere açık
              </span>
              <p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                Full-Stack &amp; iOS Developer
              </p>
            </div>
            <h1 className="mt-4 font-display text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl md:leading-[1.02]">
              <span className="text-foreground">İsmail Emir </span>
              <span className="text-gradient-animated">Tiryaki</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Web ve mobilde uçtan uca ürün geliştiriyorum: piksel-hassas arayüzler, net API
              sözleşmeleri ve ölçeklenebilir backend. Fikirden App Store yayınına kadar tek elden.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                size="lg"
                className="rounded-2xl hero-gradient px-7 text-base font-medium shadow-lg shadow-primary/20"
                data-cursor="pointer"
                onClick={() => scrollToSection("contact")}
              >
                <Mail className="mr-2 h-5 w-5" />
                İletişime geç
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-2xl border-white/15 bg-white/[0.03] px-7 text-base font-medium backdrop-blur-md hover:bg-white/[0.07]"
                data-cursor="pointer"
                onClick={() => scrollToSection("projects")}
              >
                Projeler
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-2xl border-white/15 bg-white/[0.03] px-7 text-base font-medium backdrop-blur-md hover:bg-white/[0.07]"
                data-cursor="pointer"
                asChild
              >
                <a href="/cv.html" target="_blank" rel="noopener noreferrer">
                  <FileText className="mr-2 h-5 w-5" />
                  Özgeçmiş
                </a>
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">
              CV:{" "}
              <a href="/cv.html" target="_blank" rel="noopener noreferrer" className="underline decoration-white/20 underline-offset-4 transition-colors hover:text-foreground" data-cursor="pointer">
                Türkçe
              </a>{" "}
              ·{" "}
              <a href="/cv-en.html" target="_blank" rel="noopener noreferrer" className="underline decoration-white/20 underline-offset-4 transition-colors hover:text-foreground" data-cursor="pointer">
                English
              </a>
            </p>
          </motion.div>

          {/* Profil kartı — 3B tilt */}
          <motion.div
            variants={fadeUp}
            onMouseMove={profileTilt.onMove}
            onMouseLeave={profileTilt.onLeave}
            style={{
              rotateX: profileTilt.rotateX,
              rotateY: profileTilt.rotateY,
              transformPerspective: 1000,
            }}
            className="glass relative col-span-12 flex flex-col items-center justify-center rounded-3xl border border-white/10 p-8 md:col-span-5 [transform-style:preserve-3d]"
          >
            <div className="relative" style={{ transform: "translateZ(40px)" }}>
              <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-primary/30 to-accent/25 blur-2xl" />
              <img
                src={profileImage}
                alt="İsmail Emir Tiryaki"
                width={160}
                height={160}
                className="relative h-36 w-36 rounded-[2rem] border border-white/15 object-cover shadow-2xl md:h-40 md:w-40"
                decoding="async"
              />
            </div>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              İstanbul · Uzaktan &amp; hibrit iş birlikleri
            </p>
            <div className="mt-5 flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                aria-label="GitHub"
                className="h-11 w-11 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08]"
                data-cursor="pointer"
                onClick={() => window.open("https://github.com/emirirr", "_blank", "noopener,noreferrer")}
              >
                <GithubIcon className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="LinkedIn"
                className="h-11 w-11 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08]"
                data-cursor="pointer"
                onClick={() => window.open("https://www.linkedin.com/in/emir-tiryaki/", "_blank", "noopener,noreferrer")}
              >
                <LinkedinIcon className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                aria-label="E-posta"
                className="h-11 w-11 rounded-xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08]"
                data-cursor="pointer"
                onClick={() => window.open("mailto:info@emirtiryaki.com", "_blank")}
              >
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </motion.div>

          {/* Kanıt istatistikleri */}
          <motion.div variants={fadeUp} className="glass col-span-12 rounded-3xl border border-white/10 p-6 md:col-span-4">
            <p className="font-mono text-xs font-medium uppercase tracking-widest text-primary/80">
              // kanıt
            </p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-2xl font-semibold tabular-nums text-gradient md:text-3xl">
                    {s.value}
                  </div>
                  <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Yığın */}
          <motion.div variants={fadeUp} className="glass col-span-12 rounded-3xl border border-white/10 p-6 md:col-span-8">
            <p className="mb-4 font-mono text-xs font-medium uppercase tracking-widest text-primary/80">
              // yığın
            </p>
            <div className="flex flex-wrap gap-2">
              {tech.map((t) => (
                <span
                  key={t}
                  className="rounded-xl border border-white/5 bg-white/[0.06] px-3 py-1.5 font-mono text-xs font-medium backdrop-blur-sm transition-colors hover:border-primary/25 hover:bg-white/[0.1]"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
