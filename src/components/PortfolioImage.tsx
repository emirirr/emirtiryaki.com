import { cn } from '@/lib/utils'
import { publicAssetUrl } from '@/lib/publicAssetUrl'

type PortfolioImageProps = {
  src: string
  alt: string
  className?: string
  fetchPriority?: 'high' | 'low' | 'auto'
}

/** PNG için WebP `<source>`; düzen kutusu `className` ile (absolute / boyut). */
export function PortfolioImage({
  src,
  alt,
  className,
  fetchPriority = 'low',
}: PortfolioImageProps) {
  const resolvedSrc = publicAssetUrl(src)
  const isPng = /\.png$/i.test(src)
  /** Yalnızca public/portfolio görselleri için eş WebP; Vite asset URL’lerinde eş dosya yok. */
  const canUseWebp =
    isPng && src.startsWith("/portfolio/")
  const webpSrc = canUseWebp
    ? publicAssetUrl(src.replace(/\.png$/i, ".webp"))
    : null

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
            fetchPriority={fetchPriority}
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
      fetchPriority={fetchPriority}
    />
  )
}
