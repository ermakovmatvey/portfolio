import { Mail } from 'lucide-react'
import { contact } from '../../data'
import { ContactForm } from '../contact/ContactForm'
import { ContactLinkCard } from '../contact/ContactLinkCard'
import { ContactPhoneSprite } from '../contact/ContactPhoneSprite'
import { IconGitHub, IconLinkedIn } from '../icons/BrandIcons'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SectionHeader } from '../ui/SectionHeader'
import { SECTION_IDS, SITE, SOCIAL_LINKS } from '../../lib/constants'
import { isEmailJsConfigured } from '../../lib/emailjs'
import { cn } from '../../lib/cn'

const socialIcons = {
  github: IconGitHub,
  linkedin: IconLinkedIn,
}

export function Contact() {
  const showForm = isEmailJsConfigured()

  const contactLinks = [
    {
      href: `mailto:${SITE.email}`,
      label: 'Email',
      value: SITE.email,
      icon: Mail,
      external: false,
      copyValue: SITE.email,
    },
    ...SOCIAL_LINKS.map((social) => ({
      href: social.href,
      label: social.label,
      value: social.label,
      icon: socialIcons[social.icon],
      external: true,
    })),
  ]

  return (
    <Section id={SECTION_IDS.contact} aria-labelledby="contact-heading" bordered>
      <Container>
        <SectionHeader
          headingId="contact-heading"
          title={contact.heading}
          description={contact.supporting}
          revealIndex={0}
        />

        <div
          className={cn(
            'mt-section-header relative',
            showForm && 'lg:grid lg:grid-cols-2 lg:items-start lg:gap-12',
            !showForm && 'flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between',
          )}
        >
          <Reveal custom={1} className={cn(!showForm && 'min-w-0 flex-1')}>
            <address className="w-full max-w-lg space-y-3 not-italic">
              {contactLinks.map((link) => (
                <ContactLinkCard key={link.href} {...link} />
              ))}
            </address>
          </Reveal>

          <Reveal
            custom={1}
            className={cn(
              'flex justify-center sm:justify-end',
              showForm &&
                'lg:pointer-events-none lg:absolute lg:inset-y-0 lg:left-1/2 lg:z-10 lg:w-0 lg:-translate-x-1/2 lg:items-center lg:justify-center',
            )}
          >
            <ContactPhoneSprite />
          </Reveal>

          {showForm ? (
            <Reveal custom={2} className="mt-8 lg:col-start-2 lg:row-start-1 lg:mt-0">
              <ContactForm />
            </Reveal>
          ) : null}
        </div>
      </Container>
    </Section>
  )
}
