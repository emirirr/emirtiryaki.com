import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CornerDownLeft, FileText, FolderOpen, Hash, Link2, Search, Zap, type LucideIcon } from "lucide-react";
import { toast } from "sonner";
import { all, slugOf } from "@/lib/portfolioMock";
import { CONTACT, SOCIALS } from "@/data/profile";
import { SECTIONS } from "./sections";
import { useLang, useT } from "@/i18n/lang";
import { trackEvent } from "@/lib/analytics";
import { SITE_EVENTS, toggleTerminal, useGoSection } from "./useSite";

const GROUP_EN: Record<string, string> = {
  Bölümler: "Sections",
  Sayfalar: "Pages",
  Projeler: "Projects",
  Eylemler: "Actions",
  Bağlantılar: "Links",
};

const GROUP_ICON: Record<string, LucideIcon> = {
  Bölümler: Hash,
  Sayfalar: FolderOpen,
  Projeler: FileText,
  Eylemler: Zap,
  Bağlantılar: Link2,
};

type Item = {
  id: string;
  group: string;
  label: string;
  hint?: string;
  run: () => void;
};

/** Türkçe karakterleri sadeleştirip küçük harfe çevirir — "ozbek" yazınca "Özbek" bulunsun. */
const norm = (s: string) =>
  s
    .toLocaleLowerCase("tr")
    .replace(/ı/g, "i")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

/**
 * VS Code'daki "Go to file" paleti: Ctrl/⌘+K veya "/" ile açılır.
 * Bölümler, tüm proje sayfaları ve birkaç eylem tek listede aranır.
 */
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const goSection = useGoSection();
  const lang = useLang();
  const t = useT();

  const items = useMemo<Item[]>(
    () => [
      ...SECTIONS.map((f) => ({
        id: "s-" + f.id,
        group: "Bölümler",
        label: f.label[lang],
        hint: "#" + f.id,
        run: () => goSection(f.id),
      })),
      {
        id: "p-all",
        group: "Sayfalar",
        label: t("Tüm projeler", "All projects"),
        hint: "/projects",
        run: () => navigate("/projects"),
      },
      ...all.map((p) => ({
        id: "p-" + p.imageKey,
        group: "Projeler",
        label: p.title,
        hint: p.category,
        run: () => navigate(`/is/${slugOf(p)}`),
      })),
      {
        id: "a-cv",
        group: "Eylemler",
        label: t("CV'yi aç", "Open resume"),
        hint: "cv.html",
        run: () => (trackEvent("cv-ac"), window.open(CONTACT.cv[lang], "_blank", "noopener")),
      },
      {
        id: "a-mail",
        group: "Eylemler",
        label: t("E-posta adresini kopyala", "Copy email address"),
        hint: CONTACT.email,
        run: () =>
          navigator.clipboard
            ?.writeText(CONTACT.email)
            .then(() => toast.success(t("E-posta kopyalandı", "Email copied"), { description: CONTACT.email }))
            .catch(() => (window.location.href = `mailto:${CONTACT.email}`)),
      },
      {
        id: "a-term",
        group: "Eylemler",
        label: t("Terminali aç", "Open terminal"),
        hint: "Ctrl+Shift+`",
        run: toggleTerminal,
      },
      ...SOCIALS.map((s) => ({
        id: "a-" + s.key,
        group: "Bağlantılar",
        label: s.label,
        hint: s.handle,
        run: () => window.open(s.href, "_blank", "noopener"),
      })),
    ],
    [goSection, navigate, lang, t],
  );

  const results = useMemo(() => {
    const t = norm(q.trim());
    if (!t) return items.filter((i) => i.group !== "Projeler").concat(items.filter((i) => i.group === "Projeler").slice(0, 6));
    return items.filter((i) => norm(i.label + " " + (i.hint ?? "")).includes(t)).slice(0, 40);
  }, [q, items]);

  useEffect(() => setSel(0), [q]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      const typing = t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "/" && !typing) {
        e.preventDefault();
        setOpen(true);
      }
    };
    const onEvt = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(SITE_EVENTS.palette, onEvt);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(SITE_EVENTS.palette, onEvt);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    setQ("");
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-i="${sel}"]`)?.scrollIntoView({ block: "nearest" });
  }, [sel]);

  const pick = (i: Item | undefined) => {
    if (!i) return;
    setOpen(false);
    // Kapanış animasyonu sayfa kaydırmasını kesmesin.
    requestAnimationFrame(() => i.run());
  };

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSel((s) => Math.min(results.length - 1, s + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSel((s) => Math.max(0, s - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      pick(results[sel]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  let lastGroup = "";

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="s-pal-back"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
        >
          <motion.div
            className="s-pal"
            role="dialog"
            aria-modal="true"
            aria-label={t("Dosyaya git", "Go to")}
            initial={{ opacity: 0, y: -14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="s-pal-in">
              <Search size={15} aria-hidden="true" />
              <input
                ref={inputRef}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={onInputKey}
                placeholder={t("Bölüm, proje veya eylem ara…", "Search sections, projects or actions…")}
                aria-label={t("Ara", "Search")}
                role="combobox"
                aria-expanded="true"
                aria-controls="s-pal-list"
                aria-activedescendant={results[sel] ? "pal-" + results[sel].id : undefined}
              />
              <kbd>Esc</kbd>
            </div>
            <div className="s-pal-list" id="s-pal-list" role="listbox" ref={listRef}>
              {results.length === 0 ? <div className="s-pal-empty">{t("Sonuç yok — başka bir şey dene.", "No results — try something else.")}</div> : null}
              {results.map((it, i) => {
                const head = it.group !== lastGroup ? it.group : null;
                lastGroup = it.group;
                return (
                  <div key={it.id}>
                    {head ? <div className="s-pal-grp">{lang === "en" ? GROUP_EN[head] ?? head : head}</div> : null}
                    <button
                      type="button"
                      id={"pal-" + it.id}
                      data-i={i}
                      role="option"
                      aria-selected={i === sel}
                      className={"s-pal-it" + (i === sel ? " on" : "")}
                      onMouseMove={() => setSel(i)}
                      onClick={() => pick(it)}
                    >
                      {(() => {
                        const I = GROUP_ICON[it.group] ?? Hash;
                        return <I size={15} className="gi" aria-hidden="true" />;
                      })()}
                      <span className="lb">{it.label}</span>
                      {it.hint ? <span className="hn">{it.hint}</span> : null}
                      {i === sel ? <CornerDownLeft size={13} className="en" aria-hidden="true" /> : null}
                    </button>
                  </div>
                );
              })}
            </div>
            <div className="s-pal-foot">
              <span>
                <kbd>↑</kbd>
                <kbd>↓</kbd> {t("gezin", "navigate")}
              </span>
              <span>
                <kbd>Enter</kbd> {t("aç", "open")}
              </span>
              <span>
                <kbd>Ctrl</kbd>
                <kbd>K</kbd> {t("aç/kapat", "toggle")}
              </span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
