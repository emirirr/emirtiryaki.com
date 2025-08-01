import { Github, Linkedin, Mail, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold text-gradient mb-4">Emir Tiryaki</h3>
            <p className="text-muted-foreground leading-relaxed">
              Kullanıcı odaklı, modern web uygulamaları geliştiren full stack developer.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Hızlı Bağlantılar</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#hero" className="hover:text-primary transition-colors">Ana Sayfa</a></li>
              <li><a href="#skills" className="hover:text-primary transition-colors">Yetenekler</a></li>
              <li><a href="#projects" className="hover:text-primary transition-colors">Projeler</a></li>
              <li><a href="#contact" className="hover:text-primary transition-colors">İletişim</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">İletişim</h4>
            <div className="space-y-2 text-muted-foreground">
              <p>İstanbul, Türkiye</p>
              <p>emir@emirtiryaki.com</p>
              <p>+90 555 123 45 67</p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border/50">
          <div className="flex items-center gap-2 text-muted-foreground mb-4 md:mb-0">
            <span>© {currentYear} Emir Tiryaki. Tüm hakları saklıdır.</span>
            <Heart className="h-4 w-4 text-red-500" />
          </div>

          <div className="flex gap-4">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <Github className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <Linkedin className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
              <Mail className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;