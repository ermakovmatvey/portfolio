import { forwardRef, useMemo, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

const ROBOTO_FLEX = '"Roboto Flex Variable", sans-serif'

function useAnimationFrame(callback) {
  useEffect(() => {
    let frameId
    const loop = () => {
      callback()
      frameId = requestAnimationFrame(loop)
    }
    frameId = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frameId)
  }, [callback])
}

function useMousePositionRef(containerRef) {
  const positionRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const updatePosition = (x, y) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect()
        positionRef.current = { x: x - rect.left, y: y - rect.top }
      } else {
        positionRef.current = { x, y }
      }
    }

    const handleMouseMove = (ev) => updatePosition(ev.clientX, ev.clientY)
    const handleTouchMove = (ev) => {
      const touch = ev.touches[0]
      updatePosition(touch.clientX, touch.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [containerRef])

  return positionRef
}

export const VariableProximity = forwardRef(function VariableProximity(props, ref) {
  const {
    label,
    fromFontVariationSettings,
    toFontVariationSettings,
    containerRef,
    radius = 50,
    falloff = 'linear',
    className = '',
    enabled = true,
    onClick,
    style,
    ...restProps
  } = props

  const letterRefs = useRef([])
  const mousePositionRef = useMousePositionRef(containerRef)
  const lastPositionRef = useRef({ x: null, y: null })

  const parsedSettings = useMemo(() => {
    const parseSettings = (settingsStr) =>
      new Map(
        settingsStr
          .split(',')
          .map((s) => s.trim())
          .map((s) => {
            const [name, value] = s.split(' ')
            return [name.replace(/['"]/g, ''), parseFloat(value)]
          }),
      )

    const fromSettings = parseSettings(fromFontVariationSettings)
    const toSettings = parseSettings(toFontVariationSettings)

    return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
      axis,
      fromValue,
      toValue: toSettings.get(axis) ?? fromValue,
    }))
  }, [fromFontVariationSettings, toFontVariationSettings])

  const calculateDistance = (x1, y1, x2, y2) =>
    Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)

  const calculateFalloff = useCallback(
    (distance) => {
      const norm = Math.min(Math.max(1 - distance / radius, 0), 1)
      switch (falloff) {
        case 'exponential':
          return norm ** 2
        case 'gaussian':
          return Math.exp(-((distance / (radius / 2)) ** 2) / 2)
        case 'linear':
        default:
          return norm
      }
    },
    [falloff, radius],
  )

  const updateLetterStyles = useCallback(() => {
    if (!enabled || !containerRef?.current) return

    const { x, y } = mousePositionRef.current
    if (lastPositionRef.current.x === x && lastPositionRef.current.y === y) {
      return
    }
    lastPositionRef.current = { x, y }

    const containerRect = containerRef.current.getBoundingClientRect()

    letterRefs.current.forEach((letterRef) => {
      if (!letterRef) return

      const rect = letterRef.getBoundingClientRect()
      const letterCenterX = rect.left + rect.width / 2 - containerRect.left
      const letterCenterY = rect.top + rect.height / 2 - containerRect.top

      const distance = calculateDistance(x, y, letterCenterX, letterCenterY)

      if (distance >= radius) {
        letterRef.style.fontVariationSettings = fromFontVariationSettings
        return
      }

      const falloffValue = calculateFalloff(distance)
      const newSettings = parsedSettings
        .map(({ axis, fromValue, toValue }) => {
          const interpolatedValue = fromValue + (toValue - fromValue) * falloffValue
          return `'${axis}' ${interpolatedValue}`
        })
        .join(', ')

      letterRef.style.fontVariationSettings = newSettings
    })
  }, [
    enabled,
    containerRef,
    mousePositionRef,
    radius,
    fromFontVariationSettings,
    parsedSettings,
    calculateFalloff,
  ])

  useAnimationFrame(updateLetterStyles)

  const words = label.split(' ')
  let letterIndex = 0

  return (
    <span
      ref={ref}
      onClick={onClick}
      style={{
        display: 'inline',
        fontFamily: ROBOTO_FLEX,
        ...style,
      }}
      className={className}
      {...restProps}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          {word.split('').map((letter) => {
            const currentLetterIndex = letterIndex++
            return (
              <motion.span
                key={currentLetterIndex}
                ref={(el) => {
                  letterRefs.current[currentLetterIndex] = el
                }}
                style={{
                  display: 'inline-block',
                  fontVariationSettings: fromFontVariationSettings,
                }}
                aria-hidden="true"
              >
                {letter}
              </motion.span>
            )
          })}
          {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
        </span>
      ))}
      <span className="sr-only">{label}</span>
    </span>
  )
})
