import { useEffect, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  Code2,
  Server,
  Smartphone,
  Globe,
  LayoutDashboard,
  Zap,
  Briefcase,
  Rocket,
  Layers,
  Building2,
  Download,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Instagram,
  Youtube,
} from "lucide-react";
import { LpNav } from "@/components/lp/LpNav";
import { LpWorkCard } from "@/components/lp/LpWorkCard";
import {
  all,
  coverWebp,
  featured,
  initials,
  isLive,
  logoByKey,
} from "@/lib/portfolioMock";
import { CAR_FAMILY, CAR_LAYERS, CAR_SUMMARY } from "@/data/carFamily";
import { techBrands } from "@/data/techBrands";
import { publicAssetUrl } from "@/lib/publicAssetUrl";
import { experienceLabel } from "@/lib/experience";
import profile from "@/assets/emir-profile.jpg";
import "@/styles/landing.css";

const brandOf = (name: string) => techBrands.find((b) => b.name === name);

/** Hero'daki ikon şeridi — TechStackVisual'daki resmî marka path'lerini yeniden kullanır. */
const heroMarks = [
  "React",
  "TypeScript",
  "Next.js",
  "Node.js",
  "PostgreSQL",
  "Tailwind CSS",
  "Swift",
  "Docker",
  "Firebase",
]
  .map(brandOf)
  .filter(Boolean) as { name: string; color: string; path: string }[];

/** "Teknolojiler" bölümü — puan/yüzde YOK, ne işe yaradığına göre gruplanmış yığın. */
const stackGroups: {
  icon: typeof Code2;
  title: string;
  body: string;
  items: string[];
}[] = [
  {
    icon: Code2,
    title: "Arayüz",
    body: "Tasarım sisteminden üretime: erişilebilir, hızlı ve akıcı arayüzler.",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vite", "Framer Motion"],
  },
  {
    icon: Server,
    title: "Backend & veri",
    body: "API sözleşmesi, şema tasarımı, kimlik doğrulama ve yetkilendirme.",
    items: ["Node.js", "PostgreSQL", "Supabase", "Firebase", "Redis", "REST"],
  },
  {
    icon: Smartphone,
    title: "Mobil",
    body: "Mağazaya çıkan iOS/Android uygulamaları — build ve yayın dahil.",
    items: ["React Native", "Expo", "Swift", "SwiftUI", "EAS / Play Console"],
  },
  {
    icon: Layers,
    title: "Altyapı & araçlar",
    body: "Dağıtım hattı, ortam yönetimi ve teknik SEO tarafı.",
    items: ["Docker", "Vercel", "AWS", "Git & GitHub", "Edge Functions"],
  },
];

const stats = [
  { icon: Briefcase, b: experienceLabel(), s: "Yıl deneyim" },
  { icon: Rocket, b: "40+", s: "Tamamlanan proje" },
  { icon: Building2, b: "6+", s: "Sektör" },
  { icon: Layers, b: "25+", s: "Teknoloji" },
];

const caps = [
  { icon: Code2, h: "Frontend", p: "React, Next.js ve TypeScript ile hızlı, erişilebilir ve pürüzsüz arayüzler. Tasarım sistemleri ve mikro-etkileşimler." },
  { icon: Server, h: "Backend & API", p: "Node.js/Express, net API sözleşmeleri, PostgreSQL & Prisma, kimlik doğrulama ve ölçeklenebilir servisler." },
  { icon: Smartphone, h: "Mobil", p: "React Native & Expo ile iOS/Android; gerçek zamanlı akışlar, harita ve bildirim entegrasyonları." },
];

const brands: {
  name: string;
  cat: string;
  by: string;
  stack: string[];
  /** null → site şu an erişilemiyor, kart dışarı link vermez. */
  href: string | null;
  /** Markanın kendi logosu (public/brands/logos). Yoksa baş harf rozetine düşer. */
  logo: string | null;
  c: string;
}[] = [
  { name: "Tiryaki Yazılım", cat: "Teknoloji", by: "Web, mobil & kurumsal çözümler stüdyosu", stack: ["React", "Node.js", "Swift", "PostgreSQL"], href: "https://tiryakiyazilim.com", logo: "/brands/logos/tiryakiyazilim.jpg", c: "linear-gradient(145deg,#7c5cff,#c084fc)" },
  // odaksoftware.com ayakta ama SSL sertifikasi suresi dolmus; sertifika yenilenince href geri verilebilir.
  { name: "Odak Software", cat: "Kurumsal", by: "İşletmeler için CRM platformu", stack: ["React", "Node.js", "PostgreSQL", "TypeScript"], href: null, logo: "/brands/logos/odaksoftware.svg", c: "linear-gradient(145deg,#0ea5e9,#38bdf8)" },
  { name: "Kodlasa", cat: "Eğitim", by: "Eğitim & geliştirme platformu, mentorluk", stack: ["React", "Node.js", "MongoDB", "Socket.io"], href: "https://kodlasa.com", logo: "/brands/logos/kodlasa.png", c: "linear-gradient(145deg,#10b981,#34d399)" },
];

const credits = [
  { yr: "2026 →", role: "Mobil Geliştirme & Satın Alma", org: "İstanbul Sensörler" },
  { yr: "2024—26", role: "Satış Danışmanı", org: "Han Endüstri Otomasyon" },
  { yr: "2019—24", role: "Web · Mobil · Multimedya", org: "Hamle Mühendislik" },
  { yr: "2017—19", role: "Yazılım Stajyeri", org: "Hamle Mühendislik" },
  { yr: "2017 →", role: "Kurucu / Full Stack Developer", org: "Tiryaki Yazılım — Freelance" },
  { yr: "2026", role: "Bilgisayar Programcılığı (ön lisans)", org: "Hoca Ahmet Yesevi Üniv." },
];

/** href varsa dış bağlantı, yoksa düz kart — erişilemeyen siteye link vermeyelim. */
function BrandCard({ href, children }: { href: string | null; children: ReactNode }) {
  const cls = "lp-brand-card";
  if (href) {
    return (
      <a className={cls} data-reveal href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <div className={cls} data-reveal>
      {children}
    </div>
  );
}

/** Araç pazaryeri ailesindeki bir ülke. Ekran görüntüsü ve canlı adres
 *  projects.ts kaydından okunur, ülke bilgisi carFamily.ts'ten gelir. */
function CarCard({ c }: { c: (typeof CAR_FAMILY)[number] }) {
  const p = all.find((x) => x.imageKey === c.key);
  const live = p ? isLive(p) : false;
  const logo = logoByKey(c.key);
  return (
    /* Kart icinde iki ayri hedef var (web + mobil), bu yuzden disi <div>:
       ic ice <Link> gecerli HTML degil. */
    <div className="car-card" data-reveal>
      <Link className="shot" to={`/is/${c.key}`} aria-label={`${c.brand} web pazaryeri`}>
        {p ? <img src={coverWebp(p)} alt={`${c.brand} web sitesi`} loading="lazy" decoding="async" /> : null}
        <span className="code" aria-hidden="true">
          {c.code}
        </span>
      </Link>
      <div className="body">
        <div className="row">
          {logo ? (
            <img className="blogo" src={logo} alt="" loading="lazy" decoding="async" />
          ) : null}
          <b>{c.brand}</b>
          {live ? <span className="dot" title="Yayında" /> : null}
        </div>
        <span className="country">{c.country}</span>
        <span className="domain">{c.domain}</span>
        {c.store ? <span className="store">{c.storeLabel}</span> : null}
        <div className="links">
          <Link to={`/is/${c.key}`}>
            <Globe size={13} /> Web
          </Link>
          <Link to={`/is/${c.mobileKey}`}>
            <Smartphone size={13} /> Mobil
          </Link>
        </div>
      </div>
    </div>
  );
}

function TechMark({ b }: { b: { name: string; color: string; path: string } }) {
  return (
    <span
      className="lp-tmark"
      title={b.name}
      aria-label={b.name}
      style={{ ["--tc" as string]: b.color }}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d={b.path} />
      </svg>
    </span>
  );
}

export default function LandingHome() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".lp [data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.transitionDelay =
              (e.target.getAttribute("data-delay") ?? "0") + "ms";
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="lp">
      <LpNav home />

      <span id="top" />

      {/* HERO */}
      <section className="lp-hero lp-wrap">
        <div className="lp-hero-grid">
          <div>
            <span className="lp-badge" data-reveal>
              <i /> Full Stack Developer · İstanbul
            </span>
            <h1 data-reveal data-delay="60">
              Merhaba, ben <span className="g">Emir</span>
              <br />
              Web ve mobil için ürün kuruyorum.
            </h1>
            <p className="lp-lede" data-reveal data-delay="120">
              2017'den bu yana ürün odaklı arayüzler tasarlıyor, net API'ler yazıyor ve
              ölçeklenebilir sistemleri yayına alıyorum. Fikirden mağazaya — her piksel ve her
              endpoint aynı hizada.
            </p>
            <div className="lp-cta-row" data-reveal data-delay="180">
              <a className="lp-btn primary" href="#work">
                İşleri gör <ArrowRight size={16} />
              </a>
              <a className="lp-btn ghost" href="/cv.html" target="_blank" rel="noopener noreferrer">
                <Download size={16} /> CV indir
              </a>
            </div>

            <div className="lp-techrow" data-reveal data-delay="240">
              <span className="lbl">Çalıştığım teknolojiler</span>
              <div className="row">
                {heroMarks.map((b) => (
                  <TechMark key={b.name} b={b} />
                ))}
              </div>
            </div>
          </div>

          <div className="lp-hero-visual" data-reveal data-delay="120">
            <span className="lp-orb" aria-hidden="true" />
            <div className="lp-portrait-ring">
              <img src={profile} alt="İsmail Emir Tiryaki" />
            </div>
            <div className="lp-code" aria-hidden="true">
              <div className="hd">
                <i style={{ background: "#f2605c" }} />
                <i style={{ background: "#f5bd4f" }} />
                <i style={{ background: "#61c554" }} />
                <span>emir.ts</span>
              </div>
              <pre>
                <span className="c">{"// her zaman yayına hazır"}</span>
                {"\n"}
                <span className="k">const</span> {"emir = {"}
                {"\n  "}
                <span className="p">role</span>: <span className="s">"Full Stack Dev"</span>,
                {"\n  "}
                <span className="p">stack</span>: [<span className="s">"React"</span>,{" "}
                <span className="s">"Expo"</span>],
                {"\n  "}
                <span className="p">shipped</span>: <span className="s">40</span>,
                {"\n"}
                {"};"}
              </pre>
            </div>
            <span className="lp-chip-float bl">
              <span className="ic" style={{ background: "linear-gradient(145deg,#7c5cff,#c084fc)" }}>
                <Zap size={14} />
              </span>
              40+ proje yayında
            </span>
          </div>
        </div>
      </section>

      {/* ABOUT + STATS */}
      <section className="lp-sec lp-wrap" id="about">
        <div className="lp-about" data-reveal>
          <div>
            <div className="lp-eyebrow">Hakkında</div>
            {/* Bolum basligi H2 olmali: H1'den sonra H3 gelince seviye atlaniyordu. */}
            <h2>Dijital çözümler üretmeye tutkuluyum</h2>
            <div className="role">Full Stack Developer — Frontend → Data layer</div>
            <p>
              Arayüzden veri katmanına kadar uçtan uca çalışıyorum: ürün odaklı arayüzler
              tasarlıyor, net API sözleşmeleri kuruyor ve ölçeklenebilir backend yazıyorum.
              2017'den bu yana staj, kurumsal roller ve freelance teslimatlarla; kendi yazılım
              stüdyomdan (Tiryaki Yazılım) süper-app'lere kadar farklı ölçeklerde ürün
              geliştiriyorum.
            </p>
            <div className="lp-chips">
              {["React / Next.js", "React Native / Expo", "TypeScript", "Node.js / Express", "PostgreSQL / Prisma", "Swift", "Docker / AWS"].map(
                (c) => (
                  <span className="lp-chip" key={c}>
                    {c}
                  </span>
                ),
              )}
            </div>
          </div>

          <div className="lp-statgrid">
            {stats.map((s) => (
              <div className="lp-stat" key={s.s}>
                <span className="ic">
                  <s.icon size={19} />
                </span>
                <span>
                  <b>{s.b}</b>
                  <span>{s.s}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEKNOLOJİ YIĞINI — puanlama yok, ne için kullandığıma göre gruplu */}
      <section className="lp-sec lp-wrap" id="skills">
        <div className="lp-sec-head" data-reveal>
          <div className="lp-eyebrow">Yetenekler</div>
          <h2>Kullandığım teknolojiler</h2>
          <p>Günlük olarak ürün çıkardığım yığın — hangi işi hangi araçla çözdüğüm.</p>
        </div>
        <div className="lp-stackgrid">
          {stackGroups.map((g) => (
            <div className="lp-stackcard" data-reveal key={g.title}>
              <span className="ic">
                <g.icon size={18} />
              </span>
              <b>{g.title}</b>
              <p>{g.body}</p>
              <div className="chips">
                {g.items.map((it) => {
                  const b = brandOf(it);
                  return (
                    <span className="chip" key={it}>
                      {b ? (
                        <svg viewBox="0 0 24 24" fill="currentColor" style={{ color: b.color }} aria-hidden="true">
                          <path d={b.path} />
                        </svg>
                      ) : null}
                      {it}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SELECTED WORK */}
      <section className="lp-sec lp-wrap" id="work">
        <div className="lp-sec-head" data-reveal>
          <div className="lp-eyebrow">Seçilmiş işler</div>
          <h2>Yayında olan, gerçek ürünler</h2>
          <p>Her proje canlı bir siteye veya uygulamaya bağlı — karta tıkla, kendin gör.</p>
        </div>
        <div className="lp-grid">
          {featured.map((p) => (
            <LpWorkCard key={p.id} p={p} reveal />
          ))}
        </div>
        <div className="lp-more-row" data-reveal>
          <Link className="lp-btn ghost" to="/projects">
            Tüm projeleri gör <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ARAÇ PAZARYERİ AİLESİ */}
      <section className="lp-sec lp-wrap" id="pazaryeri">
        <div className="lp-sec-head" data-reveal>
          <div className="lp-eyebrow">Ürün ailesi</div>
          <h2>Beş ülke, tek mimari</h2>
          <p>
            Aynı araç pazaryeri ürününü beş ülke için kurdum. Her ülkenin kendi mobil
            uygulaması, web pazaryeri ve yönetim paneli var — {CAR_SUMMARY.apps} uygulama,
            tek ortak mimari.
          </p>
        </div>

        <div className="car-grid">
          {CAR_FAMILY.map((c) => (
            <CarCard key={c.key} c={c} />
          ))}
        </div>

        <div className="car-arch" data-reveal>
          <div className="layers">
            {CAR_LAYERS.map((l) => {
              const I = l.icon === "Smartphone" ? Smartphone : l.icon === "Globe" ? Globe : LayoutDashboard;
              return (
                <div className="layer" key={l.title}>
                  <span className="ic">
                    <I size={19} />
                  </span>
                  <div>
                    <b>{l.title}</b>
                    <span>{l.body}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="hub">
            <div className="lp-eyebrow">Central Admin</div>
            <h3>Beş ülkeyi tek panelden yönetmek</h3>
            <p>
              Her ülke ayrı bir Supabase projesinde duruyor ama hepsi aynı şemayı ve aynı{" "}
              {CAR_SUMMARY.adminScreens} yönetim ekranını paylaşıyor. Central Admin, ülke
              seçiciyle bu panellerin hepsini tek arayüzde topluyor — ülke eklemek yeni bir
              panel yazmayı gerektirmiyor.
            </p>
            <Link className="lp-btn ghost" to="/projects">
              Tüm projeleri gör <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="lp-sec lp-wrap">
        <div className="lp-sec-head" data-reveal>
          <div className="lp-eyebrow">Ne yapıyorum</div>
          <h2>Uçtan uca tek elden</h2>
          <p>Arayüzden veri katmanına kadar; tasarım, kod ve teslim.</p>
        </div>
        <div className="lp-caps">
          {caps.map((c) => (
            <div className="lp-cap" data-reveal key={c.h}>
              <div className="ic">
                <c.icon size={22} />
              </div>
              <h3>{c.h}</h3>
              <p>{c.p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BRANDS */}
      <section className="lp-sec lp-wrap" id="brands">
        <div className="lp-sec-head" data-reveal>
          <div className="lp-eyebrow">Markalar</div>
          <h2>Oluşturduğum dijital varlıklar</h2>
          <p>Farklı sektörlerde kurulan veya büyütülen ürünler.</p>
        </div>
        <div className="lp-brands">
          {brands.map((b) => (
            <BrandCard key={b.name} href={b.href}>
              <div className="top">
                <span
                  className={"logo" + (b.logo ? " has-img" : "")}
                  style={b.logo ? undefined : { background: b.c }}
                >
                  {b.logo ? (
                    <img src={publicAssetUrl(b.logo)} alt="" loading="lazy" decoding="async" />
                  ) : (
                    initials(b.name)
                  )}
                </span>
                <div>
                  <h3>{b.name}</h3>
                  <span className="k">{b.cat}</span>
                </div>
                {b.href ? (
                  <ArrowUpRight size={18} style={{ marginLeft: "auto", color: "var(--muted)" }} />
                ) : null}
              </div>
              <p>{b.by}</p>
              <div className="st">
                {b.stack.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </BrandCard>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="lp-sec lp-wrap">
        <div className="lp-sec-head" data-reveal>
          <div className="lp-eyebrow">Track record</div>
          <h2>İş geçmişi</h2>
        </div>
        <div className="lp-exp">
          {credits.map((c, i) => (
            <div className="row" data-reveal key={i}>
              <span className="yr">{c.yr}</span>
              <div>
                <b>{c.role}</b>
                <span>{c.org}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT BAND */}
      <section className="lp-sec lp-wrap" id="contact">
        <div className="lp-contact" data-reveal>
          <div>
            <div className="lp-eyebrow">İletişim</div>
            <h2>Aklında bir proje mi var?</h2>
            <p className="lead">
              Freelance projeler, uzun vadeli iş birlikleri veya tam zamanlı roller — birkaç
              satır yaz, en kısa sürede döneyim.
            </p>
            <div className="row">
              <a className="lp-btn primary" href="mailto:info@emirtiryaki.com">
                <Mail size={16} /> Mesaj gönder
              </a>
              <a className="lp-btn ghost" href="/cv.html" target="_blank" rel="noopener noreferrer">
                CV
              </a>
            </div>
          </div>

          <div className="lp-quote">
            <span className="qm">“</span>
            <p>
              Bir işi teslim etmenin tek ölçüsü var: kullanıcının elinde çalışıyor mu?
              Tasarımı da, API'yi de, mağaza sürecini de bu yüzden aynı kişi olarak takip
              ediyorum — arada kaybolan bir şey kalmasın diye.
            </p>
            <div className="who">
              <img src={profile} alt="İsmail Emir Tiryaki" />
              <span>
                <b>İsmail Emir Tiryaki</b>
                <span>Çalışma prensibi</span>
              </span>
            </div>
          </div>

          <div className="lp-channels">
            <div className="lbl">Kanallar</div>
            <a className="ln" href="mailto:info@emirtiryaki.com">
              <Mail size={15} /> info@emirtiryaki.com
            </a>
            <a className="ln" href="tel:+905434476245">
              <Phone size={15} /> +90 543 447 6245
            </a>
            <span className="ln" style={{ color: "var(--muted)" }}>
              <MapPin size={15} /> İstanbul, Türkiye
            </span>
            <div className="lp-socials">
              <a href="https://github.com/emirirr" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github size={17} />
              </a>
              <a href="https://www.linkedin.com/in/emir-tiryaki" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin size={17} />
              </a>
              <a href="https://instagram.com/emirscode" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram size={17} />
              </a>
              <a href="https://youtube.com/@emirtiryaki" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <Youtube size={17} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="lp-footer lp-wrap">
        <div className="lp-foot-grid">
          <div>
            <div className="lp-brand" style={{ marginBottom: 14 }}>
              <span className="wm">Emir Tiryaki</span>
              <i className="dot" aria-hidden="true" />
            </div>
            <div className="lp-foot-note">
              info@emirtiryaki.com
              <br />
              +90 543 447 6245
              <br />
              İstanbul, Türkiye
            </div>
          </div>
          <div className="lp-foot-col">
            <div className="lbl">Kanallar</div>
            <a href="https://github.com/emirirr" target="_blank" rel="noopener noreferrer">
              <span>
                <Github size={13} style={{ display: "inline", verticalAlign: "-2px", marginRight: 7 }} />
                GitHub
              </span>
              <small>@emirirr</small>
            </a>
            <a href="https://www.linkedin.com/in/emir-tiryaki" target="_blank" rel="noopener noreferrer">
              <span>
                <Linkedin size={13} style={{ display: "inline", verticalAlign: "-2px", marginRight: 7 }} />
                LinkedIn
              </span>
              <small>@emir-tiryaki</small>
            </a>
            <a href="https://instagram.com/emirscode" target="_blank" rel="noopener noreferrer">
              <span>
                <Instagram size={13} style={{ display: "inline", verticalAlign: "-2px", marginRight: 7 }} />
                Instagram
              </span>
              <small>@emirscode</small>
            </a>
            <a href="https://youtube.com/@emirtiryaki" target="_blank" rel="noopener noreferrer">
              <span>
                <Youtube size={13} style={{ display: "inline", verticalAlign: "-2px", marginRight: 7 }} />
                YouTube
              </span>
              <small>@emirtiryaki</small>
            </a>
          </div>
          <div className="lp-foot-col">
            <div className="lbl">Site</div>
            <a href="#about">Hakkında</a>
            <a href="#skills">Yetenekler</a>
            <a href="#work">Projeler</a>
            <a href="#brands">Markalar</a>
            <Link to="/projects">
              Tüm projeler <small>↗</small>
            </Link>
          </div>
        </div>
        <div className="lp-foot-bottom">
          <span>© 2026 Emir Tiryaki</span>
          <span>Full Stack Developer · İstanbul</span>
        </div>
      </footer>
    </div>
  );
}
