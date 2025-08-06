# Deployment Guide

Bu proje canlı ortamda çalışması için aşağıdaki adımları takip edin:

## 1. Build İşlemi

```bash
npm run build
```

## 2. Sunucu Konfigürasyonu

### Netlify
- `public/_redirects` dosyası otomatik olarak SPA routing'i sağlar
- Build komutu: `npm run build`
- Publish directory: `dist`

### Vercel
- Otomatik olarak SPA routing'i destekler
- Build komutu: `npm run build`
- Output directory: `dist`

### Apache (.htaccess)
- `public/.htaccess` dosyası Apache sunucuları için SPA routing sağlar

### Nginx
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

## 3. Önemli Notlar

- Proje React Router v6 kullanıyor
- BrowserRouter kullanıldığı için sunucu tarafında SPA routing desteği gerekli
- Tüm route'lar `/index.html`'e yönlendirilmeli
- Static file serving aktif olmalı

## 4. Test Etme

Build sonrası projeyi test etmek için:

```bash
npm run preview
```

Bu komut `http://localhost:4173` adresinde production build'ini çalıştırır.

## 5. Sorun Giderme

Eğer canlı ortamda routing çalışmıyorsa:

1. Sunucu konfigürasyonunu kontrol edin
2. `_redirects` veya `.htaccess` dosyalarının doğru yüklendiğinden emin olun
3. Browser console'da hata mesajlarını kontrol edin
4. Network tab'ında 404 hatalarını kontrol edin 