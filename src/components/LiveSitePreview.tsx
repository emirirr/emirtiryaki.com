import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { PortfolioImage } from "@/components/PortfolioImage";
import { useT } from "@/i18n/lang";

type LiveSitePreviewProps = {
  /** Canlı gösterilecek site (hedef site `frame-ancestors` ile emirtiryaki.com'a izin vermeli). */
  url: string;
  /** iframe yüklenene kadar ve telefonda gösterilen ekran görüntüsü. */
  poster: string;
  title: string;
  /** Sitenin masaüstü genişliğinde render edilmesi için sanal tarayıcı genişliği. */
  viewportWidth?: number;
  /** false ise yalnız ekran görüntüsü (hedef site gömmeye izin vermiyorsa). */
  live?: boolean;
  className?: string;
};

/**
 * Bir siteyi canlı olarak, küçültülmüş ve etkileşimsiz bir iframe içinde gösterir.
 * Site güncellendiğinde önizleme de kendiliğinden güncellenir. Ağır olduğu için:
 * yalnız geniş ekranlarda, sayfa yüklendikten ve görünür olduktan sonra yüklenir.
 */
export function LiveSitePreview({
  url,
  poster,
  title,
  viewportWidth = 1440,
  live = true,
  className,
}: LiveSitePreviewProps) {
  const t = useT();
  const boxRef = useRef<HTMLAnchorElement>(null);
  const [scale, setScale] = useState(0);
  const [mount, setMount] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Kutunun genişliğine göre ölçek
  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / viewportWidth);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [viewportWidth]);

  // iframe'i yalnız geniş ekranda ve sayfa boştayken yükle (LCP'yi korur)
  useEffect(() => {
    if (!live || !window.matchMedia("(min-width: 768px)").matches) return;
    const start = () => setMount(true);
    const idle = (cb: () => void) => {
      if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(cb, { timeout: 2500 });
      } else {
        setTimeout(cb, 1200);
      }
    };
    if (document.readyState === "complete") {
      idle(start);
    } else {
      const onLoad = () => idle(start);
      window.addEventListener("load", onLoad, { once: true });
      return () => window.removeEventListener("load", onLoad);
    }
  }, [live]);

  const height = scale > 0 ? (viewportWidth * 10) / 16 : 0;

  return (
    <a
      ref={boxRef}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t(`${title} — siteyi yeni sekmede aç`, `${title} — open site in a new tab`)}
      className={cn("group relative block aspect-[16/10] overflow-hidden bg-surface", className)}
    >
      <PortfolioImage
        src={poster}
        alt={t(`${title} ana sayfası`, `${title} homepage`)}
        className={cn(
          "absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-500",
          loaded && "opacity-0",
        )}
        fetchPriority="high"
      />
      {mount && scale > 0 && (
        <iframe
          src={url}
          title={t(`${title} — canlı önizleme`, `${title} — live preview`)}
          tabIndex={-1}
          aria-hidden
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          sandbox="allow-scripts allow-same-origin"
          onLoad={() => setLoaded(true)}
          className={cn(
            "pointer-events-none absolute left-0 top-0 origin-top-left border-0 transition-opacity duration-500",
            loaded ? "opacity-100" : "opacity-0",
          )}
          style={{
            width: viewportWidth,
            height,
            transform: `scale(${scale})`,
          }}
        />
      )}
    </a>
  );
}
