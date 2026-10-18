import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { HEYBE_LABEL, all, coverWebp, logoOf, slugOf, type P } from "@/lib/portfolioMock";
import { Reveal, SectionHead, spotlight } from "../primitives";
import { StatusBadge } from "../WorkCard";

/** Heybe'nin dört yüzeyi — sıra ve kısa rol burada, içerik projects.ts'ten. */
const SURFACES: { key: string; role: string }[] = [
  { key: "heybe-mobile", role: "iOS + Android · Flutter" },
  { key: "heybe-web", role: "Tarayıcı sürümü · React" },
  { key: "heybe-site", role: "Tanıtım + içerik · SEO" },
  { key: "heybe-admin", role: "Yönetim paneli · Fastify" },
];

export function Heybe() {
  const items = SURFACES.map((s) => ({ ...s, p: all.find((x) => x.imageKey === s.key) })).filter(
    (s): s is { key: string; role: string; p: P } => Boolean(s.p),
  );
  if (!items.length) return null;
  const mobile = items.find((s) => s.key === "heybe-mobile")?.p;
  const site = items.find((s) => s.key === "heybe-site")?.p;
  const web = items.find((s) => s.key === "heybe-web")?.p;

  return (
    <section id="heybe" className="s-sec">
      <div className="s-wrap">
        <SectionHead
          index="04"
          eyebrow="Ürün ailesi · Heybe"
          title="Heybe: mobil, web, site ve panel"
          lead="Kur'an okumayı ve temel dini bilgileri oyunlaştırılmış kısa derslerle öğreten ürün. Aynı Firebase arka ucunu paylaşan mobil uygulama, tarayıcı sürümü, tanıtım sitesi ve yönetim paneli."
        />

        <div className="s-heybe">
          <Reveal className="show">
            {site ? (
              <a className="shot" href={site.link ?? undefined} target="_blank" rel="noopener noreferrer" aria-label="heybeapp.com sitesini aç">
                <div className="mk-web">
                  <div className="mk-bar">
                    <i />
                    <i />
                    <i />
                    <span className="u">heybeapp.com</span>
                  </div>
                  <div className="mk-screen">
                    <img src={coverWebp(site)} alt="Heybe tanıtım sitesi" loading="lazy" decoding="async" />
                  </div>
                </div>
              </a>
            ) : null}
            <div className="stores">
              {(mobile?.stores ?? []).map((s) => (
                <a key={s.url} className="s-btn ghost sm" href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.label} <ExternalLink size={13} />
                </a>
              ))}
              {web?.link ? (
                <a className="s-btn ghost sm" href={web.link} target="_blank" rel="noopener noreferrer">
                  Web'de aç <ExternalLink size={13} />
                </a>
              ) : null}
            </div>
          </Reveal>

          <div className="side">
            <ul className="facts">
              {[
                ["4", "dil: tr · en · de · ar"],
                ["2", "mağaza: App Store + Google Play"],
                ["1", "ortak Firebase arka ucu"],
              ].map(([n, t], i) => (
                <Reveal as="li" key={t} delay={0.05 + i * 0.05}>
                  <b>{n}</b>
                  <span>{t}</span>
                </Reveal>
              ))}
            </ul>
            <ul className="surfaces">
              {items.map(({ key, role, p }, i) => {
                const logo = logoOf(p);
                return (
                  <Reveal as="li" key={key} delay={0.12 + i * 0.06}>
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
            <Link className="s-textlink" to={`/projects?k=${encodeURIComponent(HEYBE_LABEL)}`}>
              Tüm Heybe kayıtları <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
