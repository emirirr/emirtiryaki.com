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
export function builtWithLine(technologies: string[], max = 3): string {
  const main = technologies.filter((t) => !MINOR_TECH.has(t))
  const picked = (main.length > 0 ? main : technologies).slice(0, max)
  if (picked.length === 0) return ''
  const list =
    picked.length === 1
      ? picked[0]
      : `${picked.slice(0, -1).join(', ')} & ${picked[picked.length - 1]}`
  return `${list} ile geliştirildi`
}
