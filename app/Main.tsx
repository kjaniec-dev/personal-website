import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'
import Hero from '@/components/Hero'
import './layout.css'

const MAX_DISPLAY = 4

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
      <Hero />

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
            const { slug, date, title, summary, tags, readingTime } = post
            return (
              <article
                key={slug}
                className="hover-lift group relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-900"
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
                    {readingTime && (
                      <>
                        <span>•</span>
                        <span>{readingTime.text}</span>
                      </>
                    )}
                  </div>

                  <h3 className="text-xl leading-tight font-bold tracking-tight">
                    <Link
                      href={`/blog/${slug}`}
                      prefetch={false}
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
                    prefetch={false}
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 w-fit self-start font-medium"
                    aria-label={`Read more: "${title}"`}
                  >
                    <span className="animated-underline whitespace-nowrap">
                      Read more<span className="sr-only">: {title}</span>
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
          <div className="w-full max-w-xl rounded-2xl border border-gray-200 bg-gray-50 p-8 shadow-sm dark:border-gray-700 dark:bg-gray-900">
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
