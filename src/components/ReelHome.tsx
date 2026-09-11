import { Link } from "react-router-dom";
import { projects } from "@/data/projects";
import { careerRange, experienceLabel } from "@/lib/experience";
import { publicAssetUrl } from "@/lib/publicAssetUrl";
import profile from "@/assets/emir-profile.jpg";
import "@/styles/reel.css";

type P = (typeof projects)[number] & {
  featured?: boolean;
  featuredOrder?: number;
  additionalImages?: string[];
  github?: string | null;
};

// imageKey → yerel dosya eşlemesi (data'daki uzak/uyumsuz görseller için)
const LOCAL_OVERRIDE: Record<string, string> = {
  "kortbul-expo": "/portfolio/images/kortbul-mobile1.png",
};

const cover = (p: P) => {
  if (LOCAL_OVERRIDE[p.imageKey]) return LOCAL_OVERRIDE[p.imageKey];
  const first = p.additionalImages?.[0];
  if (first && first.startsWith("/")) return first;
  return `/portfolio/images/${p.imageKey}1.png`;
};

const coverWebp = (p: P) => {
  const src = cover(p);
  if (!src.startsWith("/")) return src; // uzak URL: olduğu gibi
  return publicAssetUrl(src.replace(/\.png$/i, ".webp"));
};

const isExternal = (href?: string | null) => !!href && /^https?:\/\//.test(href);

const isPhone = (p: P) => p.category === "Mobil Uygulama";

const domainOf = (p: P) => {
  try {
    if (p.link && /^https?:\/\//.test(p.link))
      return new URL(p.link).hostname.replace(/^www\./, "");
  } catch {
    /* noop */
  }
  return "emirtiryaki.com";
};

function Mockup({ p }: { p: P }) {
  if (isPhone(p)) {
    return (
      <div className="reel-shot">
        <div className="mk-phone">
          <div className="notch" />
          <div className="scr">
            <img src={coverWebp(p)} alt={p.title} loading="lazy" decoding="async" />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="reel-shot">
      <div className="mk-web">
        <div className="mk-bar">
          <i style={{ background: "#f2605c" }} />
          <i style={{ background: "#f5bd4f" }} />
          <i style={{ background: "#61c554" }} />
          <span className="u">{domainOf(p)}</span>
        </div>
        <div className="mk-screen">
          <img src={coverWebp(p)} alt={p.title} loading="lazy" decoding="async" />
        </div>
      </div>
    </div>
  );
}

const initials = (t: string) =>
  t
    .replace(/[^A-Za-zÇĞİÖŞÜçğıöşü ]/g, "")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

const all = projects as P[];
const featured = all
  .filter((p) => p.featured)
  .sort((a, b) => (a.featuredOrder ?? 999) - (b.featuredOrder ?? 999));
const spotlight =
  all.find((p) => p.imageKey === "marocar-web") ?? featured[0] ?? all[0];

// İkincil grid: öne çıkanlar dışında, kapağı olan web projeleri
const more = all
  .filter((p) => !p.featured && p.additionalImages?.length)
  .slice(0, 6);

const brands = [
  {
    name: "Tiryaki Yazılım",
    cat: "Teknoloji",
    by: "Web, mobil & kurumsal çözümler stüdyosu",
    stack: ["React", "Node.js", "Swift", "PostgreSQL"],
    href: "https://tiryakiyazilim.com",
  },
  {
    name: "Odak Software",
    cat: "Kurumsal",
    by: "İşletmeler için CRM platformu",
    stack: ["React", "Node.js", "PostgreSQL", "TypeScript"],
    href: "https://odaksoftware.com",
  },
  {
    name: "Kodlasa",
    cat: "Eğitim",
    by: "Eğitim & geliştirme platformu, mentorluk",
    stack: ["React", "Node.js", "MongoDB", "Socket.io"],
    href: "https://kodlasa.com",
  },
];

const credits = [
  { yr: "2026 →", role: "Mobil Geliştirme & Satın Alma", org: "İstanbul Sensörler" },
  { yr: "2024—26", role: "Satış Danışmanı", org: "Han Endüstri Otomasyon" },
  { yr: "2019—24", role: "Web · Mobil · Multimedya", org: "Hamle Mühendislik" },
  { yr: "2017—19", role: "Yazılım Stajyeri", org: "Hamle Mühendislik" },
  { yr: "2017 →", role: "Kurucu / Full Stack Developer", org: "Tiryaki Yazılım — Freelance" },
  { yr: "2026", role: "Bilgisayar Programcılığı (ön lisans)", org: "Hoca Ahmet Yesevi Üniversitesi" },
];

function Card({ p }: { p: P }) {
  const href = p.link ?? "#";
  const body = (
    <>
      <div className="reel-thumb">
        <Mockup p={p} />
        <span className="cat">{p.category}</span>
        <div className="veil" />
        <div className="open">
          <span>→</span> Aç
        </div>
      </div>
      <div className="reel-meta">
        <span className="reel-ava">{initials(p.title)}</span>
        <span className="t">
          <b>{p.title}</b>
          <span className="by">{p.description}</span>
        </span>
        <span className="nums">
          {p.link ? (
            <span className="lv">
              <i /> Canlı
            </span>
          ) : (
            <span>Case</span>
          )}
        </span>
      </div>
      <div className="reel-stackline">
        {p.technologies.slice(0, 4).map((s) => (
          <span key={s}>{s}</span>
        ))}
      </div>
    </>
  );
  return isExternal(href) ? (
    <a className="reel-card" href={href} target="_blank" rel="noopener noreferrer">
      {body}
    </a>
  ) : (
    <Link className="reel-card" to={href}>
      {body}
    </Link>
  );
}

export default function ReelHome() {
  return (
    <div className="reel-root">
      {/* NAV */}
      <header className="reel-top">
        <div className="reel-top-inner">
          <a className="reel-brand" href="#top">
            <span className="dot" />
            <span>
              EMIR TIRYAKI <small>/ dev</small>
            </span>
          </a>
          <nav className="reel-nav">
            <a href="#reel-work">Projeler</a>
            <a href="#reel-about">Hakkında</a>
            <a href="#reel-brands">Markalar</a>
            <a href="#reel-contact">İletişim</a>
            <a className="reel-navbtn" href="#reel-contact">
              İletişime geç
            </a>
          </nav>
        </div>
      </header>

      <div id="top" />

      {/* HERO */}
      <section className="reel-hero reel-wrap">
        <div className="reel-hero-grid">
          <div>
            <div className="reel-eyebrow">Full Stack Developer · İstanbul · {careerRange()}</div>
            <h1>
              Her piksel ve her endpoint <em>aynı hizada.</em>
            </h1>
            <p className="reel-lede">
              Ürün odaklı arayüzler, net API sözleşmeleri ve ölçeklenebilir backend.
              Fikirden yayına — uçtan uca tek elden.
            </p>
            <div className="reel-hero-meta">
              <div className="stat">
                <b>{experienceLabel()}</b>
                <span>Yıl</span>
              </div>
              <div className="stat">
                <b>40+</b>
                <span>Proje</span>
              </div>
              <div className="stat">
                <b>6+</b>
                <span>Sektör</span>
              </div>
              <div className="stat">
                <b>25+</b>
                <span>Teknoloji</span>
              </div>
            </div>
          </div>

          {isExternal(spotlight.link) ? (
            <a
              className="reel-spot"
              href={spotlight.link ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <SpotInner />
            </a>
          ) : (
            <Link className="reel-spot" to={spotlight.link ?? "#"}>
              <SpotInner />
            </Link>
          )}
        </div>
      </section>

      {/* SELECTED WORK */}
      <section className="reel-sec reel-wrap" id="reel-work">
        <div className="reel-sec-head">
          <div>
            <div className="reel-eyebrow">Seçilmiş işler</div>
            <h2>Öne çıkan projeler</h2>
          </div>
          <Link className="reel-more" to="/projects">
            Tüm projeler →
          </Link>
        </div>
        <div className="reel-grid g3">
          {featured.map((p) => (
            <Card key={p.id} p={p} />
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="reel-sec reel-wrap" id="reel-about">
        <div className="reel-artist">
          <div className="reel-portrait">
            <img src={profile} alt="Emir Tiryaki" />
            <span className="badge">
              <i /> İstanbul · Yeni projelere açık
            </span>
          </div>
          <div>
            <div className="reel-eyebrow">Hakkında</div>
            <h3>Emir Tiryaki</h3>
            <div className="role">Full Stack Developer — Frontend → Data layer</div>
            <p>
              Arayüzden veri katmanına kadar uçtan uca çalışıyorum: ürün odaklı arayüzler
              tasarlıyor, net API sözleşmeleri kuruyor ve ölçeklenebilir backend yazıyorum.
              2017'den bu yana staj, kurumsal roller ve freelance teslimatlarla; kendi yazılım
              stüdyomdan (Tiryaki Yazılım) süper-app'lere kadar farklı ölçeklerde ürün
              geliştiriyorum.
            </p>
            <div className="reel-chips">
              {[
                "React / Next.js",
                "React Native / Expo",
                "TypeScript",
                "Node.js / Express",
                "PostgreSQL / Prisma",
                "Swift",
                "Docker / AWS",
              ].map((c) => (
                <span className="reel-chip" key={c}>
                  {c}
                </span>
              ))}
            </div>
            <div className="reel-cta-row">
              <a className="reel-cta primary" href="#reel-contact">
                İletişime geç
              </a>
              <Link className="reel-cta ghost" to="/projects">
                Tüm projeler →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <section className="reel-sec reel-wrap" id="reel-brands">
        <div className="reel-sec-head">
          <div>
            <div className="reel-eyebrow">Markalar</div>
            <h2>Oluşturduğum dijital varlıklar</h2>
          </div>
          <p>Farklı sektörlerde kurulan veya büyütülen</p>
        </div>
        <div className="reel-grid g3">
          {brands.map((b) => (
            <a
              key={b.name}
              className="reel-card"
              href={b.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className="reel-thumb"
                style={{
                  display: "grid",
                  placeItems: "center",
                  background:
                    "linear-gradient(140deg,var(--panel-2),var(--bg-2))",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--sans)",
                    fontWeight: 300,
                    fontSize: 28,
                    letterSpacing: "-0.02em",
                    color: "var(--ink)",
                  }}
                >
                  {b.name}
                </span>
                <span className="cat">{b.cat}</span>
                <div className="open">
                  <span>→</span> Siteyi aç
                </div>
              </div>
              <div className="reel-meta">
                <span className="reel-ava">{initials(b.name)}</span>
                <span className="t">
                  <b>{b.name}</b>
                  <span className="by">{b.by}</span>
                </span>
                <span className="nums">
                  <span className="lv">
                    <i /> Canlı
                  </span>
                </span>
              </div>
              <div className="reel-stackline">
                {b.stack.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="reel-sec reel-wrap">
        <div className="reel-sec-head">
          <div>
            <div className="reel-eyebrow">Track record</div>
            <h2>İş geçmişi</h2>
          </div>
          <p>2017 — günümüz</p>
        </div>
        <div className="reel-credits">
          {credits.map((c, i) => (
            <div className="reel-credit" key={i}>
              <span className="yr">{c.yr}</span>
              <div>
                <b>{c.role}</b>
                <span>{c.org}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT / FOOTER */}
      <footer className="reel-footer" id="reel-contact">
        <div className="reel-wrap">
          <div className="reel-foot-grid">
            <div>
              <div className="reel-eyebrow" style={{ marginBottom: 16 }}>
                İletişim
              </div>
              <h4>
                Bir sonraki işi birlikte{" "}
                <a href="mailto:info@emirtiryaki.com">üretelim.</a>
              </h4>
              <div
                className="reel-mono"
                style={{
                  marginTop: 22,
                  color: "var(--ink-mute)",
                  fontSize: 12.5,
                  lineHeight: 2,
                }}
              >
                info@emirtiryaki.com
                <br />
                +90 543 447 6245
                <br />
                İstanbul, Türkiye
              </div>
            </div>
            <div className="reel-foot-col">
              <div className="lbl">Kanallar</div>
              <a href="https://github.com/emirirr" target="_blank" rel="noopener noreferrer">
                GitHub <small>@emirirr</small>
              </a>
              <a
                href="https://www.linkedin.com/in/emir-tiryaki"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn <small>@emir-tiryaki</small>
              </a>
              <a href="https://instagram.com/emirscode" target="_blank" rel="noopener noreferrer">
                Instagram <small>@emirscode</small>
              </a>
              <a href="https://youtube.com/@emirtiryaki" target="_blank" rel="noopener noreferrer">
                YouTube <small>@emirtiryaki</small>
              </a>
            </div>
            <div className="reel-foot-col">
              <div className="lbl">Index</div>
              <a href="#reel-work">Öne çıkan işler</a>
              <a href="#reel-about">Hakkında</a>
              <a href="#reel-brands">Markalar</a>
              <Link to="/projects">
                Tüm projeler <small>↗</small>
              </Link>
              <a href="https://tiryakiyazilim.com" target="_blank" rel="noopener noreferrer">
                Tiryaki Yazılım <small>↗</small>
              </a>
            </div>
          </div>
          <div className="reel-foot-bottom">
            <span>© 2026 Emir Tiryaki</span>
            <span>Full Stack Developer · İstanbul</span>
          </div>
        </div>
      </footer>

      {/* İkincil grid hero altında değil — daha fazla iş için (opsiyonel) */}
      {more.length > 0 && null}
    </div>
  );
}

function SpotInner() {
  return (
    <>
      <Mockup p={spotlight} />
      <span className="tag">Öne çıkan</span>
      <div className="play">
        <span className="pbtn">→</span>
        <span className="ptxt">
          <b>{spotlight.title}</b>
          <span>{spotlight.technologies.slice(0, 3).join(" · ")}</span>
        </span>
      </div>
    </>
  );
}
