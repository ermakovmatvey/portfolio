/** Resolve a path under `public/` for the current Vite base (e.g. `/portfolio/` on GitHub Pages). */
export function publicUrl(path) {
  if (!path) return import.meta.env.BASE_URL
  if (/^https?:\/\//i.test(path) || path.startsWith('data:')) return path
  const normalized = path.startsWith('/') ? path.slice(1) : path
  return `${import.meta.env.BASE_URL}${normalized}`
}

/** React Router basename: leading slash, no trailing slash. */
export function routerBasename() {
  const base = import.meta.env.BASE_URL
  if (!base || base === '/') return undefined
  return base.replace(/\/$/, '')
}
