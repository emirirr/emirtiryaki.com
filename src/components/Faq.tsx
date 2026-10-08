import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { faq } from "@/data/faq";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { Section, SectionHeading } from "@/components/SectionHeading";
import { useLang, useT } from "@/i18n/lang";

/** SSS — <details> kapalıyken de cevap HTML'de durur (arama motorları ve yapay zekâ botları okur). */
const Faq = () => {
  const lang = useLang();
  const t = useT();
  return (
    <Section id="faq" tone="surface">
      <motion.div
        className="mx-auto max-w-3xl"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <SectionHeading
          eyebrow={t("SSS", "FAQ")}
          title={t("Sık sorulan", "Frequently asked")}
          highlight={t("sorular", "questions")}
        />
        <div className="space-y-3">
          {faq.map((item, i) => {
            const q = lang === "en" ? item.en.q : item.q;
            const a = lang === "en" ? item.en.a : item.a;
            return (
              <motion.details
                key={item.q}
                variants={fadeUp}
                open={i === 0}
                className="card-surface group px-5 py-4 [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left">
                  <h3 className="text-[15px] font-bold tracking-tight text-foreground sm:text-base">{q}</h3>
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary transition-transform group-open:rotate-45">
                    <Plus className="h-4 w-4" />
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">{a}</p>
              </motion.details>
            );
          })}
        </div>
      </motion.div>
    </Section>
  );
};

export default Faq;
