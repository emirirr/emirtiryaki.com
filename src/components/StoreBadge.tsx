import { cn } from "@/lib/utils";
import { useLang } from "@/i18n/lang";
import { trackEvent } from "@/lib/analytics";

/** Apple logosu (resmî glif). */
export function AppleLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
  );
}

/** Google Play logosu — dört renkli resmî üçgen. */
export function GooglePlayLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <path fill="#4285F4" d="M3.61 1.81A1.98 1.98 0 0 0 3 3.28v17.44c0 .58.23 1.1.61 1.47L13.2 12 3.61 1.81Z" />
      <path fill="#34A853" d="M16.4 8.6 5.3 2.2c-.6-.35-1.2-.4-1.69-.39L13.2 12l3.2-3.4Z" />
      <path fill="#FBBC04" d="m20.3 10.85-3.9-2.25-3.2 3.4 3.2 3.4 3.9-2.25c.8-.46.8-1.84 0-2.3Z" />
      <path fill="#EA4335" d="M3.61 22.19c.49.01 1.09-.04 1.69-.39l11.1-6.4-3.2-3.4-9.59 10.19Z" />
    </svg>
  );
}

type StoreBadgeProps = {
  store: "appstore" | "googleplay";
  href: string;
  size?: "sm" | "md";
  className?: string;
};

/** Mağaza rozetleri — resmî rozetlerin siyah zemin + logo + iki satır düzeni. */
export function StoreBadge({ store, href, size = "md", className }: StoreBadgeProps) {
  const apple = store === "appstore";
  const en = useLang() === "en";
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent(`magaza/${store}${href.replace(/^https?:\/\/[^/]+/, "")}`)}
      aria-label={
        en
          ? apple
            ? "Download on the App Store"
            : "Get it on Google Play"
          : apple
            ? "App Store'dan indirin"
            : "Google Play'den alın"
      }
      className={cn(
        "inline-flex items-center gap-2 rounded-lg bg-black text-white ring-1 ring-black/80 transition-transform hover:-translate-y-0.5",
        size === "md" ? "h-11 px-3.5" : "h-9 px-2.5",
        className,
      )}
    >
      {apple ? (
        <AppleLogo className={size === "md" ? "h-6 w-6" : "h-5 w-5"} />
      ) : (
        <GooglePlayLogo className={size === "md" ? "h-6 w-6" : "h-5 w-5"} />
      )}
      <span className="flex flex-col text-left leading-none">
        <span className={cn("font-medium opacity-90", size === "md" ? "text-[9px]" : "text-[8px]")}>
          {en ? (apple ? "Download on the" : "GET IT ON") : apple ? "Şimdi indirin" : "ŞİMDİ ALIN"}
        </span>
        <span className={cn("mt-0.5 font-semibold tracking-tight", size === "md" ? "text-[15px]" : "text-[13px]")}>
          {apple ? "App Store" : "Google Play"}
        </span>
      </span>
    </a>
  );
}
