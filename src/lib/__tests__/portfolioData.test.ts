/**
 * Portföy verisinin bütünlük testleri.
 *
 * Bu testler süsleme değil: her biri bu projede GERÇEKTEN yaşanmış bir hatayı
 * yakalamak için yazıldı — yanlış uygulamanın ekran görüntüsünün karta düşmesi,
 * proje sayfalarının 404 başlığıyla yayına çıkması, vitrinin sessizce boşalması.
 */
import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { projects } from "@/data/projects";
import { PROJECT_LOGOS } from "@/data/projectLogos";
import {
  all,
  coverWebp,
  featured,
  isLive,
  isPhone,
  logoOf,
  slugOf,
  type P,
} from "@/lib/portfolioMock";

const PUBLIC = join(process.cwd(), "public");

/** publicAssetUrl base ekleyebilir; dosya yolunu bulmak için baştaki kısmı at. */
const toFile = (url: string) =>
  join(PUBLIC, url.replace(/^https?:\/\/[^/]+/, "").replace(/^\//, ""));

describe("proje verisi", () => {
  it("id ve imageKey benzersiz", () => {
    const ids = projects.map((p) => p.id);
    const keys = projects.map((p) => p.imageKey);
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it("her projenin başlığı, açıklaması ve en az bir teknolojisi var", () => {
    for (const p of projects) {
      expect(p.title?.trim(), `${p.imageKey} başlık`).toBeTruthy();
      expect(p.description?.trim(), `${p.imageKey} açıklama`).toBeTruthy();
      expect(p.technologies.length, `${p.imageKey} teknoloji`).toBeGreaterThan(0);
    }
  });

  it("detay sayfası anlatımı tek cümlelik yer tutucu değil", () => {
    for (const p of all) {
      const text = p.longDescription ?? "";
      expect(text.length, `${p.imageKey} kısa kalmış`).toBeGreaterThanOrEqual(600);
    }
  });
});

describe("vitrin", () => {
  it("1-6 arası proje gösterir ve sırası benzersizdir", () => {
    expect(featured.length).toBeGreaterThan(0);
    expect(featured.length).toBeLessThanOrEqual(6);
    const orders = featured.map((p) => p.featuredOrder);
    expect(new Set(orders).size).toBe(orders.length);
  });

  it("vitrindeki her proje canlı bir adrese ya da kendi detay sayfasına bağlı", () => {
    for (const p of featured) {
      expect(isLive(p) || Boolean(p.link), `${p.imageKey} bağlantısız`).toBe(true);
    }
  });
});

describe("görseller", () => {
  it("ekran görüntüsü olan her projenin webp dosyası gerçekten var", () => {
    for (const p of all) {
      if (p.noShot) continue;
      const file = toFile(coverWebp(p));
      expect(existsSync(file), `${p.imageKey} -> ${file} yok`).toBe(true);
    }
  });

  it("noShot işaretli projede görsel dosyası KALMAMIŞ olmalı", () => {
    // Bu projelerin eski adresleri başka uygulamalara devredilmişti; otomatik
    // çekilen görseller o uygulamalara aitti ve silindi. Dosya geri gelirse
    // yanlış ekran yeniden karta düşer.
    for (const p of all.filter((x) => x.noShot)) {
      const file = toFile(coverWebp(p));
      expect(existsSync(file), `${p.imageKey} -> silinmiş olmalıydı: ${file}`).toBe(false);
    }
  });

  it("logo manifestindeki her kayıt için webp dosyası var", () => {
    for (const key of PROJECT_LOGOS) {
      const file = join(PUBLIC, "portfolio", "logos", `${key}.webp`);
      expect(existsSync(file), `${key} logosu yok`).toBe(true);
    }
  });

  it("logoOf yalnızca manifestte olan projeye yol döner", () => {
    const withLogo = all.filter((p) => PROJECT_LOGOS.includes(p.imageKey));
    const without = all.filter((p) => !PROJECT_LOGOS.includes(p.imageKey));
    for (const p of withLogo) expect(logoOf(p)).toContain(`${p.imageKey}.webp`);
    for (const p of without) expect(logoOf(p)).toBeNull();
  });
});

describe("bağlantılar", () => {
  it("erişilemeyen proje canlı sayılmaz", () => {
    for (const p of all.filter((x) => x.offline)) {
      expect(isLive(p), `${p.imageKey} arşivde ama canlı görünüyor`).toBe(false);
    }
  });

  it("bağlantısı olmayan proje canlı sayılmaz", () => {
    for (const p of all.filter((x) => !x.link)) {
      expect(isLive(p), `${p.imageKey} bağlantısız ama canlı görünüyor`).toBe(false);
    }
  });

  it("dış bağlantılar http(s) ya da site içi yol", () => {
    for (const p of all) {
      if (!p.link) continue;
      expect(
        /^https?:\/\//.test(p.link) || p.link.startsWith("/"),
        `${p.imageKey} tuhaf bağlantı: ${p.link}`,
      ).toBe(true);
    }
  });
});

describe("yardımcılar", () => {
  it("slug imageKey ile aynı", () => {
    for (const p of all) expect(slugOf(p)).toBe(p.imageKey);
  });

  it("isPhone yalnızca mobil kategorisinde true", () => {
    for (const p of all) {
      expect(isPhone(p)).toBe(p.category === "Mobil Uygulama");
    }
  });

  it("coverWebp her zaman .webp döner", () => {
    for (const p of all as P[]) expect(coverWebp(p)).toMatch(/\.webp($|\?)/);
  });
});
