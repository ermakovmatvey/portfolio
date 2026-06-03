import { motion } from 'framer-motion'
import { useRevealVariants } from '../../hooks/useRevealVariants'
import { cn } from '../../lib/cn'

const VIEWPORT = { once: true, margin: '-80px' }

export function Reveal({ children, className, custom = 0, as = 'div', ...props }) {
  const variants = useRevealVariants()
  const Component = motion[as] ?? motion.div

  return (
    <Component
      className={cn(className)}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={variants}
      custom={custom}
      {...props}
    >
      {children}
    </Component>
  )
}
