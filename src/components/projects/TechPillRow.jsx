import { useRef, useState, useEffect, useCallback } from 'react'
import { TechPill } from './TechPill'
import { cn } from '../../lib/cn'

export function TechPillRow({ tags, pillClassName, className }) {
  const containerRef = useRef(null)
  const [visibleCount, setVisibleCount] = useState(tags.length)

  const measure = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const children = Array.from(container.children)
    if (children.length === 0) return

    const containerWidth = container.offsetWidth
    const gap = parseFloat(getComputedStyle(container).columnGap) || 6
    let usedWidth = 0
    let count = 0

    // Reserve space for the "+N" badge (approx 32px)
    const badgeWidth = 32

    for (let i = 0; i < tags.length; i++) {
      const child = children[i]
      if (!child) break
      const childWidth = child.scrollWidth
      const totalNeeded = usedWidth + (count > 0 ? gap : 0) + childWidth

      const remaining = tags.length - (count + 1)
      const needsBadge = remaining > 0
      const budget = needsBadge ? containerWidth - badgeWidth - gap : containerWidth

      if (totalNeeded > budget && count > 0) break
      usedWidth = totalNeeded
      count++
    }

    setVisibleCount(count)
  }, [tags])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(container)
    return () => observer.disconnect()
  }, [measure])

  const hiddenCount = tags.length - visibleCount

  return (
    <div className={cn('relative', className)}>
      {/* Measuring container - all pills rendered but invisible when overflowing */}
      <div
        ref={containerRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 flex gap-1.5 opacity-0"
      >
        {tags.map((tech) => (
          <TechPill key={tech} className={cn('shrink-0 whitespace-nowrap', pillClassName)}>
            {tech}
          </TechPill>
        ))}
      </div>

      {/* Visible row */}
      <div className="flex items-center gap-1.5">
        {tags.slice(0, visibleCount).map((tech) => (
          <TechPill key={tech} className={cn('shrink-0 whitespace-nowrap', pillClassName)}>
            {tech}
          </TechPill>
        ))}
        {hiddenCount > 0 && (
          <span className="inline-flex shrink-0 items-center px-1 text-[11px] text-muted">
            +{hiddenCount}
          </span>
        )}
      </div>
    </div>
  )
}
