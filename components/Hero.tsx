import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import HeroAnimationWrapper from '@/components/HeroAnimationWrapper'

export default function Hero() {
  return (
    <HeroAnimationWrapper>
      <section className="relative flex min-h-[64vh] items-center overflow-hidden">
        {/* Subtle background texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.015] dark:opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Main content container */}
        <div className="mx-auto w-full max-w-7xl py-2">
          <div className="grid grid-cols-1 items-center gap-12 xl:grid-cols-12 xl:gap-22">
            {/* Left column - Main content */}
            <div className="space-y-8 lg:col-span-7">
              {/* Main heading */}
              <div className="space-y-6">
                <h1 className="hero-title-reveal font-serif text-6xl leading-[0.95] font-bold tracking-tight text-gray-900 sm:text-7xl lg:text-8xl dark:text-gray-100">
                  Building
                  <br />
                  <span className="italic">tomorrow's</span>
                  <br />
                  software
                </h1>

                {/* Accent line with gradient */}
                <div className="hero-accent-line from-primary-500 to-accent-cyan h-[3px] rounded-full bg-gradient-to-r" />
              </div>

              {/* Subtitle */}
              <div className="hero-subtitle-reveal max-w-xl space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-xl leading-relaxed font-medium text-gray-900 sm:text-2xl dark:text-gray-100">
                    {siteMetadata.author}
                  </p>
                  {/* Badge - Available for opportunities */}
                  <div className="border-primary-200 bg-primary-50/80 dark:border-primary-800 dark:bg-primary-900/80 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 backdrop-blur-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="bg-primary-500 absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
                      <span className="bg-primary-500 relative inline-flex h-2 w-2 rounded-full"></span>
                    </span>
                    <span className="text-primary-700 dark:text-primary-300 text-xs font-medium tracking-wide">
                      Available for opportunities
                    </span>
                  </div>
                </div>
                <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                  {siteMetadata.description}
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="hero-cta-reveal flex flex-wrap gap-4 pt-4">
                <Link
                  href="/about"
                  className="group bg-primary-500 hover:bg-primary-600 hover:shadow-primary-500/30 relative inline-flex items-center gap-2 overflow-hidden rounded-full px-8 py-4 font-medium text-white transition-all duration-300 hover:shadow-lg"
                >
                  <span className="relative z-10">Explore my work</span>
                  <svg
                    className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>

                  {/* Hover effect */}
                  <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-[100%]" />
                </Link>

                <Link
                  href="/blog"
                  className="group inline-flex items-center gap-2 rounded-full border-2 border-gray-900 px-8 py-4 font-medium text-gray-900 transition-all duration-300 hover:bg-gray-900 hover:text-white dark:border-gray-100 dark:text-gray-100 dark:hover:bg-gray-100 dark:hover:text-gray-900"
                >
                  <span>Read insights</span>
                  <svg
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right column - Stats or feature highlight */}
            <div className="hero-description-reveal space-y-8 lg:col-span-5">
              {/* Feature card */}
              <div className="border-primary-100 from-primary-50 dark:border-primary-900/50 dark:from-primary-950/50 relative rounded-2xl border bg-gradient-to-br to-white p-8 shadow-md backdrop-blur-sm dark:to-gray-900">
                {/* Top accent */}
                <div className="from-primary-500 to-accent-cyan absolute top-0 left-8 h-1 w-12 rounded-b-full bg-gradient-to-r" />

                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-primary-600 dark:text-primary-400 text-lg font-semibold tracking-[0.1em] uppercase">
                      Featured Areas
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        title: 'Full-Stack Development',
                        desc: 'Frontend, Backend, APIs & Databases',
                      },
                      { title: 'System Architecture', desc: 'Scalable & maintainable solutions' },
                      {
                        title: 'DevOps & Infrastructure',
                        desc: 'CI/CD, Cloud deployment & monitoring',
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="group flex items-start gap-4 transition-transform duration-300 hover:translate-x-2"
                      >
                        <div className="bg-primary-500 mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full" />
                        <div className="space-y-1">
                          <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                            {item.title}
                          </h4>
                          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom link */}
                  <Link
                    href="/projects"
                    className="group text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 inline-flex items-center gap-2 pt-2 text-sm font-medium transition-colors duration-300"
                  >
                    <span>View all projects</span>
                    <svg
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { number: '12+', label: 'Years Exp.' },
                  { number: '∞', label: 'Learning' },
                  { number: '100%', label: 'Dedication' },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="border-primary-100 hover:border-primary-500 hover:shadow-primary-500/10 dark:border-primary-900/50 dark:hover:border-primary-500 rounded-xl border bg-white p-4 text-center shadow-sm backdrop-blur-sm transition-all duration-300 hover:shadow-lg dark:bg-gray-900"
                  >
                    <div className="text-primary-600 dark:text-primary-400 font-serif text-3xl font-bold">
                      {stat.number}
                    </div>
                    <div className="mt-1 text-xs font-medium tracking-wider text-gray-600 uppercase dark:text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </HeroAnimationWrapper>
  )
}
