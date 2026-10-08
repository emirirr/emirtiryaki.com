import { Link } from "react-router-dom";
import { Logo } from "@/components/Navbar";
import { socials } from "@/data/socials";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const linkClass = "text-muted-foreground transition-colors hover:text-primary";

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Ürün odaklı arayüz ve güvenilir backend ile uçtan uca dijital ürünler geliştiriyorum.
            </p>
            <div className="mt-5 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:border-primary hover:text-primary"
                >
                  <s.Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-foreground">Çalışmalar</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><a href="/#projects" className={linkClass}>Öne çıkan projeler</a></li>
              <li><a href="/#apps" className={linkClass}>Uygulamalar</a></li>
              <li><a href="/#sites" className={linkClass}>Canlı siteler</a></li>
              <li><Link to="/projects" className={linkClass}>Tüm projeler</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-foreground">Hakkımda</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><a href="/#services" className={linkClass}>Hizmetler</a></li>
              <li><a href="/#experience" className={linkClass}>Deneyim</a></li>
              <li><a href="/cv.html" className={linkClass}>Özgeçmiş (CV)</a></li>
              <li><a href="/cv-en.html" className={linkClass}>Resume (English)</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-foreground">İletişim</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              <li><a href="mailto:info@emirtiryaki.com" className={linkClass}>info@emirtiryaki.com</a></li>
              <li><a href="tel:+905434476245" className={linkClass}>+90 543 447 6245</a></li>
              <li>İstanbul, Türkiye</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row">
          <span>© {currentYear} İsmail Emir Tiryaki. Tüm hakları saklıdır.</span>
          <span>Terminal modu: Ctrl+Shift+`</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
