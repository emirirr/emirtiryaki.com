import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const SECTIONS = [
  { id: "about", label: "Hakkında" },
  { id: "skills", label: "Yetenekler" },
  { id: "work", label: "Projeler" },
  { id: "pazaryeri", label: "Ürün ailesi" },
  { id: "brands", label: "Markalar" },
];

/**
 * Ortak üst menü. Ana sayfada bölüm bağlantıları aynı sayfaya (#about),
 * diğer sayfalarda ana sayfaya (/#about) gider. 860px altında hamburger
 * paneli açılır — daha önce bağlantılar tamamen gizleniyordu.
 */
export function LpNav({ home = false }: { home?: boolean }) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

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

  const href = (id: string) => (home ? `#${id}` : `/#${id}`);

  return (
    <header className={"lp-top" + (open ? " is-open" : "")}>
      <div className="lp-top-inner">
        <Link className="lp-brand" to="/" onClick={() => setOpen(false)}>
          {/* Bas harf rozeti yok — duz kelime markasi. */}
          <span className="wm">Emir Tiryaki</span>
          <i className="dot" aria-hidden="true" />
        </Link>

        <nav className="lp-nav" aria-label="Ana menü">
          {SECTIONS.map((s) => (
            <a key={s.id} href={href(s.id)}>
              {s.label}
            </a>
          ))}
          <a className="lp-btn primary" href={href("contact")}>
            İletişime geç
          </a>
        </nav>

        <button
          type="button"
          className="lp-burger"
          aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={open}
          aria-controls="lp-mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div id="lp-mobile-menu" className="lp-mobile-menu" hidden={!open}>
        {SECTIONS.map((s) => (
          <a key={s.id} href={href(s.id)} onClick={() => setOpen(false)}>
            {s.label}
          </a>
        ))}
        <Link to="/projects" onClick={() => setOpen(false)}>
          Tüm projeler
        </Link>
        <a className="lp-btn primary" href={href("contact")} onClick={() => setOpen(false)}>
          İletişime geç
        </a>
      </div>
    </header>
  );
}
