import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { X, ZoomIn } from 'lucide-react'
import { useScrollLock } from '../../hooks/useScrollLock'
import { cn } from '../../lib/cn'

function LightboxOverlay({ open, onClose, src, alt }) {
  const closeButtonRef = useRef(null)
  const reduceMotion = useReducedMotion()
  useScrollLock(open)

  useEffect(() => {
    if (!open) return

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', onKeyDown)
    closeButtonRef.current?.focus()

    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={alt || 'Image preview'}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-10"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.2 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            onClick={onClose}
            aria-label="Close image preview"
          />
          <motion.div
            className="relative z-10 max-h-full max-w-full"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="absolute -top-11 right-0 inline-flex size-9 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition-colors hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:-right-12 sm:top-0"
              aria-label="Close"
            >
              <X className="size-5" aria-hidden />
            </button>
            <img
              src={src}
              alt={alt}
              className="max-h-[calc(100vh-3rem)] max-w-[min(100%,calc(100vw-2rem))] rounded-lg object-contain shadow-2xl"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

export function LightboxImage({ src, alt, className, children }) {
  const [open, setOpen] = useState(false)
  const reduceMotion = useReducedMotion()

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          'group relative block w-full cursor-zoom-in text-left',
          'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
          className,
        )}
        aria-label={`View full image: ${alt}`}
      >
        {children}
        <span
          className={cn(
            'pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity',
            reduceMotion
              ? 'opacity-0'
              : 'bg-black/0 opacity-0 group-hover:bg-black/30 group-hover:opacity-100 group-focus-visible:bg-black/30 group-focus-visible:opacity-100',
          )}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/65 px-3 py-1.5 text-xs font-medium text-white">
            <ZoomIn className="size-3.5" aria-hidden />
            View full image
          </span>
        </span>
      </button>
      <LightboxOverlay
        open={open}
        onClose={() => setOpen(false)}
        src={src}
        alt={alt}
      />
    </>
  )
}
