import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { syncRouteDocumentHead } from "@/lib/routeMeta";

/** Canonical, başlık, meta açıklama, OG/Twitter ve robots (404’te noindex) senkronu. */
export function CanonicalLink() {
  const { pathname } = useLocation();

  useEffect(() => {
    syncRouteDocumentHead(pathname);
  }, [pathname]);

  return null;
}
