import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { WorkCard } from "@/components/site/WorkCard";
import { SectionHead } from "@/components/site/primitives";
import { all, categories, matchesCategory } from "@/lib/portfolioMock";

const withImages = all.filter((p) => p.additionalImages?.length || p.imageKey);

const norm = (s: string) =>
  s.toLocaleLowerCase("tr").replace(/ı/g, "i").normalize("NFD").replace(/[̀-ͯ]/g, "");

export default function WorkListing() {
  // /projects?k=Heybe gibi bağlantılar doğrudan o filtreyle açılır.
  const [params] = useSearchParams();
  const initial = params.get("k");
  const [cat, setCat] = useState(initial && categories.includes(initial) ? initial : "Tümü");
  const [q, setQ] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  const counts = useMemo(
    () => Object.fromEntries(categories.map((c) => [c, withImages.filter((p) => matchesCategory(p, c)).length])),
    [],
  );

  const list = useMemo(() => {
    const t = norm(q.trim());
    return withImages.filter(
      (p) =>
        matchesCategory(p, cat) &&
        (!t || norm([p.title, p.description, p.category, ...p.technologies].join(" ")).includes(t)),
    );
  }, [cat, q]);

  return (
    <SiteShell>
      <section className="s-pagehead">
        <div className="s-wrap">
          <Link className="s-back" to="/">
            ← Ana sayfa
          </Link>
          <SectionHead
            as="h1"
            eyebrow="Portföy"
            title="Tüm işler"
            lead="Yayında olan ve teslim edilmiş işlerin tamamı. Kategoriye göre süz ya da ara; karta tıklayınca vaka çalışması açılır."
          />

          <div className="s-filterbar">
            <label className="s-searchbox">
              <Search size={16} aria-hidden="true" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Proje veya teknoloji ara…" aria-label="Projelerde ara" />
            </label>
            <div className="s-filters" role="group" aria-label="Kategori">
              {categories.map((c) => (
                <button key={c} type="button" className={"s-filter" + (c === cat ? " on" : "")} aria-pressed={c === cat} onClick={() => setCat(c)}>
                  {c === cat ? <motion.span layoutId="s-filter-bg" className="bg" transition={{ type: "spring", bounce: 0.2, duration: 0.45 }} /> : null}
                  {c}
                  <span className="n">{counts[c]}</span>
                </button>
              ))}
            </div>
          </div>
          <p className="s-count" aria-live="polite">
            {list.length} iş gösteriliyor
          </p>

          {list.length ? (
            <motion.div layout className="s-grid">
              <AnimatePresence mode="popLayout">
                {list.map((p) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                  >
                    <WorkCard p={p} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="s-empty">Eşleşen iş yok — başka bir kelime dene.</div>
          )}
        </div>
      </section>
    </SiteShell>
  );
}
