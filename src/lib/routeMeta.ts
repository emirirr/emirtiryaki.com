import { getRouteSeo } from "@/seo/seo";
import { headTags } from "@/seo/head";

/** Rota değişince başlık, meta, canonical, hreflang, OG ve JSON-LD tek kaynaktan (src/seo) yenilenir. */
export function syncRouteDocumentHead(pathname: string) {
  const seo = getRouteSeo(pathname);
  document.title = seo.title;
  document.documentElement.lang = seo.lang;
  document.head.querySelectorAll("[data-seo]").forEach((el) => el.remove());
  const tpl = document.createElement("template");
  tpl.innerHTML = headTags(seo);
  // <template> içindeki <script> çalışmaz; JSON-LD için sorun değil (yalnız veri)
  document.head.append(...Array.from(tpl.content.childNodes));
}
