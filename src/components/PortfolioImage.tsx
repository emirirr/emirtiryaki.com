import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { publicAssetUrl } from '@/lib/publicAssetUrl'

type PortfolioImageProps = {
  src: string
  alt: string
  className?: string
  fetchPriority?: 'high' | 'low' | 'auto'
  /** Görsel yüklenemezse gösterilecek içerik (eksik ekran görüntüleri için). */
  fallback?: React.ReactNode
}

/** PNG için WebP `<source>`; düzen kutusu `className` ile (absolute / boyut). */
export function PortfolioImage({
  src,
  alt,
  className,
  fetchPriority = 'low',
  fallback,
}: PortfolioImageProps) {
  const [failed, setFailed] = useState(false)
  const resolvedSrc = publicAssetUrl(src)
  const isPng = /\.png$/i.test(src)
  /** Yalnızca public/portfolio görselleri için eş WebP; Vite asset URL’lerinde eş dosya yok. */
  const canUseWebp =
    isPng && src.startsWith("/portfolio/")
  const webpSrc = canUseWebp
    ? publicAssetUrl(src.replace(/\.png$/i, ".webp"))
    : null

  if (failed && fallback) {
    return <div className={cn('relative z-[1] min-h-0', className)}>{fallback}</div>
  }

  const onError = () => setFailed(true)

  if (webpSrc) {
    return (
      <div className={cn('relative z-[1] min-h-0', className)}>
        <picture className="block h-full min-h-0 w-full [&>img]:h-full [&>img]:w-full [&>img]:object-cover [&>img]:object-top">
          <source srcSet={webpSrc} type="image/webp" />
          <img
            src={resolvedSrc}
            alt={alt}
            loading="lazy"
            decoding="async"
            onError={onError}
            {...{ fetchpriority: fetchPriority }}
          />
        </picture>
      </div>
    )
  }

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      className={cn(className)}
      loading="lazy"
      decoding="async"
      onError={onError}
      {...{ fetchpriority: fetchPriority }}
    />
  )
}

/** Ekran görüntüsü olmayan projeler için marka tonu taşıyan yer tutucu. */
export function ProjectPlaceholder({
  title,
  icon: Icon,
}: {
  title: string
  icon?: LucideIcon
}) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-primary-soft p-6 text-center">
      {Icon && (
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-card text-primary shadow-sm">
          <Icon className="h-7 w-7" strokeWidth={1.75} />
        </span>
      )}
      <span className="max-w-[80%] text-sm font-bold tracking-tight text-foreground/70">{title}</span>
    </div>
  )
}
