import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Globe, Building2, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

const Brands = () => {
  const brands = [
    {
      id: 1,
      name: "Tiryaki Yazılım",
      description: "Yazılım geliştirme ve dijital çözümler şirketi",
      website: "https://tiryakiyazilim.com",
      category: "Teknoloji",
      year: "2024",
      services: ["Web Geliştirme", "Mobil Uygulama", "E-ticaret", "Kurumsal Çözümler"],
      technologies: ["React", "Node.js", "Swift", "PostgreSQL"],
    },
    {
      id: 2,
      name: "Odak Software",
      description: "Endüstriyel otomasyon ve kontrol sistemleri",
      website: "https://odaksoftware.com",
      category: "Endüstriyel",
      year: "2024",
      services: ["E-ticaret Platformu", "Stok Yönetimi", "Güvenli Ödeme"],
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
    },
    {
      id: 3,
      name: "Figrinova",
      description: "İnovatif çözümler ve teknoloji hizmetleri",
      website: "https://figrinova.com",
      category: "Teknoloji",
      year: "2024",
      services: ["Web Geliştirme", "Mobil Uygulama", "UI/UX Tasarım", "Dijital Pazarlama"],
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      id: 4,
      name: "Kodlasa",
      description: "Eğitim ve geliştirme platformu",
      website: "https://kodlasa.com",
      category: "Eğitim",
      year: "2024",
      services: ["Eğitim Platformu", "Kodlama Dersleri", "Proje Geliştirme", "Mentorluk"],
      technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
    },
  ];

  return (
    <section id="brands" className="relative px-4 py-24 sm:px-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-1/3 h-[320px] bg-[radial-gradient(circle_at_50%_50%,hsl(var(--accent)/0.06),transparent_65%)]" />

      <motion.div
        className="container relative mx-auto max-w-6xl"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.div variants={fadeUp} className="mb-14 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Markalar
          </p>
          <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
            <span className="text-gradient">Oluşturduğum </span>
            <span className="text-foreground">markalar</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
            Farklı sektörlerde kurduğum veya büyüttüğüm dijital varlıklar; her biri ölçülebilir iş
            hedefleriyle hizalandı.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {brands.map((brand) => (
            <motion.div
              key={brand.id}
              variants={fadeUp}
              whileHover={{
                y: -4,
                transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
              }}
            >
              <Card
                className={cn(
                  "glass-strong h-full overflow-hidden rounded-3xl border border-white/10",
                  "transition-shadow duration-300 hover:border-primary/25 hover:shadow-[0_20px_50px_-20px_hsl(var(--primary)/0.3)]",
                )}
              >
                <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-primary/20 via-background/40 to-accent/15">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,hsl(var(--primary)/0.25),transparent_60%)]" />
                  <Building2 className="relative h-16 w-16 text-primary/85" strokeWidth={1.25} />
                  <Badge
                    variant="secondary"
                    className="absolute right-4 top-4 rounded-lg border border-white/10 bg-black/35 text-[10px] font-medium backdrop-blur-md"
                  >
                    {brand.category}
                  </Badge>
                </div>

                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold tracking-tight">{brand.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {brand.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {brand.year}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      {brand.category}
                    </span>
                  </div>

                  <div className="mt-5">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Hizmetler
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {brand.services.map((service) => (
                        <Badge
                          key={service}
                          variant="secondary"
                          className="rounded-lg border border-white/5 bg-white/[0.06] px-2 py-0.5 text-[10px] font-medium"
                        >
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Teknoloji
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {brand.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="rounded-lg border-white/10 bg-transparent px-2 py-0.5 text-[10px]"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-6 w-full rounded-xl border-white/15 bg-white/[0.03] hover:bg-white/[0.08]"
                    data-cursor="pointer"
                    onClick={() =>
                      window.open(brand.website, "_blank", "noopener,noreferrer")
                    }
                  >
                    <Globe className="mr-2 h-4 w-4" />
                    Siteyi aç
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeUp}
          className="glass-strong mt-16 rounded-3xl border border-white/10 p-8 md:p-10"
        >
          <div className="grid gap-8 text-center md:grid-cols-3">
            <div>
              <div className="text-3xl font-semibold tabular-nums text-gradient md:text-4xl">
                {brands.length}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">Toplam marka</div>
            </div>
            <div>
              <div className="text-3xl font-semibold tabular-nums text-gradient md:text-4xl">
                {brands.filter((b) => b.category === "Teknoloji").length}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">Teknoloji</div>
            </div>
            <div>
              <div className="text-3xl font-semibold tabular-nums text-gradient md:text-4xl">
                {brands.filter((b) => b.category === "Endüstriyel").length}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">Endüstriyel</div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} className="mt-14 text-center">
          <p className="mb-6 text-muted-foreground">
            Markanız için ürün ve platform tasarlayalım.
          </p>
          <Button
            size="lg"
            className="rounded-2xl px-8 hero-gradient shadow-lg shadow-primary/15"
            data-cursor="pointer"
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            <ExternalLink className="mr-2 h-5 w-5" />
            İletişime geç
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Brands;
