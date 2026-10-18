import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { all, logoOf, slugOf, type P } from "@/lib/portfolioMock";
import { projectText } from "@/data/contentEn";
import { useLang, useT } from "@/i18n/lang";
import { trackEvent } from "@/lib/analytics";
import { Reveal, SectionHead, spotlight } from "../primitives";
import { StatusBadge } from "../WorkCard";
import { Gallery } from "../Gallery";

/** Dacargo'nun üç uygulaması — sıra ve kısa rol burada, içerik projects.ts'ten. */
const SURFACES: { key: string; role: { tr: string; en: string } }[] = [
  { key: "dacargo", role: { tr: "Müşteri · iOS, Android, web", en: "Rider · iOS, Android, web" } },
  { key: "dacargo-partenaire", role: { tr: "Sürücü · iOS, Android, web", en: "Driver · iOS, Android, web" } },
  { key: "dacargo-admin", role: { tr: "Ekip konsolu · masaüstü web", en: "Ops console · desktop web" } },
];

export function Dacargo() {
  const lang = useLang();
  const t = useT();
  const items = SURFACES.map((s) => ({ ...s, p: all.find((x) => x.imageKey === s.key) })).filter(
    (s): s is (typeof SURFACES)[number] & { p: P } => Boolean(s.p),
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
          eyebrow={t("Ürün ailesi · Dacargo", "Product family · Dacargo")}
          title={t("Dacargo: Senegal için ulaşım pazaryeri", "Dacargo: a mobility marketplace for Senegal")}
          lead={t(
            "Taksi, moto, ortak yolculuk, at arabası ve koli teslimatı tek uygulamada. Müşteri, sürücü ve ekip için üç uygulama; tek kod tabanı, tek Supabase arka ucu. Mağaza yayını öncesi kapalı testte.",
            "Taxi, moto, ride sharing, horse cart and parcel delivery in one app. Three apps for riders, drivers and the ops team; one codebase, one Supabase backend. In closed testing before the store release.",
          )}
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
                  <Link className="surface" to={`/is/${slugOf(p)}`} onMouseMove={spotlight} onClick={() => trackEvent(`proje-ac/${key}`)}>
                    {logo ? <img className="lg" src={logo} alt="" loading="lazy" decoding="async" /> : null}
                    <span className="tx">
                      <b>{projectText(p, lang).title}</b>
                      <span>{role[lang]}</span>
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
              <a className="s-btn primary sm" href={client.link} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("site-ac/dacargo")}>
                {t("Web sürümünü aç", "Open the web version")} <ExternalLink size={13} />
              </a>
            ) : null}
            {client ? (
              <Link className="s-btn ghost sm" to={`/is/${slugOf(client)}`} onClick={() => trackEvent("proje-ac/dacargo")}>
                {t("Vaka çalışması", "Case study")} <ArrowRight size={14} />
              </Link>
            ) : null}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
