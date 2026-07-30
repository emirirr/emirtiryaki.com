import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const linkClass =
    "text-muted-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:text-primary";

  return (
    <footer className="relative border-t border-white/10 bg-background/80 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="container mx-auto px-4 py-12 sm:px-6">
        <div className="mb-10 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-xl font-semibold tracking-tight">
              <span className="text-gradient">İsmail Emir Tiryaki</span>
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Ürün odaklı arayüz ve güvenilir backend ile uçtan uca dijital deneyimler inşa ediyorum.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Sayfa
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="/#hero" className={linkClass}>
                  Ana sayfa
                </a>
              </li>
              <li>
                <a href="/#skills" className={linkClass}>
                  Yetenekler
                </a>
              </li>
              <li>
                <a href="/#architecture" className={linkClass}>
                  Mimari
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/emirirr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  GitHub
                </a>
              </li>
              <li>
                <a href="/#projects" className={linkClass}>
                  Projeler özeti
                </a>
              </li>
              <li>
                <Link to="/projects" className={linkClass}>
                  Tüm projeler
                </Link>
              </li>
              <li>
                <a href="/cv.html" className={linkClass}>
                  Özgeçmiş (CV)
                </a>
              </li>
              <li>
                <a href="/cv-en.html" className={linkClass}>
                  Resume (English)
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Daha fazla
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="/#brands" className={linkClass}>
                  Markalar
                </a>
              </li>
              <li>
                <a href="/#social" className={linkClass}>
                  Sosyal ağlar
                </a>
              </li>
              <li>
                <a href="/#contact" className={linkClass}>
                  İletişim
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              İletişim
            </h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>İstanbul, Türkiye</p>
              <a href="mailto:info@emirtiryaki.com" className={linkClass}>
                info@emirtiryaki.com
              </a>
              <p>+90 543 447 6245</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row">
          <div className="flex flex-col items-center gap-1 text-center text-muted-foreground md:items-start md:text-left">
            <div className="flex items-center gap-2 text-sm">
              <span>© {currentYear} İsmail Emir Tiryaki</span>
              <Heart className="h-4 w-4 text-red-500/90" aria-hidden />
            </div>
            <p className="max-w-md text-[11px] leading-relaxed text-muted-foreground/70">
              Terminal: Ctrl+Shift+` veya ardışık ` ` (form alanlarında devre dışı)
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-xl text-muted-foreground hover:bg-white/[0.06] hover:text-foreground"
              data-cursor="pointer"
              onClick={() =>
                window.open("https://github.com/emirirr", "_blank", "noopener,noreferrer")
              }
            >
              <Github className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-xl text-muted-foreground hover:bg-white/[0.06] hover:text-foreground"
              data-cursor="pointer"
              onClick={() =>
                window.open(
                  "https://www.linkedin.com/in/emir-tiryaki/",
                  "_blank",
                  "noopener,noreferrer",
                )
              }
            >
              <Linkedin className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 rounded-xl text-muted-foreground hover:bg-white/[0.06] hover:text-foreground"
              data-cursor="pointer"
              onClick={() => window.open("mailto:info@emirtiryaki.com", "_blank")}
            >
              <Mail className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
