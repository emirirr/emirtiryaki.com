import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Briefcase, GraduationCap, MapPin } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";

type Role = {
  company: string;
  title: string;
  period: string;
  current?: boolean;
  points: string[];
  tags?: string[];
};

const roles: Role[] = [
  {
    company: "İstanbul Sensörler",
    title: "Mobil Geliştirme & Satın Alma",
    period: "2026 — günümüz",
    current: true,
    points: [
      "Şirket içi dashboard için mobil uygulama; Excel kaynaklı verilerin okunaklı bileşenlerle sunulması, manuel tablo bağımlılığını azaltma.",
      "Tedarik ve satın alma: teklif toplama/değerlendirme, sipariş–stok, tedarikçi ilişkileri (endüstriyel sensör ve ölçüm bileşenleri).",
    ],
    tags: ["React Native", "Dashboard", "Tedarik"],
  },
  {
    company: "Han Endüstri Otomasyon",
    title: "Satış Danışmanı",
    period: "2024 — Mart 2026",
    points: [
      "Endüstriyel ürün portföyünde pazarlama ve satış; müşteri ihtiyaçlarına teknik çözüm önerileri ve satış operasyonlarının yürütülmesi.",
    ],
    tags: ["B2B Satış", "Teknik Danışmanlık"],
  },
  {
    company: "Hamle Mühendislik",
    title: "Web, Mobil ve Multimedya",
    period: "2019 — 2024",
    points: [
      "Kurumsal web (sağlık sektörü): performans, SEO, kullanılabilirlik ve dijital dönüşüm.",
      "Mobil ve web için UX/UI stratejisi ve arayüz standartları; sosyal medya içeriği ve video prodüksiyonu.",
    ],
    tags: ["Web", "UX/UI", "SEO", "Multimedya"],
  },
  {
    company: "Hamle Mühendislik",
    title: "Yazılım Stajyeri",
    period: "2017 — 2019",
    points: [
      "Endüstriyel cihaz programlama ve gömülü uygulamalar; eğitim materyali ve teknik dokümantasyon; web/mobil projelerde destek.",
    ],
    tags: ["Gömülü", "Dokümantasyon"],
  },
  {
    company: "Tiryaki Yazılım — Freelance",
    title: "Kurucu / Full Stack Developer",
    period: "2017 — günümüz",
    current: true,
    points: [
      "Kurumsal web ve mobil çözümler; Ege Teknik, Kortbul ve diğer müşteri projelerinde uçtan uca geliştirme ve teslim.",
    ],
    tags: ["React", "Node.js", "React Native", "Müşteri Teslimi"],
  },
];

const education = [
  {
    school: "Hoca Ahmet Yesevi Üniversitesi",
    detail: "Bilgisayar Programcılığı (ön lisans) — Mezuniyet: 2026",
  },
  { school: "BTK Akademi", detail: "iOS Geliştirme sertifikası" },
  { school: "BTK Akademi", detail: "React ile Web Geliştirme sertifikası" },
];

const Experience = () => {
  return (
    <section id="experience" className="relative px-4 py-24 sm:px-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <motion.div
        className="container mx-auto max-w-6xl"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.div variants={fadeUp} className="mb-14 text-center">
          <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
            // deneyim
          </p>
          <h2 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
            <span className="text-gradient">İş </span>
            <span className="text-foreground">geçmişi</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            2017'den bu yana yazılım ve endüstri tarafında; staj, kurumsal roller ve freelance
            teslimatlarla uçtan uca deneyim.
          </p>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-3 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="relative space-y-4 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-px before:bg-white/10">
              {roles.map((role) => (
                <motion.div
                  key={`${role.company}-${role.period}`}
                  variants={fadeUp}
                  className="relative pl-8"
                >
                  <span className="absolute left-0 top-[10px] flex h-3.5 w-3.5 items-center justify-center">
                    {role.current && (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60 opacity-75" />
                    )}
                    <span
                      className={
                        role.current
                          ? "relative inline-flex h-3 w-3 rounded-full border-2 border-background bg-emerald-400"
                          : "relative inline-flex h-3 w-3 rounded-full border-2 border-background bg-primary/70"
                      }
                    />
                  </span>
                  <div className="glass rounded-2xl border border-white/10 p-6 transition-colors hover:border-primary/25">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="text-lg font-semibold tracking-tight text-foreground">
                          {role.title}
                        </h3>
                        <p className="text-sm text-primary/90">{role.company}</p>
                      </div>
                      <span className="whitespace-nowrap font-mono text-xs text-muted-foreground">
                        {role.period}
                      </span>
                    </div>
                    <ul className="mt-3 space-y-1.5">
                      {role.points.map((p) => (
                        <li
                          key={p}
                          className="text-sm leading-relaxed text-muted-foreground"
                        >
                          {p}
                        </li>
                      ))}
                    </ul>
                    {role.tags && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {role.tags.map((t) => (
                          <Badge
                            key={t}
                            variant="secondary"
                            className="rounded-lg border border-white/5 bg-white/[0.05] px-2.5 py-1 font-mono text-[11px] font-medium"
                          >
                            {t}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <motion.div
              variants={fadeUp}
              className="glass-strong rounded-2xl border border-white/10 p-6"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-primary">
                  <GraduationCap className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="text-lg font-semibold tracking-tight">Eğitim & Sertifika</h3>
              </div>
              <ul className="mt-5 space-y-4">
                {education.map((e) => (
                  <li key={e.detail} className="border-l border-white/10 pl-4">
                    <p className="text-sm font-medium text-foreground">{e.school}</p>
                    <p className="text-sm text-muted-foreground">{e.detail}</p>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="glass rounded-2xl border border-white/10 p-6"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-accent">
                  <Briefcase className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="text-lg font-semibold tracking-tight">Çalışma tercihi</h3>
              </div>
              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary/80" strokeWidth={1.75} />
                  İstanbul · Uzaktan &amp; hibrit
                </p>
                <p>Tam zamanlı roller, freelance projeler ve uzun vadeli iş birlikleri.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Experience;
