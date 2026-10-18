/**
 * Sayfa SEO'su regresyon testleri (tek kaynak: src/seo/seo.ts).
 *
 * GERÇEK HATA: rota meta katmanı yalnızca birkaç rotayı tanıyordu, /is/<slug>
 * adreslerinin hepsi 404 paketine düşüyordu. Proje sayfaları "Sayfa bulunamadı"
 * başlığıyla ve robots=noindex ile yayındaydı. Bu dosya aynı şeyin tekrar
 * olmasını engeller: yeni bir rota eklenip seo.ts'e eklenmezse test kırılır.
 */
import { describe, expect, it } from "vitest";

import { all, slugOf } from "@/lib/portfolioMock";
import { getRouteSeo, PRERENDER_PATHS, SITE } from "@/seo/seo";

describe("proje detay sayfaları", () => {
  it("hiçbiri 404 başlığı almıyor ve projenin adını taşıyor", () => {
    for (const p of all) {
      const seo = getRouteSeo(`/is/${slugOf(p)}`);
      expect(seo.title, `${p.imageKey} 404 başlığı aldı`).not.toMatch(/bulunamadı/i);
      expect(seo.title).toContain(p.title);
    }
  });

  it("hepsi indekslenebilir ve kendi canonical adresine sahip", () => {
    for (const p of all) {
      const seo = getRouteSeo(`/is/${slugOf(p)}`);
      expect(seo.indexable, `${p.imageKey} noindex`).toBe(true);
      expect(seo.robots).toMatch(/^index/);
      expect(seo.canonical).toBe(`${SITE}/is/${slugOf(p)}`);
    }
  });

  it("ekran görüntüsü olan projede paylaşım görseli projenin kendisi", () => {
    for (const p of all.filter((x) => !x.noShot)) {
      const seo = getRouteSeo(`/is/${slugOf(p)}`);
      expect(seo.image, `${p.imageKey} varsayılan görselle paylaşılıyor`).not.toMatch(/og-image\.png$/);
    }
  });

  it("hepsi statik HTML olarak üretiliyor (prerender + sitemap)", () => {
    for (const p of all) {
      expect(PRERENDER_PATHS, `${p.imageKey} prerender listesinde yok`).toContain(`/is/${slugOf(p)}`);
    }
  });
});

describe("diğer rotalar", () => {
  it("ana sayfa (TR/EN) ve proje listesi indekslenebilir", () => {
    for (const path of ["/", "/en", "/projects"]) {
      expect(getRouteSeo(path).indexable, path).toBe(true);
    }
    expect(getRouteSeo("/en").lang).toBe("en");
  });

  it("bilinmeyen proje ve adres 404 + noindex", () => {
    for (const path of ["/is/boyle-bir-proje-yok", "/olmayan-sayfa"]) {
      const seo = getRouteSeo(path);
      expect(seo.indexable, path).toBe(false);
      expect(seo.robots).toMatch(/noindex/);
    }
  });
});
