import Image from './Image'
import Link from './Link'
import { slug } from 'github-slugger'

interface CardProps {
  title: string
  description: string
  imgSrc?: string
  href?: string
  repoHref?: string
  tags?: string[]
}

const Card = ({ title, description, imgSrc, href, repoHref, tags = [] }: CardProps) => (
  <div className="p-4 md:w-1/2">
    <div className="card-architect group flex h-full flex-col overflow-hidden">
      {/* Image Section */}
      {imgSrc && (
        <div className="relative overflow-hidden">
          {/* Gradient overlay */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-gray-900/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              <Image
                alt={title}
                src={imgSrc}
                className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
                width={544}
                height={306}
              />
            </Link>
          ) : (
            <Image
              alt={title}
              src={imgSrc}
              className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
              width={544}
              height={306}
            />
          )}
        </div>
      )}

      {/* Content Section */}
      <div className="relative flex flex-1 flex-col p-6">
        {/* Title */}
        <h2 className="font-display mb-3 text-2xl leading-tight font-bold tracking-tight">
          {href ? (
            <Link
              href={href}
              aria-label={`Link to ${title}`}
              className="hover:text-accent-600 dark:hover:text-accent-400 text-gray-900 transition-colors duration-300 dark:text-white"
            >
              {title}
            </Link>
          ) : (
            <span className="text-gray-900 dark:text-white">{title}</span>
          )}
        </h2>

        {/* Description */}
        <p className="mb-5 flex-1 text-gray-600 dark:text-gray-300">{description}</p>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="mb-5 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${slug(tag)}`}
                className="hover:border-accent-400 hover:bg-accent-50 hover:text-accent-700 dark:hover:border-accent-500 dark:hover:bg-accent-900/50 dark:hover:text-accent-300 inline-flex items-center gap-1 rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-600 transition-all duration-300 dark:border-gray-700 dark:bg-gray-800/70 dark:text-gray-300"
              >
                <span className="text-accent-500">#</span>
                {tag}
              </Link>
            ))}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          {href && (
            <Link
              href={href}
              className="group/btn from-accent-500 to-primary-500 shadow-accent-500/20 hover:shadow-accent-500/25 relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl"
              aria-label={`Visit ${title}`}
            >
              <span className="relative z-10">Visit</span>
              <svg
                className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover/btn:rotate-45"
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
              <div className="from-accent-400 to-primary-400 absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100" />
            </Link>
          )}
          {repoHref && (
            <Link
              href={repoHref}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-300 hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:bg-gray-700"
              aria-label={`View source code for ${title}`}
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                />
              </svg>
              Source
            </Link>
          )}
        </div>
      </div>
    </div>
  </div>
)

export default Card
