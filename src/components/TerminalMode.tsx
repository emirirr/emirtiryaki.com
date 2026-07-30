import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { scrollToSection } from "@/lib/utils";

type Line = { type: "in" | "out" | "err"; text: string };

const HELP = `Komutlar:
  help          — Bu yardımı gösterir
  whoami        — Kısa profil
  skills        — Yetkinlik özeti
  projects      — Öne çıkan projeler
  github        — GitHub profilini aç
  clear         — Ekranı temizle
  exit | close  — Terminali kapat
  open <hedef>  — hero | skills | projects | contact

İpucu: Ctrl+Shift+\` ile bu modu açıp kapatabilirsiniz.`;

export function TerminalMode() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<Line[]>([
    {
      type: "out",
      text: "emir@portfolio ~ % Hoş geldiniz. 'help' yazın veya Ctrl+Shift+` ile çıkın.",
    },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastTick = useRef(0);
  const tickCount = useRef(0);

  const push = useCallback((type: Line["type"], text: string) => {
    setLines((prev) => [...prev, { type, text }]);
  }, []);

  const run = useCallback(
    (raw: string) => {
      const cmd = raw.trim().toLowerCase();
      const [head, ...rest] = cmd.split(/\s+/);

      if (!head) return;

      switch (head) {
        case "help":
          push("out", HELP);
          break;
        case "whoami":
          push(
            "out",
            "İsmail Emir Tiryaki — Full Stack Developer. Web, mobil ve bulut; ürün odaklı mimari.",
          );
          break;
        case "skills":
          push(
            "out",
            "React/TS • Node.js • Swift/SwiftUI • PostgreSQL/Mongo • Docker • AWS — API tasarımı, şema ve operasyon.",
          );
          break;
        case "projects":
          push(
            "out",
            "Öne çıkanlar: Doctor Site, Odak Software, Kuta, Therapy Web — tam liste için ana sayfadaki projeler bölümü.",
          );
          break;
        case "github":
          window.open("https://github.com/emirirr", "_blank", "noopener,noreferrer");
          push("out", "GitHub sekmesi açıldı.");
          break;
        case "clear":
          setLines([]);
          break;
        case "exit":
        case "close":
          setOpen(false);
          break;
        case "open": {
          const target = rest[0];
          const map: Record<string, string> = {
            hero: "hero",
            skills: "skills",
            projects: "projects",
            contact: "contact",
          };
          const id = target ? map[target] : "";
          if (id) {
            scrollToSection(id);
            push("out", `#${id} bölümüne kaydırıldı.`);
          } else {
            push("err", "Kullanım: open hero|skills|projects|contact");
          }
          break;
        }
        default:
          push("err", `Komut bulunamadı: ${raw}. 'help' yazın.`);
      }
    },
    [push],
  );

  const onSubmit = useCallback(() => {
    const v = input.trim();
    if (!v) return;
    push("in", `emir@portfolio ~ % ${v}`);
    run(v);
    setInput("");
  }, [input, push, run]);

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      const typing =
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.isContentEditable);

      if (e.ctrlKey && e.shiftKey && e.code === "Backquote") {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (typing) return;
      if (e.code === "Backquote" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const now = Date.now();
        if (now - lastTick.current < 420) {
          tickCount.current += 1;
        } else {
          tickCount.current = 1;
        }
        lastTick.current = now;
        if (tickCount.current >= 2) {
          e.preventDefault();
          tickCount.current = 0;
          setOpen((o) => !o);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines, open]);

  const lineClass = useMemo(
    () => ({
      in: "text-emerald-300/95",
      out: "text-zinc-200/90",
      err: "text-rose-300/95",
    }),
    [],
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-end justify-center p-4 sm:items-center sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            aria-label="Terminali kapat"
            onClick={() => setOpen(false)}
          />
          <motion.div
            role="dialog"
            aria-label="Terminal"
            className="relative z-10 flex h-[min(72vh,560px)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0c] shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_24px_80px_rgba(0,0,0,0.65)]"
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 16, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-500/90" />
                <span className="h-3 w-3 rounded-full bg-amber-400/90" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/90" />
                <span className="ml-3 text-xs font-medium tracking-wide text-zinc-500">
                  portfolio — zsh
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-2 text-zinc-400 transition hover:bg-white/5 hover:text-zinc-100"
                aria-label="Kapat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div
              ref={scrollRef}
              className="min-h-0 flex-1 overflow-y-auto px-4 py-3 font-mono text-[13px] leading-relaxed"
            >
              {lines.map((l, i) => (
                <pre
                  key={`${i}-${l.text.slice(0, 12)}`}
                  className={`mb-2 whitespace-pre-wrap ${lineClass[l.type]}`}
                >
                  {l.text}
                </pre>
              ))}
            </div>
            <form
              className="border-t border-white/10 px-3 py-3"
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
              }}
            >
              <div className="flex items-center gap-2 rounded-xl bg-white/[0.04] px-3 py-2 ring-1 ring-white/10">
                <span className="shrink-0 text-emerald-400/90">❯</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setOpen(false);
                  }}
                  className="min-w-0 flex-1 bg-transparent text-sm text-zinc-100 outline-none placeholder:text-zinc-600"
                  placeholder="Komut yazın…"
                  spellCheck={false}
                  autoComplete="off"
                  aria-label="Terminal komutu"
                />
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
