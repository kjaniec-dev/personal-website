import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'

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
      {/* Hero Section */}
      <div className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        {/* Background Elements */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          {/* Gradient orbs */}
          <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 transform">
            <div className="h-96 w-96 rounded-full bg-primary-500/10 blur-3xl dark:bg-primary-500/5" />
          </div>
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 transform">
            <div className="h-96 w-96 rounded-full bg-accent-teal/10 blur-3xl dark:bg-accent-teal/5" />
          </div>
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px]" />
        </div>

        <div className="mx-auto max-w-5xl">
          {/* Breadcrumb / Role indicator */}
          <div className="animate-fade-in mb-8 inline-flex items-center gap-2.5 rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/80 dark:text-gray-300">
            <span className="mono-accent text-primary-600 dark:text-primary-400">$</span>
            <span>Software Engineer • 12 Years Experience</span>
            <div className="h-2 w-2 animate-pulse rounded-full bg-primary-500" />
          </div>

          {/* Main Content */}
          <div className="animate-slide-up space-y-8">
            {/* Heading */}
            <div className="space-y-6">
              <h1 className="text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
                <span className="block text-gray-900 dark:text-white">
                  Hi, I'm
                </span>
                <span className="gradient-text relative mt-2 block">
                  {siteMetadata.author}
                  {/* Decorative element */}
                  <svg
                    className="absolute -left-8 -top-6 hidden h-12 w-12 text-primary-200 dark:text-primary-900 sm:block"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M11 3.055V5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M15.488 18.512a2 2 0 01-2.828 0l-1.848-1.848a2 2 0 010-2.828l5.196-5.196a2 2 0 012.828 0l1.848 1.848a2 2 0 010 2.828l-5.196 5.196z" />
                  </svg>
                </span>
              </h1>

              <p className="max-w-2xl text-xl leading-relaxed text-gray-600 sm:text-2xl dark:text-gray-300">
                {siteMetadata.description}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/about"
                className="btn-primary group inline-flex items-center gap-2.5 text-base"
              >
                <span>About Me</span>
                <svg
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2.5 rounded-xl border-2 border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-900 shadow-sm transition-all hover:border-primary-400 hover:bg-gray-50 hover:shadow dark:border-gray-600 dark:bg-gray-900/50 dark:text-gray-100 dark:hover:border-primary-500 dark:hover:bg-gray-800/50"
              >
                <span>View Projects</span>
                <svg
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Posts Section */}
      <div className="mt-20 space-y-10 md:mt-32">
        {/* Section Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-1.5 rounded-full bg-gradient-to-b from-primary-500 to-primary-600" />
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                Latest Articles
              </h2>
            </div>
            <p className="text-base text-gray-600 dark:text-gray-400">
              Thoughts on software development, architecture, and best practices
            </p>
          </div>
          {posts.length > MAX_DISPLAY && (
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 rounded-lg bg-gray-100 px-5 py-2.5 text-sm font-semibold text-gray-900 transition-all hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
            >
              View all articles
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          )}
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {!posts.length && <p className="text-gray-500 dark:text-gray-400">No posts found.</p>}
          {posts.slice(0, MAX_DISPLAY).map((post, index) => {
            const { slug, date, title, summary, tags } = post
            return (
              <article
                key={slug}
                className="card-premium group flex flex-col"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'both',
                }}
              >
                <div className="flex-1 space-y-4">
                  {/* Date */}
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold leading-tight tracking-tight">
                    <Link
                      href={`/blog/${slug}`}
                      className="text-gray-900 transition-colors hover:text-primary-600 dark:text-gray-100 dark:hover:text-primary-400"
                    >
                      {title}
                    </Link>
                  </h3>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {tags.slice(0, 3).map((tag) => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </div>

                  {/* Summary */}
                  <p className="line-clamp-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {summary}
                  </p>
                </div>

                {/* Read more link */}
                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                  <Link
                    href={`/blog/${slug}`}
                    className="group/link inline-flex items-center gap-1 text-sm font-medium text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
                    aria-label={`Read more: "${title}"`}
                  >
                    Read article
                    <svg
                      className="h-4 w-4 transition-transform group-hover/link:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </div>

      {siteMetadata.newsletter?.provider && (
        <div className="mt-20 flex items-center justify-center">
          <div className="w-full max-w-xl card-modern">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <svg className="h-6 w-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Subscribe to the newsletter
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Get notified when I publish new content. No spam, unsubscribe anytime.
              </p>
              <NewsletterForm />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
