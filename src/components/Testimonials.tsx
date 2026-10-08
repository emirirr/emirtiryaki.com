import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { Section, SectionHeading } from "@/components/SectionHeading";
import { useLang, useT } from "@/i18n/lang";

/** Gerçek müşteri yorumları; liste boşsa hiç render edilmez. */
const Testimonials = () => {
  const lang = useLang();
  const t = useT();
  if (testimonials.length === 0) return null;

  return (
    <Section id="testimonials">
      <motion.div
        className="mx-auto max-w-6xl"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <SectionHeading
          eyebrow={t("Referanslar", "Testimonials")}
          title={t("Müşteriler", "What clients")}
          highlight={t("ne diyor", "say")}
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => {
            const quote = lang === "en" && item.quoteEn ? item.quoteEn : item.quote;
            const role = lang === "en" && item.roleEn ? item.roleEn : item.role;
            return (
              <motion.figure key={item.name + item.company} variants={fadeUp} className="card-surface flex flex-col p-6">
                <Quote className="h-6 w-6 text-primary" aria-hidden />
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-foreground/85">“{quote}”</blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                  {item.avatar ? (
                    <img src={item.avatar} alt="" width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
                  ) : (
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-soft text-sm font-bold text-primary">
                      {item.name.charAt(0)}
                    </span>
                  )}
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-bold text-foreground">{item.name}</span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {role} ·{" "}
                      {item.link ? (
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                          {item.company}
                        </a>
                      ) : (
                        item.company
                      )}
                    </span>
                  </span>
                </figcaption>
              </motion.figure>
            );
          })}
        </div>
      </motion.div>
    </Section>
  );
};

export default Testimonials;
