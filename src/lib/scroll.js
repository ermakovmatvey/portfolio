function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function getHeaderOffset() {
  const header = document.querySelector('header')
  return header?.offsetHeight ?? 0
}

export function scrollToHash(href) {
  const id = href.replace(/^#/, '')
  if (!id) return

  const target = document.getElementById(id)
  if (!target) return

  const offset = getHeaderOffset()
  const top = Math.max(
    0,
    target.getBoundingClientRect().top + window.scrollY - offset,
  )

  window.scrollTo({
    top,
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
  })

  const heading = target.querySelector('[tabindex="-1"]')
  if (heading instanceof HTMLElement) {
    requestAnimationFrame(() => heading.focus({ preventScroll: true }))
  }
}
