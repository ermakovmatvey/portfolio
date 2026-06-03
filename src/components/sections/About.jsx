import { about } from '../../data'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SectionHeader } from '../ui/SectionHeader'
import { SafeImage } from '../ui/SafeImage'
import { SECTION_IDS } from '../../lib/constants'

export function About() {
  return (
    <Section id={SECTION_IDS.about} aria-labelledby="about-heading" bordered>
      <Container>
        <SectionHeader
          headingId="about-heading"
          title="About"
          revealIndex={0}
        />

        <div className="mt-section-header flex flex-col-reverse items-start gap-10 md:flex-row md:gap-16">
          <Reveal custom={1} className="max-w-3xl space-y-5 sm:space-y-6 md:flex-1">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-body-large">
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal custom={2} className="w-full max-w-[280px] shrink-0 self-center md:self-start">
            <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl border border-border bg-surface">
              <SafeImage
                src="/images/grad-photo.JPG"
                alt="Matvey Ermakov at graduation"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  )
}
