import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { initials, isLive, isPhone, logoOf, slugOf, type P } from "@/lib/portfolioMock";
import { Mockup } from "./Mockup";
import { spotlight } from "./primitives";

/** Proje durumu: geliştirmede / canlı / arşiv. */
export function StatusBadge({ p }: { p: P }) {
  if (p.status) return <span className="s-badge dev">{p.status}</span>;
  if (isLive(p))
    return (
      <span className="s-badge live">
        <i /> Canlı
      </span>
    );
  if (p.offline) return <span className="s-badge arch">Arşiv</span>;
  return null;
}

/** Ana sayfa vitrini ve /projects listesi aynı kartı kullanır. */
export function WorkCard({ p }: { p: P }) {
  const logo = logoOf(p);
  const shown = p.technologies.slice(0, 3);
  const rest = p.technologies.length - shown.length;

  return (
    <Link className="s-card" to={`/is/${slugOf(p)}`} onMouseMove={spotlight}>
      <div className={"s-shot" + (isPhone(p) ? " is-phone" : "")}>
        <Mockup p={p} />
        <span className="badge-pos">
          <StatusBadge p={p} />
        </span>
        <span className="go" aria-hidden="true">
          <ArrowUpRight size={16} />
        </span>
      </div>
      <div className="s-card-body">
        <span className="cat">{p.category}</span>
        <div className="idrow">
          <span className={"logo" + (logo ? "" : " is-text")} aria-hidden="true">
            {logo ? <img src={logo} alt="" loading="lazy" decoding="async" /> : initials(p.title)}
          </span>
          <b className="ttl">{p.title}</b>
        </div>
        <p className="desc">{p.description}</p>
        <div className="tags">
          {shown.map((s) => (
            <span key={s}>{s}</span>
          ))}
          {rest > 0 ? <span className="more">+{rest}</span> : null}
        </div>
      </div>
    </Link>
  );
}
