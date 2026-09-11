/**
 * Kariyer başlangıcı tek bir yerde: 2017 (Hamle Mühendislik — Yazılım Stajyeri).
 * Deneyim yılı her yerde bundan türetilir, elle güncellenmez.
 */
export const CAREER_START_YEAR = 2017;

/** İçinde bulunulan yıla göre tam yıl deneyim (2026 → 9). */
export const experienceYears = () => new Date().getFullYear() - CAREER_START_YEAR;

/** Rozet/metrik gösterimi: "9+" */
export const experienceLabel = () => `${experienceYears()}+`;

/** "2017—2026" biçiminde kariyer aralığı. */
export const careerRange = () => `${CAREER_START_YEAR}—${new Date().getFullYear()}`;
