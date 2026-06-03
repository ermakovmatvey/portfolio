import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import ProfileCard from '../effects/ProfileCard'
import { VariableProximity } from '../effects/VariableProximity'
import { Button } from '../ui/Button'
import { Container } from '../ui/Container'
import { Section } from '../ui/Section'
import { cn } from '../../lib/cn'
import {
  HERO,
  HERO_CTAS,
  HERO_PROFILE_CARD,
  SECTION_IDS,
  SITE,
} from '../../lib/constants'
import { scrollToHash } from '../../lib/scroll'

function HeroDecor() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div className="hero-grid absolute inset-0" />
      <div className="hero-glow-pulse absolute -right-24 -top-24 size-[20rem] rounded-full bg-accent/15 blur-3xl sm:-right-32 sm:-top-32 sm:size-[28rem] lg:-right-20 lg:-top-20 lg:size-[36rem]" />
      <div className="absolute -bottom-32 -left-24 size-[18rem] rounded-full bg-accent/5 blur-3xl sm:-bottom-40 sm:-left-32 sm:size-[24rem] lg:-bottom-32 lg:-left-20" />
    </div>
  )
}

export function Hero() {
  const reduceMotion = useReducedMotion()
  const proximityContainerRef = useRef(null)

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.09,
        delayChildren: 0.05,
      },
    },
  }

  const item = {
    hidden: reduceMotion ? false : { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: 'easeOut' },
    },
  }

  const handleCtaClick = (e, cta) => {
    if (!cta.internal) return
    e.preventDefault()
    scrollToHash(cta.href)
  }

  return (
    <Section
      id={SECTION_IDS.hero}
      aria-labelledby="hero-heading"
      className="relative flex min-h-[calc(100dvh-var(--header-height))] items-center overflow-hidden py-16 pb-12 sm:py-24 sm:pb-16 lg:py-28 lg:pb-20"
    >
      <HeroDecor />
      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(280px,380px)] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_minmax(300px,400px)] xl:gap-16">
        <motion.div
          className="mx-auto max-w-3xl space-y-5 text-center sm:space-y-6 lg:mx-0 lg:max-w-none lg:text-left"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item}>
            <h1
              id="hero-heading"
              tabIndex={-1}
              className="text-4xl tracking-tight text-foreground outline-none sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              <span ref={proximityContainerRef} className="relative inline-block">
                {reduceMotion ? (
                  SITE.name
                ) : (
                  <VariableProximity
                    label={SITE.name}
                    className="font-semibold"
                    fromFontVariationSettings="'wght' 400, 'opsz' 9"
                    toFontVariationSettings="'wght' 1000, 'opsz' 40"
                    containerRef={proximityContainerRef}
                    radius={220}
                    falloff="linear"
                  />
                )}
              </span>
            </h1>
          </motion.div>

          <motion.p
            variants={item}
            className="text-lg leading-snug text-foreground/90 sm:text-xl lg:text-2xl"
          >
            {HERO.headline}
          </motion.p>

          <motion.p
            variants={item}
            className="mx-auto max-w-2xl text-base leading-relaxed text-muted sm:text-lg lg:mx-0"
          >
            {HERO.supporting}
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-wrap justify-center gap-3 pt-3 sm:pt-4 lg:justify-start"
          >
            {HERO_CTAS.map((cta) => (
              <Button
                key={cta.label}
                href={cta.href}
                variant={cta.variant}
                className={cn(
                  'w-full sm:w-auto',
                  cta.variant === 'secondary' &&
                    'bg-[var(--surface-deep)] hover:bg-[var(--surface-deep-elevated)]',
                )}
                onClick={(e) => handleCtaClick(e, cta)}
                {...(cta.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                {cta.label}
              </Button>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          variants={item}
          initial="hidden"
          animate="show"
          className="mx-auto w-full max-w-[min(100%,360px)] justify-self-center lg:max-w-none lg:justify-self-end"
        >
          <ProfileCard
            name={SITE.name}
            title={HERO_PROFILE_CARD.title}
            location={HERO_PROFILE_CARD.location}
            status={HERO_PROFILE_CARD.status}
            contactText={HERO_PROFILE_CARD.contactText}
            avatarUrl={HERO_PROFILE_CARD.avatarUrl}
            avatarBlinkUrl={HERO_PROFILE_CARD.avatarBlinkUrl}
            iconUrl={HERO_PROFILE_CARD.iconUrl}
            showUserInfo
            enableTilt={!reduceMotion}
            enableMobileTilt={false}
            behindGlowEnabled={false}
            behindGlowColor={HERO_PROFILE_CARD.behindGlowColor}
            innerGradient={HERO_PROFILE_CARD.innerGradient}
            cardHeight="min(72vh, 500px)"
            cardMaxHeight="500px"
            className="w-full"
            onContactClick={() => scrollToHash(`#${SECTION_IDS.contact}`)}
          />
        </motion.div>
        </div>
      </Container>
    </Section>
  )
}
