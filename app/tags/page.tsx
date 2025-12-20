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
    <div className="py-12">
      <div className="space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-accent-500 h-px w-8" />
            <span className="text-accent-600 dark:text-accent-400 text-sm font-semibold tracking-widest uppercase">
              Browse Topics
            </span>
          </div>
          <h1 className="font-display text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
            All Tags
          </h1>
          <p className="max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Explore articles by topic
          </p>
        </div>

        {/* Tags Grid */}
        <div className="flex flex-wrap gap-3">
          {tagKeys.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400">No tags found.</p>
          )}
          {sortedTags.map((t) => {
            return (
              <Link
                key={t}
                href={`/tags/${slug(t)}`}
                className="group hover:border-accent-400 hover:bg-accent-50 hover:text-accent-700 dark:hover:border-accent-500 dark:hover:bg-accent-900/50 dark:hover:text-accent-300 inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white/80 px-4 py-2.5 text-sm font-semibold text-gray-700 backdrop-blur-sm transition-all duration-300 dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-200"
                aria-label={`View posts tagged ${t}`}
              >
                <span className="text-accent-500 transition-transform duration-300 group-hover:scale-110">
                  #
                </span>
                {t.split(' ').join('-')}
                <span className="group-hover:bg-accent-100 group-hover:text-accent-700 dark:group-hover:bg-accent-800 dark:group-hover:text-accent-200 rounded-md bg-gray-100 px-2 py-0.5 text-xs font-bold text-gray-600 transition-colors dark:bg-gray-700 dark:text-gray-300">
                  {tagCounts[t]}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
