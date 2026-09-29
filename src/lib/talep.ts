// Tiryaki CRM (Supabase) — tiryakiyazilim.com formuyla AYNI tabloya (`talepler`) yazar.
// Publishable (anon) anahtar herkese açıktır; güvenlik RLS ile sağlanır.
const SUPABASE_URL = "https://caoyyuzyuzlezlmvvbzz.supabase.co";
const SUPABASE_KEY = "sb_publishable_W0NfxAPVQRzYOpQQdCfpFA_N837NSLz";

// Basit robot filtresi: formlardaki gizli "website" alanı (insan görmez, bot doldurur)
// doluysa ya da sayfa açıldıktan 3 sn içinde gönderildiyse talep sessizce yok sayılır.
// Asıl sınır (tekrar/saatlik limit, link sayısı) Supabase tarafındaki talep_spam_guard tetikleyicisinde.
const SAYFA_ACILIS = Date.now();
function botMu(): boolean {
  if (typeof document === "undefined") return false;
  const tuzak = Array.from(document.querySelectorAll<HTMLInputElement>('input[name="website"]'));
  return tuzak.some((i) => i.value.trim() !== "") || Date.now() - SAYFA_ACILIS < 3000;
}

export type TalepPayload = {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  source?: string;
};

/** Web formundan gelen talebi ortak CRM'e (Supabase `talepler`) kaydeder. */
export async function talepGonder(payload: TalepPayload): Promise<void> {
  if (botMu()) return;
  const res = await fetch(`${SUPABASE_URL}/rest/v1/talepler`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      name: payload.name,
      email: payload.email,
      phone: payload.phone || null,
      service: payload.service || null,
      message: payload.message,
      source: payload.source || "emirtiryaki-iletisim",
    }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    let mesaj = text;
    try { mesaj = JSON.parse(text).message || text; } catch { /* düz metin */ }
    throw new Error(mesaj || `Gönderim başarısız (HTTP ${res.status})`);
  }
}
