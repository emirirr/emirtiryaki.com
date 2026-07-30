import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Cloud,
  Database,
  Gauge,
  LayoutTemplate,
  Server,
  Wrench,
} from "lucide-react";
import { TechStackVisual } from "@/components/TechStackVisual";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/utils";

const skillCategories = [
  {
    title: "Frontend",
    icon: LayoutTemplate,
    color: "text-tech-blue",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vite", "React Native"],
  },
  {
    title: "Backend",
    icon: Server,
    color: "text-tech-indigo",
    skills: ["Node.js", "Express", "REST API", "GraphQL", "Firebase"],
  },
  {
    title: "Veri",
    icon: Database,
    color: "text-accent",
    skills: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "Supabase"],
  },
  {
    title: "DevOps & Cloud",
    icon: Cloud,
    color: "text-tech-cyan",
    skills: ["Docker", "AWS", "CI/CD", "GitHub Actions", "Linux"],
  },
  {
    title: "Araçlar",
    icon: Wrench,
    color: "text-primary",
    skills: ["Git", "Figma", "Jest", "Postman", "Vercel"],
  },
  {
    title: "Performans",
    icon: Gauge,
    color: "text-amber-400",
    skills: ["Web Vitals", "Caching", "CDN", "Bundle analizi"],
  },
];

const stats = [
  { label: "Yıl deneyim", value: "5+" },
  { label: "Tamamlanan proje", value: "40+" },
  { label: "Sektör", value: "6+" },
  { label: "Teknoloji", value: "25+" },
];

const Skills = () => {
  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <motion.div
        className="container mx-auto max-w-6xl"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.div variants={fadeUp} className="mb-12 text-center">
          <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary/80">
            // yetkinlikler
          </p>
          <h2 className="font-display text-4xl font-semibold tracking-tight md:text-5xl">
            <span className="text-gradient">Teknik </span>
            <span className="text-foreground">yetkinlikler</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Arayüzden veri katmanına, mobilden buluta kadar uçtan uca çalışırım. Aşağıdaki her
            teknoloji, üretimde aktif kullandığım günlük stack'imin bir parçası.
          </p>
        </motion.div>

        <motion.div variants={fadeUp} className="mb-10">
          <TechStackVisual />
        </motion.div>

        <div className="grid auto-rows-fr gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                variants={fadeUp}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
                }}
                className="glass group flex flex-col rounded-3xl border border-white/10 p-6 transition-shadow duration-300 hover:border-primary/25 hover:shadow-[0_20px_60px_-20px_hsl(var(--primary)/0.35)]"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]",
                      category.color,
                    )}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight">{category.title}</h3>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="rounded-lg border border-white/5 bg-white/[0.05] px-2.5 py-1 font-mono text-[11px] font-medium"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          variants={fadeUp}
          className="glass-strong mt-12 grid grid-cols-2 gap-6 rounded-3xl border border-white/10 p-8 md:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-3xl font-semibold tabular-nums text-gradient md:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 font-mono text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills;
