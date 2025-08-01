import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from "lucide-react";

const Contact = () => {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">İletişim</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Projeleriniz hakkında konuşalım. Size nasıl yardımcı olabilirim?
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Benimle İletişime Geçin</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Yeni projeler, iş birlikleri veya sadece merhaba demek için her zaman açığım. 
                En kısa sürede size geri dönüş yapacağım.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">E-posta</h4>
                  <p className="text-muted-foreground">emir@emirtiryaki.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Phone className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold">Telefon</h4>
                  <p className="text-muted-foreground">+90 555 123 45 67</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-tech-purple/10 rounded-lg flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-tech-purple" />
                </div>
                <div>
                  <h4 className="font-semibold">Konum</h4>
                  <p className="text-muted-foreground">İstanbul, Türkiye</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="font-semibold mb-4">Sosyal Medya</h4>
              <div className="flex gap-4">
                <Button variant="outline" size="lg" className="w-12 h-12 p-0">
                  <Github className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="w-12 h-12 p-0">
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="w-12 h-12 p-0">
                  <Twitter className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="card-gradient card-shadow border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl">Mesaj Gönder</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Ad Soyad</label>
                    <Input 
                      placeholder="Adınız ve soyadınız" 
                      className="bg-muted/30 border-border/50 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">E-posta</label>
                    <Input 
                      type="email" 
                      placeholder="ornek@email.com" 
                      className="bg-muted/30 border-border/50 focus:border-primary"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Konu</label>
                  <Input 
                    placeholder="Mesajınızın konusu" 
                    className="bg-muted/30 border-border/50 focus:border-primary"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Mesaj</label>
                  <Textarea 
                    placeholder="Mesajınızı buraya yazın..." 
                    rows={6}
                    className="bg-muted/30 border-border/50 focus:border-primary resize-none"
                  />
                </div>
                
                <Button size="lg" className="w-full hero-gradient glow-effect">
                  <Send className="mr-2 h-5 w-5" />
                  Mesaj Gönder
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <Card className="card-gradient card-shadow border-border/50 max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4">Çalışma Durumu</h3>
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="text-green-400 font-medium">Yeni projeler için müsait</span>
              </div>
              <p className="text-muted-foreground text-sm">
                Freelance projeler ve uzun vadeli iş birlikleri için açığım. 
                Projelerinizi hayata geçirmek için benimle iletişime geçin.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;