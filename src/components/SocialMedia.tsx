import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import {
  Github,
  Linkedin,
  Instagram,
  Youtube,
  Globe,
  Mail,
  MessageCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

const SocialMedia = () => {
  const navigate = useNavigate();

  const socialLinks = [
    {
      id: 1,
      name: "GitHub",
      username: "@emirirr",
      url: "https://github.com/emirirr",
      icon: Github,
      accent: "from-zinc-500/20 to-zinc-400/5",
      iconClass: "text-zinc-200",
    },
    {
      id: 2,
      name: "LinkedIn",
      username: "@emir-tiryaki",
      url: "https://www.linkedin.com/in/emir-tiryaki/",
      icon: Linkedin,
      accent: "from-sky-500/25 to-sky-600/5",
      iconClass: "text-sky-400",
    },
    {
      id: 3,
      name: "Instagram",
      username: "@emir.tsx",
      url: "https://instagram.com/emir.tsx",
      icon: Instagram,
      accent: "from-orange-500/25 to-amber-500/10",
      iconClass: "text-orange-400",
    },
    {
      id: 4,
      name: "YouTube",
      username: "@emirtiryaki",
      url: "https://youtube.com/@emirtiryaki",
      icon: Youtube,
      accent: "from-red-500/25 to-red-600/5",
      iconClass: "text-red-400",
    },
    {
      id: 5,
      name: "Portfolio",
      username: "emirtiryaki.com",
      url: "/",
      icon: Globe,
      accent: "from-emerald-500/20 to-emerald-600/5",
      iconClass: "text-emerald-400",
      internal: true,
    },
    {
      id: 6,
      name: "E-posta",
      username: "info@emirtiryaki.com",
      url: "mailto:info@emirtiryaki.com",
      icon: Mail,
      accent: "from-primary/25 to-accent/10",
      iconClass: "text-primary",
    },
  ];

  const openLink = (url: string, internal?: boolean) => {
    if (url.startsWith("mailto:")) {
      window.location.href = url;
      return;
    }
    if (internal) {
      navigate("/");
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="social" className="relative px-4 py-24 sm:px-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <motion.div
        className="container mx-auto max-w-6xl"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.div variants={fadeUp} className="mb-14 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Bağlantılar
          </p>
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            <span className="text-gradient">Sosyal </span>
            <span className="text-foreground">ağlar</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            Projeleri ve notları farklı kanallarda paylaşıyorum; en güncel kod GitHub’da.
          </p>
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {socialLinks.map((social) => {
            const IconComponent = social.icon;
            return (
              <motion.div
                key={social.id}
                variants={fadeUp}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
                }}
              >
                <Card
                  role="link"
                  tabIndex={0}
                  onClick={() => openLink(social.url, "internal" in social && social.internal)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openLink(social.url, "internal" in social && social.internal);
                    }
                  }}
                  className={cn(
                    "glass-strong cursor-pointer rounded-3xl border border-white/10 outline-none transition-all duration-300",
                    "hover:border-primary/30 hover:shadow-[0_20px_50px_-20px_hsl(var(--primary)/0.28)]",
                    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  )}
                  data-cursor="pointer"
                >
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center gap-4">
                      <div
                        className={cn(
                          "flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br",
                          social.accent,
                        )}
                      >
                        <IconComponent className={cn("h-6 w-6", social.iconClass)} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold tracking-tight">{social.name}</h3>
                        <p className="truncate text-sm text-muted-foreground">
                          {social.username}
                        </p>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      type="button"
                      className="w-full rounded-xl border-white/15 bg-white/[0.03] hover:bg-primary/15 hover:text-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        openLink(social.url, "internal" in social && social.internal);
                      }}
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Aç
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div variants={fadeUp} className="mt-14">
          <div className="glass-strong rounded-3xl border border-white/10 p-8 md:p-10">
            <div className="text-center">
              <h3 className="text-xl font-semibold tracking-tight md:text-2xl">
                Hızlı iletişim
              </h3>
              <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground md:text-base">
                E-posta, WhatsApp veya Telegram üzerinden ulaşabilirsiniz.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button
                  variant="outline"
                  className="rounded-xl border-white/15 bg-white/[0.03] hover:bg-white/[0.08]"
                  data-cursor="pointer"
                  onClick={() => {
                    window.location.href = "mailto:info@emirtiryaki.com";
                  }}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  E-posta
                </Button>
                <Button
                  variant="outline"
                  className="rounded-xl border-white/15 bg-white/[0.03] hover:bg-white/[0.08]"
                  data-cursor="pointer"
                  onClick={() =>
                    window.open("https://wa.me/905434476245", "_blank", "noopener,noreferrer")
                  }
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  WhatsApp
                </Button>
                <Button
                  variant="outline"
                  className="rounded-xl border-white/15 bg-white/[0.03] hover:bg-white/[0.08]"
                  data-cursor="pointer"
                  onClick={() =>
                    window.open("https://t.me/emirirr", "_blank", "noopener,noreferrer")
                  }
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Telegram
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SocialMedia;
