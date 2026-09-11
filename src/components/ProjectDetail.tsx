import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { LpNav } from "@/components/lp/LpNav";
import { LpFooter } from "@/components/lp/LpFooter";
import { LpMockup } from "@/components/lp/LpMockup";
import {
  all,
  bySlug,
  slugOf,
  coverWebp,
  isLive,
  isPhone,
  domainOf,
  isExternal,
  type P,
} from "@/lib/portfolioMock";
import "@/styles/landing.css";

/** Magaza baglantilarinda "Canli siteyi ac" yanlis duruyor; dogru magaza adini yaz. */
const storeCta = (href?: string | null) => {
  if (!href) return null;
  if (href.includes("play.google.com")) return "Google Play'de aç";
  if (href.includes("apps.apple.com")) return "App Store'da aç";
  return null;
};

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const p = bySlug(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!p) {
    return (
      <div className="lp">
        <LpNav />
        <main className="lp-page lp-wrap" style={{ minHeight: "50vh" }}>
          <Link className="lp-back" to="/projects">
            ← Tüm projeler
          </Link>
          <div className="lp-sec-head" style={{ marginTop: 8 }}>
            <h2>Proje bulunamadı</h2>
            <p>Aradığın proje taşınmış veya kaldırılmış olabilir.</p>
          </div>
        </main>
        <LpFooter />
      </div>
    );
  }

  const idx = all.findIndex((x) => x.imageKey === p.imageKey);
  const next: P = all[(idx + 1) % all.length];
  const gallery = (p.additionalImages ?? []).filter((s) => s.startsWith("/"));

  return (
    <div className="lp">
      <LpNav />
      <main className="lp-page lp-wrap">
        <Link className="lp-back" to="/projects">
          ← Tüm projeler
        </Link>

        {/* HEAD */}
        <div className="lp-dhead">
          <div>
            <div className="lp-eyebrow">{p.category}</div>
            <h1>{p.title}</h1>
            <p className="lead">{p.description}</p>
            <div className="lp-pills">
              {p.duration ? <span className="lp-pill">⏱ {p.duration}</span> : null}
              {p.teamSize ? <span className="lp-pill">👤 {p.teamSize}</span> : null}
              {isLive(p) ? (
                <span className="lp-pill">
                  <span className="live" /> Canlı
                </span>
              ) : p.offline ? (
                <span className="lp-pill">Adres şu an erişilemiyor</span>
              ) : null}
            </div>
            <div className="lp-dbtns">
              {isLive(p) ? (
                <a className="lp-btn primary" href={p.link!} target="_blank" rel="noopener noreferrer">
                  {storeCta(p.link) ?? "Canlı siteyi aç"} <ExternalLink size={15} />
                </a>
              ) : p.link && !isExternal(p.link) ? (
                <Link className="lp-btn primary" to={p.link}>
                  Detay <ArrowRight size={15} />
                </Link>
              ) : null}
              {p.github ? (
                <a className="lp-btn ghost" href={p.github} target="_blank" rel="noopener noreferrer">
                  <Github size={15} /> Kaynak
                </a>
              ) : null}
            </div>
          </div>

          <div className={"lp-dcover" + (isPhone(p) ? " is-phone" : "")}>
            <div className="glow" />
            <LpMockup p={p} />
          </div>
        </div>

        {/* BODY */}
        <div className="lp-dbody">
          <div>
            <div className="lp-block">
              <h2>Genel bakış</h2>
              {/* longDescription bos satirla ayrilmis birden fazla paragraf icerebilir. */}
              {(p.longDescription ?? p.description)
                .split(/\n\s*\n/)
                .map((par) => par.trim())
                .filter(Boolean)
                .map((par, i) => (
                  <p key={i}>{par}</p>
                ))}
            </div>

            {p.features?.length ? (
              <div className="lp-block">
                <h2>Öne çıkan özellikler</h2>
                <ul className="lp-feats">
                  {p.features.map((f) => (
                    <li key={f}>
                      <span className="dot" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {p.challenges?.length || p.solutions?.length ? (
              <div className="lp-block">
                <h2>Zorluklar &amp; çözümler</h2>
                <div className="lp-cs">
                  {p.challenges?.length ? (
                    <div className="col ch">
                      <div className="lbl">Zorluklar</div>
                      <ul>
                        {p.challenges.map((c) => (
                          <li key={c}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {p.solutions?.length ? (
                    <div className="col so">
                      <div className="lbl">Çözümler</div>
                      <ul>
                        {p.solutions.map((s) => (
                          <li key={s}>{s}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>

          <aside className="lp-side">
            <div className="row">
              <span className="k">Tür</span>
              <span className="v">{p.category}</span>
            </div>
            {p.duration ? (
              <div className="row">
                <span className="k">Süre</span>
                <span className="v">{p.duration}</span>
              </div>
            ) : null}
            {p.teamSize ? (
              <div className="row">
                <span className="k">Ekip</span>
                <span className="v">{p.teamSize}</span>
              </div>
            ) : null}
            {p.link ? (
              <div className="row">
                <span className="k">Adres</span>
                <span className="v">
                  {isPhone(p) ? "Mobil uygulama" : domainOf(p)}
                  {p.offline ? <small className="off"> · erişilemiyor</small> : null}
                </span>
              </div>
            ) : null}
            <div className="row">
              <span className="k">Stack</span>
              <span className="st">
                {p.technologies.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </span>
            </div>
            <div className="links">
              {isLive(p) ? (
                <a className="lp-btn primary" href={p.link!} target="_blank" rel="noopener noreferrer">
                  {storeCta(p.link) ?? "Canlı site"} <ExternalLink size={15} />
                </a>
              ) : null}
              {p.github ? (
                <a className="lp-btn ghost" href={p.github} target="_blank" rel="noopener noreferrer">
                  <Github size={15} /> Kaynak kodu
                </a>
              ) : null}
            </div>
          </aside>
        </div>

        {/* GALLERY */}
        {gallery.length > 1 ? (
          <div className="lp-gallery">
            <div className="lp-block">
              <h2>Ekran görüntüleri</h2>
            </div>
            <div className="mk">
              <div className="mk-bar">
                <i style={{ background: "#f2605c" }} />
                <i style={{ background: "#f5bd4f" }} />
                <i style={{ background: "#61c554" }} />
                <span className="u">{domainOf(p)}</span>
              </div>
              <div className="mk-screen" style={{ aspectRatio: "16/9" }}>
                <img src={coverWebp(p)} alt={p.title} loading="lazy" />
              </div>
            </div>
          </div>
        ) : null}

        {/* NEXT */}
        <div className="lp-next">
          <Link to={`/is/${slugOf(next)}`}>
            <div>
              <span className="k">Sıradaki proje</span>
              <b>{next.title}</b>
            </div>
            <ArrowRight size={22} />
          </Link>
        </div>
      </main>
      <LpFooter />
    </div>
  );
}
