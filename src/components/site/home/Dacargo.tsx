import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { all, logoOf, slugOf, type P } from "@/lib/portfolioMock";
import { Reveal, SectionHead, spotlight } from "../primitives";
import { StatusBadge } from "../WorkCard";
import { Gallery } from "../Gallery";

/** Dacargo'nun üç uygulaması — sıra ve kısa rol burada, içerik projects.ts'ten. */
const SURFACES: { key: string; role: string }[] = [
  { key: "dacargo", role: "Müşteri · iOS, Android, web" },
  { key: "dacargo-partenaire", role: "Sürücü · iOS, Android, web" },
  { key: "dacargo-admin", role: "Ekip konsolu · masaüstü web" },
];

export function Dacargo() {
  const items = SURFACES.map((s) => ({ ...s, p: all.find((x) => x.imageKey === s.key) })).filter(
    (s): s is { key: string; role: string; p: P } => Boolean(s.p),
  );
  if (!items.length) return null;
  const client = items.find((s) => s.key === "dacargo")?.p;
  const partner = items.find((s) => s.key === "dacargo-partenaire")?.p;
  // Müşteri ve sürücü ekranları tek şeritte: önce müşteri akışı, sonra sürücü.
  const shots = [...(client?.additionalImages ?? []), ...(partner?.additionalImages ?? [])];

  return (
    <section id="dacargo" className="s-sec tint">
      <div className="s-wrap">
        <SectionHead
          index="05"
          eyebrow="Ürün ailesi · Dacargo"
          title="Dacargo: Senegal için ulaşım pazaryeri"
          lead="Taksi, moto, ortak yolculuk, at arabası ve koli teslimatı tek uygulamada. Müşteri, sürücü ve ekip için üç uygulama; tek kod tabanı, tek Supabase arka ucu. Mağaza yayını öncesi kapalı testte."
        />

        <Reveal>
          <Gallery images={shots} title="Dacargo" />
        </Reveal>

        <div className="s-dacargo">
          <ul className="surfaces">
            {items.map(({ key, role, p }, i) => {
              const logo = logoOf(p);
              return (
                <Reveal as="li" key={key} delay={i * 0.06}>
                  <Link className="surface" to={`/is/${slugOf(p)}`} onMouseMove={spotlight}>
                    {logo ? <img className="lg" src={logo} alt="" loading="lazy" decoding="async" /> : null}
                    <span className="tx">
                      <b>{p.title}</b>
                      <span>{role}</span>
                    </span>
                    <StatusBadge p={p} />
                    <ArrowRight size={15} className="arr" />
                  </Link>
                </Reveal>
              );
            })}
          </ul>
          <Reveal delay={0.2} className="links">
            {client?.link ? (
              <a className="s-btn primary sm" href={client.link} target="_blank" rel="noopener noreferrer">
                Web sürümünü aç <ExternalLink size={13} />
              </a>
            ) : null}
            {client ? (
              <Link className="s-btn ghost sm" to={`/is/${slugOf(client)}`}>
                Vaka çalışması <ArrowRight size={14} />
              </Link>
            ) : null}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
