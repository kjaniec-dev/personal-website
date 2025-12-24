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
      {/* Hero Section - Modern & Professional */}
      <div className="relative overflow-hidden">
        {/* Animated Background - Multi-layer gradient orbs */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          {/* Primary gradient orb - top right */}
          <div
            className="from-primary-500/20 via-primary-400/15 animate-float dark:from-primary-400/10 dark:via-primary-500/8 absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br to-transparent blur-3xl will-change-transform"
            style={{ animationDelay: '0s', animationDuration: '8s' }}
          />
          {/* Cyan accent orb - bottom left */}
          <div
            className="from-accent-cyan/20 via-accent-cyan/15 animate-float dark:from-accent-cyan/10 dark:via-accent-cyan/8 absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-gradient-to-tr to-transparent blur-3xl will-change-transform"
            style={{ animationDelay: '1s', animationDuration: '10s' }}
          />
          {/* Pink accent orb - center */}
          <div
            className="from-accent-pink/15 via-accent-pink/10 animate-float dark:from-accent-pink/8 dark:via-accent-pink/5 absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b to-transparent blur-3xl will-change-transform"
            style={{ animationDelay: '2s', animationDuration: '12s' }}
          />
          {/* Dot pattern overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(148_163_184/0.15)_1px,transparent_0)] bg-[size:32px_32px] dark:bg-[radial-gradient(circle_at_1px_1px,rgb(148_163_184/0.08)_1px,transparent_0)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          {/* Main Content */}
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Column - Text Content */}
            <div className="animate-fade-in space-y-8">
              {/* Greeting Badge */}
              <div
                className="border-primary-200/50 bg-primary-50/50 dark:border-primary-800/50 dark:bg-primary-900/20 inline-flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur-sm"
                style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="bg-primary-500 absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
                  <span className="bg-primary-500 relative inline-flex h-2 w-2 rounded-full"></span>
                </span>
                <span className="text-primary-700 dark:text-primary-300 text-sm font-medium">
                  Available for opportunities
                </span>
              </div>

              {/* Main Heading with Gradient */}
              <div
                className="animate-slide-up space-y-4"
                style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
              >
                <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
                  <span className="block text-gray-900 dark:text-gray-100">Hi, I'm</span>
                  <span className="gradient-text block leading-tight">{siteMetadata.author}</span>
                </h1>
                <div className="from-primary-500 via-accent-cyan to-accent-pink h-1 w-24 rounded-full bg-gradient-to-r" />
              </div>

              {/* Description */}
              <p
                className="animate-slide-up max-w-2xl text-xl leading-relaxed text-gray-600 md:text-2xl dark:text-gray-300"
                style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
              >
                {siteMetadata.description}
              </p>

              {/* CTA Buttons */}
              <div
                className="animate-slide-up flex flex-wrap items-center gap-4"
                style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
              >
                <Link
                  href="/about"
                  className="group from-primary-500 to-primary-600 shadow-primary-500/25 hover:shadow-primary-500/40 dark:from-primary-600 dark:to-primary-700 dark:shadow-primary-600/25 dark:hover:shadow-primary-600/40 relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r px-8 py-4 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                >
                  <span className="relative z-10">About Me</span>
                  <svg
                    className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1"
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
                  {/* Shine effect */}
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </Link>
                <Link
                  href="/projects"
                  className="group hover:border-primary-500 hover:text-primary-600 dark:hover:border-primary-400 dark:hover:text-primary-400 inline-flex items-center gap-2 rounded-xl border-2 border-gray-300 bg-white/50 px-8 py-4 font-semibold text-gray-900 backdrop-blur-sm transition-all hover:bg-white hover:shadow-lg dark:border-gray-600 dark:bg-gray-800/50 dark:text-gray-100 dark:hover:bg-gray-800"
                >
                  <span>View Projects</span>
                  <svg
                    className="h-5 w-5 transition-transform group-hover:translate-x-1"
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

              {/* Social Links */}
              <div
                className="animate-fade-in flex items-center gap-4"
                style={{ animationDelay: '0.5s', animationFillMode: 'both' }}
              >
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Connect:
                </span>
                <div className="flex gap-3">
                  {siteMetadata.github && (
                    <a
                      href={siteMetadata.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group hover:bg-primary-500 dark:hover:bg-primary-600 relative rounded-lg bg-gray-100 p-3 transition-all hover:scale-110 dark:bg-gray-800"
                      aria-label="GitHub"
                    >
                      <svg
                        className="h-5 w-5 text-gray-700 transition-colors group-hover:text-white dark:text-gray-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                  )}
                  {siteMetadata.linkedin && (
                    <a
                      href={siteMetadata.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group hover:bg-primary-500 dark:hover:bg-primary-600 relative rounded-lg bg-gray-100 p-3 transition-all hover:scale-110 dark:bg-gray-800"
                      aria-label="LinkedIn"
                    >
                      <svg
                        className="h-5 w-5 text-gray-700 transition-colors group-hover:text-white dark:text-gray-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  )}
                  {siteMetadata.email && (
                    <a
                      href={`mailto:${siteMetadata.email}`}
                      className="group hover:bg-primary-500 dark:hover:bg-primary-600 relative rounded-lg bg-gray-100 p-3 transition-all hover:scale-110 dark:bg-gray-800"
                      aria-label="Email"
                    >
                      <svg
                        className="h-5 w-5 text-gray-700 transition-colors group-hover:text-white dark:text-gray-300"
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

            {/* Right Column - Floating Stats Card */}
            <div
              className="animate-slide-in-right relative"
              style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
            >
              {/* Glassmorphism card with stats */}
              <div className="glass group hover:shadow-3xl relative overflow-hidden rounded-3xl border border-gray-200/50 bg-white/70 p-8 shadow-2xl backdrop-blur-xl transition-all dark:border-gray-700/50 dark:bg-gray-900/70">
                {/* Gradient overlay on hover */}
                <div className="from-primary-500/5 via-accent-cyan/5 to-accent-pink/5 absolute inset-0 -z-10 bg-gradient-to-br opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="space-y-8">
                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-6">
                    {/* Blog Posts */}
                    <div className="group/stat from-primary-50 to-primary-100/50 dark:from-primary-900/30 dark:to-primary-800/20 space-y-2 rounded-2xl bg-gradient-to-br p-6 transition-transform hover:scale-105">
                      <div className="flex items-center justify-between">
                        <svg
                          className="text-primary-500 dark:text-primary-400 h-8 w-8"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                          />
                        </svg>
                      </div>
                      <div className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                        {posts.length}
                      </div>
                      <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Blog Posts
                      </div>
                    </div>

                    {/* Years of Experience */}
                    <div className="group/stat from-accent-cyan/10 to-accent-cyan/5 dark:from-accent-cyan/20 dark:to-accent-cyan/10 space-y-2 rounded-2xl bg-gradient-to-br p-6 transition-transform hover:scale-105">
                      <div className="flex items-center justify-between">
                        <svg
                          className="text-accent-cyan dark:text-accent-cyan h-8 w-8"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div className="text-4xl font-bold text-gray-900 dark:text-gray-100">5+</div>
                      <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Years Experience
                      </div>
                    </div>

                    {/* Projects */}
                    <div className="group/stat from-accent-pink/10 to-accent-pink/5 dark:from-accent-pink/20 dark:to-accent-pink/10 space-y-2 rounded-2xl bg-gradient-to-br p-6 transition-transform hover:scale-105">
                      <div className="flex items-center justify-between">
                        <svg
                          className="text-accent-pink dark:text-accent-pink h-8 w-8"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div className="text-4xl font-bold text-gray-900 dark:text-gray-100">20+</div>
                      <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Projects Built
                      </div>
                    </div>

                    {/* Coffee Consumed */}
                    <div className="group/stat from-accent-orange/10 to-accent-orange/5 dark:from-accent-orange/20 dark:to-accent-orange/10 space-y-2 rounded-2xl bg-gradient-to-br p-6 transition-transform hover:scale-105">
                      <div className="flex items-center justify-between">
                        <svg
                          className="text-accent-orange dark:text-accent-orange h-8 w-8"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                          />
                        </svg>
                      </div>
                      <div className="text-4xl font-bold text-gray-900 dark:text-gray-100">∞</div>
                      <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Coffee Cups
                      </div>
                    </div>
                  </div>

                  {/* Quick Links */}
                  <div className="space-y-3 border-t border-gray-200 pt-6 dark:border-gray-700">
                    <h3 className="text-sm font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                      Quick Access
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <Link
                        href="/blog"
                        className="group/link hover:bg-primary-50 hover:text-primary-600 dark:hover:bg-primary-900/30 dark:hover:text-primary-400 flex items-center gap-2 rounded-lg bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 transition-all dark:bg-gray-800/50 dark:text-gray-300"
                      >
                        <svg
                          className="h-4 w-4 transition-transform group-hover/link:scale-110"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <span>Blog</span>
                      </Link>
                      <Link
                        href="/learning"
                        className="group/link hover:bg-primary-50 hover:text-primary-600 dark:hover:bg-primary-900/30 dark:hover:text-primary-400 flex items-center gap-2 rounded-lg bg-gray-50 px-4 py-3 text-sm font-medium text-gray-700 transition-all dark:bg-gray-800/50 dark:text-gray-300"
                      >
                        <svg
                          className="h-4 w-4 transition-transform group-hover/link:scale-110"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                          />
                        </svg>
                        <span>Learning</span>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Decorative corner accent */}
                <div className="from-primary-500/20 to-accent-cyan/20 absolute -top-6 -right-6 h-24 w-24 rounded-full bg-gradient-to-br blur-2xl" />
                <div className="from-accent-pink/20 to-accent-orange/20 absolute -bottom-6 -left-6 h-24 w-24 rounded-full bg-gradient-to-tr blur-2xl" />
              </div>

              {/* Floating elements around the card */}
              <div className="from-primary-500/20 to-accent-cyan/20 animate-float dark:from-primary-400/10 dark:to-accent-cyan/10 pointer-events-none absolute top-1/4 -left-4 h-16 w-16 rounded-lg bg-gradient-to-br blur-xl" />
              <div
                className="from-accent-pink/20 to-accent-orange/20 animate-float dark:from-accent-pink/10 dark:to-accent-orange/10 pointer-events-none absolute -right-4 bottom-1/4 h-20 w-20 rounded-lg bg-gradient-to-bl blur-xl"
                style={{ animationDelay: '1.5s' }}
              />
            </div>
          </div>

          {/* Scroll Indicator */}
          <div
            className="animate-fade-in mt-16 flex justify-center"
            style={{ animationDelay: '0.6s', animationFillMode: 'both' }}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
                Scroll to explore
              </span>
              <div className="flex h-12 w-7 items-start justify-center rounded-full border-2 border-gray-300 p-1.5 dark:border-gray-600">
                <div className="bg-primary-500 dark:bg-primary-400 h-2 w-1.5 animate-pulse rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

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
