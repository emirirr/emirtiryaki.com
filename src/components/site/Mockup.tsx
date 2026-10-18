import { ImageOff } from "lucide-react";
import { coverWebp, domainOf, isPhone, logoOf, type P } from "@/lib/portfolioMock";

/** Doğrulanmış ekran görüntüsü olmayan projeler için yer tutucu —
 *  başka bir uygulamanın görselini koymaktansa boş olduğunu söylemek daha doğru. */
function NoShot({ p }: { p: P }) {
  const Icon = p.icon ?? ImageOff;
  const logo = logoOf(p);
  return (
    <div className="mk-noshot">
      <span className={"ic" + (logo ? " has-logo" : "")}>
        {logo ? <img src={logo} alt="" loading="lazy" decoding="async" /> : <Icon size={26} />}
      </span>
      <b>{p.title}</b>
      <span className="note">{p.shotNote ?? p.status ?? "Ekran görüntüsü arşivde yok"}</span>
    </div>
  );
}

/** Gerçek ekran görüntüsünü cihaz çerçevesine yerleştirir:
 *  mobil uygulama → dikey telefon, diğer her şey → yatay tarayıcı. */
export function Mockup({ p, eager = false }: { p: P; eager?: boolean }) {
  const loading = eager ? "eager" : "lazy";
  if (p.noShot) return <NoShot p={p} />;
  if (isPhone(p)) {
    return (
      <>
        <img className="mk-bg" src={coverWebp(p)} alt="" aria-hidden loading={loading} decoding="async" />
        <div className="mk-phone">
          <div className="notch" />
          <div className="scr">
            <img src={coverWebp(p)} alt={p.title} loading={loading} decoding="async" />
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="mk-web">
      <div className="mk-bar">
        <i />
        <i />
        <i />
        <span className="u">{domainOf(p)}</span>
      </div>
      <div className="mk-screen">
        <img src={coverWebp(p)} alt={p.title} loading={loading} decoding="async" />
      </div>
    </div>
  );
}
