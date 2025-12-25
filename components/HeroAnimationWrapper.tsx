'use client'

import { useEffect, useRef } from 'react'

const ANIMATION_KEY = 'hero-animation-played'

export default function HeroAnimationWrapper({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Check if animation has already played in this session
    const hasPlayedInSession =
      typeof window !== 'undefined' && sessionStorage.getItem(ANIMATION_KEY) === 'true'

    if (hasPlayedInSession) {
      // Skip animation, show content immediately
      containerRef.current.classList.add('hero-animate-skip')
    } else {
      // Play animation and mark as played
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
