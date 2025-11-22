'use client'

import dynamic from 'next/dynamic'
import { SearchConfig } from 'pliny/search'
import { ReactNode, Suspense } from 'react'

const SearchProvider = dynamic(() => import('./SearchProvider').then((mod) => mod.SearchProvider), {
  ssr: false,
  loading: () => null,
})

interface SearchProviderWrapperProps {
  searchConfig: SearchConfig
  children: ReactNode
}

export default function SearchProviderWrapper({
  searchConfig,
  children,
}: SearchProviderWrapperProps) {
  return (
    <Suspense fallback={<>{children}</>}>
      <SearchProvider>{children}</SearchProvider>
    </Suspense>
  )
}
