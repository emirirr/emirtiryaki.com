import { useState } from "react";
import { Link } from "react-router-dom";
import { useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Copy,
  ExternalLink,
  Globe,
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
import { CAR_FAMILY, CAR_LAYERS, CAR_SUMMARY } from "@/data/carFamily";
import { techBrands } from "@/data/techBrands";
import { publicAssetUrl } from "@/lib/publicAssetUrl";
import { experienceLabel } from "@/lib/experience";
import { talepGonder } from "@/lib/talep";
import { BRANDS, CONTACT, CREDITS, PRINCIPLE, PROCESS, SERVICES, SOCIALS, STACK_GROUPS } from "@/data/profile";
import { SECTORS, impactOf } from "@/data/impact";
import profile from "@/assets/emir-profile.jpg";
import { CountUp, Reveal, SectionHead, spotlight } from "../primitives";
import { Mockup } from "../Mockup";
import { StatusBadge } from "../WorkCard";

const brandOf = (name: string) => techBrands.find((b) => b.name === name);
const SERVICE_ICON = { web: Globe, mobile: Smartphone, commerce: ShoppingBag, backend: Server } as const;
const STACK_ICON = { arayuz: Code2, backend: Server, mobil: Smartphone, altyapi: Layers } as const;
const isStoreApp = (p: P) =>
  Boolean(p.stores?.length) || /apps\.apple\.com|play\.google\.com/.test(p.link ?? "");

/* ═════════════ Etki şeridi ═════════════ */
export function ImpactBand() {
  // Hepsi veriden sayılıyor — elle yazılmış rakam yok.
  const stats = [
    { value: `${all.filter(isLive).length}`, label: "yayında web sitesi ve uygulama" },
    { value: `${all.filter(isStoreApp).length}`, label: "App Store / Google Play'de uygulama" },
    { value: `${CAR_SUMMARY.countries + 1}`, label: "ülkede kullanılan ürün" },
    { value: experienceLabel(), label: "yıllık deneyim" },
  ];
  return (
    <section className="s-impact" aria-label="Rakamlarla">
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
  const withLogo = all.filter((p) => logoOf(p) && !p.offline && !p.noShot);
  // Aynı markanın web/mobil/panel kayıtları tek logo olarak görünsün.
  const uniq = [...new Map(withLogo.map((p) => [brandName(p), p])).values()].slice(0, 28);
  const half = Math.ceil(uniq.length / 2);
  const rows = [uniq.slice(0, half), uniq.slice(half)];
  return (
    <section className="s-logos" aria-label="Ürün geliştirdiğim markalar">
      <div className="s-wrap">
        <p className="cap">Ürün geliştirdiğim markalar ve projeler</p>
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
                <img src={logoOf(p)!} alt="" loading="lazy" decoding="async" />
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
  return (
    <section id="services" className="s-sec">
      <div className="s-wrap">
        <SectionHead
          index="01"
          eyebrow="Hizmetler"
          title="Ne yapıyorum?"
          lead="Bir ajansın sunduğu her şeyi tek muhatapla: fikir aşamasından mağazaya, yayından bakıma."
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
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                  <ul>
                    {s.items.map((it) => (
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
  const im = impactOf(p.imageKey);
  const logo = logoOf(p);
  return (
    <Reveal className={"s-case" + (i % 2 ? " flip" : "")}>
      <Link to={`/is/${slugOf(p)}`} className={"s-case-shot" + (isPhone(p) ? " is-phone" : "")} aria-label={`${p.title} vaka çalışması`}>
        <Mockup p={p} />
      </Link>
      <div className="s-case-body">
        <div className="top">
          <span className="s-eyebrow">{im?.sector ?? p.category}</span>
          <StatusBadge p={p} />
        </div>
        <h3>
          {logo ? <img src={logo} alt="" className="lg" /> : null}
          {p.title}
        </h3>
        <p className="desc">{p.description}</p>
        {im ? (
          <div className="who">
            <Users size={16} aria-hidden="true" />
            <div>
              <span className="k">Kimler kullanıyor</span>
              <span>{im.audience}</span>
              {im.client ? <span className="cl">Müşteri: {im.client}</span> : null}
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
          {p.technologies.slice(0, 5).map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <div className="acts">
          <Link to={`/is/${slugOf(p)}`} className="s-btn primary sm">
            Vaka çalışması <ArrowRight size={14} />
          </Link>
          {isLive(p) ? (
            <a href={p.link!} target="_blank" rel="noopener noreferrer" className="s-btn ghost sm">
              {/apps\.apple|play\.google/.test(p.link!) ? "Mağazada aç" : "Canlı site"} <ExternalLink size={13} />
            </a>
          ) : null}
        </div>
      </div>
    </Reveal>
  );
}

export function Work() {
  return (
    <section id="work" className="s-sec tint">
      <div className="s-wrap">
        <div className="s-head-row">
          <SectionHead
            index="02"
            eyebrow="Seçilmiş işler"
            title="Gerçek kullanıcısı olan ürünler"
            lead="Her biri yayında: kimin için yapıldığı, kimlerin kullandığı ve ölçülen sonuçlarıyla."
          />
          <Reveal className="s-head-act">
            <Link className="s-btn ghost" to="/projects">
              Tüm {all.length} iş <ArrowRight size={15} />
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
function CarCard({ c, i }: { c: (typeof CAR_FAMILY)[number]; i: number }) {
  const p = all.find((x) => x.imageKey === c.key);
  const live = p ? isLive(p) : false;
  const logo = logoByKey(c.key);
  return (
    <Reveal delay={(i % 4) * 0.06} className="s-car">
      {/* İki ayrı hedef (web + mobil) olduğu için dış eleman <div>: iç içe <Link> geçersiz HTML. */}
      <div className="inner" onMouseMove={spotlight}>
        <Link className="shot" to={`/is/${c.key}`} aria-label={`${c.brand} proje sayfası`}>
          {p && !p.noShot ? (
            <img src={coverWebp(p)} alt={`${c.brand} web sitesi`} loading="lazy" decoding="async" />
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
            {live ? <span className="dot" title="Yayında" /> : null}
          </div>
          <span className="country">{c.country}</span>
          {c.domain ? <span className="domain">{c.domain}</span> : null}
          <div className="stores">
            {c.status ? (
              <span className="store dev">{c.status}</span>
            ) : c.stores?.length ? (
              c.stores.map((s) => (
                <span className="store" key={s.label}>
                  {s.label}
                </span>
              ))
            ) : (
              <span className="store off">Mağazada değil</span>
            )}
          </div>
          <div className="links">
            <Link to={`/is/${c.key}`}>
              {c.status ? <ArrowRight size={13} /> : <Globe size={13} />} {c.status ? "Proje" : "Web"}
            </Link>
            {!c.status && c.mobileKey ? (
              <Link to={`/is/${c.mobileKey}`}>
                <Smartphone size={13} /> Mobil
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function CarFamily() {
  const reduce = useReducedMotion();
  return (
    <section id="pazaryeri" className="s-sec">
      <div className="s-wrap">
        <SectionHead
          index="03"
          eyebrow="Ürün ailesi · Araç pazaryeri"
          title="Altı ülke, yedi marka, tek mimari"
          lead={
            <>
              Aynı araç pazaryeri ürününü {CAR_SUMMARY.countries} ülkede {CAR_SUMMARY.brands} marka
              altında kurdum. Her markanın kendi mobil uygulaması, web pazaryeri ve yönetim paneli
              var — bugün {CAR_SUMMARY.liveSites} web sitesi yayında, {CAR_SUMMARY.storeApps} mobil
              uygulama mağazada.
            </>
          }
        />

        <div className="s-cars">
          {CAR_FAMILY.map((c, i) => (
            <CarCard key={c.key} c={c} i={i} />
          ))}
          <Reveal delay={0.18} className="s-car sum">
            <div className="inner">
              <span className="s-eyebrow">Appcarfy</span>
              <b className="big">Tek çatı altında</b>
              <dl>
                <div>
                  <dt>Marka</dt>
                  <dd>{CAR_SUMMARY.brands}</dd>
                </div>
                <div>
                  <dt>Ülke</dt>
                  <dd>{CAR_SUMMARY.countries}</dd>
                </div>
                <div>
                  <dt>Canlı site</dt>
                  <dd>{CAR_SUMMARY.liveSites}</dd>
                </div>
                <div>
                  <dt>Mağazada</dt>
                  <dd>{CAR_SUMMARY.storeApps}</dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>

        <Reveal className="s-arch">
          <div className="layers">
            {CAR_LAYERS.map((l) => {
              const I = l.icon === "Smartphone" ? Smartphone : l.icon === "Globe" ? Globe : LayoutDashboard;
              return (
                <div className="layer" key={l.title}>
                  <span className="ic">
                    <I size={18} />
                  </span>
                  <div>
                    <b>{l.title}</b>
                    <span>{l.body}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <svg className="wires" viewBox="0 0 120 300" preserveAspectRatio="none" aria-hidden="true">
            {[50, 150, 250].map((y, i) => (
              <path key={y} d={`M0 ${y} C 60 ${y}, 60 150, 120 150`} className={reduce ? "w" : "w flow"} style={{ animationDelay: `${i * 0.4}s` }} />
            ))}
          </svg>
          <div className="hub">
            <span className="s-eyebrow">Central Admin</span>
            <h3>Beş markayı tek panelden yönetmek</h3>
            <p>
              daCAR, MaroCar, AvtoUzbek, BharatKaar ve NaijaCar ayrı Supabase projelerinde duruyor
              ama aynı şemayı ve aynı {CAR_SUMMARY.adminScreens} yönetim ekranını paylaşıyor.
              Central Admin, ülke seçiciyle bu panelleri tek arayüzde topluyor — yeni bir ülke
              eklemek yeni bir panel yazmayı gerektirmiyor.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═════════════ Sektörler ═════════════ */
export function Sectors() {
  return (
    <section className="s-sec slim" aria-label="Çalıştığım sektörler">
      <div className="s-wrap s-sectors">
        <Reveal>
          <span className="s-eyebrow">Sektörler</span>
          <h2 className="s-h3">Farklı sektörlerde, aynı özen</h2>
        </Reveal>
        <ul>
          {SECTORS.map((s, i) => (
            <Reveal as="li" key={s} delay={i * 0.05}>
              {s}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ═════════════ Süreç ═════════════ */
export function Process() {
  return (
    <section id="process" className="s-sec tint">
      <div className="s-wrap">
        <SectionHead index="06" eyebrow="Süreç" title="Birlikte nasıl çalışırız?" lead="Net adımlar, görünür ilerleme ve yayından sonra da süren destek." />
        <ol className="s-process">
          {PROCESS.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.08}>
              <span className="n">{String(i + 1).padStart(2, "0")}</span>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ═════════════ Hakkımda + iş geçmişi ═════════════ */
export function About() {
  return (
    <section id="about" className="s-sec">
      <div className="s-wrap s-about">
        <Reveal className="s-about-photo">
          <img src={profile} alt="İsmail Emir Tiryaki" loading="lazy" decoding="async" />
          <span className="tag">İsmail Emir Tiryaki · Full Stack Developer</span>
        </Reveal>
        <div>
          <SectionHead index="07" eyebrow="Hakkımda" title="Projenizde karşınızda tek bir muhatap" />
          <Reveal className="s-prose">
            <p>
              Arayüzden veri katmanına kadar uçtan uca çalışıyorum: ürün odaklı arayüzler
              tasarlıyor, net API sözleşmeleri kuruyor ve ölçeklenebilir backend yazıyorum.
              2017'den bu yana staj, kurumsal roller ve freelance teslimatlarla; kendi yazılım
              stüdyom <b>Tiryaki Yazılım</b> üzerinden farklı ölçeklerde ürün geliştiriyorum.
            </p>
            <blockquote>“{PRINCIPLE}”</blockquote>
          </Reveal>
          <ol id="experience" className="s-timeline">
            {CREDITS.map((c, i) => (
              <Reveal as="li" key={c.role + c.org} delay={i * 0.05} y={10}>
                <span className="dot" aria-hidden="true" />
                <span className="yr">{c.yr}</span>
                <div className="what">
                  <b>{c.role}</b>
                  <span>{c.org}</span>
                </div>
              </Reveal>
            ))}
          </ol>
          <div className="s-brandrow">
            {BRANDS.map((b) => {
              const inner = (
                <>
                  <img src={publicAssetUrl(b.logo)} alt="" loading="lazy" decoding="async" />
                  <span>
                    <b>{b.name}</b>
                    <small>{b.by}</small>
                  </span>
                </>
              );
              return b.href ? (
                <a key={b.name} href={b.href} target="_blank" rel="noopener noreferrer">
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
  return (
    <section id="skills" className="s-sec tint">
      <div className="s-wrap">
        <SectionHead index="08" eyebrow="Teknolojiler" title="Kullandığım araçlar" lead="Puan yok — hangi işi hangi araçla çözdüğüm." />
        <div className="s-stack">
          {STACK_GROUPS.map((g, gi) => {
            const I = STACK_ICON[g.key as keyof typeof STACK_ICON] ?? Code2;
            return (
              <Reveal key={g.key} delay={gi * 0.07} className="s-stack-card">
                <span className="ic">
                  <I size={18} />
                </span>
                <h3>{g.title}</h3>
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

/* ═════════════ Proje başlat (form) ═════════════ */
const SERVICE_OPTIONS = [...SERVICES.map((s) => s.title), "Henüz emin değilim"];

export function Contact() {
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard
      ?.writeText(CONTACT.email)
      .then(() => {
        setCopied(true);
        toast.success("E-posta kopyalandı", { description: CONTACT.email });
        window.setTimeout(() => setCopied(false), 1800);
      })
      .catch(() => (window.location.href = `mailto:${CONTACT.email}`));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setState("sending");
    try {
      await talepGonder({
        name: String(f.get("name") ?? "").trim(),
        email: String(f.get("email") ?? "").trim(),
        phone: String(f.get("phone") ?? "").trim(),
        service: String(f.get("service") ?? ""),
        message: String(f.get("message") ?? "").trim(),
        source: "emirtiryaki-proje-baslat",
      });
      setState("done");
    } catch {
      setState("idle");
      toast.error("Gönderilemedi", { description: `Lütfen ${CONTACT.email} adresine yazın.` });
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
              <span className="ix">09</span>Proje başlat
            </span>
            <h2 className="s-h2">Aklınızdaki ürünü konuşalım</h2>
            <p className="s-lead">
              Birkaç satırla ne yapmak istediğinizi anlatın; kapsam, süre ve yol haritasıyla geri
              dönüş yapayım.
            </p>
            <ul className="channels">
              <li>
                <Mail size={16} aria-hidden="true" />
                <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                <button type="button" className="cp" onClick={copy} aria-label="E-postayı kopyala">
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </li>
              <li>
                <Phone size={16} aria-hidden="true" />
                <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
              </li>
              <li>
                <MapPin size={16} aria-hidden="true" />
                <span>{CONTACT.city}</span>
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
              <h3>Talebiniz alındı</h3>
              <p>En kısa sürede {CONTACT.email} üzerinden dönüş yapacağım.</p>
            </div>
          ) : (
            <form className="s-form" onSubmit={onSubmit}>
              <div className="two">
                <label>
                  <span>Ad soyad</span>
                  <input name="name" required autoComplete="name" />
                </label>
                <label>
                  <span>E-posta</span>
                  <input name="email" type="email" required autoComplete="email" />
                </label>
              </div>
              <div className="two">
                <label>
                  <span>Telefon (isteğe bağlı)</span>
                  <input name="phone" type="tel" autoComplete="tel" />
                </label>
                <label>
                  <span>Ne lazım?</span>
                  <select name="service" defaultValue={SERVICE_OPTIONS[0]}>
                    {SERVICE_OPTIONS.map((o) => (
                      <option key={o}>{o}</option>
                    ))}
                  </select>
                </label>
              </div>
              <label>
                <span>Projeniz</span>
                <textarea name="message" required rows={5} placeholder="Ne yapmak istiyorsunuz, kimler kullanacak, bir tarih var mı?" />
              </label>
              <button type="submit" className="s-btn primary lg" disabled={state === "sending"}>
                {state === "sending" ? <Loader2 size={16} className="spin" /> : null}
                {state === "sending" ? "Gönderiliyor…" : "Talebi gönder"}
                {state === "sending" ? null : <ArrowRight size={16} />}
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
