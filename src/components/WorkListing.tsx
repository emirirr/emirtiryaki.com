import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { LpNav } from "@/components/lp/LpNav";
import { LpFooter } from "@/components/lp/LpFooter";
import { LpWorkCard } from "@/components/lp/LpWorkCard";
import { all, categories, matchesCategory } from "@/lib/portfolioMock";
import "@/styles/landing.css";

const withImages = all.filter((p) => p.additionalImages?.length || p.imageKey);

export default function WorkListing() {
  const [cat, setCat] = useState("Tümü");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const list = useMemo(() => withImages.filter((p) => matchesCategory(p, cat)), [cat]);

  return (
    <div className="lp">
      <LpNav />
      <main className="lp-page lp-wrap">
        <Link className="lp-back" to="/">
          ← Ana sayfa
        </Link>
        <div className="lp-sec-head" style={{ marginTop: 8 }}>
          <div className="lp-eyebrow">Portföy</div>
          {/* Liste sayfasinin tek H1'i — onceden hic H1 yoktu. */}
          <h1>Tüm projeler</h1>
          <p>Yayında olan ve teslim edilmiş işlerin tamamı. Kategoriye göre süz, karta tıkla.</p>
        </div>

        <div className="lp-filters">
          {categories.map((c) => (
            <button
              key={c}
              className={"lp-filter" + (c === cat ? " active" : "")}
              onClick={() => setCat(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="lp-grid">
          {list.map((p) => (
            <LpWorkCard key={p.id} p={p} />
          ))}
        </div>
        <div className="lp-count">{list.length} proje gösteriliyor</div>
      </main>
      <LpFooter />
    </div>
  );
}
