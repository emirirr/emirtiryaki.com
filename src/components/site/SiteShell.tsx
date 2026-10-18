import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Github, Instagram, Linkedin, Menu, Search, X, Youtube } from "lucide-react";
import { CONTACT, SOCIALS } from "@/data/profile";
import { homePath, useLang, useT } from "@/i18n/lang";
import { trackEvent } from "@/lib/analytics";
import { CommandPalette } from "./CommandPalette";
import { NAV_SECTIONS, SECTIONS } from "./sections";
import { openPalette, sectionHref, useGoSection, useScrollProgress, useScrollSpy } from "./useSite";
import "@/styles/site.css";

const SECTION_IDS = SECTIONS.map((s) => s.id);
const SOCIAL_ICON = { github: Github, linkedin: Linkedin, instagram: Instagram, youtube: Youtube } as const;

/**
 * Tüm sayfaları saran kabuk: sabit üst menü (bölüm bağlantıları + arama + CV +
 * iletişim), mobil menü, alt bilgi ve Ctrl/⌘K komut paleti.
 */
export function SiteShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const lang = useLang();
  const t = useT();
  const homeHref = homePath(lang);
  const home = pathname === homeHref;
  const onWork = pathname.startsWith("/projects") || pathname.startsWith("/is/");
  // Dil düğmesi: ana sayfada TR <-> EN eşi; diğer sayfalar yalnız Türkçe, İngilizce ana sayfaya gider.
  const otherLang = lang === "en" ? { href: "/", label: "TR", name: "Türkçe" } : { href: "/en", label: "EN", name: "English" };
  const cv = CONTACT.cv[lang];
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
          <Link to={homeHref} className="s-brand" aria-label={t("Emir Tiryaki — ana sayfa", "Emir Tiryaki — home")} onClick={() => setOpen(false)}>
            <span className="wm">Emir Tiryaki</span>
            <i className="dot" aria-hidden="true" />
          </Link>

          <nav className="s-links" aria-label={t("Ana menü", "Main menu")}>
            {NAV_SECTIONS.map((s) => (
              <a key={s.id} href={sectionHref(pathname, s.id)} onClick={goto(s.id)} className={active === s.id ? "on" : undefined}>
                {active === s.id ? <motion.span layoutId="s-nav-pill" className="pill" transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} /> : null}
                <span className="t">{s.label[lang]}</span>
              </a>
            ))}
            <Link to="/projects" className={onWork ? "on" : undefined}>
              {onWork ? <span className="pill" /> : null}
              <span className="t">{t("Tüm işler", "All work")}</span>
            </Link>
          </nav>

          <div className="s-nav-r">
            <Link to={otherLang.href} className="s-lang" hrefLang={otherLang.label.toLowerCase()} aria-label={otherLang.name}>
              {otherLang.label}
            </Link>
            <button type="button" className="s-search" onClick={openPalette} aria-label={t("Ara (Ctrl+K)", "Search (Ctrl+K)")}>
              <Search size={15} aria-hidden="true" />
              <span className="lbl">{t("Ara", "Search")}</span>
              <kbd>Ctrl K</kbd>
            </button>
            <a href={sectionHref(pathname, "contact")} onClick={goto("contact")} className="s-btn primary sm s-hide-m">
              {t("Proje başlat", "Start a project")}
            </a>
            <button
              type="button"
              className="s-burger"
              aria-label={open ? t("Menüyü kapat", "Close menu") : t("Menüyü aç", "Open menu")}
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
              aria-label={t("Mobil menü", "Mobile menu")}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {NAV_SECTIONS.map((s) => (
                <a key={s.id} href={sectionHref(pathname, s.id)} onClick={goto(s.id)}>
                  {s.label[lang]}
                </a>
              ))}
              <Link to="/projects" onClick={() => setOpen(false)}>
                {t("Tüm işler", "All work")}
              </Link>
              <Link to={otherLang.href} onClick={() => setOpen(false)} hrefLang={otherLang.label.toLowerCase()}>
                {otherLang.name}
              </Link>
              <div className="row">
                <a className="s-btn ghost" href={cv} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("cv-ac")}>
                  CV
                </a>
                <a className="s-btn primary" href={sectionHref(pathname, "contact")} onClick={goto("contact")}>
                  {t("Proje başlat", "Start a project")}
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
            <Link to={homeHref} className="s-brand">
              <span className="wm">Emir Tiryaki</span>
              <i className="dot" aria-hidden="true" />
            </Link>
            <p className="note">
              {t("Full-Stack & Mobil Geliştirici · İstanbul", "Full-Stack & Mobile Developer · Istanbul")}
              <br />
              {t("Web ve mobil için uçtan uca ürün geliştiriyorum.", "I build web and mobile products end to end.")}
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
              <a key={s.id} href={sectionHref(pathname, s.id)} onClick={goto(s.id)}>
                {s.label[lang]}
              </a>
            ))}
            <Link to="/projects">{t("Tüm işler", "All work")}</Link>
          </div>
          <div className="col">
            <div className="lbl">{t("İletişim", "Contact")}</div>
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
            <span>{CONTACT.city[lang]}</span>
            <a href={cv} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("cv-ac")}>
              CV ↗
            </a>
          </div>
        </div>
        <div className="s-wrap s-foot-bottom">
          <span>© {new Date().getFullYear()} {CONTACT.name}</span>
          <button type="button" onClick={openPalette} className="hint">
            {t("İpucu:", "Tip:")} <kbd>Ctrl</kbd> <kbd>K</kbd> {t("ile her yere atla", "to jump anywhere")}
          </button>
        </div>
      </footer>

      <CommandPalette />
    </div>
  );
}
