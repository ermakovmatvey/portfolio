import { useReducedMotion } from 'framer-motion'
import { useScrollProgress } from '../../hooks/useScrollProgress'

export function ScrollProgress() {
  const progress = useScrollProgress()
  const reduceMotion = useReducedMotion()

  if (reduceMotion) return null

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent"
      style={{ transform: `scaleX(${progress})` }}
      aria-hidden
    />
  )
}
