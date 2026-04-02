import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PortfolioImage } from '@/components/PortfolioImage'

/** iPhone 17 Pro sınıfı — mantıksal ~402×874 oranı (portre). */
const ASPECT = 'aspect-[402/874]'

const sizes = {
  sm: 'w-[5.75rem]',
  md: 'w-[11rem] sm:w-[12.5rem]',
  lg: 'w-[min(88vw,17rem)] sm:w-[15.5rem] md:w-[17.25rem]',
} as const

type Size = keyof typeof sizes

type IPhone17ProFrameProps = {
  size?: Size
  className?: string
  src?: string
  alt?: string
  fallbackIcon?: LucideIcon
}

export function IPhone17ProFrame({
  size = 'md',
  className,
  src,
  alt = '',
  fallbackIcon: Icon,
}: IPhone17ProFrameProps) {
  return (
    <div
      className={cn('relative mx-auto shrink-0', sizes[size], className)}
      data-device-frame="iphone-17-pro"
    >
      <div
        className={cn(
          'rounded-[2.35rem] bg-gradient-to-b from-zinc-600 via-zinc-800 to-zinc-950 p-[6px] sm:p-[7px]',
          'shadow-[0_24px_48px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.12)]',
          'ring-1 ring-white/12',
        )}
      >
        <div
          className={cn(
            'relative overflow-hidden rounded-[1.9rem] bg-black ring-1 ring-black/80',
            ASPECT,
          )}
        >
          {src ? (
            <PortfolioImage
              src={src}
              alt={alt}
              className="h-full w-full object-cover object-top"
              fetchPriority="low"
            />
          ) : Icon ? (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/25 via-background/60 to-accent/20">
              <Icon className="h-[22%] w-[22%] text-primary/85" strokeWidth={1.25} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}
