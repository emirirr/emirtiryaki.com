import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";

const SELECTOR =
  'a[href], button, [role="button"], input, textarea, select, [data-cursor="pointer"]';

export function CustomCursor() {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const raf = useRef<number>(0);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 420, damping: 36, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 420, damping: 36, mass: 0.35 });

  useEffect(() => {
    const mqFine = window.matchMedia("(pointer: fine)");
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      setEnabled(mqFine.matches && !mqMotion.matches && !reduceMotion);
    };
    sync();
    mqFine.addEventListener("change", sync);
    mqMotion.addEventListener("change", sync);
    return () => {
      mqFine.removeEventListener("change", sync);
      mqMotion.removeEventListener("change", sync);
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        x.set(e.clientX);
        y.set(e.clientY);
      });
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      setHovering(!!t.closest(SELECTOR));
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.body.classList.add("cursor-none");

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.body.classList.remove("cursor-none");
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[9998] mix-blend-difference"
      aria-hidden
    >
      <motion.div
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
        className={cn(
          "absolute left-0 top-0 rounded-full border border-white/80 bg-white/10 backdrop-blur-[2px]",
          hovering ? "h-14 w-14" : "h-3 w-3",
        )}
        transition={{ type: "spring", stiffness: 520, damping: 38 }}
      />
    </motion.div>
  );
}
