import { useState } from "react";
import { Link } from "react-router-dom";
import { useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Code2,
  Copy,
  ExternalLink,
  Globe,
  GraduationCap,
  LayoutDashboard,
  Layers,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Server,
  ShoppingBag,
  Smartphone,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { all, coverWebp, featured, isLive, isPhone, logoByKey, logoOf, slugOf, type P } from "@/lib/portfolioMock";
import { CAR_FAMILY, CAR_SUMMARY } from "@/data/carFamily";
import { apps } from "@/data/apps";
import { sites } from "@/data/liveSites";
import { faq } from "@/data/faq";
import { testimonials } from "@/data/testimonials";
import { techBrands } from "@/data/techBrands";
import { EDUCATION, ROLES } from "@/data/experience";
import { publicAssetUrl } from "@/lib/publicAssetUrl";
import { experienceLabel } from "@/lib/experience";
import { talepGonder } from "@/lib/talep";
import { trackEvent } from "@/lib/analytics";
import { BRANDS, CONTACT, PRINCIPLE, PROCESS, SERVICES, SOCIALS, STACK_GROUPS } from "@/data/profile";
import { SECTORS } from "@/data/impact";
import { SECTOR_EN, impactText, projectText } from "@/data/contentEn";
import { useLang, useT } from "@/i18n/lang";
import profile from "@/assets/emir-profile.jpg";
import { CountUp, Reveal, SectionHead, spotlight } from "../primitives";
import { Mockup } from "../Mockup";
import { StatusBadge } from "../WorkCard";

const brandOf = (name: string) => techBrands.find((b) => b.name === name);
const SERVICE_ICON = { web: Globe, mobile: Smartphone, commerce: ShoppingBag, backend: Server } as const;
const STACK_ICON = { arayuz: Code2, backend: Server, mobil: Smartphone, altyapi: Layers } as const;
const isStore = (href?: string | null) => /apps\.apple|play\.google/.test(href ?? "");

/* ═════════════ Etki şeridi ═════════════ */
export function ImpactBand() {
  const t = useT();
  // Hepsi veriden sayılıyor — elle yazılmış rakam yok.
  const stats = [
    { value: `${sites.length}`, label: t("kendi alan adında canlı web sitesi", "live websites on their own domains") },
    { value: `${apps.length}`, label: t("App Store / Google Play'de uygulama", "apps on the App Store / Google Play") },
    { value: `${CAR_SUMMARY.countries + 1}`, label: t("ülkede kullanılan ürün", "countries where the products are used") },
    { value: experienceLabel(), label: t("yıllık deneyim", "years of experience") },
  ];
  return (
    <section className="s-impact" aria-label={t("Rakamlarla", "In numbers")}>
      <div className="s-wrap grid">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06} className="cell">
            <b>
              <CountUp value={s.value} />
            </b>
            <span>{s.label}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ═════════════ Marka duvarı ═════════════ */
/** "MaroCar Mobil", "Heybe — İslam'ı Öğren (Mobil)" → "MaroCar", "Heybe". */
const brandName = (p: P) =>
  p.title
    .split(" — ")[0]
    .replace(/\s*\(.*\)$/, "")
    .replace(/\s+(Mobil|Web|Yönetim Paneli|Admin)$/i, "")
    .trim();

export function LogoWall() {
  const t = useT();
  const withLogo = all.filter((p) => logoOf(p) && !p.offline && !p.noShot);
  // Aynı markanın web/mobil/panel kayıtları tek logo olarak görünsün.
  const uniq = [...new Map(withLogo.map((p) => [brandName(p), p])).values()].slice(0, 28);
  const half = Math.ceil(uniq.length / 2);
  const rows = [uniq.slice(0, half), uniq.slice(half)];
  return (
    <section className="s-logos" aria-label={t("Ürün geliştirdiğim markalar", "Brands I've built products for")}>
      <div className="s-wrap">
        <p className="cap">{t("Ürün geliştirdiğim markalar ve projeler", "Brands and products I've built")}</p>
      </div>
      {rows.map((row, ri) => (
        <div className={"s-marquee" + (ri ? " rev" : "")} key={ri}>
          <div className="track">
            {[...row, ...row].map((p, i) => (
              <Link
                key={i}
                to={`/is/${slugOf(p)}`}
                className="logo-item"
                aria-hidden={i >= row.length}
                tabIndex={i >= row.length ? -1 : undefined}
              >
                <img src={logoOf(p)!} alt="" loading="lazy" decoding="async" width={36} height={36} />
                <span>{brandName(p)}</span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

/* ═════════════ Hizmetler ═════════════ */
export function Services() {
  const lang = useLang();
  const t = useT();
  return (
    <section id="services" className="s-sec">
      <div className="s-wrap">
        <SectionHead
          index="01"
          eyebrow={t("Hizmetler", "Services")}
          title={t("Ne yapıyorum?", "What I do")}
          lead={t(
            "Bir ajansın sunduğu her şeyi tek muhatapla: fikir aşamasından mağazaya, yayından bakıma.",
            "Everything an agency offers, with a single point of contact: from idea to store, from launch to maintenance.",
          )}
        />
        <div className="s-svc">
          {SERVICES.map((s, i) => {
            const I = SERVICE_ICON[s.key as keyof typeof SERVICE_ICON] ?? Code2;
            return (
              <Reveal key={s.key} delay={i * 0.07} className="s-svc-card">
                <div className="inner" onMouseMove={spotlight}>
                  <span className="ic">
                    <I size={22} />
                  </span>
                  <h3>{s.title[lang]}</h3>
                  <p>{s.body[lang]}</p>
                  <ul>
                    {s.items[lang].map((it) => (
                      <li key={it}>
                        <Check size={14} aria-hidden="true" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═════════════ Vaka çalışmaları ═════════════ */
function CaseRow({ p, i }: { p: P; i: number }) {
  const lang = useLang();
  const t = useT();
  const im = impactText(p.imageKey, lang);
  const { title, description } = projectText(p, lang);
  const logo = logoOf(p);
  const open = () => trackEvent(`proje-ac/${p.imageKey}`);
  return (
    <Reveal className={"s-case" + (i % 2 ? " flip" : "")}>
      <Link to={`/is/${slugOf(p)}`} onClick={open} className={"s-case-shot" + (isPhone(p) ? " is-phone" : "")} aria-label={`${title} — ${t("vaka çalışması", "case study")}`}>
        <Mockup p={p} />
      </Link>
      <div className="s-case-body">
        <div className="top">
          <span className="s-eyebrow">{im?.sector ?? p.category}</span>
          <StatusBadge p={p} />
        </div>
        <h3>
          {logo ? <img src={logo} alt="" className="lg" width={40} height={40} /> : null}
          {title}
        </h3>
        <p className="desc">{description}</p>
        {im ? (
          <div className="who">
            <Users size={16} aria-hidden="true" />
            <div>
              <span className="k">{t("Kimler kullanıyor", "Who uses it")}</span>
              <span>{im.audience}</span>
              {im.client ? (
                <span className="cl">
                  {t("Müşteri", "Client")}: {im.client}
                </span>
              ) : null}
            </div>
          </div>
        ) : null}
        {im?.metrics?.length ? (
          <dl className="metrics">
            {im.metrics.map((m) => (
              <div key={m.label}>
                <dt>{m.value}</dt>
                <dd>
                  {m.label}
                  {m.asOf ? <small> · {m.asOf}</small> : null}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
        <div className="tags">
          {p.technologies.slice(0, 5).map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
        <div className="acts">
          <Link to={`/is/${slugOf(p)}`} onClick={open} className="s-btn primary sm">
            {t("Vaka çalışması", "Case study")} <ArrowRight size={14} />
          </Link>
          {isLive(p) ? (
            <a
              href={p.link!}
              target="_blank"
              rel="noopener noreferrer"
              className="s-btn ghost sm"
              onClick={() => trackEvent(isStore(p.link) ? `magaza/${p.imageKey}` : `site-ac/${p.imageKey}`)}
            >
              {isStore(p.link) ? t("Mağazada aç", "Open in store") : t("Canlı site", "Live site")} <ExternalLink size={13} />
            </a>
          ) : null}
        </div>
      </div>
    </Reveal>
  );
}

export function Work() {
  const t = useT();
  return (
    <section id="work" className="s-sec tint">
      <div className="s-wrap">
        <div className="s-head-row">
          <SectionHead
            index="02"
            eyebrow={t("Seçilmiş işler", "Selected work")}
            title={t("Gerçek kullanıcısı olan ürünler", "Products with real users")}
            lead={t(
              "Her biri yayında: kimin için yapıldığı, kimlerin kullandığı ve ölçülen sonuçlarıyla.",
              "All of them are live: who they were built for, who uses them and what was measured.",
            )}
          />
          <Reveal className="s-head-act">
            <Link className="s-btn ghost" to="/projects">
              {t(`Tüm ${all.length} iş`, `All ${all.length} projects`)} <ArrowRight size={15} />
            </Link>
          </Reveal>
        </div>
        <div className="s-cases">
          {featured.map((p, i) => (
            <CaseRow key={p.id} p={p} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═════════════ Araç pazaryeri ailesi ═════════════ */
const COUNTRY_EN: Record<string, string> = {
  Senegal: "Senegal",
  Fas: "Morocco",
  Özbekistan: "Uzbekistan",
  Hindistan: "India",
  Nijerya: "Nigeria",
  Bangladeş: "Bangladesh",
};

const LAYERS = [
  {
    icon: Smartphone,
    title: { tr: "Mobil uygulama", en: "Mobile app" },
    body: {
      tr: "Expo & React Native ile iOS ve Android. İlan verme, arama, favoriler ve satıcıyla iletişim.",
      en: "iOS and Android with Expo & React Native. Posting, search, favourites and contacting the seller.",
    },
  },
  {
    icon: Globe,
    title: { tr: "Web pazaryeri", en: "Web marketplace" },
    body: {
      tr: "React + Vite ile ülkeye özel dil, para birimi ve ilan akışı. WhatsApp bağlantı önizlemesi dahil.",
      en: "React + Vite with a country-specific language, currency and listing flow, including WhatsApp link previews.",
    },
  },
  {
    icon: LayoutDashboard,
    title: { tr: "Yönetim paneli", en: "Admin panel" },
    body: {
      tr: "İlan, kullanıcı, bayi ve içerik yönetimi için 19 ekranlık admin arayüzü.",
      en: "A 19-screen admin interface for listings, users, dealers and content.",
    },
  },
];

function CarCard({ c, i }: { c: (typeof CAR_FAMILY)[number]; i: number }) {
  const lang = useLang();
  const t = useT();
  const p = all.find((x) => x.imageKey === c.key);
  const live = p ? isLive(p) : false;
  const logo = logoByKey(c.key);
  const country = lang === "en" ? COUNTRY_EN[c.country] ?? c.country : c.country;
  return (
    <Reveal delay={(i % 4) * 0.06} className="s-car">
      {/* İki ayrı hedef (web + mobil) olduğu için dış eleman <div>: iç içe <Link> geçersiz HTML. */}
      <div className="inner" onMouseMove={spotlight}>
        <Link className="shot" to={`/is/${c.key}`} aria-label={`${c.brand} — ${t("proje sayfası", "project page")}`}>
          {p && !p.noShot ? (
            <img src={coverWebp(p)} alt={`${c.brand} ${t("web sitesi", "website")}`} loading="lazy" decoding="async" />
          ) : (
            <span className="ph" aria-hidden="true">
              {logo ? <img className="ph-logo" src={logo} alt="" /> : null}
              <b>{c.brand}</b>
            </span>
          )}
          <span className="code">{c.code}</span>
        </Link>
        <div className="body">
          <div className="row">
            {logo ? <img className="blogo" src={logo} alt="" loading="lazy" decoding="async" /> : null}
            <b>{c.brand}</b>
            {live ? <span className="dot" title={t("Yayında", "Live")} /> : null}
          </div>
          <span className="country">{country}</span>
          {c.domain ? <span className="domain">{c.domain}</span> : null}
          <div className="stores">
            {c.status ? (
              <span className="store dev">{t(c.status, "In development")}</span>
            ) : c.stores?.length ? (
              c.stores.map((s) => (
                <a
                  className="store"
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent(`magaza/${c.key}/${s.label}`)}
                >
                  {s.label}
                </a>
              ))
            ) : (
              <span className="store off">{t("Mağazada değil", "Not in stores")}</span>
            )}
          </div>
          <div className="links">
            <Link to={`/is/${c.key}`}>
              {c.status ? <ArrowRight size={13} /> : <Globe size={13} />} {c.status ? t("Proje", "Project") : "Web"}
            </Link>
            {!c.status && c.mobileKey ? (
              <Link to={`/is/${c.mobileKey}`}>
                <Smartphone size={13} /> {t("Mobil", "Mobile")}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function CarFamily() {
  const lang = useLang();
  const t = useT();
  const reduce = useReducedMotion();
  return (
    <section id="pazaryeri" className="s-sec">
      <div className="s-wrap">
        <SectionHead
          index="03"
          eyebrow={t("Ürün ailesi · Araç pazaryeri", "Product family · Car marketplaces")}
          title={t("Altı ülke, yedi marka, tek mimari", "Six countries, seven brands, one architecture")}
          lead={t(
            `Aynı araç pazaryeri ürününü ${CAR_SUMMARY.countries} ülkede ${CAR_SUMMARY.brands} marka altında kurdum. Her markanın kendi mobil uygulaması, web pazaryeri ve yönetim paneli var — bugün ${CAR_SUMMARY.liveSites} web sitesi yayında, ${CAR_SUMMARY.storeApps} mobil uygulama mağazada.`,
            `I built the same car marketplace product in ${CAR_SUMMARY.countries} countries under ${CAR_SUMMARY.brands} brands. Each brand has its own mobile app, web marketplace and admin panel — today ${CAR_SUMMARY.liveSites} websites are live and ${CAR_SUMMARY.storeApps} mobile apps are in the stores.`,
          )}
        />

        <div className="s-cars">
          {CAR_FAMILY.map((c, i) => (
            <CarCard key={c.key} c={c} i={i} />
          ))}
          <Reveal delay={0.18} className="s-car sum">
            <div className="inner">
              <span className="s-eyebrow">Appcarfy</span>
              <b className="big">{t("Tek çatı altında", "Under one roof")}</b>
              <dl>
                <div>
                  <dt>{t("Marka", "Brands")}</dt>
                  <dd>{CAR_SUMMARY.brands}</dd>
                </div>
                <div>
                  <dt>{t("Ülke", "Countries")}</dt>
                  <dd>{CAR_SUMMARY.countries}</dd>
                </div>
                <div>
                  <dt>{t("Canlı site", "Live sites")}</dt>
                  <dd>{CAR_SUMMARY.liveSites}</dd>
                </div>
                <div>
                  <dt>{t("Mağazada", "In stores")}</dt>
                  <dd>{CAR_SUMMARY.storeApps}</dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>

        <Reveal className="s-arch">
          <div className="layers">
            {LAYERS.map((l) => (
              <div className="layer" key={l.title.tr}>
                <span className="ic">
                  <l.icon size={18} />
                </span>
                <div>
                  <b>{l.title[lang]}</b>
                  <span>{l.body[lang]}</span>
                </div>
              </div>
            ))}
          </div>
          <svg className="wires" viewBox="0 0 120 300" preserveAspectRatio="none" aria-hidden="true">
            {[50, 150, 250].map((y, i) => (
              <path key={y} d={`M0 ${y} C 60 ${y}, 60 150, 120 150`} className={reduce ? "w" : "w flow"} style={{ animationDelay: `${i * 0.4}s` }} />
            ))}
          </svg>
          <div className="hub">
            <span className="s-eyebrow">Central Admin</span>
            <h3>{t("Beş markayı tek panelden yönetmek", "Running five brands from one panel")}</h3>
            <p>
              {t(
                `daCAR, MaroCar, AvtoUzbek, BharatKaar ve NaijaCar ayrı Supabase projelerinde duruyor ama aynı şemayı ve aynı ${CAR_SUMMARY.adminScreens} yönetim ekranını paylaşıyor. Central Admin, ülke seçiciyle bu panelleri tek arayüzde topluyor — yeni bir ülke eklemek yeni bir panel yazmayı gerektirmiyor.`,
                `daCAR, MaroCar, AvtoUzbek, BharatKaar and NaijaCar live in separate Supabase projects but share the same schema and the same ${CAR_SUMMARY.adminScreens} admin screens. Central Admin brings them into one interface with a country switcher — adding a country doesn't mean writing a new panel.`,
              )}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═════════════ Sektörler ═════════════ */
export function Sectors() {
  const lang = useLang();
  const t = useT();
  return (
    <section className="s-sec slim" aria-label={t("Çalıştığım sektörler", "Industries")}>
      <div className="s-wrap s-sectors">
        <Reveal>
          <span className="s-eyebrow">{t("Sektörler", "Industries")}</span>
          <h2 className="s-h3">{t("Farklı sektörlerde, aynı özen", "Different industries, the same care")}</h2>
        </Reveal>
        <ul>
          {SECTORS.map((s, i) => (
            <Reveal as="li" key={s} delay={i * 0.05}>
              {lang === "en" ? SECTOR_EN[s] ?? s : s}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ═════════════ Süreç ═════════════ */
export function Process() {
  const lang = useLang();
  const t = useT();
  return (
    <section id="process" className="s-sec tint">
      <div className="s-wrap">
        <SectionHead
          index="06"
          eyebrow={t("Süreç", "Process")}
          title={t("Birlikte nasıl çalışırız?", "How we work together")}
          lead={t("Net adımlar, görünür ilerleme ve yayından sonra da süren destek.", "Clear steps, visible progress and support that continues after launch.")}
        />
        <ol className="s-process">
          {PROCESS.map((s, i) => (
            <Reveal as="li" key={s.title.tr} delay={i * 0.08}>
              <span className="n">{String(i + 1).padStart(2, "0")}</span>
              <h3>{s.title[lang]}</h3>
              <p>{s.body[lang]}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ═════════════ Hakkımda + iş geçmişi ═════════════ */
export function About() {
  const lang = useLang();
  const t = useT();
  const [more, setMore] = useState(false);
  const roles = more ? ROLES : ROLES.slice(0, 5);
  return (
    <section id="about" className="s-sec">
      <div className="s-wrap s-about">
        <Reveal className="s-about-photo">
          <img src={profile} alt="İsmail Emir Tiryaki" loading="lazy" decoding="async" />
          <span className="tag">İsmail Emir Tiryaki · {t("Full-Stack & Mobil Geliştirici", "Full-Stack & Mobile Developer")}</span>
        </Reveal>
        <div>
          <SectionHead index="07" eyebrow={t("Hakkımda", "About")} title={t("Projenizde karşınızda tek bir muhatap", "One point of contact for your project")} />
          <Reveal className="s-prose">
            <p>
              {lang === "en" ? (
                <>
                  I work end to end, from the interface to the data layer: I design product-focused
                  interfaces, define clear API contracts and write scalable backends. Since 2017 —
                  through an internship, in-house roles and freelance work — I've built products of
                  every size through my own studio, <b>Tiryaki Yazılım</b>.
                </>
              ) : (
                <>
                  Arayüzden veri katmanına kadar uçtan uca çalışıyorum: ürün odaklı arayüzler
                  tasarlıyor, net API sözleşmeleri kuruyor ve ölçeklenebilir backend yazıyorum.
                  2017'den bu yana staj, kurumsal roller ve freelance teslimatlarla; kendi yazılım
                  stüdyom <b>Tiryaki Yazılım</b> üzerinden farklı ölçeklerde ürün geliştiriyorum.
                </>
              )}
            </p>
            <blockquote>“{PRINCIPLE[lang]}”</blockquote>
          </Reveal>

          <ol id="experience" className="s-timeline">
            {roles.map((r, i) => (
              <Reveal as="li" key={r.company + r.title} delay={Math.min(i, 5) * 0.05} y={10}>
                <span className="dot" aria-hidden="true" />
                <span className="yr">{lang === "en" ? r.en.period : r.period}</span>
                <div className="what">
                  <b>{lang === "en" ? r.en.title : r.title}</b>
                  <span>{lang === "en" ? r.en.company ?? r.company : r.company}</span>
                </div>
              </Reveal>
            ))}
          </ol>
          {ROLES.length > 5 ? (
            <button type="button" className="s-textlink" onClick={() => setMore((v) => !v)} aria-expanded={more}>
              {more ? t("Daha az göster", "Show less") : t(`Tüm geçmiş (${ROLES.length})`, `Full history (${ROLES.length})`)}
              <ChevronDown size={15} style={{ transform: more ? "rotate(180deg)" : undefined, transition: "transform .2s" }} />
            </button>
          ) : null}

          <div className="s-edu">
            <span className="hd">
              <GraduationCap size={16} aria-hidden="true" /> {t("Eğitim & sertifika", "Education & certificates")}
            </span>
            <ul>
              {EDUCATION.map((e) => (
                <li key={e.detail}>
                  <b>{lang === "en" ? e.en.school : e.school}</b>
                  <span>{lang === "en" ? e.en.detail : e.detail}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="s-brandrow">
            {BRANDS.map((b) => {
              const inner = (
                <>
                  <img src={publicAssetUrl(b.logo)} alt="" loading="lazy" decoding="async" />
                  <span>
                    <b>{b.name}</b>
                    <small>{b.by[lang]}</small>
                  </span>
                </>
              );
              return b.href ? (
                <a key={b.name} href={b.href} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent(`site-ac/${b.name}`)}>
                  {inner}
                  <ArrowUpRight size={14} className="arr" />
                </a>
              ) : (
                <div key={b.name}>{inner}</div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═════════════ Teknolojiler ═════════════ */
export function Stack() {
  const lang = useLang();
  const t = useT();
  return (
    <section id="skills" className="s-sec tint">
      <div className="s-wrap">
        <SectionHead
          index="08"
          eyebrow={t("Teknolojiler", "Technologies")}
          title={t("Kullandığım araçlar", "Tools I use")}
          lead={t("Puan yok — hangi işi hangi araçla çözdüğüm.", "No skill bars — just which tool I use for which job.")}
        />
        <div className="s-stack">
          {STACK_GROUPS.map((g, gi) => {
            const I = STACK_ICON[g.key as keyof typeof STACK_ICON] ?? Code2;
            return (
              <Reveal key={g.key} delay={gi * 0.07} className="s-stack-card">
                <span className="ic">
                  <I size={18} />
                </span>
                <h3>{g.title[lang]}</h3>
                <ul className="tools">
                  {g.items.map((it) => {
                    const b = brandOf(it);
                    return (
                      <li key={it} style={b ? { ["--tc" as string]: b.color } : undefined}>
                        {b ? (
                          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d={b.path} />
                          </svg>
                        ) : null}
                        {it}
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═════════════ Referanslar (yalnız gerçek alıntı varsa) ═════════════ */
export function Testimonials() {
  const lang = useLang();
  const t = useT();
  if (!testimonials.length) return null;
  return (
    <section className="s-sec" aria-label={t("Müşteriler ne diyor", "What clients say")}>
      <div className="s-wrap">
        <SectionHead eyebrow={t("Referanslar", "Testimonials")} title={t("Müşteriler ne diyor", "What clients say")} />
        <div className="s-quotes">
          {testimonials.map((q) => (
            <Reveal key={q.name} className="s-quote-card">
              <p>“{lang === "en" ? q.quoteEn ?? q.quote : q.quote}”</p>
              <span className="who">
                <b>{q.name}</b> · {lang === "en" ? q.roleEn ?? q.role : q.role}, {q.company}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═════════════ Sık sorulanlar (FAQPage verisiyle aynı içerik) ═════════════ */
export function Faq() {
  const lang = useLang();
  const t = useT();
  return (
    <section id="faq" className="s-sec">
      <div className="s-wrap s-faq">
        <SectionHead eyebrow={t("Sık sorulanlar", "FAQ")} title={t("Merak edilenler", "Common questions")} />
        <div className="list">
          {faq.map((f, i) => (
            <Reveal key={f.q} delay={Math.min(i, 4) * 0.04}>
              <details>
                <summary>
                  {lang === "en" ? f.en.q : f.q}
                  <ChevronDown size={18} aria-hidden="true" />
                </summary>
                <p>{lang === "en" ? f.en.a : f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═════════════ Proje başlat (form) ═════════════ */
export function Contact() {
  const lang = useLang();
  const t = useT();
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [copied, setCopied] = useState(false);
  const serviceOptions = [...SERVICES.map((s) => s.title[lang]), t("Henüz emin değilim", "Not sure yet")];

  const copy = () => {
    navigator.clipboard
      ?.writeText(CONTACT.email)
      .then(() => {
        setCopied(true);
        toast.success(t("E-posta kopyalandı", "Email copied"), { description: CONTACT.email });
        window.setTimeout(() => setCopied(false), 1800);
      })
      .catch(() => (window.location.href = `mailto:${CONTACT.email}`));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const service = String(f.get("service") ?? "");
    setState("sending");
    try {
      await talepGonder({
        name: String(f.get("name") ?? "").trim(),
        email: String(f.get("email") ?? "").trim(),
        phone: String(f.get("phone") ?? "").trim(),
        service,
        message: String(f.get("message") ?? "").trim(),
        source: lang === "en" ? "emirtiryaki-proje-baslat-en" : "emirtiryaki-proje-baslat",
      });
      trackEvent(`form-gonderildi/${service}`);
      setState("done");
    } catch {
      setState("idle");
      toast.error(t("Gönderilemedi", "Couldn't send"), {
        description: t(`Lütfen ${CONTACT.email} adresine yazın.`, `Please email ${CONTACT.email}.`),
      });
    }
  };

  return (
    <section id="contact" className="s-sec">
      <div className="s-wrap">
        <Reveal className="s-contact">
          <span className="glow a" aria-hidden="true" />
          <span className="glow b" aria-hidden="true" />
          <div className="copy">
            <span className="s-eyebrow light">
              <span className="ix">09</span>
              {t("Proje başlat", "Start a project")}
            </span>
            <h2 className="s-h2">{t("Aklınızdaki ürünü konuşalım", "Let's talk about your product")}</h2>
            <p className="s-lead">
              {t(
                "Birkaç satırla ne yapmak istediğinizi anlatın; kapsam, süre ve yol haritasıyla geri dönüş yapayım.",
                "Tell me in a few lines what you want to build; I'll get back to you with scope, timeline and a roadmap.",
              )}
            </p>
            <ul className="channels">
              <li>
                <Mail size={16} aria-hidden="true" />
                <a href={`mailto:${CONTACT.email}`} onClick={() => trackEvent("eposta-tikla")}>
                  {CONTACT.email}
                </a>
                <button type="button" className="cp" onClick={copy} aria-label={t("E-postayı kopyala", "Copy email")}>
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </li>
              <li>
                <Phone size={16} aria-hidden="true" />
                <a href={CONTACT.phoneHref} onClick={() => trackEvent("telefon-tikla")}>
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <MapPin size={16} aria-hidden="true" />
                <span>{CONTACT.city[lang]}</span>
              </li>
            </ul>
            <div className="social-row">
              {SOCIALS.map((s) => (
                <a key={s.key} href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label} <ArrowUpRight size={13} />
                </a>
              ))}
            </div>
          </div>

          {state === "done" ? (
            <div className="s-form done" role="status">
              <span className="ok">
                <Check size={26} />
              </span>
              <h3>{t("Talebiniz alındı", "Request received")}</h3>
              <p>{t(`En kısa sürede ${CONTACT.email} üzerinden dönüş yapacağım.`, `I'll get back to you from ${CONTACT.email} shortly.`)}</p>
            </div>
          ) : (
            <form className="s-form" onSubmit={onSubmit}>
              {/* Robot tuzağı: insan görmez, bot doldurur (talep.ts sessizce yok sayar). */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
              />
              <div className="two">
                <label>
                  <span>{t("Ad soyad", "Full name")}</span>
                  <input name="name" required autoComplete="name" />
                </label>
                <label>
                  <span>{t("E-posta", "Email")}</span>
                  <input name="email" type="email" required autoComplete="email" />
                </label>
              </div>
              <div className="two">
                <label>
                  <span>{t("Telefon (isteğe bağlı)", "Phone (optional)")}</span>
                  <input name="phone" type="tel" autoComplete="tel" />
                </label>
                <label>
                  <span>{t("Ne lazım?", "What do you need?")}</span>
                  <select name="service" defaultValue={serviceOptions[0]}>
                    {serviceOptions.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label>
                <span>{t("Projeniz", "Your project")}</span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder={t(
                    "Ne yapmak istiyorsunuz, kimler kullanacak, bir tarih var mı?",
                    "What do you want to build, who will use it, is there a deadline?",
                  )}
                />
              </label>
              <button type="submit" className="s-btn primary lg" disabled={state === "sending"}>
                {state === "sending" ? <Loader2 size={16} className="spin" /> : null}
                {state === "sending" ? t("Gönderiliyor…", "Sending…") : t("Talebi gönder", "Send request")}
                {state === "sending" ? null : <ArrowRight size={16} />}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
