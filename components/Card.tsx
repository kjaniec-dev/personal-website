import Image from './Image'
import Link from './Link'

const Card = ({ title, description, imgSrc, href }) => (
  <div className="md max-w-[544px] p-4 md:w-1/2">
    <div
      className={`${
        imgSrc && 'h-full'
      } hover-lift group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white/80 shadow-sm backdrop-blur-sm transition-all hover:border-primary-300 hover:shadow-lg dark:border-gray-700/60 dark:bg-gray-900/80 dark:hover:border-primary-700`}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-accent-cyan/0 opacity-0 transition-opacity group-hover:from-primary-500/5 group-hover:to-accent-cyan/5 group-hover:opacity-100 dark:group-hover:from-primary-500/10 dark:group-hover:to-accent-cyan/10" />

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
      <div className="relative p-6">
        <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
          {href ? (
            <Link
              href={href}
              aria-label={`Link to ${title}`}
              className="transition-colors hover:text-primary-500 dark:hover:text-primary-400"
            >
              {title}
            </Link>
          ) : (
            title
          )}
        </h2>
        <p className="prose mb-4 max-w-none text-gray-600 dark:text-gray-400">{description}</p>
        {href && (
          <Link
            href={href}
            className="animated-underline inline-flex items-center font-medium text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label={`Link to ${title}`}
          >
            Learn more
            <svg
              className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
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
        )}
      </div>
    </div>
  </div>
)

export default Card
