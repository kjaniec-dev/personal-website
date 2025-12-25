'use client'

import { useEffect, useRef } from 'react'

export default function HeroAnimationWrapper({ children }: { children: React.ReactNode }) {
  const hasAnimated = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!hasAnimated.current && containerRef.current) {
      hasAnimated.current = true
      containerRef.current.classList.add('hero-animate')
    }
  }, [])

  return (
    <div ref={containerRef} className="contents">
      {children}
    </div>
  )
}
