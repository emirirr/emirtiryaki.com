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
    // Parçalar Buffer olarak toplanıp en sonda çözülür: çok baytlı bir harf
    // (ör. "ı") iki parçanın sınırına denk gelirse tek tek toString() onu bozar.
    const chunks: Buffer[] = [];
    const sink = new Writable({
      write(chunk, _enc, cb) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
        cb();
      },
      final(cb) {
        // React 18.3.1 hatası: 2048 baytlık tamponun sonuna çok baytlı harf sığmayınca
        // tampon, boş kalan son baytıyla (0x00) gönderiliyor. HTML'de NUL hiç bulunmaz ve
        // UTF-8'de çok baytlı karakterlerin içinde yer almaz → güvenle atılır.
        const bytes = Buffer.concat(chunks);
        resolve(Buffer.from(bytes.filter((b) => b !== 0)).toString("utf8"));
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
