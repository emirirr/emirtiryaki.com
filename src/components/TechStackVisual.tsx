import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";

function ReactOrb() {
  return (
    <svg viewBox="0 0 96 96" className="h-28 w-28" aria-hidden>
      <motion.g
        style={{ transformOrigin: "48px 48px" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
      >
        <circle cx="48" cy="48" r="9" className="fill-primary/90" />
        <ellipse
          cx="48"
          cy="48"
          rx="32"
          ry="11"
          fill="none"
          stroke="hsl(var(--tech-blue))"
          strokeWidth="2"
          opacity="0.9"
        />
        <ellipse
          cx="48"
          cy="48"
          rx="32"
          ry="11"
          fill="none"
          stroke="hsl(var(--tech-blue))"
          strokeWidth="2"
          opacity="0.9"
          transform="rotate(60 48 48)"
        />
        <ellipse
          cx="48"
          cy="48"
          rx="32"
          ry="11"
          fill="none"
          stroke="hsl(var(--tech-blue))"
          strokeWidth="2"
          opacity="0.9"
          transform="rotate(-60 48 48)"
        />
      </motion.g>
    </svg>
  );
}

function NodeHex() {
  return (
    <svg viewBox="0 0 96 96" className="h-28 w-28 text-tech-indigo" aria-hidden>
      <motion.g
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <path
          fill="currentColor"
          fillOpacity="0.12"
          d="M48 20 L70 33 V59 L48 72 L26 59 V33 Z"
        />
        <path
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinejoin="round"
          d="M48 20 L70 33 V59 L48 72 L26 59 V33 Z M48 72 V48 M38 42 L48 48 L58 42"
        />
      </motion.g>
    </svg>
  );
}

function SwiftMark() {
  return (
    <svg viewBox="0 0 96 96" className="h-28 w-28 text-accent" aria-hidden>
      <motion.path
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M58 24 C44 36 34 52 30 68 C40 58 52 48 64 42 C54 56 46 66 42 74 C50 64 62 52 72 46"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }}
      />
    </svg>
  );
}

function DbStack() {
  return (
    <svg viewBox="0 0 96 96" className="h-28 w-28 text-muted-foreground" aria-hidden>
      <ellipse cx="48" cy="38" rx="22" ry="8" fill="none" stroke="currentColor" strokeWidth="2" />
      <path fill="none" stroke="currentColor" strokeWidth="2" d="M26 38 V54 C26 60 62 60 62 54 V38" />
      <ellipse cx="48" cy="54" rx="22" ry="8" fill="none" stroke="currentColor" strokeWidth="2" />
      <motion.line
        x1="48"
        y1="30"
        x2="48"
        y2="62"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="4 6"
        initial={{ strokeDashoffset: 0 }}
        animate={{ strokeDashoffset: -40 }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  );
}

const cards = [
  { name: "React", accent: "hsl(var(--tech-blue))", el: <ReactOrb /> },
  { name: "Node.js", accent: "hsl(var(--tech-indigo))", el: <NodeHex /> },
  { name: "Swift", accent: "hsl(var(--accent))", el: <SwiftMark /> },
  { name: "PostgreSQL", accent: "hsl(var(--muted-foreground))", el: <DbStack /> },
];

export function TechStackVisual() {
  return (
    <motion.div
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
    >
      {cards.map((item) => (
        <motion.div
          key={item.name}
          variants={fadeUp}
          whileHover={{ y: -5, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } }}
          whileTap={{ scale: 0.98 }}
          className="glass group relative flex flex-col items-center overflow-hidden rounded-2xl border border-white/10 px-6 py-8"
        >
          <div
            className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full opacity-35 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
            style={{ background: item.accent }}
          />
          <div className="relative flex min-h-[7rem] items-center justify-center">
            {item.el}
          </div>
          <p className="relative mt-2 text-sm font-semibold tracking-tight">{item.name}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
