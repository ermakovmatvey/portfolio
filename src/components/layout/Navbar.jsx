import { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { IconGitHub, IconLinkedIn } from '../icons/BrandIcons'
import { Container } from '../ui/Container'
import { MobileMenu } from './MobileMenu'
import { SiteBrand } from './SiteBrand'
import {
  NAV_LINKS,
  NAV_LINK_CLASS,
  SITE,
  SOCIAL_LINKS,
  SOCIAL_LINK_CLASS,
} from '../../lib/constants'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useScrollLock } from '../../hooks/useScrollLock'
import { useScrolled } from '../../hooks/useScrolled'
import { cn } from '../../lib/cn'
import { scrollToHash } from '../../lib/scroll'

const socialIcons = {
  github: IconGitHub,
  linkedin: IconLinkedIn,
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const toggleRef = useRef(null)
  const scrolled = useScrolled()
  const isDesktop = useMediaQuery('(min-width: 640px)')
  const reduceMotion = useReducedMotion()
  const isMenuVisible = menuOpen && !isDesktop
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  useScrollLock(isMenuVisible)

  useEffect(() => {
    if (!isMenuVisible) return

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        toggleRef.current?.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isMenuVisible])

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  const handleNavClick = useCallback(
    (e, href) => {
      e.preventDefault()
      closeMenu()

      const hash = href.replace(/^#/, '')

      if (isHome) {
        if (location.hash === href) {
          scrollToHash(href)
        } else {
          navigate({ pathname: '/', hash })
        }
      } else {
        navigate('/' + href)
      }
    },
    [closeMenu, isHome, location.hash, navigate],
  )

  return (
    <motion.header
      className={cn(
        'sticky top-0 z-50 border-b border-border transition-[background-color,backdrop-filter] duration-300',
        scrolled
          ? 'bg-background/85 backdrop-blur-md'
          : 'bg-background/70 backdrop-blur-sm',
      )}
      initial={reduceMotion ? false : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <Container>
        <nav
          className="flex h-[var(--header-height)] items-center justify-between"
          aria-label="Main navigation"
        >
          <Link
            to="/"
            aria-label={SITE.name}
            className="text-base font-semibold tracking-tight text-foreground transition-colors hover:text-accent sm:text-lg"
          >
            <SiteBrand />
          </Link>

          <div className="hidden items-center gap-2 sm:flex">
            <ul className="flex items-center gap-1 sm:gap-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={
                      isHome
                        ? link.href
                        : `${import.meta.env.BASE_URL}#${link.href.replace(/^#/, '')}`
                    }
                    className={NAV_LINK_CLASS}
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div
              className="ml-2 flex items-center gap-1 border-l border-border pl-2"
              aria-label="Social links"
            >
              {SOCIAL_LINKS.map((social) => {
                const Icon = socialIcons[social.icon]
                return (
                  <a
                    key={social.href}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={SOCIAL_LINK_CLASS}
                  >
                    <Icon className="size-4" aria-hidden />
                  </a>
                )
              })}
            </div>
          </div>

          <button
            ref={toggleRef}
            type="button"
            className={cn(
              'rounded-md p-2 text-muted transition-colors duration-200 sm:hidden',
              'hover:bg-[var(--surface-elevated)] hover:text-foreground',
            )}
            aria-expanded={isMenuVisible}
            aria-controls="mobile-nav"
            aria-label={isMenuVisible ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {isMenuVisible ? (
              <X className="size-5" aria-hidden />
            ) : (
              <Menu className="size-5" aria-hidden />
            )}
          </button>
        </nav>
      </Container>

      <MobileMenu
        open={isMenuVisible}
        onClose={closeMenu}
        onNavClick={handleNavClick}
      />
    </motion.header>
  )
}
