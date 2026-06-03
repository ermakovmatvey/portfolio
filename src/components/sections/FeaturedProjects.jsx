import { useReducedMotion } from 'framer-motion'
import { projects } from '../../data'
import { ProjectCard } from '../projects/ProjectCard'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SectionHeader } from '../ui/SectionHeader'
import { SECTION_IDS } from '../../lib/constants'
import { cn } from '../../lib/cn'

const featuredProjects = projects.filter((p) => p.featured).slice(0, 4)

export function FeaturedProjects() {
  const reduceMotion = useReducedMotion()

  if (featuredProjects.length === 0) return null

  return (
    <Section
      id={SECTION_IDS.projects}
      aria-labelledby="projects-heading"
      className="scroll-mt-[var(--header-height)] pt-8 sm:pt-12"
    >
      <Container>
        <SectionHeader
          headingId="projects-heading"
          title="Featured Projects"
          description="Selected work spanning AI applications, dashboards, productivity tools, and full-stack products."
          revealIndex={0}
        />

        <div className={cn(
          'mt-section-header grid gap-5',
          'grid-cols-1 sm:grid-cols-2',
        )}>
          {featuredProjects.map((project, index) => (
            <Reveal key={project.id} custom={index + 1} className="h-full">
              <ProjectCard
                project={project}
                reduceMotion={reduceMotion}
                variant="featured"
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
