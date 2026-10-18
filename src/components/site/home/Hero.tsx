import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { HERO_ROLES } from "@/data/profile";
import { CAR_SUMMARY } from "@/data/carFamily";
import { apps } from "@/data/apps";
import { all, coverWebp, logoOf, slugOf } from "@/lib/portfolioMock";
import { CAREER_START_YEAR } from "@/lib/experience";
import { useLang, useT } from "@/i18n/lang";
import { useRotatingType } from "../primitives";
import { sectionHref, useGoSection } from "../useSite";
import { useLocation } from "react-router-dom";

const ease = [0.22, 1, 0.36, 1] as const;
const up = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease },
});

const byKey = (k: string) => all.find((p) => p.imageKey === k);

/** Sağdaki kolaj: gerçek ürün ekran görüntüleri, üstünde doğrulanmış rakamlar. */
function Collage() {
  const t = useT();
  const web = byKey("dacar-web");
  const site = byKey("heybe-site");
  const phone = byKey("kortbul-expo");
  const webLogo = web ? logoOf(web) : null;
  return (
    <div className="s-collage">
      <span className="blob a" aria-hidden="true" />
      <span className="blob b" aria-hidden="true" />
      {web ? (
        <motion.div className="pane back" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15, ease }}>
          <Link to={`/is/${slugOf(web)}`} className="mk-web" aria-label={web.title}>
            <div className="mk-bar">
              <i />
              <i />
              <i />
              <span className="u">dacar.sn</span>
            </div>
            <div className="mk-screen">
              <img src={coverWebp(web)} alt={t("daCAR araç pazaryeri", "daCAR car marketplace")} width={1200} height={750} />
            </div>
          </Link>
        </motion.div>
      ) : null}
      {site ? (
        <motion.div className="pane front" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.3, ease }}>
          <Link to={`/is/${slugOf(site)}`} className="mk-web" aria-label={site.title}>
            <div className="mk-bar">
              <i />
              <i />
              <i />
              <span className="u">heybeapp.com</span>
            </div>
            <div className="mk-screen">
              <img src={coverWebp(site)} alt={t("Heybe tanıtım sitesi", "Heybe website")} width={1200} height={750} />
            </div>
          </Link>
        </motion.div>
      ) : null}
      {phone ? (
        <motion.div className="pane phone" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.45, ease }}>
          <Link to={`/is/${slugOf(phone)}`} className="mk-phone" aria-label={phone.title}>
            <div className="notch" />
            <div className="scr">
              <img src={coverWebp(phone)} alt={t("Kortbul mobil uygulaması", "Kortbul mobile app")} />
            </div>
          </Link>
        </motion.div>
      ) : null}

      <motion.div className="s-float f1" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.9, duration: 0.5 }}>
        <span className="stars" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} size={12} fill="currentColor" />
          ))}
        </span>
        <span>
          <b>{apps.length}</b> {t("uygulama App Store & Google Play'de", "apps on the App Store & Google Play")}
        </span>
      </motion.div>
      <motion.div className="s-float f2" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.05, duration: 0.5 }}>
        {webLogo ? <img src={webLogo} alt="" /> : null}
        <span>
          <b>
            {CAR_SUMMARY.countries} {t("ülke", "countries")}
          </b>{" "}
          · {CAR_SUMMARY.brands} {t("pazaryeri markası", "marketplace brands")}
        </span>
      </motion.div>
    </div>
  );
}

export function Hero() {
  const lang = useLang();
  const t = useT();
  const { pathname } = useLocation();
  const role = useRotatingType(HERO_ROLES[lang]);
  const go = useGoSection();
  const jump = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    go(id);
  };

  return (
    <section id="top" className="s-hero">
      <div className="s-wrap s-hero-grid">
        <div className="s-hero-copy">
          <motion.div className="s-pill" {...up(0)}>
            <i /> {t("Yeni projelere açık · İstanbul", "Open to new projects · Istanbul")}
          </motion.div>
          <motion.h1 className="s-h1" {...up(0.06)}>
            {lang === "en" ? (
              <>
                I turn your idea into a product people <span className="grad">actually use</span>.
              </>
            ) : (
              <>
                Fikrinizi <span className="grad">kullanılan</span> bir ürüne dönüştürüyorum.
              </>
            )}
          </motion.h1>
          <motion.p className="s-hero-rot" {...up(0.12)}>
            {lang === "en" ? "I design, build and ship " : null}
            <span className="rot">
              {role}
              <span className="s-caret" aria-hidden="true" />
            </span>
            {lang === "en" ? "." : " tasarlıyor, geliştiriyor ve yayına alıyorum."}
          </motion.p>
          <motion.p className="s-lead lg" {...up(0.18)}>
            {t(
              `Strateji, arayüz, backend ve mağaza süreci tek elden. ${CAREER_START_YEAR}'den bu yana Senegal'den Özbekistan'a farklı ülkelerde yayında olan web ve mobil ürünler geliştirdim.`,
              `Strategy, interface, backend and store release from one person. Since ${CAREER_START_YEAR} I have built web and mobile products that are live in countries from Senegal to Uzbekistan.`,
            )}
          </motion.p>
          <motion.div className="s-cta" {...up(0.24)}>
            <a className="s-btn primary lg" href={sectionHref(pathname, "contact")} onClick={jump("contact")}>
              {t("Proje başlat", "Start a project")} <ArrowRight size={16} />
            </a>
            <a className="s-btn ghost lg" href={sectionHref(pathname, "work")} onClick={jump("work")}>
              {t("İşleri incele", "See the work")}
            </a>
          </motion.div>
        </div>
        <Collage />
      </div>
    </section>
  );
}
