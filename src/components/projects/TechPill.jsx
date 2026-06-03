import { cn } from '../../lib/cn'
import { getTechIcon } from '../../lib/techIcons'

export function TechPill({ children, className }) {
  const Icon = typeof children === 'string' ? getTechIcon(children) : null

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border border-border bg-[var(--surface-nested)] px-2.5 py-0.5 text-xs text-muted',
        className,
      )}
    >
      {Icon && <Icon className="size-3 shrink-0" />}
      {children}
    </span>
  )
}
