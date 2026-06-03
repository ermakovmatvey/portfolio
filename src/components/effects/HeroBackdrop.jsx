import { useReducedMotion } from 'framer-motion'
import LightPillar from './LightPillar'

export function HeroBackdrop({ children }) {
  const reduceMotion = useReducedMotion()

  return (
    <div className="relative isolate overflow-hidden">
      {!reduceMotion && (
        <LightPillar
          className="pointer-events-none -z-10"
          topColor="#6366F1"
          bottomColor="#7C3AED"
          intensity={0.6}
          rotationSpeed={0.1}
          glowAmount={0.002}
          pillarWidth={1}
          pillarHeight={0.2}
          noiseIntensity={0.5}
          pillarRotation={19}
          interactive={false}
          mixBlendMode="screen"
          quality="medium"
        />
      )}
      {children}
    </div>
  )
}
