/**
 * Çerezsiz ziyaretçi ölçümü (GoatCounter). Kod boşken hiçbir şey yüklenmez / gönderilmez.
 * Kurulum: https://www.goatcounter.com → hesap aç → seçtiğin kodu aşağıya yaz (ör. "emirtiryaki").
 * Panel: https://<kod>.goatcounter.com
 */
export const GOATCOUNTER_CODE = "";

type GoatCounter = {
  count: (vars: { path: string; title?: string; event?: boolean }) => void;
};

declare global {
  interface Window {
    goatcounter?: GoatCounter & { no_onload?: boolean };
  }
}

let loading: Promise<void> | null = null;

function load(): Promise<void> {
  if (!GOATCOUNTER_CODE || typeof window === "undefined") return Promise.resolve();
  if (loading) return loading;
  // SPA: otomatik sayımı kapat, rota değişiminde elle say
  window.goatcounter = { ...(window.goatcounter ?? {}), no_onload: true } as Window["goatcounter"];
  loading = new Promise((resolve) => {
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://gc.zgo.at/count.js";
    s.dataset.goatcounter = `https://${GOATCOUNTER_CODE}.goatcounter.com/count`;
    s.onload = () => resolve();
    s.onerror = () => resolve();
    document.head.appendChild(s);
  });
  return loading;
}

/** Sayfa görüntüleme (rota değişiminde çağrılır). */
export function trackPageview(path: string) {
  if (!GOATCOUNTER_CODE) return;
  void load().then(() => window.goatcounter?.count?.({ path, title: document.title }));
}

/** Olay: ör. trackEvent("form-gonderildi"), trackEvent("proje-ac/kortbul"). */
export function trackEvent(name: string) {
  if (!GOATCOUNTER_CODE) return;
  void load().then(() => window.goatcounter?.count?.({ path: name, title: name, event: true }));
}
