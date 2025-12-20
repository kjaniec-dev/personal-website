'use client'

import dynamic from 'next/dynamic'

// Lazy load newsletter form - not critical for initial render
const NewsletterForm = dynamic(() => import('pliny/ui/NewsletterForm'), {
  loading: () => (
    <div className="h-12 w-full max-w-md animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
  ),
  ssr: false,
})

export default function NewsletterSection() {
  return (
    <div className="mt-16 flex items-center justify-center">
      <div className="w-full max-w-xl rounded-2xl border border-gray-200 bg-gray-50/50 p-8 dark:border-gray-700 dark:bg-gray-900/50">
        <h3 className="mb-4 text-center text-2xl font-bold text-gray-900 dark:text-gray-100">
          Subscribe to the newsletter
        </h3>
        <p className="mb-6 text-center text-gray-600 dark:text-gray-400">
          Get notified when I publish new content. No spam, unsubscribe anytime.
        </p>
        <NewsletterForm />
      </div>
    </div>
  )
}
