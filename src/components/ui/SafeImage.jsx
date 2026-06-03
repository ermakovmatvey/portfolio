import { useEffect, useState } from 'react'
import { cn } from '../../lib/cn'
import { publicUrl } from '../../lib/publicUrl'

export const IMAGE_PLACEHOLDER = '/images/placeholder.svg'

function resolveSrc(src) {
  return publicUrl(src || IMAGE_PLACEHOLDER)
}

export function SafeImage({ src, alt, className, onError, ...props }) {
  const [currentSrc, setCurrentSrc] = useState(() => resolveSrc(src))

  useEffect(() => {
    setCurrentSrc(resolveSrc(src))
  }, [src])

  const handleError = (event) => {
    if (currentSrc !== resolveSrc(IMAGE_PLACEHOLDER)) {
      setCurrentSrc(resolveSrc(IMAGE_PLACEHOLDER))
    }
    onError?.(event)
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={cn(className)}
      onError={handleError}
      {...props}
    />
  )
}
