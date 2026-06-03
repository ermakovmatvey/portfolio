export function formatProjectDate(dateStr) {
  if (!dateStr) return null
  const [year, month] = dateStr.split('-')
  const date = new Date(Number(year), Number(month) - 1)
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
}

export function formatProjectDateRange(project) {
  const start = formatProjectDate(project.dateStarted)
  if (!start) return null
  if (project.status === 'completed' || project.status === 'archived') {
    const end = formatProjectDate(project.dateUpdated)
    return end && end !== start ? `${start} — ${end}` : start
  }
  return start
}
