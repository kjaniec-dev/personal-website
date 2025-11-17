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
  <div className="md max-w-[544px] p-4 md:w-1/2">
    <div
      className={`${
        imgSrc && 'h-full'
      } hover-lift group hover:border-primary-300 dark:hover:border-primary-700 relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200/60 bg-white/80 shadow-sm backdrop-blur-sm transition-all hover:shadow-lg dark:border-gray-700/60 dark:bg-gray-900/80`}
    >
      {/* Gradient overlay on hover */}
      <div className="from-primary-500/0 to-accent-cyan/0 group-hover:from-primary-500/5 group-hover:to-accent-cyan/5 dark:group-hover:from-primary-500/10 dark:group-hover:to-accent-cyan/10 absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity group-hover:opacity-100" />

      {imgSrc &&
        (href ? (
          <Link href={href} aria-label={`Link to ${title}`}>
            <div className="relative overflow-hidden">
              <Image
                alt={title}
                src={imgSrc}
                className="object-cover object-center p-4 transition-transform duration-300 group-hover:scale-105 dark:invert"
                width={544}
                height={306}
              />
            </div>
          </Link>
        ) : (
          <div className="relative overflow-hidden">
            <Image
              alt={title}
              src={imgSrc}
              className="object-cover object-center p-4 transition-transform duration-300 group-hover:scale-105"
              width={544}
              height={306}
            />
          </div>
        ))}
      <div className="relative flex flex-1 flex-col p-6">
        <h2 className="mb-3 text-2xl leading-8 font-bold tracking-tight">
          {href ? (
            <Link
              href={href}
              aria-label={`Link to ${title}`}
              className="hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
            >
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <p className="prose mb-4 max-w-none flex-1 text-gray-600 dark:text-gray-400">
          {description}
        </p>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${slug(tag)}`}
                className="bg-primary-100 text-primary-700 hover:bg-primary-200 dark:bg-primary-900/30 dark:text-primary-300 dark:hover:bg-primary-900/50 rounded-full px-3 py-1 text-xs font-medium transition-colors"
              >
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
              className="bg-primary-500 hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-500 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors"
              aria-label={`Visit ${title}`}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
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
