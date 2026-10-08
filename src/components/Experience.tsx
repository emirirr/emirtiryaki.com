import { motion } from "framer-motion";
import { GraduationCap, MapPin } from "lucide-react";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { Section, SectionHeading } from "@/components/SectionHeading";

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
    period: "Mart 2026 — günümüz",
    current: true,
    points: [
      "Şirket içi dashboard için mobil uygulama; Excel kaynaklı verilerin okunaklı bileşenlerle sunulması, manuel tablo bağımlılığını azaltma.",
      "Tedarik ve satın alma: teklif toplama/değerlendirme, sipariş–stok, tedarikçi ilişkileri (endüstriyel sensör ve ölçüm bileşenleri).",
    ],
    tags: ["React Native", "Dashboard", "Tedarik"],
  },
  {
    company: "Kortbul — Freelance",
    title: "Full-Stack Developer",
    period: "Eylül 2025 — Mart 2026",
    points: [
      "Raket sporları için tesis arama ve online kort/saha rezervasyon platformunu uçtan uca geliştirdim (kortbul.com.tr).",
      "React & Node.js ile modüler mimari; tesis yöneticisi ve sporcu için ayrı paneller, uygunluk takvimi, online rezervasyon ve raporlama.",
      "Gerçek zamanlı bildirimler ve rol bazlı yetkilendirme ile anlık bilgi akışı ve veri güvenliği.",
    ],
    tags: ["React", "Node.js", "TypeScript", "Realtime"],
  },
  {
    company: "Bionluk — Freelance",
    title: "iOS & Web Developer",
    period: "Ocak 2024 — Mart 2026",
    points: [
      "Web ve iOS platformlarında farklı sektörlerden müşteriler için uçtan uca ürün geliştirdim.",
      "iOS: Swift & SwiftUI ile App Store'da yayınlanan uygulamalar (CarLog, Adhan, Terapi Asistanı).",
      "Web: React & TypeScript arayüzler; Firebase ile kimlik doğrulama ve gerçek zamanlı veri yönetimi.",
    ],
    tags: ["Swift", "SwiftUI", "React", "Firebase"],
  },
  {
    company: "Cebinde",
    title: "Co-Founder",
    period: "Eylül 2023 — Mart 2026",
    points: [
      "Cebinde platformunun mobil arayüzlerini geliştiren ekipte liderlik; kullanıcı deneyimini iyileştiren kullanıcı dostu arayüz tasarımı.",
    ],
    tags: ["Mobil", "UI/UX", "Ekip Liderliği"],
  },
  {
    company: "Han Endüstri Otomasyon",
    title: "Satış",
    period: "Aralık 2023 — Ocak 2026",
    points: [
      "Endüstriyel ürün portföyünde pazarlama ve satış; müşteri ihtiyaçlarına teknik çözüm önerileri ve satış operasyonlarının yürütülmesi.",
    ],
    tags: ["B2B Satış", "Teknik Danışmanlık"],
  },
  {
    company: "CK Tedarik — Freelance",
    title: "Web Tasarımı & E-ticaret",
    period: "Ağustos 2023 — Aralık 2023",
    points: [
      "Ürünleri etkili biçimde sergileyen, kullanıcı dostu e-ticaret sitesi tasarımı; firmanın dijital varlığını güçlendirme ve müşteri etkileşimini artırma.",
    ],
    tags: ["Web Tasarımı", "E-ticaret"],
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
];

const education = [
  {
    school: "Anadolu Üniversitesi",
    detail: "Yapay Zekâ ile Kodlama — devam ediyor",
  },
  { school: "BTK Akademi", detail: "iOS Geliştirme sertifikası" },
  { school: "BTK Akademi", detail: "React ile Web Geliştirme sertifikası" },
];

const Experience = () => {
  return (
    <Section id="experience">
      <motion.div
        className="mx-auto max-w-6xl"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <SectionHeading
          eyebrow="Deneyim"
          title="2017'den bu yana"
          highlight="üretiyorum"
          description="Staj, kurumsal roller ve freelance teslimatlarla yazılımın ve endüstrinin içinden gelen uçtan uca deneyim."
        />

        <div className="grid gap-10 lg:grid-cols-[1fr_340px] lg:gap-12">
          <ol className="relative">
            <span className="absolute bottom-2 left-[7px] top-2 w-px bg-border" aria-hidden />
            {roles.map((role) => (
              <motion.li
                key={`${role.company}-${role.title}`}
                variants={fadeUp}
                className="relative pb-8 pl-10 last:pb-0"
              >
                <span
                  className={
                    "absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-[3px] " +
                    (role.current
                      ? "border-primary bg-card ring-4 ring-primary/15"
                      : "border-border bg-card")
                  }
                  aria-hidden
                />
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-bold tracking-tight text-foreground">
                    {role.title}
                    <span className="font-semibold text-muted-foreground"> · {role.company}</span>
                  </h3>
                  <span
                    className={
                      "text-xs font-semibold " +
                      (role.current ? "text-primary" : "text-muted-foreground")
                    }
                  >
                    {role.period}
                  </span>
                </div>
                <ul className="mt-2 space-y-1.5">
                  {role.points.map((p) => (
                    <li key={p} className="text-sm leading-relaxed text-muted-foreground">
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.li>
            ))}
          </ol>

          <motion.aside variants={fadeUp} className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="card-surface p-6">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-soft text-primary">
                  <GraduationCap className="h-[18px] w-[18px]" strokeWidth={2} />
                </span>
                <h3 className="font-bold text-foreground">Eğitim & sertifika</h3>
              </div>
              <ul className="mt-5 space-y-4">
                {education.map((e) => (
                  <li key={e.detail}>
                    <p className="text-sm font-semibold text-foreground">{e.school}</p>
                    <p className="text-sm text-muted-foreground">{e.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-ink p-6 text-white">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <MapPin className="h-4 w-4 text-primary-glow" />
                İstanbul · Uzaktan & hibrit
              </div>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Tam zamanlı roller, freelance projeler ve uzun vadeli iş birliklerine açığım.
              </p>
              <a
                href="/cv.html"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex h-10 items-center rounded-lg bg-white px-4 text-sm font-semibold text-ink transition-opacity hover:opacity-90"
              >
                Özgeçmişi görüntüle
              </a>
              <a
                href="/cv-en.html"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-3 text-sm font-medium text-white/70 underline-offset-4 hover:text-white hover:underline"
              >
                English
              </a>
            </div>
          </motion.aside>
        </div>
      </motion.div>
    </Section>
  );
};

export default Experience;
