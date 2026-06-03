import { Reveal } from './Reveal'
import { cn } from '../../lib/cn'

export function SectionHeader({
  title,
  description,
  headingId,
  revealIndex = 0,
  className,
  titleClassName,
}) {
  return (
    <Reveal as="header" custom={revealIndex} className={cn('max-w-2xl space-y-4', className)}>
      <h2 id={headingId} tabIndex={-1} className={cn('text-section-title outline-none', titleClassName)}>
        {title}
      </h2>
      {description ? <p className="text-section-lead">{description}</p> : null}
    </Reveal>
  )
}
