import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { imgWebp } from "@/lib/portfolioMock";

/**
 * Yatay kaydırılan ekran görüntüsü şeridi. `phone` true ise her görsel telefon
 * çerçevesine, değilse tarayıcı çerçevesine konur. Okla ya da sürükleyerek gezilir.
 */
export function Gallery({ images, title, phone = true }: { images: string[]; title: string; phone?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const step = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>(".g-item");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 240) + 16), behavior: "smooth" });
  };

  return (
    <div className={"s-gallery" + (phone ? " is-phone" : "")}>
      <div className="track" ref={ref} tabIndex={0} aria-label={`${title} ekran görüntüleri`}>
        {images.map((src, i) => (
          <figure className="g-item" key={src}>
            {phone ? (
              <div className="mk-phone">
                <div className="notch" />
                <div className="scr">
                  <img src={imgWebp(src)} alt={`${title} — ekran ${i + 1}`} loading="lazy" decoding="async" />
                </div>
              </div>
            ) : (
              <div className="mk-web">
                <div className="mk-bar">
                  <i />
                  <i />
                  <i />
                </div>
                <div className="mk-screen">
                  <img src={imgWebp(src)} alt={`${title} — ekran ${i + 1}`} loading="lazy" decoding="async" />
                </div>
              </div>
            )}
          </figure>
        ))}
      </div>
      {images.length > 2 ? (
        <div className="nav">
          <button type="button" onClick={() => step(-1)} aria-label="Önceki ekran">
            <ChevronLeft size={18} />
          </button>
          <button type="button" onClick={() => step(1)} aria-label="Sonraki ekran">
            <ChevronRight size={18} />
          </button>
        </div>
      ) : null}
    </div>
  );
}
