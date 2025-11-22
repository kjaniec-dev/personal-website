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
    // Defer analytics loading until browser is idle
    if ('requestIdleCallback' in window) {
      requestIdleCallback(
        () => {
          setShouldLoad(true)
        },
        { timeout: 2000 }
      )
    } else {
      setTimeout(() => {
        setShouldLoad(true)
      }, 1500)
    }
  }, [])

  if (!shouldLoad) {
    return null
  }

  return <Analytics analyticsConfig={analyticsConfig} />
}
