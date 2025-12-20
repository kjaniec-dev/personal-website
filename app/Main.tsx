import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import dynamic from 'next/dynamic'

// Lazy load newsletter form - not critical for initial render
const NewsletterForm = dynamic(() => import('pliny/ui/NewsletterForm'), {
  loading: () => (
    <div className="h-12 w-full max-w-md animate-pulse rounded-lg bg-gray-200 dark:bg-gray-700" />
  ),
  ssr: false,
})

const MAX_DISPLAY = 6

export default function Home({ posts }) {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteMetadata.author,
    url: siteMetadata.siteUrl,
    sameAs: [siteMetadata.github, siteMetadata.linkedin].filter(Boolean),
    jobTitle: 'Software Engineer',
    description: siteMetadata.description,
    image: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteMetadata.title,
    url: siteMetadata.siteUrl,
    description: siteMetadata.description,
    author: {
      '@type': 'Person',
      name: siteMetadata.author,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteMetadata.siteUrl}/tags/{search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* Hero Section - Editorial Style */}
      <section className="relative py-20 md:py-32 lg:py-40">
        {/* Decorative Elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Geometric shapes */}
          <div className="border-accent-300/30 dark:border-accent-600/20 absolute top-20 right-10 h-32 w-32 rotate-12 rounded-3xl border" />
          <div className="border-primary-300/30 dark:border-primary-600/20 absolute bottom-20 left-10 h-24 w-24 -rotate-12 rounded-2xl border" />
          <div className="bg-accent-500/60 absolute top-1/2 right-1/4 h-2 w-2 rounded-full" />
          <div className="bg-primary-500/40 absolute top-1/3 left-1/3 h-3 w-3 rounded-full" />
        </div>

        <div className="relative">
          {/* Status Badge */}
          <div className="animate-fade-in mb-8 flex items-center justify-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-gray-200 bg-white/80 px-5 py-2.5 shadow-sm backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/80">
              <span className="relative flex h-2.5 w-2.5">
                <span className="bg-accent-400 absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
                <span className="bg-accent-500 relative inline-flex h-2.5 w-2.5 rounded-full"></span>
              </span>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Available for opportunities
              </span>
            </div>
          </div>

          {/* Main Headline - LCP element, must be visible immediately */}
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-display text-5xl leading-[1.1] font-bold tracking-tight text-gray-900 sm:text-6xl md:text-7xl lg:text-8xl dark:text-white">
              <span className="block">Crafting Digital</span>
              <span className="text-accent-500 mt-2 block">Experiences</span>
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-gray-600 md:text-xl dark:text-gray-300">
              {siteMetadata.description}
            </p>

            {/* Author signature */}
            <div className="mt-10 flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-gray-300 dark:to-gray-700" />
              <span className="font-display text-lg font-semibold text-gray-900 dark:text-white">
                {siteMetadata.author}
              </span>
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-gray-300 dark:to-gray-700" />
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/about"
              className="group from-accent-500 to-primary-500 shadow-accent-500/25 hover:shadow-accent-500/30 relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r px-8 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:shadow-2xl"
            >
              <span className="relative z-10">About Me</span>
              <svg
                className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <div className="from-accent-400 to-primary-400 absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </Link>

            <Link
              href="/projects"
              className="group hover:border-accent-400 hover:bg-accent-50 hover:text-accent-700 dark:hover:border-accent-500 dark:hover:bg-accent-950 dark:hover:text-accent-300 inline-flex items-center gap-2 rounded-xl border-2 border-gray-300 bg-white/80 px-8 py-4 font-semibold text-gray-700 backdrop-blur-sm transition-all duration-300 dark:border-gray-700 dark:bg-gray-900/80 dark:text-gray-200"
            >
              <span>View Projects</span>
              <svg
                className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </Link>
          </div>

          {/* Scroll indicator */}
          <div className="mt-20 flex justify-center">
            <div className="flex flex-col items-center gap-2 text-gray-400 dark:text-gray-500">
              <span className="text-xs font-medium tracking-widest uppercase">
                Scroll to explore
              </span>
              <div className="h-12 w-px bg-gradient-to-b from-gray-300 to-transparent dark:from-gray-600" />
            </div>
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="py-20">
        {/* Section Header */}
        <div className="mb-16 flex items-end justify-between">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="bg-accent-500 h-px w-8" />
              <span className="text-accent-600 dark:text-accent-400 text-sm font-semibold tracking-widest uppercase">
                Latest Articles
              </span>
            </div>
            <h2 className="font-display text-4xl font-bold tracking-tight text-gray-900 md:text-5xl dark:text-white">
              From the Blog
            </h2>
          </div>

          {posts.length > MAX_DISPLAY && (
            <Link
              href="/blog"
              className="group hover:text-accent-600 dark:hover:text-accent-400 hidden items-center gap-2 text-sm font-semibold text-gray-600 transition-colors sm:inline-flex dark:text-gray-400"
            >
              View all articles
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          )}
        </div>

        {/* Posts Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {!posts.length && (
            <p className="col-span-2 text-center text-gray-500 dark:text-gray-400">
              No posts found.
            </p>
          )}

          {posts.slice(0, MAX_DISPLAY).map((post, index) => {
            const { slug, date, title, summary, tags } = post
            const isFeature = index === 0

            return (
              <article
                key={slug}
                className={`card-architect group relative p-8 ${isFeature ? 'md:col-span-2' : ''}`}
              >
                {/* Card number */}
                <div className="font-display absolute top-6 right-6 text-6xl font-bold text-gray-100 dark:text-gray-800/50">
                  {String(index + 1).padStart(2, '0')}
                </div>

                <div className="relative z-10 space-y-5">
                  {/* Meta info */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <time dateTime={date} className="font-medium">
                      {formatDate(date, siteMetadata.locale)}
                    </time>
                    <span className="h-1 w-1 rounded-full bg-gray-400 dark:bg-gray-600" />
                    <span>{tags.length} topics</span>
                  </div>

                  {/* Title */}
                  <h3
                    className={`font-display leading-tight font-bold tracking-tight ${isFeature ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'}`}
                  >
                    <Link
                      href={`/blog/${slug}`}
                      className="hover:text-accent-600 dark:hover:text-accent-400 text-gray-900 transition-colors duration-300 dark:text-white"
                    >
                      {title}
                    </Link>
                  </h3>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {tags.slice(0, 4).map((tag) => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </div>

                  {/* Summary */}
                  <p
                    className={`text-gray-600 dark:text-gray-300 ${isFeature ? 'text-lg' : 'line-clamp-3'}`}
                  >
                    {summary}
                  </p>

                  {/* Read more link */}
                  <Link
                    href={`/blog/${slug}`}
                    className="group/link text-accent-600 dark:text-accent-400 inline-flex items-center gap-2 pt-2 text-sm font-semibold transition-all duration-300 hover:gap-3"
                    aria-label={`Read more: "${title}"`}
                  >
                    <span>Read article</span>
                    <svg
                      className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            )
          })}
        </div>

        {/* Mobile view all link */}
        {posts.length > MAX_DISPLAY && (
          <div className="mt-12 flex justify-center sm:hidden">
            <Link
              href="/blog"
              className="hover:border-accent-500 hover:text-accent-600 dark:hover:border-accent-500 dark:hover:text-accent-400 inline-flex items-center gap-2 rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-all dark:border-gray-700 dark:text-gray-300"
            >
              View all articles
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        )}
      </section>

      {/* Newsletter Section */}
      {siteMetadata.newsletter?.provider && (
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
      )}
    </>
  )
}
