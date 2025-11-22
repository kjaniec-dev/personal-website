'use client'

import { useState, useEffect, ComponentType } from 'react'
import siteMetadata from '@/data/siteMetadata'

const SearchButton = () => {
  const [SearchButtonComponent, setSearchButtonComponent] = useState<ComponentType<{
    'aria-label': string
    children: React.ReactNode
  }> | null>(null)

  useEffect(() => {
    // Only load search button component when component mounts
    if (
      siteMetadata.search &&
      (siteMetadata.search.provider === 'algolia' || siteMetadata.search.provider === 'kbar')
    ) {
      const loadSearchButton = async () => {
        if (siteMetadata.search?.provider === 'algolia') {
          const { AlgoliaButton } = await import('pliny/search/AlgoliaButton')
          setSearchButtonComponent(() => AlgoliaButton)
        } else if (siteMetadata.search?.provider === 'kbar') {
          const { KBarButton } = await import('pliny/search/KBarButton')
          setSearchButtonComponent(() => KBarButton)
        }
      }

      // Defer loading until browser is idle
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => loadSearchButton())
      } else {
        setTimeout(() => loadSearchButton(), 1)
      }
    }
  }, [])

  if (!SearchButtonComponent) {
    // Show placeholder button while loading
    return (
      <button
        aria-label="Search"
        className="hover:text-primary-500 dark:hover:text-primary-400 text-gray-900 dark:text-gray-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </button>
    )
  }

  return (
    <SearchButtonComponent aria-label="Search">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="hover:text-primary-500 dark:hover:text-primary-400 h-6 w-6 text-gray-900 dark:text-gray-100"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
    </SearchButtonComponent>
  )
}

export default SearchButton
