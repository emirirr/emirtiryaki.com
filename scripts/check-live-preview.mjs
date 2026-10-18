/**
 * Girişteki canlı önizleme (tiryakiyazilim.com iframe) güvenli mi? Build öncesi kontrol eder.
 * Hedef site emirtiryaki.com'un gömmesine izin vermiyorsa iframe hata sayfası gösterir;
 * bu yüzden izin yoksa önizleme yalnız ekran görüntüsüne düşer.
 * Sonuç: src/data/livePreview.json → { "enabled": boolean, "checkedAt": "..." }
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";

const TARGET = "https://tiryakiyazilim.com/";
const out = join(process.cwd(), "src", "data", "livePreview.json");

let enabled = false;
let reason = "";
try {
  const res = await fetch(TARGET, { method: "GET", redirect: "follow", signal: AbortSignal.timeout(10000) });
  const csp = (res.headers.get("content-security-policy") ?? "").toLowerCase();
  const xfo = (res.headers.get("x-frame-options") ?? "").toLowerCase();
  const fa = csp.split(/[;,]/).map((d) => d.trim()).find((d) => d.startsWith("frame-ancestors"));
  if (fa) {
    // frame-ancestors varsa tarayıcılar X-Frame-Options'ı yok sayar
    enabled = fa.includes("https://emirtiryaki.com") || fa.includes("*");
    reason = fa;
  } else {
    enabled = !xfo;
    reason = xfo ? `x-frame-options: ${xfo}` : "kısıt yok";
  }
} catch (e) {
  reason = `kontrol edilemedi: ${e instanceof Error ? e.message : e}`;
}

writeFileSync(out, JSON.stringify({ enabled, checkedAt: new Date().toISOString(), reason }, null, 2) + "\n");
console.log(`live-preview: ${enabled ? "AÇIK" : "kapalı (ekran görüntüsü)"} — ${reason}`);
