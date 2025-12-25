'use client'

import { useEffect, useRef } from 'react'

const ANIMATION_KEY = 'hero-animation-played'

export default function HeroAnimationWrapper({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if animation has already played in this session
    const hasPlayedInSession =
      typeof window !== 'undefined' && sessionStorage.getItem(ANIMATION_KEY) === 'true'

    if (!hasPlayedInSession && containerRef.current) {
      // Mark as played in sessionStorage to persist across component remounts
      sessionStorage.setItem(ANIMATION_KEY, 'true')
      containerRef.current.classList.add('hero-animate')
    }
  }, [])

  return (
    <div ref={containerRef} className="contents">
      {children}
    </div>
  )
}
