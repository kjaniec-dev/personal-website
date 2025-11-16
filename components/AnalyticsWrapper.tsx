'use client'

import dynamic from 'next/dynamic'
import { AnalyticsConfig } from 'pliny/analytics'
import { useEffect, useState } from 'react'

const Analytics = dynamic(() => import('pliny/analytics').then((mod) => mod.Analytics), {
  ssr: false,
  loading: () => null,
})

interface AnalyticsWrapperProps {
  analyticsConfig: AnalyticsConfig
}

export default function AnalyticsWrapper({ analyticsConfig }: AnalyticsWrapperProps) {
  const [shouldLoad, setShouldLoad] = useState(false)

  useEffect(() => {
    // Defer analytics loading until after initial page load
    const timer = setTimeout(() => {
      setShouldLoad(true)
    }, 1000) // Load analytics after 1 second

    return () => clearTimeout(timer)
  }, [])

  if (!shouldLoad) {
    return null
  }

  return <Analytics analyticsConfig={analyticsConfig} />
}
