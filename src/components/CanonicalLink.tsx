import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE = "https://emirtiryaki.com";

/** index.html’deki canonical öğesini geçerli route’a göre günceller. */
export function CanonicalLink() {
  const { pathname } = useLocation();

  useEffect(() => {
    const href =
      pathname === "/"
        ? `${SITE}/`
        : pathname === "/projects"
          ? `${SITE}/projects`
          : `${SITE}/`;
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", href);
  }, [pathname]);

  return null;
}
