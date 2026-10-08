# Yayın (Hostinger)

Site statik bir Vite uygulaması; `dist/` klasörü Hostinger'daki `public_html` içine yüklenir.

## 1. Paketi hazırla

```bash
npm run build
```

`prebuild` sırasında otomatik olarak: CV senkronu, site haritası, WebP görseller, canlı önizleme
kontrolü ve portföy görsel listesi üretilir. Canlı önizleme kontrolü internet ister; build'i
internetsiz alırsan girişte ekran görüntüsü gösterilir (site yine çalışır).

## 2. Yükle

1. hPanel → Dosyalar → Dosya Yöneticisi → **Gizli dosyaları göster**i aç (`.htaccess` için).
2. `public_html` içini yedekle ve boşalt.
3. `dist/` klasörünün **içeriğini** (klasörün kendisini değil) `public_html` içine yükle.
   Çok dosya olduğu için `dist`'i zip'leyip yükleyip Hostinger'da "Ayıkla" demek daha güvenli.

## 3. Kontrol et

| Adres | Beklenen |
|---|---|
| `emirtiryaki.com` | Türkçe ana sayfa |
| `emirtiryaki.com/en` | İngilizce ana sayfa (yenileyince de açılmalı → `.htaccess` çalışıyor) |
| `emirtiryaki.com/projects` | Tüm projeler |
| `emirtiryaki.com/cv.html` · `/cv-en.html` | CV'ler, "PDF indir" çalışıyor |
| İletişim formu | Gönderim sonrası "Teşekkürler"; talep emirscode-teklif'te görünüyor |

## Notlar

- `public/.htaccess` SPA yönlendirmesini sağlar (`/en`, `/projects` vb. → `index.html`).
- `vercel.json` Hostinger'da kullanılmaz; ileride Vercel'e geçilirse diye CSP'si güncel tutuluyor
  (Supabase, Google Fonts ve tiryakiyazilim.com iframe'i izinli).
- Girişteki canlı önizleme, tiryakiyazilim.com `frame-ancestors` ile emirtiryaki.com'a izin verince
  bir sonraki build'de kendiliğinden açılır (tiryaki-web-studio PR #1).
