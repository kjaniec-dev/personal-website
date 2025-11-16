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
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-gray-100">
            <span className="gradient-text">Tags</span>
          </h1>
          <p className="max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Browse all topics I write about
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {tagKeys.length === 0 && (
            <p className="text-gray-500 dark:text-gray-400">No tags found.</p>
          )}
          {sortedTags.map((t) => {
            return (
              <Link
                key={t}
                href={`/tags/${slug(t)}`}
                className="bg-primary-50 text-primary-700 ring-primary-500/20 hover:bg-primary-100 hover:ring-primary-500/40 dark:bg-primary-950/50 dark:text-primary-300 dark:ring-primary-400/20 dark:hover:bg-primary-900/50 dark:hover:ring-primary-400/40 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ring-1 transition-all"
                aria-label={`View posts tagged ${t}`}
              >
                #{t.split(' ').join('-')}
                <span className="bg-primary-200 text-primary-800 dark:bg-primary-800 dark:text-primary-200 rounded-full px-2 py-0.5 text-xs font-semibold">
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
