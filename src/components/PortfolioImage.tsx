import { cn } from '@/lib/utils'

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
  const isPng = /\.png$/i.test(src)
  const webpSrc = isPng ? src.replace(/\.png$/i, '.webp') : null

  if (webpSrc) {
    return (
      <div className={cn(className)}>
        <picture className="block h-full w-full">
          <source srcSet={webpSrc} type="image/webp" />
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover object-top"
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
      src={src}
      alt={alt}
      className={cn(className)}
      loading="lazy"
      decoding="async"
      fetchPriority={fetchPriority}
    />
  )
}
