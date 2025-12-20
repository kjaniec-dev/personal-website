import Link from '@/components/Link'
import { slug } from 'github-slugger'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Tags', description: 'Things I blog about' })

export default async function Page() {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  return (
    <>
      <div className="space-y-16">
        {/* Header */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-1.5 rounded-full bg-gradient-to-b from-primary-500 to-primary-600" />
              <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl dark:text-gray-100">
                Topics
              </h1>
            </div>
            <p className="max-w-3xl text-xl leading-relaxed text-gray-600 dark:text-gray-400">
              Explore articles by topic. Click on any tag to discover related content.
            </p>
          </div>
        </div>

        {/* Tags Cloud */}
        <div className="flex flex-wrap gap-4">
          {tagKeys.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400">No tags found.</p>
          )}
          {sortedTags.map((t, index) => {
            const size =
              tagCounts[t] > 5
                ? 'text-base px-5 py-3'
                : tagCounts[t] > 2
                  ? 'text-sm px-4 py-2.5'
                  : 'text-sm px-4 py-2'
            return (
              <Link
                key={t}
                href={`/tags/${slug(t)}`}
                className={`group inline-flex items-center gap-2.5 rounded-xl border border-gray-200 bg-white font-semibold text-gray-700 shadow-sm transition-all hover:scale-105 hover:border-primary-400 hover:bg-primary-50 hover:text-primary-700 hover:shadow-md dark:border-gray-700 dark:bg-gray-900/50 dark:text-gray-300 dark:hover:border-primary-500 dark:hover:bg-primary-900/30 dark:hover:text-primary-400 ${size}`}
                aria-label={`View posts tagged ${t}`}
                style={{
                  animationDelay: `${index * 0.05}s`,
                  animationFillMode: 'both',
                }}
              >
                <span className="text-primary-600 dark:text-primary-400">#</span>
                {t.split(' ').join('-')}
                <span className="rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-bold text-gray-600 transition-colors group-hover:bg-primary-100 group-hover:text-primary-700 dark:bg-gray-800 dark:text-gray-400 dark:group-hover:bg-primary-900/50 dark:group-hover:text-primary-300">
                  {tagCounts[t]}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
