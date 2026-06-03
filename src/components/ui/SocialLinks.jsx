import { IconGitHub, IconLinkedIn } from '../icons/BrandIcons'
import { SOCIAL_LINKS, SOCIAL_LINK_CLASS } from '../../lib/constants'

const socialIcons = {
  github: IconGitHub,
  linkedin: IconLinkedIn,
}

export function SocialLinks({ className, onLinkClick }) {
  return (
    <ul className={className} aria-label="Social links">
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
              onClick={onLinkClick}
            >
              <Icon className="size-4" aria-hidden />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
