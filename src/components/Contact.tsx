import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Hata",
        description: "Lütfen tüm alanları doldurun.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.email.includes('@')) {
      toast({
        title: "Hata",
        description: "Lütfen geçerli bir e-posta adresi girin.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create mailto link with form data
      const mailtoLink = `mailto:info@emirtiryaki.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Ad Soyad: ${formData.name}\n\nE-posta: ${formData.email}\n\nMesaj:\n${formData.message}`
      )}`;

      // Open default email client
      window.open(mailtoLink, '_blank');

      // Show success message
      toast({
        title: "Başarılı!",
        description: "E-posta uygulamanız açıldı. Mesajınızı gönderdikten sonra size geri dönüş yapacağım.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

    } catch (error) {
      toast({
        title: "Hata",
        description: "Bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-6">
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
                  <p className="text-muted-foreground">info@emirtiryaki.com</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Phone className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold">Telefon</h4>
                  <p className="text-muted-foreground">+90 543 447 6245</p>
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
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-12 h-12 p-0"
                  onClick={() => window.open('https://github.com/emirirr', '_blank')}
                >
                  <Github className="h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-12 h-12 p-0"
                  onClick={() => window.open('https://www.linkedin.com/in/emir-tiryaki/', '_blank')}
                >
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-12 h-12 p-0"
                  onClick={() => window.open('mailto:info@emirtiryaki.com', '_blank')}
                >
                  <Mail className="h-5 w-5" />
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
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Ad Soyad</label>
                    <Input 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Adınız ve soyadınız" 
                      className="bg-muted/30 border-border/50 focus:border-primary"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">E-posta</label>
                    <Input 
                      name="email"
                      type="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="ornek@email.com" 
                      className="bg-muted/30 border-border/50 focus:border-primary"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Konu</label>
                  <Input 
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Mesajınızın konusu" 
                    className="bg-muted/30 border-border/50 focus:border-primary"
                    required
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Mesaj</label>
                  <Textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Mesajınızı buraya yazın..." 
                    rows={6}
                    className="bg-muted/30 border-border/50 focus:border-primary resize-none"
                    required
                  />
                </div>
                
                <Button 
                  type="submit"
                  size="lg" 
                  className="w-full hero-gradient glow-effect"
                  disabled={isSubmitting}
                >
                  <Send className="mr-2 h-5 w-5" />
                  {isSubmitting ? "Gönderiliyor..." : "Mesaj Gönder"}
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