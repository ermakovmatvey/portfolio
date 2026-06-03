import { capabilities, skillCategories } from '../../data'
import { Container } from '../ui/Container'
import { Reveal } from '../ui/Reveal'
import { Section } from '../ui/Section'
import { SectionHeader } from '../ui/SectionHeader'
import { SECTION_IDS } from '../../lib/constants'
import OrbitImages from '../effects/OrbitImages'
import { TechPill } from '../projects/TechPill'

export function Skills() {
  const orbitTech = Array.from(
    new Set(skillCategories.flatMap((category) => category.skills)),
  ).slice(0, 12)

  const orbitItems = orbitTech.map((tech) => (
    <TechPill key={tech} className="px-4 py-2 text-base text-foreground">
      {tech}
    </TechPill>
  ))

  return (
    <Section
      id={SECTION_IDS.skills}
      aria-labelledby="skills-heading"
      bordered
    >
      <Container>
        <SectionHeader
          headingId="skills-heading"
          title="Skills"
          revealIndex={0}
        />

        <div className="mt-section-header grid gap-8 lg:grid-cols-12 lg:items-center">
          <Reveal custom={1} className="lg:col-span-7 xl:col-span-8">
            <OrbitImages
              items={orbitItems}
              shape="ellipse"
              radiusX={520}
              radiusY={150}
              rotation={-8}
              duration={90}
              itemSize={168}
              responsive={true}
              responsiveAspectRatio="16 / 9"
              direction="normal"
              fill
              showPath
              paused={false}
              pathColor="rgba(255,255,255,0.08)"
              pathWidth={2}
              className="w-full"
            />
          </Reveal>

          <Reveal custom={2} className="lg:col-span-5 xl:col-span-4">
            <div className="py-2 sm:py-4">
              <p className="text-sm leading-relaxed text-muted sm:text-base">
              I enjoy building modern web experiences that balance functionality, usability, and design. My interests span frontend development, user experience, and emerging technologies, with a focus on creating products that are intuitive, accessible, and thoughtfully crafted.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal custom={3}>
          <ul
            className="mt-4 grid gap-6 sm:mt-5 sm:grid-cols-2 sm:gap-8"
            role="list"
          >
            {capabilities.map((capability) => (
              <li key={capability.id}>
                <h3 className="text-sm font-medium text-foreground sm:text-base">
                  {capability.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">
                  {capability.description}
                </p>
                {capability.tags?.length > 0 && (
                  <ul className="mt-3 flex flex-wrap gap-2" role="list">
                    {capability.tags.map((tag) => (
                      <li key={tag}>
                        <TechPill>{tag}</TechPill>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  )
}
