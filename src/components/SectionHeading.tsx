import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  /** Başlığın düz kısmı */
  title: string;
  /** Mavi vurgulanan kelime(ler) — başlığın sonuna eklenir */
  highlight: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
  children?: React.ReactNode;
};

/** İşlerdeki başlık dili: hap etiket + kalın başlık + tek renkli vurgu kelimesi. */
export function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  align = "center",
  className,
  children,
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <motion.div
      variants={fadeUp}
      className={cn(
        "mb-12 md:mb-14",
        centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl",
        className,
      )}
    >
      <span className="eyebrow">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
        {eyebrow}
      </span>
      <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-[2.75rem] md:leading-[1.1]">
        {title} <span className="text-primary">{highlight}</span>
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          {description}
        </p>
      )}
      {children}
    </motion.div>
  );
}

/** Bölüm kabı — tutarlı dikey ritim ve genişlik. */
export function Section({
  id,
  className,
  tone = "default",
  children,
}: {
  id?: string;
  className?: string;
  tone?: "default" | "surface";
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative px-4 py-20 sm:px-6 md:py-28",
        tone === "surface" && "bg-surface",
        className,
      )}
    >
      {children}
    </section>
  );
}
