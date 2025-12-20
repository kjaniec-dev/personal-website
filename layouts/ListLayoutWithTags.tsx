'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'
import Card from '@/components/Card'

interface Project {
  title: string
  description: string
  href?: string
  repoHref?: string
  imgSrc?: string
  tags?: string[]
}

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
  projects?: Project[]
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname
    .replace(/^\//, '')
    .replace(/\/page\/\d+\/?$/, '')
    .replace(/\/$/, '')
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="mt-8 flex items-center justify-between">
      <div>
        {prevPage ? (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
            className="hover:border-accent-500 hover:text-accent-600 dark:hover:border-accent-500 dark:hover:text-accent-400 inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
          >
            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Previous
          </Link>
        ) : (
          <button
            className="inline-flex cursor-not-allowed items-center rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-500"
            disabled
          >
            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Previous
          </button>
        )}
      </div>

      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
        Page {currentPage} of {totalPages}
      </span>

      <div>
        {nextPage ? (
          <Link
            href={`/${basePath}/page/${currentPage + 1}`}
            rel="next"
            className="hover:border-accent-500 hover:text-accent-600 dark:hover:border-accent-500 dark:hover:text-accent-400 inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
          >
            Next
            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ) : (
          <button
            className="inline-flex cursor-not-allowed items-center rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-500"
            disabled
          >
            Next
            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
  projects = [],
}: ListLayoutProps) {
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <>
      <div className="space-y-8 py-8">
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="bg-accent-500 h-px w-8" />
            <span className="text-accent-600 dark:text-accent-400 text-sm font-semibold tracking-widest uppercase">
              Articles
            </span>
          </div>
          <h1 className="font-display text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
            {title}
          </h1>
          <p className="max-w-2xl text-lg text-gray-600 dark:text-gray-300">
            Thoughts, tutorials, and insights on software development.
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar */}
          <aside className="no-scrollbar hidden h-fit max-h-[calc(100vh-200px)] w-full max-w-[280px] flex-shrink-0 overflow-auto rounded-2xl border border-gray-200 bg-white/80 p-6 shadow-sm backdrop-blur-sm lg:block dark:border-gray-700 dark:bg-gray-800/80">
            <div className="mb-4">
              {pathname.startsWith('/blog') && !pathname.includes('/tags/') ? (
                <h3 className="text-accent-600 dark:text-accent-400 font-bold">All Posts</h3>
              ) : (
                <Link
                  href={`/blog`}
                  className="hover:text-accent-600 dark:hover:text-accent-400 font-bold text-gray-700 transition-colors dark:text-gray-200"
                >
                  All Posts
                </Link>
              )}
            </div>
            <div className="space-y-1">
              {sortedTags.map((t) => {
                const isActive = decodeURI(pathname.split('/tags/')[1]) === slug(t)
                return (
                  <div key={t}>
                    {isActive ? (
                      <span className="bg-accent-50 text-accent-700 dark:bg-accent-900/50 dark:text-accent-300 flex items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold">
                        {t}
                        <span className="bg-accent-100 dark:bg-accent-800 rounded-full px-2 py-0.5 text-xs">
                          {tagCounts[t]}
                        </span>
                      </span>
                    ) : (
                      <Link
                        href={`/tags/${slug(t)}`}
                        className="hover:text-accent-600 dark:hover:text-accent-400 flex items-center justify-between rounded-lg px-3 py-2 text-sm text-gray-600 transition-all hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50"
                        aria-label={`View posts tagged ${t}`}
                      >
                        {t}
                        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                          {tagCounts[t]}
                        </span>
                      </Link>
                    )}
                  </div>
                )
              })}
            </div>
          </aside>

          {/* Posts List */}
          <div className="flex-1">
            <div className="space-y-6">
              {displayPosts.map((post) => {
                const { path, date, title, summary, tags } = post
                return (
                  <article
                    key={path}
                    className="group hover:border-accent-300 dark:hover:border-accent-600 flex min-h-[280px] flex-col rounded-xl border border-gray-200 bg-white/80 p-6 transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800/80"
                  >
                    <div className="flex h-full flex-col space-y-3">
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <time dateTime={date} suppressHydrationWarning>
                          {formatDate(date, siteMetadata.locale)}
                        </time>
                      </div>

                      <h2 className="font-display text-2xl leading-tight font-bold tracking-tight">
                        <Link
                          href={`/${path}`}
                          className="hover:text-accent-600 dark:hover:text-accent-400 text-gray-900 transition-colors dark:text-white"
                        >
                          {title}
                        </Link>
                      </h2>

                      <div className="flex flex-wrap gap-2">
                        {tags?.map((tag) => (
                          <Tag key={tag} text={tag} />
                        ))}
                      </div>

                      <p className="line-clamp-3 flex-1 text-gray-600 dark:text-gray-300">
                        {summary}
                      </p>

                      <Link
                        href={`/${path}`}
                        className="text-accent-600 hover:text-accent-700 dark:text-accent-400 dark:hover:text-accent-300 w-fit self-start font-medium"
                      >
                        <span className="animated-underline whitespace-nowrap">
                          Read more
                          <svg
                            className="ml-1 inline-block h-4 w-4 align-middle transition-transform group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 7l5 5m0 0l-5 5m5-5H6"
                            />
                          </svg>
                        </span>
                      </Link>
                    </div>
                  </article>
                )
              })}
            </div>
            {pagination && pagination.totalPages > 1 && (
              <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
            )}

            {/* Projects Section */}
            {projects.length > 0 && (
              <div className="mt-12">
                <h3 className="font-display mb-6 text-2xl font-bold text-gray-900 dark:text-white">
                  Projects
                </h3>
                <div className="-m-4 flex flex-wrap">
                  {projects.map((project) => (
                    <Card
                      key={project.title}
                      title={project.title}
                      description={project.description}
                      imgSrc={project.imgSrc}
                      href={project.href}
                      repoHref={project.repoHref}
                      tags={project.tags}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
