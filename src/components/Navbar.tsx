import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, scrollToSection } from "@/lib/utils";
import { BrandMark } from "@/components/BrandMark";
import { Link } from "react-router-dom";
import { homePath, useLang, useT } from "@/i18n/lang";

const links = [
  { id: "projects", tr: "Projeler", en: "Projects" },
  { id: "apps", tr: "Uygulamalar", en: "Apps" },
  { id: "services", tr: "Hizmetler", en: "Services" },
  { id: "experience", tr: "Deneyim", en: "Experience" },
  { id: "brands", tr: "Markalar", en: "Brands" },
  { id: "contact", tr: "İletişim", en: "Contact" },
];

/** TR/EN geçişi — aynı bölüm kimlikleri iki dilde de geçerli. */
function LangSwitch({ className }: { className?: string }) {
  const lang = useLang();
  return (
    <div className={cn("flex h-9 items-center rounded-lg border border-border p-0.5 text-xs font-bold", className)}>
      {(["tr", "en"] as const).map((l) => (
        <Link
          key={l}
          to={homePath(l)}
          hrefLang={l}
          aria-current={lang === l ? "true" : undefined}
          className={cn(
            "flex h-full items-center rounded-md px-2.5 uppercase transition-colors",
            lang === l ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {l}
        </Link>
      ))}
    </div>
  );
}

export function Logo({ className }: { className?: string }) {
  const lang = useLang();
  const home = homePath(lang);
  return (
    <a
      href={`${home}#hero`}
      onClick={(e) => {
        if (window.location.pathname === home) {
          e.preventDefault();
          scrollToSection("hero");
        }
      }}
      className={cn("flex items-center gap-2.5", className)}
      aria-label={lang === "en" ? "İsmail Emir Tiryaki — home" : "İsmail Emir Tiryaki — ana sayfa"}
    >
      <BrandMark blink className="h-9 w-9" />
      <span className="leading-tight">
        <span className="block text-[15px] font-bold tracking-tight text-foreground">
          Emir Tiryaki
        </span>
        <span className="block text-[11px] font-medium text-muted-foreground">
          {lang === "en" ? "Full-Stack & Mobile Developer" : "Full-Stack & Mobil Geliştirici"}
        </span>
      </span>
    </a>
  );
}

const Navbar = () => {
  const lang = useLang();
  const t = useT();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["hero", ...links.map((l) => l.id)];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b bg-background/85 backdrop-blur-xl transition-[border-color,box-shadow] duration-300",
        scrolled ? "border-border shadow-[0_1px_12px_-6px_hsl(222_47%_9%/0.12)]" : "border-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((link) => (
            <li key={link.id}>
              <button
                type="button"
                onClick={() => go(link.id)}
                className={cn(
                  "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active === link.id
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {link[lang]}
                {active === link.id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-3 -bottom-[13px] h-0.5 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <LangSwitch className="hidden sm:flex" />
          <Button
            variant="outline"
            size="sm"
            className="hidden h-9 rounded-lg sm:inline-flex"
            asChild
          >
            <a href={t("/cv.html", "/cv-en.html")} target="_blank" rel="noopener noreferrer">
              CV
            </a>
          </Button>
          <Button
            size="sm"
            className="hidden h-9 rounded-lg px-4 font-semibold sm:inline-flex"
            onClick={() => go("contact")}
          >
            {t("Teklif al", "Get a quote")}
          </Button>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? t("Menüyü kapat", "Close menu") : t("Menüyü aç", "Open menu")}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-border bg-background lg:hidden"
          >
            <ul className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
              {links.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => go(link.id)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-[15px] font-medium text-foreground hover:bg-secondary"
                  >
                    {link[lang]}
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                </li>
              ))}
              <li className="mt-2 grid grid-cols-[auto_1fr_1fr] gap-2 border-t border-border pt-3">
                <LangSwitch className="h-10" />
                <Button variant="outline" className="rounded-lg" asChild>
                  <a href={t("/cv.html", "/cv-en.html")} target="_blank" rel="noopener noreferrer">
                    {t("Özgeçmiş", "Resume")}
                  </a>
                </Button>
                <Button className="rounded-lg font-semibold" onClick={() => go("contact")}>
                  {t("Teklif al", "Get a quote")}
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
