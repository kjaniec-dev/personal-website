import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer className="relative mt-20">
      {/* Decorative gradient line */}
      <div className="via-primary-500/50 mx-auto mb-8 h-px w-full max-w-2xl bg-gradient-to-r from-transparent to-transparent" />

      <div className="flex flex-col items-center space-y-6">
        {/* Social Icons */}
        <div className="flex flex-wrap justify-center gap-4">
          {siteMetadata.email && (
            <SocialIcon
              kind="mail"
              href={`mailto:${siteMetadata.email}`}
              size={5}
              className="hover:text-primary-500 dark:hover:text-primary-400 text-gray-500 transition-all hover:-translate-y-1 dark:text-gray-400"
            />
          )}
          {siteMetadata.github && (
            <SocialIcon
              kind="github"
              href={siteMetadata.github}
              size={5}
              className="hover:text-primary-500 dark:hover:text-primary-400 text-gray-500 transition-all hover:-translate-y-1 dark:text-gray-400"
            />
          )}
          {siteMetadata.linkedin && (
            <SocialIcon
              kind="linkedin"
              href={siteMetadata.linkedin}
              size={5}
              className="hover:text-primary-500 dark:hover:text-primary-400 text-gray-500 transition-all hover:-translate-y-1 dark:text-gray-400"
            />
          )}
          {siteMetadata.twitter && (
            <SocialIcon
              kind="twitter"
              href={siteMetadata.twitter}
              size={5}
              className="hover:text-primary-500 dark:hover:text-primary-400 text-gray-500 transition-all hover:-translate-y-1 dark:text-gray-400"
            />
          )}
          {siteMetadata.x && (
            <SocialIcon
              kind="x"
              href={siteMetadata.x}
              size={5}
              className="hover:text-primary-500 dark:hover:text-primary-400 text-gray-500 transition-all hover:-translate-y-1 dark:text-gray-400"
            />
          )}
          {siteMetadata.facebook && (
            <SocialIcon
              kind="facebook"
              href={siteMetadata.facebook}
              size={5}
              className="hover:text-primary-500 dark:hover:text-primary-400 text-gray-500 transition-all hover:-translate-y-1 dark:text-gray-400"
            />
          )}
          {siteMetadata.youtube && (
            <SocialIcon
              kind="youtube"
              href={siteMetadata.youtube}
              size={5}
              className="hover:text-primary-500 dark:hover:text-primary-400 text-gray-500 transition-all hover:-translate-y-1 dark:text-gray-400"
            />
          )}
          {siteMetadata.bluesky && (
            <SocialIcon
              kind="bluesky"
              href={siteMetadata.bluesky}
              size={5}
              className="hover:text-primary-500 dark:hover:text-primary-400 text-gray-500 transition-all hover:-translate-y-1 dark:text-gray-400"
            />
          )}
          {siteMetadata.instagram && (
            <SocialIcon
              kind="instagram"
              href={siteMetadata.instagram}
              size={5}
              className="hover:text-primary-500 dark:hover:text-primary-400 text-gray-500 transition-all hover:-translate-y-1 dark:text-gray-400"
            />
          )}
          {siteMetadata.threads && (
            <SocialIcon
              kind="threads"
              href={siteMetadata.threads}
              size={5}
              className="hover:text-primary-500 dark:hover:text-primary-400 text-gray-500 transition-all hover:-translate-y-1 dark:text-gray-400"
            />
          )}
          {siteMetadata.medium && (
            <SocialIcon
              kind="medium"
              href={siteMetadata.medium}
              size={5}
              className="hover:text-primary-500 dark:hover:text-primary-400 text-gray-500 transition-all hover:-translate-y-1 dark:text-gray-400"
            />
          )}
        </div>

        {/* Copyright */}
        <div className="flex flex-col items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <span className="font-medium">{siteMetadata.author}</span>
            <span className="text-gray-300 dark:text-gray-600">•</span>
            <span>© {new Date().getFullYear()}</span>
          </div>
          <Link
            href="/"
            className="animated-underline hover:text-primary-500 dark:hover:text-primary-400 font-medium text-gray-600 dark:text-gray-300"
          >
            {siteMetadata.title}
          </Link>
        </div>

        {/* Credits */}
        <div className="pb-8 text-xs text-gray-400 dark:text-gray-500">
          Built with{' '}
          <Link
            href="https://github.com/timlrx/tailwind-nextjs-starter-blog"
            className="animated-underline hover:text-primary-500 dark:hover:text-primary-400"
          >
            Tailwind Nextjs Theme
          </Link>
        </div>
      </div>
    </footer>
  )
}
