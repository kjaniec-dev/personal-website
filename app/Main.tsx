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
      {/* Hero Section - Professional & Modern */}
      <section className="relative overflow-hidden border-b border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-950">
        {/* Subtle Background Gradient */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:64px_64px]" />
          <div className="from-primary-500/5 absolute top-0 left-0 h-full w-1/2 bg-gradient-to-br via-transparent to-transparent" />
          <div className="from-accent-cyan/5 absolute right-0 bottom-0 h-full w-1/2 bg-gradient-to-tl via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-4xl">
            {/* Main Content */}
            <div className="space-y-10">
              {/* Header */}
              <div className="space-y-8">
                <div
                  className="animate-fade-in border-primary-500/20 bg-primary-50/50 text-primary-700 dark:border-primary-500/30 dark:bg-primary-900/20 dark:text-primary-300 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium"
                  style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="bg-primary-500 absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
                    <span className="bg-primary-500 relative inline-flex h-2 w-2 rounded-full"></span>
                  </span>
                  Open to new opportunities
                </div>

                <div
                  className="animate-slide-up space-y-6"
                  style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
                >
                  <h1 className="text-5xl leading-tight font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl dark:text-white">
                    {siteMetadata.author}
                  </h1>
                  <p className="text-2xl leading-relaxed font-medium text-gray-600 dark:text-gray-400">
                    {siteMetadata.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div
                className="animate-fade-in flex flex-wrap items-center gap-4"
                style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
              >
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
                >
                  <span>About me</span>
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
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
                <Link
                  href="/projects"
                  className="group inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-transparent px-6 py-3 text-sm font-semibold text-gray-900 transition-all hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-900"
                >
                  <span>View projects</span>
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
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
                <Link
                  href="/blog"
                  className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                >
                  <span>Read blog</span>
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
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

              {/* Stats Row */}
              <div
                className="animate-slide-up grid grid-cols-2 gap-8 border-t border-gray-200 pt-10 sm:grid-cols-4 dark:border-gray-800"
                style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
              >
                <div className="space-y-1">
                  <div className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {posts.length}
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Articles
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                    5+
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Years Exp.
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                    20+
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Projects
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                    ∞
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400">Coffee</div>
                </div>
              </div>

              {/* Social Links */}
              <div
                className="animate-fade-in flex items-center gap-4 border-t border-gray-200 pt-8 dark:border-gray-800"
                style={{ animationDelay: '0.5s', animationFillMode: 'both' }}
              >
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Connect
                </span>
                <div className="flex gap-2">
                  {siteMetadata.github && (
                    <a
                      href={siteMetadata.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white"
                      aria-label="GitHub"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                  )}
                  {siteMetadata.linkedin && (
                    <a
                      href={siteMetadata.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white"
                      aria-label="LinkedIn"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  )}
                  {siteMetadata.email && (
                    <a
                      href={`mailto:${siteMetadata.email}`}
                      className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white"
                      aria-label="Email"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <div className="mt-12 space-y-8 md:mt-16">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Latest Posts
          </h2>
          {posts.length > MAX_DISPLAY && (
            <Link
              href="/blog"
              className="animated-underline text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            >
              View all posts →
            </Link>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {!posts.length && <p className="text-gray-500 dark:text-gray-400">No posts found.</p>}
          {posts.slice(0, MAX_DISPLAY).map((post, index) => {
            const { slug, date, title, summary, tags } = post
            return (
              <article
                key={slug}
                className="hover-lift group relative rounded-2xl border border-gray-200/80 bg-white p-6 transition-all dark:border-gray-700/80 dark:bg-gray-900/50"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'both',
                }}
              >
                {/* Gradient border on hover */}
                <div className="from-primary-500/0 via-primary-500/0 to-accent-cyan/0 group-hover:from-primary-500/20 group-hover:to-accent-cyan/20 absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r opacity-0 blur-sm transition-opacity group-hover:opacity-100" />

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                    <time dateTime={date} className="flex items-center gap-1">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {formatDate(date, siteMetadata.locale)}
                    </time>
                  </div>

                  <h3 className="text-xl leading-tight font-bold tracking-tight">
                    <Link
                      href={`/blog/${slug}`}
                      className="hover:text-primary-500 dark:hover:text-primary-400 text-gray-900 transition-colors dark:text-gray-100"
                    >
                      {title}
                    </Link>
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </div>

                  <p className="line-clamp-3 text-gray-600 dark:text-gray-400">{summary}</p>
                  <Link
                    href={`/blog/${slug}`}
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 w-fit self-start font-medium"
                    aria-label={`Read more: "${title}"`}
                  >
                    <span className="animated-underline whitespace-nowrap">
                      Read more
                      <svg
                        className="ml-1 inline-block h-4 w-4 align-middle transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </div>

      {siteMetadata.newsletter?.provider && (
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
      )}
    </>
  )
}
