import Link from '@/components/Link'

const TimelineEntry = ({
  entry,
  children,
}: {
  children?: React.ReactNode
  entry: {
    primaryText: string
    secondaryText: string
    tags?: string[]
    link?: { href: string; text: string }
  }
}) => (
  <div className="group flex md:contents">
    {/* Timeline line and dot */}
    <div className="relative col-start-1 col-end-3 mr-10 md:mx-auto">
      <div className="flex h-full w-6 items-center justify-center">
        <div className="from-primary-500 to-accent-cyan dark:from-primary-400 dark:to-accent-cyan pointer-events-none h-full w-0.5 bg-gradient-to-b"></div>
      </div>
      <div className="from-primary-500 to-accent-cyan shadow-primary-500/25 absolute top-4 left-0 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br shadow-lg ring-4 ring-white dark:ring-gray-950">
        <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>

    {/* Content */}
    <div className="hover:border-primary-200 dark:hover:border-primary-800 col-start-3 col-end-12 mr-auto mb-8 ml-2 w-full rounded-xl border border-gray-200 bg-white p-5 shadow-sm backdrop-blur-sm transition-all hover:shadow-md md:ml-4 dark:border-gray-700 dark:bg-gray-900">
      <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-gray-100">
        {entry.primaryText}
      </h3>
      <p className="mb-3 leading-relaxed text-gray-600 dark:text-gray-400">{entry.secondaryText}</p>

      {entry.tags && (
        <div className="mb-3 flex flex-wrap gap-2">
          {entry.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-primary-50 text-primary-700 dark:bg-primary-950/50 dark:text-primary-300 inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {entry.link && (
        <Link
          href={entry.link.href}
          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 w-fit self-start text-sm font-medium"
          aria-label={`Link to project ${entry.primaryText}`}
        >
          <span className="animated-underline whitespace-nowrap">
            {entry.link.text}
            <svg
              className="ml-1 inline-block h-3 w-3 align-middle"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </span>
        </Link>
      )}
      {children}
    </div>
  </div>
)

export default TimelineEntry
