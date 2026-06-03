import { useReducedMotion } from 'framer-motion'

export function useRevealVariants() {
  const reduceMotion = useReducedMotion()

  return {
    hidden: reduceMotion ? false : { opacity: 0, y: 18 },
    show: (index = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: 'easeOut',
        delay: reduceMotion ? 0 : index * 0.06,
      },
    }),
  }
}
