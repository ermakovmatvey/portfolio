import { useMemo, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { projects } from '../../data'
import { Container } from '../ui/Container'
import { Section } from '../ui/Section'
import { SectionHeader } from '../ui/SectionHeader'
import { ProjectCard } from '../projects/ProjectCard'
import { ProjectFilters } from '../projects/ProjectFilters'

function extractUnique(field) {
  const set = new Set()
  for (const p of projects) {
    if (p[field]) {
      for (const tag of p[field]) set.add(tag)
    }
  }
  return [...set]
}

export function AllProjects() {
  const [activeDomains, setActiveDomains] = useState([])
  const reduceMotion = useReducedMotion()

  const domainOptions = useMemo(() => extractUnique('domainTags'), [])

  const filteredProjects = useMemo(() => {
    let result = [...projects]

    if (activeDomains.length > 0) {
      result = result.filter((p) =>
        activeDomains.some((d) => p.domainTags?.includes(d)),
      )
    }

    result.sort((a, b) => {
      if (!a.dateUpdated || !b.dateUpdated) return 0
      return b.dateUpdated.localeCompare(a.dateUpdated)
    })

    return result
  }, [activeDomains])

  const toggleDomain = (domain) =>
    setActiveDomains((prev) =>
      prev.includes(domain) ? prev.filter((d) => d !== domain) : [...prev, domain],
    )

  const clearFilters = () => {
    setActiveDomains([])
  }

  return (
    <Section bordered aria-labelledby="all-projects-heading">
      <Container>
        <SectionHeader
          headingId="all-projects-heading"
          title="All Projects"
          description="Browse the full archive — filter by domain."
          revealIndex={0}
        />

        <div className="mt-section-header">
          <ProjectFilters
            domainOptions={domainOptions}
            activeDomains={activeDomains}
            onToggleDomain={toggleDomain}
            onClear={clearFilters}
          />

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout={!reduceMotion}
                  initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  className="h-full"
                >
                  <ProjectCard
                    project={project}
                    reduceMotion={reduceMotion}
                    variant="archive"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredProjects.length === 0 && (
            <p className="mt-12 text-center text-sm text-muted">
              No projects match your current filters.
            </p>
          )}
        </div>
      </Container>
    </Section>
  )
}
