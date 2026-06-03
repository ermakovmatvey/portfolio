import { useParams, Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import { projects } from '../data'
import { Container } from '../components/ui/Container'
import { TechPill } from '../components/projects/TechPill'
import { IconGitHub } from '../components/icons/BrandIcons'
import { Button } from '../components/ui/Button'
import { LightboxImage } from '../components/ui/ImageLightbox'
import { ProjectGallery } from '../components/projects/ProjectGallery'
import { cn } from '../lib/cn'
import { formatProjectDateRange } from '../lib/formatProjectDate'
import { STATUS_COLORS, STATUS_LABELS } from '../lib/projectStatus'
import { publicUrl } from '../lib/publicUrl'

function getProjectGallery(project) {
  if (project.gallery?.length > 0) return project.gallery
  if (project.image) {
    return [
      {
        src: project.image,
        title: 'Title placeholder',
        description: 'Short description placeholder.',
      },
    ]
  }
  return []
}

function ContentSection({ section }) {
  if (section.type === 'heading') {
    return (
      <h2 className="mt-10 mb-4 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        {section.content}
      </h2>
    )
  }

  if (section.type === 'paragraph') {
    return (
      <p className="text-base leading-relaxed text-muted sm:text-lg">
        {section.content}
      </p>
    )
  }

  if (section.type === 'image') {
    const alt = section.alt || 'Project image'
    const imageSrc = publicUrl(section.content)
    return (
      <LightboxImage
        src={imageSrc}
        alt={alt}
        className="my-8 overflow-hidden rounded-xl border border-border"
      >
        <img
          src={imageSrc}
          alt={alt}
          className="w-full"
          loading="lazy"
        />
      </LightboxImage>
    )
  }

  return null
}

function ProjectNav({ prevProject, nextProject }) {
  return (
    <nav
      className="mt-16 flex items-stretch gap-4 border-t border-border pt-8"
      aria-label="Project navigation"
    >
      {prevProject ? (
        <Link
          to={`/projects/${prevProject.slug}`}
          className="group flex flex-1 flex-col items-start gap-1 rounded-xl border border-border p-4 transition-colors hover:border-[var(--surface-hover-border)] hover:bg-[var(--surface)]"
        >
          <span className="inline-flex items-center gap-1 text-xs text-muted">
            <ArrowLeft className="size-3" />
            Previous
          </span>
          <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
            {prevProject.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
      {nextProject ? (
        <Link
          to={`/projects/${nextProject.slug}`}
          className="group flex flex-1 flex-col items-end gap-1 rounded-xl border border-border p-4 text-right transition-colors hover:border-[var(--surface-hover-border)] hover:bg-[var(--surface)]"
        >
          <span className="inline-flex items-center gap-1 text-xs text-muted">
            Next
            <ArrowRight className="size-3" />
          </span>
          <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
            {nextProject.title}
          </span>
        </Link>
      ) : (
        <div className="flex-1" />
      )}
    </nav>
  )
}

export function ProjectDetailPage() {
  const { slug } = useParams()
  const reduceMotion = useReducedMotion()

  const projectIndex = projects.findIndex((p) => p.slug === slug)
  const project = projects[projectIndex]

  if (!project) {
    return (
      <Container className="py-20 text-center">
        <h1 className="text-2xl font-semibold text-foreground">Project not found</h1>
        <p className="mt-2 text-muted">The project you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to home
        </Link>
      </Container>
    )
  }

  const prevProject = projectIndex > 0 ? projects[projectIndex - 1] : null
  const nextProject =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null

  const dateRange = formatProjectDateRange(project)
  const galleryImages = getProjectGallery(project)

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="pb-16 pt-8 sm:pb-24 sm:pt-12"
    >
      <Container>
        <Link
          to="/#projects"
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          All projects
        </Link>
      </Container>

      {galleryImages.length > 0 && (
        <div className="mt-6">
          <Container>
            <ProjectGallery
              images={galleryImages}
              projectTitle={project.title}
            />
          </Container>
        </div>
      )}

      <Container className="mt-8 sm:mt-10">
        <div className="mx-auto max-w-3xl">
          <header className="space-y-4">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              {project.title}
            </h1>

            {project.domainTags?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.domainTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex rounded-full border border-indigo-400/35 bg-indigo-500/12 px-2.5 py-0.5 text-xs font-medium text-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {(dateRange || project.status) && (
              <div className="flex flex-wrap items-center gap-2">
                {dateRange && (
                  <span className="text-sm text-muted">{dateRange}</span>
                )}
                {project.status && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-xs text-muted">
                    <span
                      className={cn('size-1.5 rounded-full', STATUS_COLORS[project.status])}
                      aria-hidden
                    />
                    {STATUS_LABELS[project.status]}
                  </span>
                )}
              </div>
            )}
          </header>

          {project.technologyTags?.length > 0 && (
            <div className="mt-6">
              <div className="flex flex-wrap gap-2">
                {project.technologyTags.map((tech) => (
                  <TechPill key={tech}>{tech}</TechPill>
                ))}
              </div>
            </div>
          )}

          {(project.githubUrl || project.liveUrl) && (
            <div className="mt-6 flex flex-wrap gap-3">
              {project.githubUrl && (
                <Button
                  href={project.githubUrl}
                  variant="secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconGitHub className="size-4" />
                  View on GitHub
                </Button>
              )}
              {project.liveUrl && (
                <Button
                  href={project.liveUrl}
                  variant="primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="size-4" />
                  Live Demo
                </Button>
              )}
            </div>
          )}

          {project.longDescription && (
            <p className="mt-8 text-lg leading-relaxed text-muted/90 sm:text-xl sm:leading-relaxed">
              {project.longDescription}
            </p>
          )}

          {project.contentSections?.length > 0 && (
            <div className="mt-4">
              {project.contentSections.map((section, i) => (
                <ContentSection key={i} section={section} />
              ))}
            </div>
          )}

          <ProjectNav prevProject={prevProject} nextProject={nextProject} />
        </div>
      </Container>
    </motion.article>
  )
}
