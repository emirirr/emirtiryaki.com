import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { techBrands } from "@/data/techBrands";

export function TechStackVisual() {
  return (
    <motion.div
      className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
    >
      {techBrands.map((brand) => (
        <motion.div
          key={brand.name}
          variants={fadeUp}
          whileHover={{ y: -4, transition: { duration: 0.24, ease: [0.22, 1, 0.36, 1] } }}
          className="glass group flex flex-col items-center justify-center gap-2.5 rounded-2xl border border-white/10 px-3 py-5 transition-colors hover:border-primary/25"
          style={{ ["--brand" as string]: brand.color }}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-8 w-8 text-muted-foreground/80 transition-colors duration-300 group-hover:text-[var(--brand)]"
            fill="currentColor"
            aria-hidden
          >
            <path d={brand.path} />
          </svg>
          <span className="text-center font-mono text-[11px] font-medium text-muted-foreground">
            {brand.name}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}
