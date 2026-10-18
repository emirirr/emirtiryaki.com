import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CircleCheck, ExternalLink, Github, Users } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Mockup } from "@/components/site/Mockup";
import { StatusBadge } from "@/components/site/WorkCard";
import { Reveal } from "@/components/site/primitives";
import { Gallery } from "@/components/site/Gallery";
import { impactOf } from "@/data/impact";
import { all, bySlug, domainOf, isExternal, isLive, isPhone, slugOf, type P } from "@/lib/portfolioMock";

/** Mağaza bağlantılarında "Canlı siteyi aç" yanlış duruyor; doğru mağaza adını yaz. */
const storeCta = (href?: string | null) => {
  if (!href) return null;
  if (href.includes("play.google.com")) return "Google Play'de aç";
  if (href.includes("apps.apple.com")) return "App Store'da aç";
  return null;
};

/** Birincil eylemler: mağazalar > canlı site > iç detay sayfası, ardından kaynak kodu. */
function Actions({ p }: { p: P }) {
  const stores = p.stores ?? [];
  const hasPrimary = stores.length > 0 || isLive(p);
  return (
    <>
      {stores.length ? (
        stores.map((s, i) => (
          <a key={s.url} className={"s-btn " + (i === 0 ? "primary" : "ghost")} href={s.url} target="_blank" rel="noopener noreferrer">
            {storeCta(s.url) ?? s.label} <ExternalLink size={14} />
          </a>
        ))
      ) : isLive(p) ? (
        <a className="s-btn primary" href={p.link!} target="_blank" rel="noopener noreferrer">
          {storeCta(p.link) ?? "Canlı siteyi aç"} <ExternalLink size={14} />
        </a>
      ) : null}
      {p.link && !isExternal(p.link) ? (
        <Link className={"s-btn " + (hasPrimary ? "ghost" : "primary")} to={p.link}>
          Detay <ArrowRight size={14} />
        </Link>
      ) : null}
      {p.github ? (
        <a className="s-btn ghost" href={p.github} target="_blank" rel="noopener noreferrer">
          <Github size={14} /> Kaynak
        </a>
      ) : null}
    </>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const p = bySlug(slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [slug]);

  if (!p) {
    return (
      <SiteShell>
        <div className="s-wrap s-404">
          <div className="big">404</div>
          <h1 className="s-h3">Proje bulunamadı</h1>
          <p className="s-lead" style={{ marginInline: "auto" }}>
            Taşınmış veya kaldırılmış olabilir.
          </p>
          <div className="s-cta">
            <Link className="s-btn primary lg" to="/projects">
              Tüm işler <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </SiteShell>
    );
  }

  const im = impactOf(p.imageKey);
  const gallery = (p.additionalImages ?? []).filter((s) => s.startsWith("/"));
  const stores = p.stores ?? [];
  const idx = all.findIndex((x) => x.imageKey === p.imageKey);
  const next: P = all[(idx + 1) % all.length];
  const paragraphs = (p.longDescription ?? p.description)
    .split(/\n\s*\n/)
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <SiteShell>
      <article className="s-pagehead">
        <div className="s-wrap">
          <Link className="s-back" to="/projects">
            ← Tüm işler
          </Link>

          <div className="s-dhead">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
              <span className="s-eyebrow">{im?.sector ?? p.category}</span>
              <h1>{p.title}</h1>
              <p className="s-lead lg">{p.description}</p>
              <div className="s-dmeta">
                <StatusBadge p={p} />
                {p.duration ? <span className="m">Süre: {p.duration}</span> : null}
                {p.teamSize ? <span className="m">Ekip: {p.teamSize}</span> : null}
              </div>
              <div className="s-cta">
                <Actions p={p} />
              </div>
            </motion.div>
            <motion.div
              className="s-dcover"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Mockup p={p} eager />
            </motion.div>
          </div>

          {im ? (
            <Reveal className="s-dimpact">
              <div className="who">
                <span className="k">
                  <Users size={13} style={{ display: "inline", verticalAlign: "-2px", marginRight: 6 }} />
                  Kimler kullanıyor
                </span>
                <p>{im.audience}</p>
                {im.client ? <span className="cl">Müşteri: {im.client}</span> : null}
              </div>
              {im.metrics?.length ? (
                <dl>
                  {im.metrics.map((m) => (
                    <div key={m.label}>
                      <dt>{m.value}</dt>
                      <dd>
                        {m.label}
                        {m.asOf ? ` · ${m.asOf}` : ""}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : null}
            </Reveal>
          ) : null}

          {/* Birden fazla doğrulanmış ekran görüntüsü varsa galeri; tek görsel zaten kapakta. */}
          {!p.noShot && gallery.length > 1 ? (
            <Reveal className="s-dgallery">
              <h2 className="s-h3">Ekranlar</h2>
              <Gallery images={gallery} title={p.title} phone={isPhone(p)} />
            </Reveal>
          ) : null}

          <div className="s-dbody">
            <div>
              <Reveal className="s-block">
                <h2>Genel bakış</h2>
                {paragraphs.map((par, i) => (
                  <p key={i}>{par}</p>
                ))}
              </Reveal>

              {p.features?.length ? (
                <Reveal className="s-block">
                  <h2>Öne çıkan özellikler</h2>
                  <ul className="s-checks">
                    {p.features.map((f) => (
                      <li key={f}>
                        <CircleCheck size={17} aria-hidden="true" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ) : null}

              {p.challenges?.length || p.solutions?.length ? (
                <Reveal className="s-block">
                  <h2>Zorluklar ve çözümler</h2>
                  <div className="s-cs">
                    {p.challenges?.length ? (
                      <div className="col ch">
                        <div className="lbl">Zorluk</div>
                        <ul>
                          {p.challenges.map((c) => (
                            <li key={c}>{c}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                    {p.solutions?.length ? (
                      <div className="col so">
                        <div className="lbl">Çözüm</div>
                        <ul>
                          {p.solutions.map((s) => (
                            <li key={s}>{s}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                </Reveal>
              ) : null}
            </div>

            <aside className="s-side">
              <div className="row">
                <span className="k">Tür</span>
                <span className="v">{p.category}</span>
              </div>
              {im?.sector ? (
                <div className="row">
                  <span className="k">Sektör</span>
                  <span className="v">{im.sector}</span>
                </div>
              ) : null}
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
              {stores.length ? (
                <div className="row">
                  <span className="k">Mağaza</span>
                  <span className="v">{stores.map((s) => s.label).join(" · ")}</span>
                </div>
              ) : null}
              {p.link ? (
                <div className="row">
                  <span className="k">Adres</span>
                  <span className="v">
                    {isPhone(p) ? "Mobil uygulama" : domainOf(p)}
                    {p.offline ? " · erişilemiyor" : ""}
                  </span>
                </div>
              ) : null}
              <div className="row">
                <span className="k">Teknoloji</span>
                <span className="st">
                  {p.technologies.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </span>
              </div>
              <div className="acts">
                <Actions p={p} />
                <Link className="s-btn ghost" to="/#contact">
                  Benzer bir proje başlat
                </Link>
              </div>
            </aside>
          </div>

          <Link className="s-next" to={`/is/${slugOf(next)}`}>
            <div>
              <span className="k">Sıradaki iş</span>
              <b>{next.title}</b>
            </div>
            <ArrowRight size={24} />
          </Link>
        </div>
      </article>
    </SiteShell>
  );
}
