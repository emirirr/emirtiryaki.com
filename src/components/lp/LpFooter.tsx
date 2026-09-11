import { Link } from "react-router-dom";
import { Github, Linkedin, Instagram, Youtube } from "lucide-react";

const icon = { display: "inline", verticalAlign: "-2px", marginRight: 7 } as const;

/** Aydınlık SaaS alt bilgi — her sayfada ortak. */
export function LpFooter() {
  return (
    <footer className="lp-footer lp-wrap">
      <div className="lp-foot-grid">
        <div>
          <div className="lp-brand" style={{ marginBottom: 14 }}>
            <span className="wm">Emir Tiryaki</span>
            <i className="dot" aria-hidden="true" />
          </div>
          <div className="lp-foot-note">
            info@emirtiryaki.com
            <br />
            +90 543 447 6245
            <br />
            İstanbul, Türkiye
          </div>
        </div>
        <div className="lp-foot-col">
          <div className="lbl">Kanallar</div>
          <a href="https://github.com/emirirr" target="_blank" rel="noopener noreferrer">
            <span>
              <Github size={13} style={icon} />
              GitHub
            </span>
            <small>@emirirr</small>
          </a>
          <a href="https://www.linkedin.com/in/emir-tiryaki" target="_blank" rel="noopener noreferrer">
            <span>
              <Linkedin size={13} style={icon} />
              LinkedIn
            </span>
            <small>@emir-tiryaki</small>
          </a>
          <a href="https://instagram.com/emirscode" target="_blank" rel="noopener noreferrer">
            <span>
              <Instagram size={13} style={icon} />
              Instagram
            </span>
            <small>@emirscode</small>
          </a>
          <a href="https://youtube.com/@emirtiryaki" target="_blank" rel="noopener noreferrer">
            <span>
              <Youtube size={13} style={icon} />
              YouTube
            </span>
            <small>@emirtiryaki</small>
          </a>
        </div>
        <div className="lp-foot-col">
          <div className="lbl">Site</div>
          <a href="/#work">Projeler</a>
          <a href="/#about">Hakkında</a>
          <a href="/#brands">Markalar</a>
          <Link to="/projects">
            Tüm projeler <small>↗</small>
          </Link>
        </div>
      </div>
      <div className="lp-foot-bottom">
        <span>© 2026 Emir Tiryaki</span>
        <span>Full Stack Developer · İstanbul</span>
      </div>
    </footer>
  );
}
