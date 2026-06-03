import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { HeroBackdrop } from '../components/effects/HeroBackdrop'
import { Hero } from '../components/sections/Hero'
import { FeaturedProjects } from '../components/sections/FeaturedProjects'
import { AllProjects } from '../components/sections/AllProjects'
import { Skills } from '../components/sections/Skills'
import { About } from '../components/sections/About'
import { Contact } from '../components/sections/Contact'
import { scrollToHash } from '../lib/scroll'

export function HomePage() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return

    let innerFrame
    const outerFrame = requestAnimationFrame(() => {
      innerFrame = requestAnimationFrame(() => scrollToHash(hash))
    })

    return () => {
      cancelAnimationFrame(outerFrame)
      if (innerFrame) cancelAnimationFrame(innerFrame)
    }
  }, [hash])

  return (
    <>
      <HeroBackdrop>
        <Hero />
        <FeaturedProjects />
      </HeroBackdrop>
      <AllProjects />
      <Skills />
      <About />
      <Contact />
    </>
  )
}
