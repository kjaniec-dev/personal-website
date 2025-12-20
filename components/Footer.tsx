import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer className="relative mt-32 pb-12">
      {/* Decorative top border */}
      <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-600" />

      {/* Main footer content */}
      <div className="pt-16">
        <div className="flex flex-col items-center gap-10">
          {/* Brand section */}
          <div className="flex flex-col items-center gap-4">
            {/* Geometric logo */}
            <div className="relative flex h-14 w-14 items-center justify-center">
              <div className="absolute inset-0 rounded-xl border-2 border-gray-300 transition-colors dark:border-gray-600" />
              <span className="font-display relative z-10 text-2xl font-bold text-gray-900 dark:text-white">
                K
              </span>
            </div>

            <div className="text-center">
              <div className="font-display text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                {siteMetadata.headerTitle}
              </div>
              <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Crafting digital experiences
              </div>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {siteMetadata.email && (
              <Link
                href={`mailto:${siteMetadata.email}`}
                className="group hover:border-accent-400 hover:bg-accent-50 hover:text-accent-600 dark:hover:border-accent-500 dark:hover:bg-accent-900/50 dark:hover:text-accent-400 flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white/80 text-gray-600 backdrop-blur-sm transition-all duration-300 dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-300"
                aria-label="Email"
              >
                <SocialIcon kind="mail" size={5} />
              </Link>
            )}
            {siteMetadata.github && (
              <Link
                href={siteMetadata.github}
                className="group hover:border-accent-400 hover:bg-accent-50 hover:text-accent-600 dark:hover:border-accent-500 dark:hover:bg-accent-900/50 dark:hover:text-accent-400 flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white/80 text-gray-600 backdrop-blur-sm transition-all duration-300 dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-300"
                aria-label="GitHub"
              >
                <SocialIcon kind="github" size={5} />
              </Link>
            )}
            {siteMetadata.linkedin && (
              <Link
                href={siteMetadata.linkedin}
                className="group hover:border-accent-400 hover:bg-accent-50 hover:text-accent-600 dark:hover:border-accent-500 dark:hover:bg-accent-900/50 dark:hover:text-accent-400 flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white/80 text-gray-600 backdrop-blur-sm transition-all duration-300 dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-300"
                aria-label="LinkedIn"
              >
                <SocialIcon kind="linkedin" size={5} />
              </Link>
            )}
            {siteMetadata.twitter && (
              <Link
                href={siteMetadata.twitter}
                className="group hover:border-accent-400 hover:bg-accent-50 hover:text-accent-600 dark:hover:border-accent-500 dark:hover:bg-accent-900/50 dark:hover:text-accent-400 flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white/80 text-gray-600 backdrop-blur-sm transition-all duration-300 dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-300"
                aria-label="Twitter"
              >
                <SocialIcon kind="twitter" size={5} />
              </Link>
            )}
            {siteMetadata.x && (
              <Link
                href={siteMetadata.x}
                className="group hover:border-accent-400 hover:bg-accent-50 hover:text-accent-600 dark:hover:border-accent-500 dark:hover:bg-accent-900/50 dark:hover:text-accent-400 flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white/80 text-gray-600 backdrop-blur-sm transition-all duration-300 dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-300"
                aria-label="X"
              >
                <SocialIcon kind="x" size={5} />
              </Link>
            )}
            {siteMetadata.youtube && (
              <Link
                href={siteMetadata.youtube}
                className="group hover:border-accent-400 hover:bg-accent-50 hover:text-accent-600 dark:hover:border-accent-500 dark:hover:bg-accent-900/50 dark:hover:text-accent-400 flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white/80 text-gray-600 backdrop-blur-sm transition-all duration-300 dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-300"
                aria-label="YouTube"
              >
                <SocialIcon kind="youtube" size={5} />
              </Link>
            )}
            {siteMetadata.bluesky && (
              <Link
                href={siteMetadata.bluesky}
                className="group hover:border-accent-400 hover:bg-accent-50 hover:text-accent-600 dark:hover:border-accent-500 dark:hover:bg-accent-900/50 dark:hover:text-accent-400 flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white/80 text-gray-600 backdrop-blur-sm transition-all duration-300 dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-300"
                aria-label="Bluesky"
              >
                <SocialIcon kind="bluesky" size={5} />
              </Link>
            )}
          </div>

          {/* Bottom section */}
          <div className="flex flex-col items-center gap-4 text-center">
            {/* Copyright */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {siteMetadata.author}
              </span>
              <span className="text-gray-300 dark:text-gray-700">/</span>
              <span>{new Date().getFullYear()}</span>
              <span className="text-gray-300 dark:text-gray-700">/</span>
              <Link
                href="/"
                className="animated-underline hover:text-accent-600 dark:hover:text-accent-400 font-medium text-gray-700 transition-colors dark:text-gray-300"
              >
                {siteMetadata.title}
              </Link>
            </div>

            {/* Theme credit */}
            <div className="text-xs text-gray-400 dark:text-gray-500">
              Built with{' '}
              <Link
                href="https://nextjs.org"
                className="animated-underline hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
              >
                Next.js
              </Link>
              {' & '}
              <Link
                href="https://tailwindcss.com"
                className="animated-underline hover:text-accent-600 dark:hover:text-accent-400 transition-colors"
              >
                Tailwind CSS
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
