import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { HERO_ROLES } from "@/data/profile";
import { CAR_SUMMARY } from "@/data/carFamily";
import { all, coverWebp, logoOf, slugOf } from "@/lib/portfolioMock";
import { CAREER_START_YEAR } from "@/lib/experience";
import { Link } from "react-router-dom";
import { useRotatingType } from "../primitives";
import { useGoSection } from "../useSite";

const ease = [0.22, 1, 0.36, 1] as const;
const up = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease },
});

const byKey = (k: string) => all.find((p) => p.imageKey === k);

/** Sağdaki kolaj: gerçek ürün ekran görüntüleri, üstünde doğrulanmış rakamlar. */
function Collage() {
  const web = byKey("dacar-web");
  const site = byKey("heybe-site");
  const phone = byKey("kortbul-expo");
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
              <img src={coverWebp(web)} alt="daCAR araç pazaryeri" />
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
              <img src={coverWebp(site)} alt="Heybe tanıtım sitesi" />
            </div>
          </Link>
        </motion.div>
      ) : null}
      {phone ? (
        <motion.div className="pane phone" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.45, ease }}>
          <Link to={`/is/${slugOf(phone)}`} className="mk-phone" aria-label={phone.title}>
            <div className="notch" />
            <div className="scr">
              <img src={coverWebp(phone)} alt="Kortbul mobil uygulaması" />
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
          <b>5,0</b> App Store · Heybe
        </span>
      </motion.div>
      <motion.div className="s-float f2" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.05, duration: 0.5 }}>
        {logoOf(web!) ? <img src={logoOf(web!)!} alt="" /> : null}
        <span>
          <b>{CAR_SUMMARY.countries} ülke</b> · {CAR_SUMMARY.brands} pazaryeri markası
        </span>
      </motion.div>
    </div>
  );
}

export function Hero() {
  const role = useRotatingType(HERO_ROLES);
  const go = useGoSection();

  return (
    <section id="top" className="s-hero">
      <div className="s-wrap s-hero-grid">
        <div className="s-hero-copy">
          <motion.div className="s-pill" {...up(0)}>
            <i /> Yeni projelere açık · İstanbul
          </motion.div>
          <motion.h1 className="s-h1" {...up(0.06)}>
            Fikrinizi <span className="grad">kullanılan</span> bir ürüne dönüştürüyorum.
          </motion.h1>
          <motion.p className="s-hero-rot" {...up(0.12)}>
            <span className="rot">
              {role}
              <span className="s-caret" aria-hidden="true" />
            </span>{" "}
            tasarlıyor, geliştiriyor ve yayına alıyorum.
          </motion.p>
          <motion.p className="s-lead lg" {...up(0.18)}>
            Strateji, arayüz, backend ve mağaza süreci tek elden. {CAREER_START_YEAR}'den bu yana
            Senegal'den Özbekistan'a farklı ülkelerde yayında olan web ve mobil ürünler geliştirdim.
          </motion.p>
          <motion.div className="s-cta" {...up(0.24)}>
            <a className="s-btn primary lg" href="/#contact" onClick={(e) => (e.preventDefault(), go("contact"))}>
              Proje başlat <ArrowRight size={16} />
            </a>
            <a className="s-btn ghost lg" href="/#work" onClick={(e) => (e.preventDefault(), go("work"))}>
              İşleri incele
            </a>
          </motion.div>
        </div>
        <Collage />
      </div>
    </section>
  );
}
