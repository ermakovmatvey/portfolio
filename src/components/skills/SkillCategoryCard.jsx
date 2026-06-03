import { TechPill } from '../projects/TechPill'

export function SkillCategoryCard({ category }) {
  return (
    <article className="surface-card-interactive flex h-full flex-col p-5 sm:p-6">
      <h3 className="text-sm font-medium tracking-wide text-foreground">
        {category.title}
      </h3>
      <ul className="mt-4 flex flex-1 flex-wrap gap-2" role="list">
        {category.skills.map((skill) => (
          <li key={skill}>
            <TechPill>{skill}</TechPill>
          </li>
        ))}
      </ul>
    </article>
  )
}
