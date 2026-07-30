// Tiryaki CRM (Supabase) — tiryakiyazilim.com formuyla AYNI tabloya (`talepler`) yazar.
// Publishable (anon) anahtar herkese açıktır; güvenlik RLS ile sağlanır.
const SUPABASE_URL = "https://caoyyuzyuzlezlmvvbzz.supabase.co";
const SUPABASE_KEY = "sb_publishable_W0NfxAPVQRzYOpQQdCfpFA_N837NSLz";

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
    throw new Error(text || `Gönderim başarısız (HTTP ${res.status})`);
  }
}
