import { projects } from '@/data/projects'

export type PortfolioProject = (typeof projects)[number]

/** Mobil Uygulama + Swift/SwiftUI ile yapılmış iOS e-ticaret (simülatör görselleri). */
export function isMobileAppProject(project: PortfolioProject): boolean {
  if (project.category === 'Mobil Uygulama') return true
  if (
    project.category === 'E-ticaret' &&
    project.technologies.some((t) => ['Swift', 'SwiftUI', 'iOS'].includes(t))
  ) {
    return true
  }
  return false
}

/** Arayüzde öne çıkmayan yardımcı araçlar — “… ile geliştirildi” satırına girmez. */
const MINOR_TECH = new Set([
  'HTML',
  'CSS',
  'Tailwind CSS',
  'shadcn/ui',
  'Vite',
  'TypeScript',
  'JWT',
  'React Navigation',
  'Expo Router',
  'EAS',
])

/** Proje teknolojilerinden okunur bir satır üretir: “React Native, Expo & Supabase ile geliştirildi”. */
export function builtWithLine(technologies: string[], max = 3, lang: 'tr' | 'en' = 'tr'): string {
  const main = technologies.filter((t) => !MINOR_TECH.has(t))
  const picked = (main.length > 0 ? main : technologies).slice(0, max)
  if (picked.length === 0) return ''
  const list =
    picked.length === 1
      ? picked[0]
      : `${picked.slice(0, -1).join(', ')} & ${picked[picked.length - 1]}`
  return lang === 'en' ? `Built with ${list}` : `${list} ile geliştirildi`
}

const CATEGORY_EN: Record<string, string> = {
  'Tümü': 'All',
  'Web Uygulaması': 'Web App',
  'Mobil Uygulama': 'Mobile App',
  'E-ticaret': 'E-commerce',
}

export function categoryLabel(category: string, lang: 'tr' | 'en'): string {
  return lang === 'en' ? CATEGORY_EN[category] ?? category : category
}

type Localizable = {
  title: string
  description: string
  features?: string[]
  en?: { title?: string; description?: string; features?: string[] }
}

/** Projenin seçili dildeki başlık/açıklama/özellikleri (İngilizce yoksa Türkçeye düşer). */
export function localizeProject<P extends Localizable>(p: P, lang: 'tr' | 'en') {
  if (lang !== 'en' || !p.en) return { title: p.title, description: p.description, features: p.features ?? [] }
  return {
    title: p.en.title ?? p.title,
    description: p.en.description ?? p.description,
    features: p.en.features ?? p.features ?? [],
  }
}
