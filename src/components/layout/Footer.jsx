import { Container } from '../ui/Container'
import { SITE } from '../../lib/constants'

export function Footer() {
  return (
    <footer className="border-t border-border">
      <Container className="py-8 sm:py-10">
        <p className="text-sm font-semibold tracking-tight text-foreground">
          {SITE.name}
        </p>
        <p className="mt-6 text-sm text-muted">
          &copy; {SITE.year} {SITE.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  )
}
