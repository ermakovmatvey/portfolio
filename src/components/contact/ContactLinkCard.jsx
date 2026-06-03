import { useState, useCallback } from 'react'
import { Copy, Check } from 'lucide-react'
import { cn } from '../../lib/cn'

export function ContactLinkCard({ href, label, value, icon: Icon, external = false, copyValue }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(
    (e) => {
      e.preventDefault()
      e.stopPropagation()
      navigator.clipboard.writeText(copyValue).then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
    },
    [copyValue],
  )

  const CopyIcon = copied ? Check : Copy

  return (
    <div className="surface-card-interactive group flex items-center gap-4 p-4">
      <a
        href={href}
        className="flex min-w-0 flex-1 items-center gap-4"
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-[var(--surface-nested)] text-muted transition-colors duration-200 group-hover:text-foreground">
          <Icon className="size-4" aria-hidden />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-xs font-medium uppercase tracking-wide text-muted">
            {label}
          </span>
          <span className="mt-0.5 block truncate text-sm font-medium text-foreground transition-colors duration-200 group-hover:text-accent">
            {value}
          </span>
        </span>
      </a>

      {copyValue && (
        <button
          type="button"
          onClick={handleCopy}
          className={cn(
            'flex size-9 shrink-0 items-center justify-center rounded-md border border-border text-muted transition-colors duration-200 hover:bg-[var(--surface-nested)] hover:text-foreground',
            copied && 'text-green-500 hover:text-green-500',
          )}
          aria-label={copied ? 'Copied' : `Copy ${label}`}
        >
          <CopyIcon className="size-3.5" />
        </button>
      )}
    </div>
  )
}
