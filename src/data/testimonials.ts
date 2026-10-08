/**
 * Müşteri yorumları — yalnız gerçek, izin alınmış alıntılar.
 * Liste boşken "Müşteriler ne diyor" bölümü sitede hiç görünmez.
 *
 * Örnek kayıt:
 * {
 *   quote: "Kortbul'u fikir aşamasından mağazaya kadar tek başına taşıdı…",
 *   quoteEn: "He took Kortbul from idea to the app stores on his own…", // isteğe bağlı
 *   name: "Ad Soyad",
 *   role: "Kurucu",              roleEn: "Founder",
 *   company: "Kortbul",
 *   avatar: "/testimonials/kortbul.jpg", // isteğe bağlı; public/testimonials/ altına koy
 *   link: "https://kortbul.com.tr",      // isteğe bağlı
 * },
 */
export type Testimonial = {
  quote: string;
  quoteEn?: string;
  name: string;
  role: string;
  roleEn?: string;
  company: string;
  avatar?: string;
  link?: string;
};

export const testimonials: Testimonial[] = [];
