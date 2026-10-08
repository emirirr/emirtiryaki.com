import { cn } from "@/lib/utils";

/** Marka işareti: el yazısı “e” + yazılımcı imleci. Kaynak: public/favicon.svg */
export function BrandMark({ className, blink = false }: { className?: string; blink?: boolean }) {
  return (
    <svg viewBox="0 0 120 120" aria-hidden className={cn("shrink-0", className)}>
      <rect width="120" height="120" rx="28" fill="hsl(var(--primary))" />
      <path
        d="M27 73 C45 71 61 61 59 49 C57 37 37 39 35 55 C33 73 51 83 71 71"
        fill="none"
        stroke="#fff"
        strokeWidth="9.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="79"
        y="77"
        width="22"
        height="9"
        rx="3"
        fill="#bfd6ff"
        className={blink ? "brand-caret" : undefined}
      />
    </svg>
  );
}
