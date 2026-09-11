/**
 * routeMeta regresyon testleri.
 *
 * GERÇEK HATA: routeMeta yalnızca 4 rotayı tanıyordu, /is/<slug> adreslerinin
 * hepsi NOT_FOUND paketine düşüyordu. 47 proje sayfası "Sayfa bulunamadı"
 * başlığıyla ve robots=noindex ile yayındaydı. Bu dosya aynı şeyin tekrar
 * olmasını engeller: yeni bir rota eklenip routeMeta'ya eklenmezse test kırılır.
 */
import { beforeEach, describe, expect, it } from "vitest";

import { all, slugOf } from "@/lib/portfolioMock";
import { syncRouteDocumentHead } from "@/lib/routeMeta";

const HEAD = `
  <title>x</title>
  <meta name="description" content="" />
  <meta property="og:title" content="" />
  <meta property="og:description" content="" />
  <meta property="og:url" content="" />
  <meta property="og:image" content="" />
  <meta name="twitter:title" content="" />
  <meta name="twitter:description" content="" />
  <meta name="twitter:image" content="" />
  <link rel="canonical" href="" />
`;

const read = (sel: string, attr = "content") =>
  document.head.querySelector(sel)?.getAttribute(attr) ?? "";

const robots = () => read('meta[name="robots"][data-route-sync="1"]');

beforeEach(() => {
  document.head.innerHTML = HEAD;
});

describe("proje detay sayfaları", () => {
  it("hiçbiri 404 başlığı almıyor", () => {
    for (const p of all) {
      syncRouteDocumentHead(`/is/${slugOf(p)}`);
      expect(document.title, `${p.imageKey} 404 başlığı aldı`).not.toMatch(
        /bulunamadı/i,
      );
      expect(document.title).toContain(p.title);
    }
  });

  it("hepsi indekslenebilir", () => {
    for (const p of all) {
      syncRouteDocumentHead(`/is/${slugOf(p)}`);
      expect(robots(), `${p.imageKey} noindex`).toBe("index, follow");
    }
  });

  it("açıklama projenin kendi açıklaması, 404 metni değil", () => {
    for (const p of all) {
      syncRouteDocumentHead(`/is/${slugOf(p)}`);
      const d = read('meta[name="description"]');
      expect(d, `${p.imageKey} boş açıklama`).toBeTruthy();
      expect(d).not.toMatch(/mevcut değil/i);
    }
  });

  it("canonical ve og:url sayfanın kendi adresi", () => {
    const p = all[0];
    syncRouteDocumentHead(`/is/${slugOf(p)}`);
    const url = `https://emirtiryaki.com/is/${slugOf(p)}`;
    expect(read('link[rel="canonical"]', "href")).toBe(url);
    expect(read('meta[property="og:url"]')).toBe(url);
  });

  it("og:image projenin kendi görseli (varsayılan değil)", () => {
    const withShot = all.find((p) => !p.noShot)!;
    syncRouteDocumentHead(`/is/${slugOf(withShot)}`);
    const img = read('meta[property="og:image"]');
    expect(img).toContain("/portfolio/images/");
    expect(img).not.toContain("/og-image.png");
  });
});

describe("bilinen rotalar", () => {
  it("ana sayfa ve projeler indekslenebilir", () => {
    for (const path of ["/", "/projects"]) {
      syncRouteDocumentHead(path);
      expect(robots(), path).toBe("index, follow");
      expect(document.title).not.toMatch(/bulunamadı/i);
    }
  });
});

describe("gerçekten olmayan adres", () => {
  it("404 paketi alır ve noindex olur", () => {
    syncRouteDocumentHead("/is/boyle-bir-proje-yok");
    expect(document.title).toMatch(/bulunamadı/i);
    expect(robots()).toBe("noindex, follow");
  });
});
