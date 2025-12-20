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
      <div className="space-y-12">
        {/* Header */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-1 bg-primary-500" />
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-gray-100">
              Tags
            </h1>
          </div>
          <p className="max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Browse all topics I write about
          </p>
        </div>

        {/* Tags Cloud */}
        <div className="flex flex-wrap gap-3">
          {tagKeys.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400">No tags found.</p>
          )}
          {sortedTags.map((t) => {
            return (
              <Link
                key={t}
                href={`/tags/${slug(t)}`}
                className="group inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-all hover:border-primary-400 hover:bg-primary-50 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-primary-600 dark:hover:bg-primary-900/30 dark:hover:text-primary-400"
                aria-label={`View posts tagged ${t}`}
              >
                <span className="text-primary-600 dark:text-primary-400">#</span>
                {t.split(' ').join('-')}
                <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-600 transition-colors group-hover:bg-primary-100 group-hover:text-primary-700 dark:bg-gray-700 dark:text-gray-400 dark:group-hover:bg-primary-900/50 dark:group-hover:text-primary-300">
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
