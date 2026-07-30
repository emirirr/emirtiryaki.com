import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn, scrollToSection } from "@/lib/utils";

const links = [
  { id: "skills", label: "Yetenekler" },
  { id: "experience", label: "Deneyim" },
  { id: "projects", label: "Projeler" },
  { id: "apps", label: "Uygulamalar" },
  { id: "services", label: "Hizmetler" },
  { id: "contact", label: "İletişim" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <nav
        className={cn(
          "liquid-interactive flex items-center gap-1 rounded-full border border-white/10 p-1.5 transition-all duration-300",
          scrolled ? "glass-strong shadow-lg shadow-black/30" : "glass",
        )}
      >
        <button
          type="button"
          onClick={() => scrollToSection("hero")}
          data-cursor="pointer"
          className="ml-1.5 mr-1 rounded-full px-2.5 py-1.5 font-display text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-primary"
          aria-label="Başa dön"
        >
          ET
        </button>
        <div className="hidden items-center gap-0.5 sm:flex">
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => scrollToSection(link.id)}
              data-cursor="pointer"
              className={cn(
                "relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
                active === link.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {active === link.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full bg-white/10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{link.label}</span>
            </button>
          ))}
        </div>
        <Button
          size="sm"
          className="ml-1 rounded-full hero-gradient px-4 text-sm font-medium shadow-md shadow-primary/20"
          data-cursor="pointer"
          onClick={() => scrollToSection("contact")}
        >
          İletişime geç
        </Button>
      </nav>
    </motion.header>
  );
};

export default Navbar;
