export const SECTION_IDS = {
  hero: 'hero',
  projects: 'projects',
  skills: 'skills',
  about: 'about',
  contact: 'contact',
}

export const NAV_LINKS = [
  { label: 'Projects', href: `#${SECTION_IDS.projects}` },
  { label: 'Skills', href: `#${SECTION_IDS.skills}` },
  { label: 'About', href: `#${SECTION_IDS.about}` },
  { label: 'Contact', href: `#${SECTION_IDS.contact}` },
]

export const SITE = {
  name: 'Matvey Ermakov',
  email: 'ermakovmatvey@gmail.com',
  year: new Date().getFullYear(),
}

export const HERO = {
  headline:
    'Building web applications, digital experiences, and AI-driven solutions.',
  supporting:
    'Focused on creating intuitive products through thoughtful design, modern development practices, and continuous learning.',
  resumeAvailable: true,
  resumeHref: '/resume.pdf',
}

export const IMAGE_TINT_OVERLAY =
  'linear-gradient(145deg, rgba(99, 102, 241, 0.45) 0%, rgba(113, 196, 255, 0.2) 100%)'

export const HERO_PROFILE_CARD = {
  title: 'Frontend Developer',
  location: 'Charlotte, NC',
  status: 'Open to work',
  contactText: 'Contact Me',
  avatarUrl: '/images/sprite_0.png',
  avatarBlinkUrl: '/images/sprite_1.png',
  iconUrl: '#',
  behindGlowColor: 'rgba(99, 102, 241, 0.55)',
  innerGradient: IMAGE_TINT_OVERLAY,
}

export const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/ermakovmatvey', icon: 'github' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/', icon: 'linkedin' },
]

const socialByLabel = Object.fromEntries(
  SOCIAL_LINKS.map((link) => [link.label, link.href]),
)

const HERO_CTA_BASE = [
  {
    label: 'View Projects',
    href: `#${SECTION_IDS.projects}`,
    variant: 'primary',
    internal: true,
  },
  {
    label: 'GitHub',
    href: socialByLabel.GitHub,
    variant: 'secondary',
    external: true,
  },
  {
    label: 'LinkedIn',
    href: socialByLabel.LinkedIn,
    variant: 'secondary',
    external: true,
  },
]

export const HERO_CTAS = HERO.resumeAvailable
  ? [
      ...HERO_CTA_BASE,
      {
        label: 'Resume',
        href: HERO.resumeHref,
        variant: 'secondary',
        external: true,
      },
    ]
  : HERO_CTA_BASE

export const NAV_LINK_CLASS =
  'rounded-md px-3.5 py-2 text-sm font-semibold tracking-tight text-foreground transition-colors duration-200 hover:bg-[var(--surface-elevated)] hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

export const SOCIAL_LINK_CLASS =
  'rounded-md p-2 text-muted transition-colors duration-200 hover:bg-[var(--surface-elevated)] hover:text-foreground'

export const TEXT_LINK_CLASS =
  'inline-flex min-h-11 items-center gap-1.5 rounded-md px-2 text-sm font-medium text-muted transition-colors duration-200 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'
