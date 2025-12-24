'use client'

import { useState, useEffect, ComponentType } from 'react'
import siteMetadata from '@/data/siteMetadata'

const SearchButton = () => {
  const [SearchButtonComponent, setSearchButtonComponent] = useState<ComponentType<{
    'aria-label': string
    children: React.ReactNode
  }> | null>(null)
  const [isMac, setIsMac] = useState(false)

  useEffect(() => {
    // Detect if user is on Mac
    setIsMac(navigator.platform.toUpperCase().indexOf('MAC') >= 0)

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

  const SearchContent = () => (
    <div className="group hover:border-primary-300 hover:bg-primary-50/80 dark:hover:border-primary-700 dark:hover:bg-primary-900/30 relative inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50/50 px-4 py-2 backdrop-blur-sm transition-all duration-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800/50">
      {/* Search icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="group-hover:text-primary-600 dark:group-hover:text-primary-400 h-4 w-4 text-gray-600 transition-colors duration-300 dark:text-gray-400"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>

      {/* Search text */}
      <span className="group-hover:text-primary-700 dark:group-hover:text-primary-300 hidden text-sm font-medium text-gray-600 transition-colors duration-300 sm:inline-block dark:text-gray-400">
        Search
      </span>

      {/* Keyboard shortcut */}
      <kbd className="group-hover:border-primary-400 group-hover:bg-primary-50 group-hover:text-primary-700 dark:group-hover:border-primary-600 dark:group-hover:bg-primary-900 dark:group-hover:text-primary-300 hidden items-center gap-0.5 rounded border border-gray-300 bg-white px-1.5 py-0.5 font-mono text-xs font-medium text-gray-500 shadow-sm transition-all duration-300 lg:inline-flex dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400">
        {isMac ? '⌘' : 'Ctrl'}K
      </kbd>
    </div>
  )

  if (!SearchButtonComponent) {
    // Show placeholder button while loading
    return (
      <button aria-label="Search" className="cursor-pointer">
        <SearchContent />
      </button>
    )
  }

  return (
    <SearchButtonComponent aria-label="Search">
      <SearchContent />
    </SearchButtonComponent>
  )
}

export default SearchButton
