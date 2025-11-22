'use client'

import { useEffect } from 'react'

// Web Vitals reporting for performance monitoring
export function reportWebVitals() {
  if (typeof window !== 'undefined') {
    import('web-vitals')
      .then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
        // Log to console in development
        const logVital = (metric: { name: string; value: number; id: string }) => {
          if (process.env.NODE_ENV === 'development') {
            console.log(`[Web Vitals] ${metric.name}:`, metric.value.toFixed(2))
          }
          // In production, you could send to an analytics endpoint
          // Example: sendToAnalytics(metric)
        }

        onCLS(logVital)
        onINP(logVital)
        onFCP(logVital)
        onLCP(logVital)
        onTTFB(logVital)
      })
      .catch(() => {
        // web-vitals not available, silently fail
      })
  }
}

export default function WebVitalsReporter() {
  useEffect(() => {
    // Defer web vitals loading even more aggressively
    if ('requestIdleCallback' in window) {
      requestIdleCallback(
        () => {
          reportWebVitals()
        },
        { timeout: 5000 }
      )
    } else {
      setTimeout(() => {
        reportWebVitals()
      }, 3000)
    }
  }, [])

  return null
}
