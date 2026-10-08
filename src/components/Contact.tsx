import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, ChevronDown } from "lucide-react";
import { socials } from "@/data/socials";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { talepGonder } from "@/lib/talep";
import { trackEvent } from "@/lib/analytics";
import { Section, SectionHeading } from "@/components/SectionHeading";
import { useLang, useT } from "@/i18n/lang";

const channels = [
  { Icon: Mail, label: "E-posta", en: "Email", value: "info@emirtiryaki.com", href: "mailto:info@emirtiryaki.com" },
  { Icon: Phone, label: "Telefon", en: "Phone", value: "+90 543 447 6245", href: "tel:+905434476245" },
  { Icon: MapPin, label: "Konum", en: "Location", value: "İstanbul, Türkiye" },
];


/** emirscode-teklif CRM'indeki SERVICE_LABEL anahtarlarıyla birebir aynı olmalı. */
const SERVICES = [
  { value: "web", label: "Web Geliştirme", en: "Web development" },
  { value: "mobil", label: "Mobil Uygulama", en: "Mobile app" },
  { value: "kurumsal", label: "Kurumsal Yazılım (CRM/ERP)", en: "Business software (CRM/ERP)" },
  { value: "uiux", label: "UI/UX Tasarım", en: "UI/UX design" },
  { value: "dijital", label: "Dijital Dönüşüm", en: "Digital transformation" },
  { value: "seo", label: "SEO", en: "SEO" },
  { value: "diger", label: "Diğer", en: "Other" },
];

const EMPTY_FORM = { name: "", email: "", phone: "", service: "", message: "" };

const Contact = () => {
  const { toast } = useToast();
  const lang = useLang();
  const t = useT();
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.service || !formData.message) {
      toast({
        title: t("Hata", "Error"),
        description: t(
          "Lütfen ad, e-posta, hizmet ve mesaj alanlarını doldurun.",
          "Please fill in your name, email, service and message.",
        ),
        variant: "destructive",
      });
      return;
    }

    if (!formData.email.includes("@")) {
      toast({
        title: t("Hata", "Error"),
        description: t("Lütfen geçerli bir e-posta adresi girin.", "Please enter a valid email address."),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await talepGonder({
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        service: formData.service,
        message: formData.message.trim(),
        source: lang === "en" ? "emirtiryaki.com (EN)" : "emirtiryaki.com",
      });
      trackEvent(`form-gonderildi/${formData.service}`);
      toast({
        title: t("Teşekkürler", "Thank you"),
        description: t(
          "Mesajınız alındı; en kısa sürede size dönüş yapacağım.",
          "Your message has been received; I'll get back to you shortly.",
        ),
      });

      setFormData(EMPTY_FORM);
    } catch (err) {
      toast({
        title: t("Hata", "Error"),
        description:
          err instanceof Error ? err.message : t("Bir hata oluştu. Lütfen tekrar deneyin.", "Something went wrong. Please try again."),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fields =
    "h-11 rounded-lg border-input bg-card text-foreground placeholder:text-muted-foreground/70 focus-visible:ring-primary/30";

  return (
    <Section id="contact">
      <motion.div
        className="mx-auto max-w-6xl"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <SectionHeading
          eyebrow={t("İletişim", "Contact")}
          title={t("Projenizi birlikte", "Let's build")}
          highlight={t("hayata geçirelim", "your project")}
          description={t(
            "Fikrinizi veya ekip ihtiyacınızı yazın; genellikle 24 saat içinde net bir yol haritası ve teklifle dönerim.",
            "Tell me about your idea or team needs; I usually reply within 24 hours with a clear roadmap and a quote.",
          )}
        />

        <motion.div
          variants={fadeUp}
          className="grid overflow-hidden rounded-3xl border border-border bg-card lg:grid-cols-[0.85fr_1.15fr]"
          style={{ boxShadow: "var(--shadow-lift)" }}
        >
          {/* Sol panel — işlerdeki koyu form paneli dili */}
          <div className="relative overflow-hidden bg-ink p-8 text-white sm:p-10">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                {t("Yeni projeler için müsait", "Available for new projects")}
              </span>
              <h3 className="mt-5 text-2xl font-extrabold tracking-tight">{t("Doğrudan ulaşın", "Reach me directly")}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">
                {t(
                  "Formu doldurabilir ya da aşağıdaki kanallardan birini kullanabilirsiniz.",
                  "Fill in the form or use one of the channels below.",
                )}
              </p>

              <ul className="mt-8 space-y-5">
                {channels.map((c) => {
                  const inner = (
                    <>
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                        <c.Icon className="h-5 w-5" strokeWidth={1.75} />
                      </span>
                      <span>
                        <span className="block text-xs text-white/55">{lang === "en" ? c.en : c.label}</span>
                        <span className="block text-[15px] font-semibold">{c.value}</span>
                      </span>
                    </>
                  );
                  return (
                    <li key={c.label}>
                      {c.href ? (
                        <a href={c.href} className="flex items-center gap-4 hover:text-primary-glow">
                          {inner}
                        </a>
                      ) : (
                        <div className="flex items-center gap-4">{inner}</div>
                      )}
                    </li>
                  );
                })}
              </ul>

              <div className="mt-10 border-t border-white/10 pt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/50">
                  {t("Sosyal", "Social")}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      title={s.label}
                      className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 transition-colors hover:bg-white hover:text-ink"
                    >
                      <s.Icon className="h-[18px] w-[18px]" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-8 sm:p-10">
            <h3 className="text-xl font-extrabold tracking-tight text-foreground">{t("Mesaj gönderin", "Send a message")}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {t(
                "Mesajınız doğrudan teklif sistemime düşer; genellikle aynı gün dönerim.",
                "Your message goes straight into my quoting system; I usually reply the same day.",
              )}
            </p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} />
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="c-name" className="mb-2 block text-sm font-semibold text-foreground">{t("Ad Soyad", "Full name")}</label>
                  <Input id="c-name" name="name" value={formData.name} onChange={handleInputChange} placeholder={t("Adınız ve soyadınız", "Your full name")} className={fields} required />
                </div>
                <div>
                  <label htmlFor="c-email" className="mb-2 block text-sm font-semibold text-foreground">{t("E-posta", "Email")}</label>
                  <Input id="c-email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder={t("ornek@email.com", "you@example.com")} className={fields} required />
                </div>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="c-phone" className="mb-2 block text-sm font-semibold text-foreground">
                    {t("Telefon", "Phone")}{" "}
                    <span className="font-normal text-muted-foreground">{t("(isteğe bağlı)", "(optional)")}</span>
                  </label>
                  <Input id="c-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" value={formData.phone} onChange={handleInputChange} placeholder={t("05xx xxx xx xx", "+1 555 000 0000")} className={fields} />
                </div>
                <div>
                  <label htmlFor="c-service" className="mb-2 block text-sm font-semibold text-foreground">{t("Hizmet", "Service")}</label>
                  <div className="relative">
                  <select
                    id="c-service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    required
                    className={cn(
                      fields,
                      "w-full appearance-none border px-3 pr-9 text-sm focus-visible:outline-none focus-visible:ring-2",
                      !formData.service && "text-muted-foreground/70",
                    )}
                  >
                    <option value="" disabled>
                      {t("Seçin", "Select")}
                    </option>
                    {SERVICES.map((s) => (
                      <option key={s.value} value={s.value} className="text-foreground">
                        {lang === "en" ? s.en : s.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="c-message" className="mb-2 block text-sm font-semibold text-foreground">{t("Mesaj", "Message")}</label>
                <Textarea id="c-message" name="message" value={formData.message} onChange={handleInputChange} placeholder={t("Projenizden kısaca bahsedin…", "Tell me briefly about your project…")} rows={6} className={cn(fields, "h-auto resize-none")} required />
              </div>
              <Button
                type="submit"
                size="lg"
                className="h-12 w-full rounded-lg text-[15px] font-semibold"
                disabled={isSubmitting}
              >
                <Send className="mr-2 h-4 w-4" />
                {isSubmitting ? t("Gönderiliyor…", "Sending…") : t("Mesajı gönder", "Send message")}
              </Button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
};

export default Contact;
