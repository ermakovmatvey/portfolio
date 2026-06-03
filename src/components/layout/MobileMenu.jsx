import { useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { IconGitHub, IconLinkedIn } from '../icons/BrandIcons'
import { Container } from '../ui/Container'
import {
  NAV_LINKS,
  NAV_LINK_CLASS,
  SOCIAL_LINKS,
  SOCIAL_LINK_CLASS,
} from '../../lib/constants'
import { useFocusTrap } from '../../hooks/useFocusTrap'
import { cn } from '../../lib/cn'

const socialIcons = {
  github: IconGitHub,
  linkedin: IconLinkedIn,
}

export function MobileMenu({ open, onClose, onNavClick }) {
  const reduceMotion = useReducedMotion()
  const navRef = useRef(null)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useFocusTrap(open, navRef)

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-nav"
          ref={navRef}
          initial={reduceMotion ? false : { opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -12 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="border-t border-border bg-background/95 backdrop-blur-md sm:hidden"
        >
          <Container className="py-4">
            <nav aria-label="Mobile navigation">
              <ul className="flex flex-col gap-0.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={
                        isHome
                          ? link.href
                          : `${import.meta.env.BASE_URL}#${link.href.replace(/^#/, '')}`
                      }
                      className={cn(NAV_LINK_CLASS, 'block w-full py-3 text-base')}
                      onClick={(e) => onNavClick(e, link.href)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              <ul className="mt-4 flex items-center gap-1 border-t border-border pt-4">
                {SOCIAL_LINKS.map((social) => {
                  const Icon = socialIcons[social.icon]
                  return (
                    <li key={social.href}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className={SOCIAL_LINK_CLASS}
                        onClick={onClose}
                      >
                        <Icon className="size-4" aria-hidden />
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </Container>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
