'use client'

import { SearchConfig } from 'pliny/search'
import { ReactNode, Suspense, useEffect, useState } from 'react'

interface SearchProviderWrapperProps {
  searchConfig: SearchConfig
  children: ReactNode
}

export default function SearchProviderWrapper({
  searchConfig,
  children,
}: SearchProviderWrapperProps) {
  const [SearchProvider, setSearchProvider] = useState<React.ComponentType<{
    children: ReactNode
  }> | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Defer loading search provider until after initial page load
    const loadSearchProvider = async () => {
      const { SearchProvider: SP } = await import('./SearchProvider')
      setSearchProvider(() => SP)
      setIsLoaded(true)
    }

    // Load search provider when browser is idle
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => loadSearchProvider(), { timeout: 2000 })
    } else {
      setTimeout(() => loadSearchProvider(), 1000)
    }
  }, [])

  // Render children immediately, wrap with search provider once loaded
  if (!isLoaded || !SearchProvider) {
    return <>{children}</>
  }

  return (
    <Suspense fallback={<>{children}</>}>
      <SearchProvider>{children}</SearchProvider>
    </Suspense>
  )
}
