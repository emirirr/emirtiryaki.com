import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { LpMockup } from "@/components/lp/LpMockup";
import { initials, isLive, isPhone, logoOf, slugOf, type P } from "@/lib/portfolioMock";

/** Ana sayfa vitrini ve /projects listesi aynı kartı kullanır.
 *  `reveal` yalnızca ana sayfada true — liste sayfasında kaydırma
 *  gözlemcisi yok, kartlar `data-reveal` alırsa görünmez kalırdı. */
export function LpWorkCard({ p, reveal = false }: { p: P; reveal?: boolean }) {
  const phone = isPhone(p);
  const logo = logoOf(p);
  const shown = p.technologies.slice(0, 3);
  const rest = p.technologies.length - shown.length;

  return (
    <Link
      className="lp-card"
      to={`/is/${slugOf(p)}`}
      {...(reveal ? { "data-reveal": "" } : {})}
    >
      {/* Görsel alanı yalnızca ekran görüntüsü taşır; rozetler gövdeye alındı
          ki mockup'ın üstünü kapatmasınlar. */}
      <div className={"lp-shot" + (phone ? " is-phone" : "")}>
        <LpMockup p={p} />
        <span className="go" aria-hidden="true">
          <ArrowUpRight size={16} />
        </span>
      </div>

      <div className="lp-body">
        <div className="lp-kicker">
          <span className="cat">{p.category}</span>
          {isLive(p) ? (
            <span className="badge live">
              <i /> Canlı
            </span>
          ) : p.offline ? (
            <span className="badge arch">Arşiv</span>
          ) : null}
        </div>

        <div className="lp-idrow">
          {/* Ürünün kendi logosu; yoksa baş harf rozeti — satır yüksekliği sabit kalsın. */}
          <span className={"lp-logo" + (logo ? "" : " is-text")} aria-hidden="true">
            {logo ? <img src={logo} alt="" loading="lazy" decoding="async" /> : initials(p.title)}
          </span>
          <b className="lp-h">{p.title}</b>
        </div>

        <p className="lp-desc">{p.description}</p>
        <div className="lp-stack">
          {shown.map((s) => (
            <span key={s}>{s}</span>
          ))}
          {rest > 0 ? <span className="more">+{rest}</span> : null}
        </div>
      </div>
    </Link>
  );
}
