import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-8">
          {/* Social Icons */}
          <div className="flex flex-wrap justify-center gap-3">
            {siteMetadata.email && (
              <SocialIcon
                kind="mail"
                href={`mailto:${siteMetadata.email}`}
                size={5}
                className="text-gray-400 transition-colors hover:text-primary-600 dark:text-gray-500 dark:hover:text-primary-400"
              />
            )}
            {siteMetadata.github && (
              <SocialIcon
                kind="github"
                href={siteMetadata.github}
                size={5}
                className="text-gray-400 transition-colors hover:text-primary-600 dark:text-gray-500 dark:hover:text-primary-400"
              />
            )}
            {siteMetadata.linkedin && (
              <SocialIcon
                kind="linkedin"
                href={siteMetadata.linkedin}
                size={5}
                className="text-gray-400 transition-colors hover:text-primary-600 dark:text-gray-500 dark:hover:text-primary-400"
              />
            )}
            {siteMetadata.twitter && (
              <SocialIcon
                kind="twitter"
                href={siteMetadata.twitter}
                size={5}
                className="text-gray-400 transition-colors hover:text-primary-600 dark:text-gray-500 dark:hover:text-primary-400"
              />
            )}
            {siteMetadata.x && (
              <SocialIcon
                kind="x"
                href={siteMetadata.x}
                size={5}
                className="text-gray-400 transition-colors hover:text-primary-600 dark:text-gray-500 dark:hover:text-primary-400"
              />
            )}
            {siteMetadata.facebook && (
              <SocialIcon
                kind="facebook"
                href={siteMetadata.facebook}
                size={5}
                className="text-gray-400 transition-colors hover:text-primary-600 dark:text-gray-500 dark:hover:text-primary-400"
              />
            )}
            {siteMetadata.youtube && (
              <SocialIcon
                kind="youtube"
                href={siteMetadata.youtube}
                size={5}
                className="text-gray-400 transition-colors hover:text-primary-600 dark:text-gray-500 dark:hover:text-primary-400"
              />
            )}
            {siteMetadata.bluesky && (
              <SocialIcon
                kind="bluesky"
                href={siteMetadata.bluesky}
                size={5}
                className="text-gray-400 transition-colors hover:text-primary-600 dark:text-gray-500 dark:hover:text-primary-400"
              />
            )}
            {siteMetadata.instagram && (
              <SocialIcon
                kind="instagram"
                href={siteMetadata.instagram}
                size={5}
                className="text-gray-400 transition-colors hover:text-primary-600 dark:text-gray-500 dark:hover:text-primary-400"
              />
            )}
            {siteMetadata.threads && (
              <SocialIcon
                kind="threads"
                href={siteMetadata.threads}
                size={5}
                className="text-gray-400 transition-colors hover:text-primary-600 dark:text-gray-500 dark:hover:text-primary-400"
              />
            )}
            {siteMetadata.medium && (
              <SocialIcon
                kind="medium"
                href={siteMetadata.medium}
                size={5}
                className="text-gray-400 transition-colors hover:text-primary-600 dark:text-gray-500 dark:hover:text-primary-400"
              />
            )}
          </div>

          {/* Copyright */}
          <div className="flex flex-col items-center gap-3 text-center text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <span>© {new Date().getFullYear()}</span>
              <span className="text-gray-300 dark:text-gray-700">·</span>
              <span className="font-medium">{siteMetadata.author}</span>
            </div>
            <div className="text-xs">
              Built with{' '}
              <Link
                href="https://github.com/timlrx/tailwind-nextjs-starter-blog"
                className="text-gray-600 transition-colors hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400"
              >
                Tailwind Nextjs Theme
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
