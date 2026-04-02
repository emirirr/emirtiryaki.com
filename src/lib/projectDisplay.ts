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
