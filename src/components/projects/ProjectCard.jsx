import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { GlareHover, PROJECT_CARD_GLARE } from '../effects/GlareHover'
import { TechPillRow } from './TechPillRow'
import { SafeImage } from '../ui/SafeImage'
import { Button } from '../ui/Button'
import { IMAGE_TINT_OVERLAY } from '../../lib/constants'
import { formatProjectDateRange } from '../../lib/formatProjectDate'
import { STATUS_COLORS, STATUS_LABELS } from '../../lib/projectStatus'
import { cn } from '../../lib/cn'

const cardActionClasses =
  'inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-[colors,filter] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

export function ProjectCard({ project, reduceMotion, variant = 'archive' }) {
  const isFeatured = variant === 'featured'
  const dateRange = formatProjectDateRange(project)
  const detailPath = `/projects/${project.slug}`

  return (
    <GlareHover
      as="article"
      disabled={reduceMotion}
      {...PROJECT_CARD_GLARE}
      className="surface-card-deep group flex h-full flex-col"
    >
      <Link
        to={detailPath}
        className={cn(
          'relative block overflow-hidden outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
          isFeatured ? 'aspect-[16/10]' : 'aspect-video',
        )}
      >
        <SafeImage
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div
          className={cn(
            'pointer-events-none absolute inset-0 transition-opacity duration-300 ease-out',
            !reduceMotion && 'group-hover:opacity-0',
          )}
          style={{ backgroundImage: IMAGE_TINT_OVERLAY }}
          aria-hidden
        />
      </Link>

      <div
        className={cn(
          'flex flex-1 flex-col gap-3',
          isFeatured ? 'p-5 sm:p-6' : 'p-4 sm:p-5',
        )}
      >
        {project.domainTags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
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

        <div className="space-y-1.5">
          <h3
            className={cn(
              'font-semibold tracking-tight text-foreground',
              isFeatured ? 'text-lg sm:text-xl' : 'text-base',
            )}
          >
            <Link
              to={detailPath}
              className="outline-none transition-colors hover:text-accent focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {project.title}
            </Link>
          </h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-muted">
            {project.shortDescription}
          </p>
          {(dateRange || project.status) && (
            <div className="flex flex-wrap items-center gap-2">
              {dateRange && (
                <span className="text-xs text-muted">{dateRange}</span>
              )}
              {project.status && (
                <span className="inline-flex items-center gap-1 rounded-full border border-border px-2 py-0.5 text-[10px] text-muted">
                  <span
                    className={cn('size-1.5 rounded-full', STATUS_COLORS[project.status])}
                    aria-hidden
                  />
                  {STATUS_LABELS[project.status]}
                </span>
              )}
            </div>
          )}
        </div>

        {project.technologyTags?.length > 0 && (
          <TechPillRow
            tags={project.technologyTags}
            pillClassName="text-[11px]"
            className="pt-1"
          />
        )}

        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          <Link
            to={detailPath}
            className={cn(
              cardActionClasses,
              'border border-border text-muted hover:bg-[var(--surface-elevated)] hover:text-foreground active:brightness-95',
            )}
          >
            Read more
            <ArrowRight className="size-3.5" aria-hidden />
          </Link>
          {project.liveUrl && (
            <Button
              href={project.liveUrl}
              variant="primary"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-9 gap-1.5 px-3 py-2 text-xs"
            >
              <ExternalLink className="size-3.5" />
              Live site
            </Button>
          )}
        </div>
      </div>
    </GlareHover>
  )
}
