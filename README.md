# emirtiryaki.com

İsmail Emir Tiryaki'nin kişisel portföy sitesi — Türkçe (`/`) ve İngilizce (`/en`).

React 18 · TypeScript · Vite · Tailwind CSS · Framer Motion. Yayın: Hostinger (statik, bkz. [DEPLOYMENT.md](DEPLOYMENT.md)).

## Geliştirme

```bash
npm install
npm run dev
```

`dev` ve `build` öncesi otomatik çalışan script'ler: CV senkronu, site haritası, WebP üretimi,
canlı önizleme kontrolü ve portföy görsel listesi.

## İçerik nerede?

| Ne | Dosya |
|---|---|
| Projeler (tüm liste + öne çıkanlar) | `src/data/projects.ts` — `featured: true` + `featuredOrder` ana sayfa vitrinini belirler; `en: {…}` İngilizce metin |
| Mağazadaki uygulamalar | `src/components/AppShowcase.tsx` (`apps`, `upcoming`) |
| Canlı web siteleri | `src/components/LiveSites.tsx` (`sites`) |
| Deneyim / eğitim | `src/components/Experience.tsx` |
| Müşteri yorumları | `src/data/testimonials.ts` — liste boşken bölüm görünmez |
| Sosyal linkler | `src/data/socials.ts` |
| CV | `cv.html`, `cv-en.html` (kök) → `public/` altına senkronlanır; stil `public/cv.css` |
| Çeviri | Metinler bileşenlerin içinde `t("Türkçe", "English")` çifti olarak (`src/i18n/lang.ts`) |

## Script'ler

| Komut | Ne yapar |
|---|---|
| `npm run capture:portfolio [dosya…]` | Canlı sitelerin ekran görüntüsünü `public/portfolio/images/` altına çeker |
| `npm run build:cv-pdf` | CV'leri A4 PDF'e basar (`public/Ismail-Emir-Tiryaki-CV*.pdf`); sayfa taşarsa hata verir |
| `npm run generate:brand-pngs` | `public/favicon.svg` işaretinden favicon.ico, Apple/PWA ikonları ve og-image üretir |
| `node scripts/check-live-preview.mjs` | tiryakiyazilim.com gömmeye izin veriyor mu? Vermiyorsa girişte ekran görüntüsü gösterilir |

## İletişim formu

Form, emirscode-teklif CRM'inin kullandığı Supabase `talepler` tablosuna yazar (`src/lib/talep.ts`).
Hizmet seçenekleri CRM'deki `SERVICE_LABEL` anahtarlarıyla aynı olmalıdır (`src/components/Contact.tsx`).
