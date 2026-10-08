import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, scrollToSection } from "@/lib/utils";
import { BrandMark } from "@/components/BrandMark";

const links = [
  { id: "projects", label: "Projeler" },
  { id: "apps", label: "Uygulamalar" },
  { id: "services", label: "Hizmetler" },
  { id: "experience", label: "Deneyim" },
  { id: "brands", label: "Markalar" },
  { id: "contact", label: "İletişim" },
];

export function Logo({ className }: { className?: string }) {
  return (
    <a
      href="/#hero"
      onClick={(e) => {
        if (window.location.pathname === "/") {
          e.preventDefault();
          scrollToSection("hero");
        }
      }}
      className={cn("flex items-center gap-2.5", className)}
      aria-label="İsmail Emir Tiryaki — ana sayfa"
    >
      <BrandMark blink className="h-9 w-9" />
      <span className="leading-tight">
        <span className="block text-[15px] font-bold tracking-tight text-foreground">
          Emir Tiryaki
        </span>
        <span className="block text-[11px] font-medium text-muted-foreground">
          Full-Stack & iOS Developer
        </span>
      </span>
    </a>
  );
}

const Navbar = () => {
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
                {link.label}
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
          <Button
            variant="outline"
            size="sm"
            className="hidden h-9 rounded-lg sm:inline-flex"
            asChild
          >
            <a href="/cv.html" target="_blank" rel="noopener noreferrer">
              CV
            </a>
          </Button>
          <Button
            size="sm"
            className="hidden h-9 rounded-lg px-4 font-semibold sm:inline-flex"
            onClick={() => go("contact")}
          >
            Teklif al
          </Button>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
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
                    {link.label}
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </button>
                </li>
              ))}
              <li className="mt-2 grid grid-cols-2 gap-2 border-t border-border pt-3">
                <Button variant="outline" className="rounded-lg" asChild>
                  <a href="/cv.html" target="_blank" rel="noopener noreferrer">
                    Özgeçmiş
                  </a>
                </Button>
                <Button className="rounded-lg font-semibold" onClick={() => go("contact")}>
                  Teklif al
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
