import { useEffect, useState } from 'react'
import { cn } from '../../lib/cn'

export const IMAGE_PLACEHOLDER = '/images/placeholder.svg'

export function SafeImage({ src, alt, className, onError, ...props }) {
  const [currentSrc, setCurrentSrc] = useState(src || IMAGE_PLACEHOLDER)

  useEffect(() => {
    setCurrentSrc(src || IMAGE_PLACEHOLDER)
  }, [src])

  const handleError = (event) => {
    if (currentSrc !== IMAGE_PLACEHOLDER) {
      setCurrentSrc(IMAGE_PLACEHOLDER)
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
