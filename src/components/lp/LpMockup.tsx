import { ImageOff } from "lucide-react";
import { coverWebp, isPhone, domainOf, type P } from "@/lib/portfolioMock";

/** Doğrulanmış ekran görüntüsü olmayan projeler için yer tutucu.
 *  Başka bir uygulamanın görselini koymaktansa boş olduğunu söylemek daha doğru. */
function NoShot({ p }: { p: P }) {
  const Icon = p.icon ?? ImageOff;
  return (
    <div className="mk-noshot">
      <span className="ic">
        <Icon size={26} />
      </span>
      <b>{p.title}</b>
      <span className="note">Ekran görüntüsü arşivde yok</span>
    </div>
  );
}

/** Gerçek ekran görüntüsünü cihaz çerçevesine yerleştirir:
 *  mobil uygulama → dikey telefon, diğer her şey → yatay tarayıcı. */
export function LpMockup({ p }: { p: P }) {
  if (p.noShot) return <NoShot p={p} />;
  if (isPhone(p)) {
    return (
      <>
        {/* uygulamanin kendi renklerinden gelen, kutuyu dolduran yumusak zemin */}
        <img className="mk-bg" src={coverWebp(p)} alt="" aria-hidden loading="lazy" decoding="async" />
        <div className="mk-phone">
          <div className="notch" />
          <div className="scr">
            <img src={coverWebp(p)} alt={p.title} loading="lazy" decoding="async" />
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="mk-web">
      <div className="mk-bar">
        <i style={{ background: "#f2605c" }} />
        <i style={{ background: "#f5bd4f" }} />
        <i style={{ background: "#61c554" }} />
        <span className="u">{domainOf(p)}</span>
      </div>
      <div className="mk-screen">
        <img src={coverWebp(p)} alt={p.title} loading="lazy" decoding="async" />
      </div>
    </div>
  );
}
