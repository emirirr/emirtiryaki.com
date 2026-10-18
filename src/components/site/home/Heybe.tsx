import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { HEYBE_LABEL, all, coverWebp, logoOf, slugOf, type P } from "@/lib/portfolioMock";
import { projectText } from "@/data/contentEn";
import { useLang, useT } from "@/i18n/lang";
import { trackEvent } from "@/lib/analytics";
import { Reveal, SectionHead, spotlight } from "../primitives";
import { StatusBadge } from "../WorkCard";

/** Heybe'nin dört yüzeyi — sıra ve kısa rol burada, içerik projects.ts'ten. */
const SURFACES: { key: string; role: { tr: string; en: string } }[] = [
  { key: "heybe-mobile", role: { tr: "iOS + Android · Flutter", en: "iOS + Android · Flutter" } },
  { key: "heybe-web", role: { tr: "Tarayıcı sürümü · React", en: "Browser version · React" } },
  { key: "heybe-site", role: { tr: "Tanıtım + içerik · SEO", en: "Landing + content · SEO" } },
  { key: "heybe-admin", role: { tr: "Yönetim paneli · Fastify", en: "Admin panel · Fastify" } },
];

export function Heybe() {
  const lang = useLang();
  const t = useT();
  const items = SURFACES.map((s) => ({ ...s, p: all.find((x) => x.imageKey === s.key) })).filter(
    (s): s is (typeof SURFACES)[number] & { p: P } => Boolean(s.p),
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
          eyebrow={t("Ürün ailesi · Heybe", "Product family · Heybe")}
          title={t("Heybe: mobil, web, site ve panel", "Heybe: mobile, web, site and admin")}
          lead={t(
            "Kur'an okumayı ve temel dini bilgileri oyunlaştırılmış kısa derslerle öğreten ürün. Aynı Firebase arka ucunu paylaşan mobil uygulama, tarayıcı sürümü, tanıtım sitesi ve yönetim paneli.",
            "A product that teaches Quran reading and the basics of Islam through short, gamified lessons. A mobile app, browser version, website and admin panel sharing one Firebase backend.",
          )}
        />

        <div className="s-heybe">
          <Reveal className="show">
            {site ? (
              <a
                className="shot"
                href={site.link ?? undefined}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("heybeapp.com sitesini aç", "Open heybeapp.com")}
                onClick={() => trackEvent("site-ac/heybeapp.com")}
              >
                <div className="mk-web">
                  <div className="mk-bar">
                    <i />
                    <i />
                    <i />
                    <span className="u">heybeapp.com</span>
                  </div>
                  <div className="mk-screen">
                    <img src={coverWebp(site)} alt={t("Heybe tanıtım sitesi", "Heybe website")} loading="lazy" decoding="async" />
                  </div>
                </div>
              </a>
            ) : null}
            <div className="stores">
              {(mobile?.stores ?? []).map((s) => (
                <a
                  key={s.url}
                  className="s-btn ghost sm"
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent(`magaza/heybe/${s.label}`)}
                >
                  {s.label} <ExternalLink size={13} />
                </a>
              ))}
              {web?.link ? (
                <a className="s-btn ghost sm" href={web.link} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("site-ac/app.heybeapp.com")}>
                  {t("Web'de aç", "Open on the web")} <ExternalLink size={13} />
                </a>
              ) : null}
            </div>
          </Reveal>

          <div className="side">
            <ul className="facts">
              {[
                ["4", t("dil: tr · en · de · ar", "languages: tr · en · de · ar")],
                ["2", t("mağaza: App Store + Google Play", "stores: App Store + Google Play")],
                ["1", t("ortak Firebase arka ucu", "shared Firebase backend")],
              ].map(([n, label], i) => (
                <Reveal as="li" key={label} delay={0.05 + i * 0.05}>
                  <b>{n}</b>
                  <span>{label}</span>
                </Reveal>
              ))}
            </ul>
            <ul className="surfaces">
              {items.map(({ key, role, p }, i) => {
                const logo = logoOf(p);
                return (
                  <Reveal as="li" key={key} delay={0.12 + i * 0.06}>
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
            <Link className="s-textlink" to={`/projects?k=${encodeURIComponent(HEYBE_LABEL)}`}>
              {t("Tüm Heybe kayıtları", "All Heybe projects")} <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
