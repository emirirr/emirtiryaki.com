import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Home } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { Reveal } from "@/components/site/primitives";

const NotFound = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (import.meta.env.DEV) console.warn("404:", pathname);
  }, [pathname]);

  return (
    <SiteShell>
      <Reveal className="s-wrap s-404">
        <div className="big">404</div>
        <h1 className="s-h3">Bu sayfa bulunamadı</h1>
        <span className="path">{pathname}</span>
        <p className="s-lead" style={{ marginInline: "auto" }}>
          Taşınmış ya da hiç var olmamış olabilir. Aşağıdan devam edebilir veya Ctrl+K ile arayabilirsin.
        </p>
        <div className="s-cta">
          <Link className="s-btn primary lg" to="/">
            <Home size={16} /> Ana sayfa
          </Link>
          <Link className="s-btn ghost lg" to="/projects">
            Tüm işler <ArrowRight size={16} />
          </Link>
        </div>
      </Reveal>
    </SiteShell>
  );
};

export default NotFound;
