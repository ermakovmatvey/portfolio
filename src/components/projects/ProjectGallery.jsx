import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'
import { useScrollLock } from '../../hooks/useScrollLock'
import { SafeImage } from '../ui/SafeImage'
import { cn } from '../../lib/cn'
import { publicUrl } from '../../lib/publicUrl'

function GalleryLightbox({ open, onClose, images, initialIndex, projectTitle }) {
  const [index, setIndex] = useState(initialIndex)
  const closeButtonRef = useRef(null)
  const reduceMotion = useReducedMotion()
  useScrollLock(open)

  const slide = images[index]
  const hasMultiple = images.length > 1
  const alt = slide?.alt || slide?.title || `${projectTitle} image`

  useEffect(() => {
    if (open) setIndex(initialIndex)
  }, [open, initialIndex])

  const goPrev = useCallback(() => {
    setIndex((i) => (i - 1 + images.length) % images.length)
  }, [images.length])

  const goNext = useCallback(() => {
    setIndex((i) => (i + 1) % images.length)
  }, [images.length])

  useEffect(() => {
    if (!open) return

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (hasMultiple && e.key === 'ArrowLeft') goPrev()
      if (hasMultiple && e.key === 'ArrowRight') goNext()
    }

    document.addEventListener('keydown', onKeyDown)
    closeButtonRef.current?.focus()

    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose, hasMultiple, goPrev, goNext])

  if (!slide) return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={slide.title || 'Image gallery'}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.2 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            onClick={onClose}
            aria-label="Close gallery"
          />
          <motion.div
            className="relative z-10 flex max-h-full max-w-full flex-col items-center"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
          >
            <div className="relative w-full">
              <div className="relative">
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={onClose}
                  className="absolute -top-11 right-0 inline-flex size-9 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition-colors hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:top-0 sm:-translate-y-12"
                  aria-label="Close"
                >
                  <X className="size-5" aria-hidden />
                </button>
                <img
                  key={slide.src}
                  src={publicUrl(slide.src)}
                  alt={alt}
                  className="max-h-[min(70vh,calc(100vh-12rem))] max-w-[min(100%,calc(100vw-2rem))] rounded-lg object-contain shadow-2xl"
                />
              </div>

              {hasMultiple && (
                <div className="mt-3 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={goPrev}
                    className="inline-flex size-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition-colors hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="size-5" aria-hidden />
                  </button>
                  <span className="min-w-[3rem] text-center text-xs text-white/50">
                    {index + 1} / {images.length}
                  </span>
                  <button
                    type="button"
                    onClick={goNext}
                    className="inline-flex size-10 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white transition-colors hover:bg-black/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    aria-label="Next image"
                  >
                    <ChevronRight className="size-5" aria-hidden />
                  </button>
                </div>
              )}
            </div>

            <div
              className="mt-3 max-w-[42rem] px-4 text-center"
              aria-live="polite"
            >
              <p className="text-sm font-medium text-white">{slide.title}</p>
              {slide.description && (
                <p className="mt-1 text-xs leading-relaxed text-white/75">
                  {slide.description}
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

export function ProjectGallery({ images, projectTitle }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const reduceMotion = useReducedMotion()

  if (!images?.length) return null

  const hasMultiple = images.length > 1
  const active = images[activeIndex]
  const activeAlt = active?.alt || active?.title || `${projectTitle} screenshot`

  const openLightbox = (index) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <>
      <div className="space-y-3">
        <button
          type="button"
          onClick={() => openLightbox(activeIndex)}
          className={cn(
            'group relative block w-full cursor-zoom-in overflow-hidden rounded-xl border border-border text-left',
            'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
          )}
          aria-label={`View full image: ${activeAlt}`}
        >
          <SafeImage
            src={active.src}
            alt={activeAlt}
            className="aspect-[2.2/1] w-full object-cover"
          />
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
              {hasMultiple ? 'View gallery' : 'View full image'}
            </span>
          </span>
        </button>

        {hasMultiple && (
          <div
            className="flex gap-2 overflow-x-auto pb-1"
            role="tablist"
            aria-label={`${projectTitle} gallery thumbnails`}
          >
            {images.map((item, i) => {
              const thumbAlt = item.alt || item.title || `Image ${i + 1}`
              const isActive = i === activeIndex
              return (
                <button
                  key={item.src}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={thumbAlt}
                  onClick={() => setActiveIndex(i)}
                  onDoubleClick={() => openLightbox(i)}
                  className={cn(
                    'relative shrink-0 overflow-hidden rounded-lg border-2 transition-colors',
                    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
                    isActive
                      ? 'border-accent'
                      : 'border-border opacity-70 hover:border-[var(--surface-hover-border)] hover:opacity-100',
                  )}
                >
                  <SafeImage
                    src={item.src}
                    alt=""
                    aria-hidden
                    className="size-16 object-cover sm:size-20"
                  />
                </button>
              )
            })}
          </div>
        )}
      </div>

      <GalleryLightbox
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={images}
        initialIndex={lightboxIndex}
        projectTitle={projectTitle}
      />
    </>
  )
}
