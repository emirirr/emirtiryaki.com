/**
 * Prerender (statik HTML üretimi) giriş noktası — yalnız build'de, Node'da çalışır.
 * scripts/prerender.mjs her rota için render(url) çağırır.
 */
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Writable } from "node:stream";
import { AppProviders, AppRoutes } from "./App";
import { getRouteSeo, PRERENDER_PATHS } from "./seo/seo";
import { headTags } from "./seo/head";

export { getRouteSeo, headTags, PRERENDER_PATHS };

export function render(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let html = "";
    const sink = new Writable({
      write(chunk, _enc, cb) {
        html += chunk.toString();
        cb();
      },
      final(cb) {
        resolve(html);
        cb();
      },
    });
    const stream = renderToPipeableStream(
      <AppProviders>
        <StaticRouter location={url}>
          <AppRoutes />
        </StaticRouter>
      </AppProviders>,
      {
        // Lazy rotalar dahil her şey hazır olunca yaz (botlar tam içeriği görsün)
        onAllReady() {
          stream.pipe(sink);
        },
        onShellError: reject,
        onError(err) {
          reject(err);
        },
      },
    );
  });
}
