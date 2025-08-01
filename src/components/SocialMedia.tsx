import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Youtube, 
  Globe,
  Mail,
  MessageCircle
} from "lucide-react";

const SocialMedia = () => {
  const socialLinks = [
    {
      id: 1,
      name: "GitHub",
      username: "@emirirr",
      url: "https://github.com/emirirr",
      icon: Github,
      color: "hover:text-gray-800 dark:hover:text-gray-200",
      bgColor: "hover:bg-gray-100 dark:hover:bg-gray-800",
      description: "Kod projelerim ve açık kaynak katkılarım"
    },
    {
      id: 2,
      name: "LinkedIn",
      username: "@emir-tiryaki",
      url: "https://www.linkedin.com/in/emir-tiryaki/",
      icon: Linkedin,
      color: "hover:text-blue-600",
      bgColor: "hover:bg-blue-50 dark:hover:bg-blue-900/20",
      description: "Profesyonel deneyimlerim ve kariyer geçmişim"
    },
    {
      id: 3,
      name: "Instagram",
      username: "@emir.tsx",
      url: "https://instagram.com/emir.tsx",
      icon: Instagram,
      color: "hover:text-pink-600",
      bgColor: "hover:bg-pink-50 dark:hover:bg-pink-900/20",
      description: "Günlük hayatım ve proje paylaşımlarım"
    },
    {
      id: 4,
      name: "YouTube",
      username: "@emirtiryaki",
      url: "https://youtube.com/@emirtiryaki",
      icon: Youtube,
      color: "hover:text-red-600",
      bgColor: "hover:bg-red-50 dark:hover:bg-red-900/20",
      description: "Teknoloji videoları ve eğitim içerikleri"
    },
    {
      id: 5,
      name: "Portfolio",
      username: "emirtiryaki.com",
      url: "https://emirtiryaki.com",
      icon: Globe,
      color: "hover:text-green-600",
      bgColor: "hover:bg-green-50 dark:hover:bg-green-900/20",
      description: "Kişisel web sitem ve portföyüm"
    },
    {
      id: 6,
      name: "E-posta",
      username: "info@emirtiryaki.com",
      url: "mailto:info@emirtiryaki.com",
      icon: Mail,
      color: "hover:text-purple-600",
      bgColor: "hover:bg-purple-50 dark:hover:bg-purple-900/20",
      description: "İş teklifleri ve işbirliği için"
    }
  ];

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Sosyal Medya</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Benimle farklı platformlarda iletişime geçebilir, projelerimi takip edebilir 
            ve güncel gelişmelerden haberdar olabilirsiniz.
          </p>
        </div>

        {/* Social Media Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {socialLinks.map((social) => {
            const IconComponent = social.icon;
            return (
              <Card 
                key={social.id}
                className="card-gradient card-shadow border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-105 group cursor-pointer"
                onClick={() => window.open(social.url, '_blank')}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center transition-all duration-300 ${social.bgColor}`}>
                      <IconComponent className={`h-6 w-6 transition-all duration-300 ${social.color}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{social.name}</h3>
                      <p className="text-muted-foreground text-sm">{social.username}</p>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {social.description}
                  </p>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Ziyaret Et
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Contact */}
        <div className="mt-16">
          <Card className="card-gradient card-shadow border-border/50">
            <CardContent className="pt-8">
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-4">Hızlı İletişim</h3>
                <p className="text-muted-foreground mb-6">
                  Projeleriniz için benimle iletişime geçmek istiyorsanız, 
                  aşağıdaki platformlardan herhangi birini kullanabilirsiniz.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button 
                    variant="outline" 
                    onClick={() => window.open('mailto:info@emirtiryaki.com', '_blank')}
                    className="flex items-center gap-2"
                  >
                    <Mail className="h-4 w-4" />
                    E-posta Gönder
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => window.open('https://wa.me/905434476245', '_blank')}
                    className="flex items-center gap-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => window.open('https://t.me/emirirr', '_blank')}
                    className="flex items-center gap-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Telegram
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SocialMedia; 