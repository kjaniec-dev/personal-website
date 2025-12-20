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
  <div className="card-modern group flex h-full flex-col">
    {/* Image Section */}
    {imgSrc && (
      <div className="relative overflow-hidden rounded-t-lg border-b border-gray-100 dark:border-gray-800">
        {href ? (
          <Link href={href} aria-label={`Link to ${title}`}>
            <Image
              alt={title}
              src={imgSrc}
              className="h-48 w-full object-cover object-center transition-transform duration-300 group-hover:scale-105 dark:invert"
              width={544}
              height={192}
            />
          </Link>
        ) : (
          <Image
            alt={title}
            src={imgSrc}
            className="h-48 w-full object-cover object-center"
            width={544}
            height={192}
          />
        )}
      </div>
    )}

    {/* Content Section */}
    <div className="flex flex-1 flex-col space-y-4">
      {/* Title */}
      <h2 className="text-xl font-bold leading-tight tracking-tight">
        {href ? (
          <Link
            href={href}
            aria-label={`Link to ${title}`}
            className="text-gray-900 transition-colors hover:text-primary-600 dark:text-gray-100 dark:hover:text-primary-400"
          >
            {title}
          </Link>
        ) : (
          <span className="text-gray-900 dark:text-gray-100">{title}</span>
        )}
      </h2>

      {/* Description */}
      <p className="flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
        {description}
      </p>

      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${slug(tag)}`}
              className="inline-flex items-center rounded-md border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs font-medium text-gray-700 transition-colors hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-primary-600 dark:hover:bg-primary-900/30 dark:hover:text-primary-400"
            >
              {tag}
            </Link>
          ))}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex items-center gap-2 pt-2">
        {href && (
          <Link
            href={href}
            className="group/btn inline-flex items-center gap-1.5 rounded-md bg-primary-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
            aria-label={`Visit ${title}`}
          >
            <svg
              className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            Visit
          </Link>
        )}
        {repoHref && (
          <Link
            href={repoHref}
            className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
            aria-label={`View source code for ${title}`}
          >
            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
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
)

export default Card
