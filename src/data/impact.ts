/**
 * Vaka çalışmalarının "etki" bilgisi: hangi sektör, kimler kullanıyor, iş kim
 * için yapıldı ve ölçülen kullanım. `projects.ts` imageKey'iyle eşleşir.
 *
 * KURAL: `metrics` içine yalnızca doğrulanmış rakam girer (mağaza sayfası,
 * analitik paneli, veritabanı sayımı…) ve `asOf` ile tarihlenir. Tahmin yazma.
 * Bilinmeyen rakamlar `todo` listesinde bekler — arayüzde gösterilmez.
 */
export type Metric = { value: string; label: string; asOf?: string };

export type Impact = {
  sector: string;
  /** Ürünü kimler kullanıyor — hedef kitle. */
  audience: string;
  /** İş bir müşteri/marka için yapıldıysa adı. */
  client?: string;
  metrics?: Metric[];
  /** Doldurulacak rakamlar (yalnızca geliştiriciye hatırlatma). */
  todo?: string[];
};

export const IMPACT: Record<string, Impact> = {
  "dacar-web": {
    sector: "Otomotiv · Pazaryeri",
    audience: "Senegal'de araç alıp satan bireyler, galeriler ve bayiler",
    metrics: [
      { value: "46", label: "şehir için yerel sayfa" },
      { value: "2", label: "mağazada: Google Play + App Store" },
      { value: "3", label: "uygulama: web, mobil, panel" },
    ],
    todo: ["yayındaki ilan sayısı", "aylık ziyaretçi", "mobil indirme"],
  },
  "kortbul-expo": {
    sector: "Spor · Rezervasyon",
    audience: "Tenis, padel ve diğer raket sporu oyuncuları ile kort işletmeleri",
    metrics: [{ value: "4", label: "uygulama: mobil, web, 2 yönetim paneli" }],
    todo: ["kayıtlı oyuncu", "anlaşmalı kort/tesis", "aylık rezervasyon"],
  },
  karacayapimarket: {
    sector: "Yapı · E-ticaret",
    client: "Karaca Yapı Market",
    audience: "İstanbul'da nalbur ve yapı malzemesi arayan bireysel ve kurumsal müşteriler",
    metrics: [
      { value: "39", label: "İstanbul ilçesi için yerel sayfa" },
      { value: "3", label: "marka tek kod tabanında" },
    ],
    todo: ["aylık organik ziyaret", "teklif / sipariş sayısı"],
  },
  kliniktakip: {
    sector: "Sağlık",
    audience: "Klinik yöneticileri, doktorlar ve hastalar",
    metrics: [{ value: "3", label: "ayrı panel: yönetici, doktor, hasta" }],
    todo: ["kullanan klinik sayısı", "kayıtlı hasta"],
  },
  printprice: {
    sector: "Üretim · 3D baskı",
    audience: "3D baskı hizmeti veren atölyeler ve teklif isteyen müşterileri",
    todo: ["aylık hesaplama sayısı", "kullanan atölye"],
  },
  "altin-net": {
    sector: "Finans",
    audience: "Altın, döviz ve kripto fiyatlarını günlük takip eden kullanıcılar",
    metrics: [
      { value: "3", label: "piyasa: altın, döviz, kripto" },
      { value: "2", label: "platform: web + mobil" },
    ],
    todo: ["günlük aktif kullanıcı"],
  },
  "heybe-mobile": {
    sector: "Eğitim · Din",
    client: "Heybe (CharDuck)",
    audience: "Kur'an okumayı ve temel dini bilgileri sıfırdan öğrenmek isteyenler",
    metrics: [
      { value: "5,0", label: "App Store puanı (7 değerlendirme)", asOf: "Ekim 2026" },
      { value: "10+", label: "Google Play indirmesi", asOf: "Ekim 2026" },
      { value: "4", label: "dil: tr, en, de, ar" },
    ],
    todo: ["toplam indirme (iki mağaza)", "aktif kullanıcı"],
  },
  "heybe-web": {
    sector: "Eğitim · Din",
    client: "Heybe (CharDuck)",
    audience: "Heybe'yi bilgisayardan kullanmak isteyenler — mobil hesapla aynı ilerleme",
  },
  "heybe-site": {
    sector: "Eğitim · Din",
    client: "Heybe (CharDuck)",
    audience: "Sure, dua ve kurs içeriği arayan ziyaretçiler",
    metrics: [{ value: "114", label: "sure için ayrı sayfa" }],
  },
  dacargo: {
    sector: "Ulaşım · Pazaryeri",
    audience: "Senegal'de taksi, moto, ortak yolculuk, at arabası veya kuryeye ihtiyaç duyan kullanıcılar",
    metrics: [
      { value: "5", label: "hizmet: taksi, moto, ortak yolculuk, at arabası, teslimat" },
      { value: "3", label: "uygulama: müşteri, sürücü, ekip konsolu" },
      { value: "2", label: "dil: fr, en" },
    ],
    todo: ["test kullanıcısı / kayıtlı kullanıcı", "tamamlanan yolculuk", "onaylı sürücü"],
  },
  "dacargo-partenaire": {
    sector: "Ulaşım · Pazaryeri",
    audience: "Taksi ve moto sürücüleri, ortak yolculuk yapanlar, at arabası sahipleri ve kuryeler",
    todo: ["başvuru / onaylı sürücü sayısı"],
  },
  "dacargo-admin": {
    sector: "Ulaşım · Pazaryeri",
    audience: "Dacargo operasyon ve destek ekibi",
  },
  "satilik-mobile": {
    sector: "Pazaryeri · İlan",
    audience: "Türkiye'de araç, emlak, elektronik ve ikinci el eşya alıp satan bireyler ve mağazalar",
    metrics: [
      { value: "300+", label: "kategori, çok seviyeli ağaç" },
      { value: "91", label: "otomobil markası, 1.077 seri" },
      { value: "iOS", label: "App Store'da yayında", asOf: "Ekim 2026" },
    ],
    todo: ["indirme", "yayındaki ilan sayısı", "kayıtlı kullanıcı"],
  },
  "satilik-web": {
    sector: "Pazaryeri · İlan",
    audience: "İlanlara bilgisayardan ulaşan alıcılar ve satıcılar",
    todo: ["aylık ziyaretçi", "dizindeki sayfa"],
  },
  "satilik-admin": {
    sector: "Pazaryeri · İlan",
    audience: "Satılık yönetim ve moderasyon ekibi",
  },
  "marocar-web": {
    sector: "Otomotiv · Pazaryeri",
    audience: "Fas'ta araç alıp satan bireyler, galeriler ve tamirhaneler",
    metrics: [{ value: "58", label: "şehir için yerel sayfa" }],
  },
};

export const impactOf = (key: string): Impact | undefined => IMPACT[key];

/** Ana sayfadaki sektör listesi — IMPACT'teki sektörlerin ilk kelimesi. */
export const SECTORS = [...new Set(Object.values(IMPACT).map((i) => i.sector.split(" · ")[0]))];
