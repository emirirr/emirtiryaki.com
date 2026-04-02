import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, Github, Linkedin } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: "Hata",
        description: "Lütfen tüm alanları doldurun.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.email.includes("@")) {
      toast({
        title: "Hata",
        description: "Lütfen geçerli bir e-posta adresi girin.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const mailtoLink = `mailto:info@emirtiryaki.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
        `Ad Soyad: ${formData.name}\n\nE-posta: ${formData.email}\n\nMesaj:\n${formData.message}`,
      )}`;

      window.open(mailtoLink, "_blank");

      toast({
        title: "Başarılı!",
        description:
          "E-posta uygulamanız açıldı. Mesajınızı gönderdikten sonra size geri dönüş yapacağım.",
      });

      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      toast({
        title: "Hata",
        description: "Bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fields =
    "rounded-xl border-white/10 bg-white/[0.04] text-foreground placeholder:text-muted-foreground/70 focus-visible:border-primary/50 focus-visible:ring-primary/20";

  return (
    <section id="contact" className="relative px-4 py-24 sm:px-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[40%] bg-[radial-gradient(ellipse_at_bottom,hsl(var(--primary)/0.08),transparent_70%)]" />

      <motion.div
        className="container relative mx-auto max-w-6xl"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.div variants={fadeUp} className="mb-14 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            İletişim
          </p>
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            <span className="text-gradient">Birlikte </span>
            <span className="text-foreground">üretelim</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Proje fikrinizi veya ekip ihtiyacınızı yazın; mümkün olan en kısa sürede dönüş yaparım.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          <motion.div variants={fadeUp} className="space-y-6">
            <div className="glass-strong rounded-3xl border border-white/10 p-8">
              <h3 className="text-xl font-semibold tracking-tight">Doğrudan kanallar</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Yeni projeler ve iş birlikleri için formu doldurabilir veya aşağıdaki bilgilerden
                birini kullanabilirsiniz.
              </p>
            </div>

            <div className="grid gap-4">
              {[
                {
                  icon: Mail,
                  title: "E-posta",
                  value: "info@emirtiryaki.com",
                  tint: "bg-primary/15 text-primary",
                },
                {
                  icon: Phone,
                  title: "Telefon",
                  value: "+90 543 447 6245",
                  tint: "bg-accent/15 text-accent",
                },
                {
                  icon: MapPin,
                  title: "Konum",
                  value: "İstanbul, Türkiye",
                  tint: "bg-tech-indigo/15 text-tech-indigo",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="glass flex items-center gap-4 rounded-2xl border border-white/10 p-5 transition-colors hover:border-white/15"
                >
                  <div
                    className={cn(
                      "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
                      item.tint,
                    )}
                  >
                    <item.icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="glass rounded-2xl border border-white/10 p-6">
              <h4 className="text-sm font-semibold">Sosyal</h4>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-11 w-11 rounded-xl border-white/15 bg-white/[0.04] p-0 hover:bg-white/[0.08]"
                  data-cursor="pointer"
                  onClick={() =>
                    window.open("https://github.com/emirirr", "_blank", "noopener,noreferrer")
                  }
                >
                  <Github className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-11 w-11 rounded-xl border-white/15 bg-white/[0.04] p-0 hover:bg-white/[0.08]"
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
                  variant="outline"
                  size="lg"
                  className="h-11 w-11 rounded-xl border-white/15 bg-white/[0.04] p-0 hover:bg-white/[0.08]"
                  data-cursor="pointer"
                  onClick={() => window.open("mailto:info@emirtiryaki.com", "_blank")}
                >
                  <Mail className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Card className="glass-strong overflow-hidden rounded-3xl border border-white/10 shadow-none">
              <CardHeader className="border-b border-white/5 pb-6">
                <CardTitle className="text-xl font-semibold tracking-tight">
                  Mesaj gönder
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium">Ad Soyad</label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Adınız ve soyadınız"
                        className={fields}
                        required
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium">E-posta</label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="ornek@email.com"
                        className={fields}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">Konu</label>
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Mesajınızın konusu"
                      className={fields}
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">Mesaj</label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Mesajınızı buraya yazın..."
                      rows={6}
                      className={cn(fields, "resize-none")}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full rounded-2xl hero-gradient glow-effect"
                    disabled={isSubmitting}
                    data-cursor="pointer"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    {isSubmitting ? "Gönderiliyor..." : "Mesaj gönder"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} className="mt-14 flex justify-center">
          <div className="glass-strong max-w-2xl rounded-3xl border border-white/10 px-8 py-8 text-center">
            <h3 className="text-lg font-semibold tracking-tight">Çalışma durumu</h3>
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              <span className="text-sm font-medium text-emerald-400/95">
                Yeni projeler için müsait
              </span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Freelance ve uzun vadeli iş birlikleri için açığım.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
