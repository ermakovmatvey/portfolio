import { X, Layers } from 'lucide-react'
import { cn } from '../../lib/cn'
import { getTechIcon } from '../../lib/techIcons'

function FilterChip({ label, active, onClick }) {
  const Icon = getTechIcon(label)

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200',
        active &&
          'border-indigo-400/40 bg-indigo-500/15 text-foreground shadow-[0_0_8px_rgba(99,102,241,0.1)]',
        !active &&
          'border-border bg-transparent text-muted hover:border-[var(--surface-hover-border)] hover:text-foreground',
      )}
    >
      {Icon && <Icon className="size-3.5 shrink-0" />}
      {label}
    </button>
  )
}

function FilterGroup({
  label,
  icon: GroupIcon,
  options,
  activeFilters,
  onToggle,
  onClear,
}) {
  const showClear = onClear && activeFilters.length > 0

  return (
    <div>
      <div className="mb-3 flex items-center gap-2">
        <GroupIcon className="size-4 text-indigo-400" />
        <span className="text-sm font-semibold uppercase tracking-wider text-indigo-400/80">
          {label}
        </span>
      </div>
      <div className="flex flex-wrap items-center gap-2.5 overflow-x-auto sm:overflow-visible">
        {options.map((option) => (
          <FilterChip
            key={option}
            label={option}
            active={activeFilters.includes(option)}
            onClick={() => onToggle(option)}
          />
        ))}
        {showClear && (
          <button
            type="button"
            onClick={onClear}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-md px-2.5 py-1 text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            <X className="size-3.5" />
            Clear filters
          </button>
        )}
      </div>
    </div>
  )
}

export function ProjectFilters({
  domainOptions,
  activeDomains,
  onToggleDomain,
  onClear,
}) {
  if (domainOptions.length === 0) return null

  return (
    <FilterGroup
      label="Domain"
      icon={Layers}
      options={domainOptions}
      activeFilters={activeDomains}
      onToggle={onToggleDomain}
      onClear={onClear}
    />
  )
}
