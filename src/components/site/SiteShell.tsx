import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Github, Instagram, Linkedin, Menu, Search, X, Youtube } from "lucide-react";
import { CONTACT, SOCIALS } from "@/data/profile";
import { CommandPalette } from "./CommandPalette";
import { NAV_SECTIONS, SECTIONS } from "./sections";
import { openPalette, useGoSection, useScrollProgress, useScrollSpy } from "./useSite";
import "@/styles/site.css";

const SECTION_IDS = SECTIONS.map((s) => s.id);
const SOCIAL_ICON = { github: Github, linkedin: Linkedin, instagram: Instagram, youtube: Youtube } as const;

/**
 * Tüm sayfaları saran kabuk: sabit üst menü (bölüm bağlantıları + arama + CV +
 * iletişim), mobil menü, alt bilgi ve Ctrl/⌘K komut paleti.
 */
export function SiteShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const home = pathname === "/";
  const go = useGoSection();
  const active = useScrollSpy(SECTION_IDS, home);
  const progress = useScrollProgress();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const goto = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    go(id);
  };

  return (
    <div className="s-root">
      <div className="s-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />

      <header className={"s-nav" + (scrolled || open ? " is-scrolled" : "")}>
        <div className="s-nav-in">
          <Link to="/" className="s-brand" aria-label="Emir Tiryaki — ana sayfa" onClick={() => setOpen(false)}>
            <span className="wm">Emir Tiryaki</span>
            <i className="dot" aria-hidden="true" />
          </Link>

          <nav className="s-links" aria-label="Ana menü">
            {NAV_SECTIONS.map((s) => (
              <a key={s.id} href={`/#${s.id}`} onClick={goto(s.id)} className={active === s.id ? "on" : undefined}>
                {active === s.id ? <motion.span layoutId="s-nav-pill" className="pill" transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} /> : null}
                <span className="t">{s.label}</span>
              </a>
            ))}
            <Link to="/projects" className={pathname.startsWith("/projects") || pathname.startsWith("/is/") ? "on" : undefined}>
              {pathname.startsWith("/projects") || pathname.startsWith("/is/") ? <span className="pill" /> : null}
              <span className="t">Tüm işler</span>
            </Link>
          </nav>

          <div className="s-nav-r">
            <button type="button" className="s-search" onClick={openPalette} aria-label="Ara (Ctrl+K)">
              <Search size={15} aria-hidden="true" />
              <span className="lbl">Ara</span>
              <kbd>Ctrl K</kbd>
            </button>
            <a href={`/#contact`} onClick={goto("contact")} className="s-btn primary sm s-hide-m">
              Proje başlat
            </a>
            <button
              type="button"
              className="s-burger"
              aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={open}
              aria-controls="s-mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open ? (
            <motion.nav
              id="s-mobile-menu"
              className="s-mmenu"
              aria-label="Mobil menü"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {NAV_SECTIONS.map((s) => (
                <a key={s.id} href={`/#${s.id}`} onClick={goto(s.id)}>
                  {s.label}
                </a>
              ))}
              <Link to="/projects" onClick={() => setOpen(false)}>
                Tüm işler
              </Link>
              <div className="row">
                <a className="s-btn ghost" href={CONTACT.cv} target="_blank" rel="noopener noreferrer">
                  CV
                </a>
                <a className="s-btn primary" href="/#contact" onClick={goto("contact")}>
                  Proje başlat
                </a>
              </div>
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </header>

      <div className="s-page">{children}</div>

      <footer className="s-footer">
        <div className="s-wrap s-foot-grid">
          <div>
            <Link to="/" className="s-brand">
              <span className="wm">Emir Tiryaki</span>
              <i className="dot" aria-hidden="true" />
            </Link>
            <p className="note">
              Full Stack Developer · İstanbul
              <br />
              Web ve mobil için uçtan uca ürün geliştiriyorum.
            </p>
            <div className="s-socials">
              {SOCIALS.map((s) => {
                const I = SOCIAL_ICON[s.key];
                return (
                  <a key={s.key} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                    <I size={17} />
                  </a>
                );
              })}
            </div>
          </div>
          <div className="col">
            <div className="lbl">Site</div>
            {NAV_SECTIONS.map((s) => (
              <a key={s.id} href={`/#${s.id}`} onClick={goto(s.id)}>
                {s.label}
              </a>
            ))}
            <Link to="/projects">Tüm işler</Link>
          </div>
          <div className="col">
            <div className="lbl">İletişim</div>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
            <span>{CONTACT.city}</span>
            <a href={CONTACT.cv} target="_blank" rel="noopener noreferrer">
              CV ↗
            </a>
          </div>
        </div>
        <div className="s-wrap s-foot-bottom">
          <span>© {new Date().getFullYear()} {CONTACT.name}</span>
          <button type="button" onClick={openPalette} className="hint">
            İpucu: <kbd>Ctrl</kbd> <kbd>K</kbd> ile her yere atla
          </button>
        </div>
      </footer>

      <CommandPalette />
    </div>
  );
}
