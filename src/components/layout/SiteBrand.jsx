import { SITE } from '../../lib/constants'
import { cn } from '../../lib/cn'
import { publicUrl } from '../../lib/publicUrl'

function brandNameWithFavicon(fullName) {
  const space = fullName.indexOf(' ')
  const firstWord = space === -1 ? fullName : fullName.slice(0, space)
  const rest = space === -1 ? '' : fullName.slice(space)

  if (!firstWord.startsWith('M')) {
    return { suffix: fullName, showFavicon: false }
  }

  return { suffix: firstWord.slice(1) + rest, showFavicon: true }
}

const brand = brandNameWithFavicon(SITE.name)

export function SiteBrand({ className }) {
  return (
    <span className={cn('inline-flex items-center', className)}>
      {brand.showFavicon && (
        <img
          src={publicUrl('/favicon.svg')}
          alt=""
          className="h-[1.2em] w-[1.2em] shrink-0"
          width={24}
          height={24}
          decoding="async"
          aria-hidden
        />
      )}
      <span>{brand.showFavicon ? brand.suffix : SITE.name}</span>
    </span>
  )
}
