import { cn } from '../../lib/cn'

export function Section({ id, className, bordered = false, children, ...props }) {
  return (
    <section
      id={id}
      className={cn(
        'scroll-mt-[var(--header-height)] py-section-py sm:py-section-py-sm',
        bordered && 'border-t border-border',
        className,
      )}
      {...props}
    >
      {children}
    </section>
  )
}
