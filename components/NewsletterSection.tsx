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
    <section className="py-20">
      <div className="card-architect relative overflow-hidden p-10 md:p-16">
        {/* Decorative gradient */}
        <div className="from-accent-500/5 to-primary-500/5 absolute inset-0 bg-gradient-to-br via-transparent" />

        {/* Decorative shapes */}
        <div className="bg-accent-500/10 absolute -top-16 -right-16 h-48 w-48 rounded-full blur-3xl" />
        <div className="bg-primary-500/10 absolute -bottom-16 -left-16 h-48 w-48 rounded-full blur-3xl" />

        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="bg-accent-500 h-px w-8" />
            <span className="text-accent-600 dark:text-accent-400 text-sm font-semibold tracking-widest uppercase">
              Stay Updated
            </span>
            <div className="bg-accent-500 h-px w-8" />
          </div>

          <h3 className="font-display text-3xl font-bold tracking-tight text-gray-900 md:text-4xl dark:text-white">
            Subscribe to the Newsletter
          </h3>

          <p className="mx-auto mt-4 max-w-lg text-gray-600 dark:text-gray-300">
            Get notified when I publish new content. No spam, unsubscribe anytime.
          </p>

          <div className="mt-8">
            <NewsletterForm />
          </div>
        </div>
      </div>
    </section>
  )
}
