import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '../../lib/cn'

const variantClasses = {
  primary:
    'bg-accent text-white shadow-sm shadow-accent/20 hover:bg-accent/90 active:brightness-95',
  secondary:
    'border border-border text-muted hover:bg-[var(--surface-elevated)] hover:text-foreground active:brightness-95',
}

const baseClasses =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-[colors,filter] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-60'

export function Button({
  href,
  variant = 'secondary',
  className,
  children,
  onClick,
  type = 'button',
  disabled,
  ...props
}) {
  const reduceMotion = useReducedMotion()
  const classes = cn(baseClasses, variantClasses[variant], className)

  const motionProps = reduceMotion
    ? {}
    : {
        whileHover: { y: -1 },
        whileTap: { y: 0 },
        transition: { duration: 0.15 },
      }

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        onClick={onClick}
        aria-disabled={disabled || undefined}
        {...motionProps}
        {...props}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      className={classes}
      onClick={onClick}
      {...motionProps}
      {...props}
    >
      {children}
    </motion.button>
  )
}
