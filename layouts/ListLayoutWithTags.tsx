"use client";

import tagData from "app/tag-data.json";
import type { Blog } from "contentlayer/generated";
import { slug } from "github-slugger";
import { usePathname } from "next/navigation";
import type { CoreContent } from "pliny/utils/contentlayer";
import { formatDate } from "pliny/utils/formatDate";
import Card from "@/components/Card";
import Link from "@/components/Link";
import Tag from "@/components/Tag";
import siteMetadata from "@/data/siteMetadata";

interface Project {
	title: string;
	description: string;
	href?: string;
	repoHref?: string;
	imgSrc?: string;
	tags?: string[];
}

interface PaginationProps {
	totalPages: number;
	currentPage: number;
}
interface ListLayoutProps {
	posts: CoreContent<Blog>[];
	title: string;
	initialDisplayPosts?: CoreContent<Blog>[];
	pagination?: PaginationProps;
	projects?: Project[];
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
	const pathname = usePathname();
	const basePath = pathname
		.replace(/^\//, "")
		.replace(/\/page\/\d+\/?$/, "")
		.replace(/\/$/, "");
	const prevPage = currentPage - 1 > 0;
	const nextPage = currentPage + 1 <= totalPages;

	return (
		<div className="mt-8 flex items-center justify-between">
			<div>
				{prevPage ? (
					<Link
						href={
							currentPage - 1 === 1
								? `/${basePath}/`
								: `/${basePath}/page/${currentPage - 1}`
						}
						rel="prev"
						className="hover:border-primary-500 hover:text-primary-500 dark:hover:border-primary-400 dark:hover:text-primary-400 inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300"
					>
						<svg
							className="mr-2 h-4 w-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<title>Previous page icon</title>
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
						type="button"
						className="inline-flex cursor-not-allowed items-center rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-400 dark:border-gray-700 dark:bg-gray-800"
						disabled
					>
						<svg
							className="mr-2 h-4 w-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<title>Previous page icon</title>
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

			<span className="text-sm font-medium text-gray-600 dark:text-gray-400">
				Page {currentPage} of {totalPages}
			</span>

			<div>
				{nextPage ? (
					<Link
						href={`/${basePath}/page/${currentPage + 1}`}
						rel="next"
						className="hover:border-primary-500 hover:text-primary-500 dark:hover:border-primary-400 dark:hover:text-primary-400 inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300"
					>
						Next
						<svg
							className="ml-2 h-4 w-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<title>Next page icon</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</Link>
				) : (
					<button
						type="button"
						className="inline-flex cursor-not-allowed items-center rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-400 dark:border-gray-700 dark:bg-gray-800"
						disabled
					>
						Next
						<svg
							className="ml-2 h-4 w-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<title>Next page icon</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</button>
				)}
			</div>
		</div>
	);
}

export default function ListLayoutWithTags({
	posts,
	title,
	initialDisplayPosts = [],
	pagination,
	projects = [],
}: ListLayoutProps) {
	const pathname = usePathname();
	const tagCounts = tagData as Record<string, number>;
	const tagKeys = Object.keys(tagCounts);
	const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a]);

	const displayPosts =
		initialDisplayPosts.length > 0 ? initialDisplayPosts : posts;

	return (
		<div className="space-y-8">
			{/* Header */}
			<div className="space-y-3">
				<div className="section-divider">
					<span className="text-primary-500">{"//"}</span>
					<span>{title.toLowerCase()}/</span>
				</div>
				<h1 className="font-mono text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">
					<span className="text-primary-500">$</span> ls ./{title.toLowerCase()}
				</h1>
				<p className="max-w-2xl font-mono text-sm text-gray-600 dark:text-gray-400">
					<span className="text-gray-400"># </span>
					Thoughts, tutorials, and insights on software development.
				</p>
			</div>

			<div className="flex flex-col gap-8 lg:flex-row">
				{/* Sidebar */}
				<aside className="terminal-card no-scrollbar hidden h-fit max-h-[calc(100vh-200px)] w-full max-w-[280px] flex-shrink-0 overflow-auto p-6 lg:block">
					<div className="section-divider mb-4">
						<span className="text-primary-500">{"//"}</span>
						<span>tags</span>
					</div>
					<div className="mb-3 font-mono text-sm">
						{pathname.startsWith("/blog") && !pathname.includes("/tags/") ? (
							<span className="text-primary-500">
								<span className="opacity-70">$</span> all-posts
							</span>
						) : (
							<Link
								href={`/blog`}
								className="hover:text-primary-500 dark:hover:text-primary-400 text-gray-700 transition-colors dark:text-gray-300"
							>
								<span className="text-gray-400">$</span> all-posts
							</Link>
						)}
					</div>
					<div className="space-y-1">
						{sortedTags.map((t) => {
							const isActive =
								decodeURI(pathname.split("/tags/")[1]) === slug(t);
							return (
								<div key={t}>
									{isActive ? (
										<span className="bg-primary-500/10 text-primary-600 dark:text-primary-400 flex items-center justify-between rounded-md px-2 py-1 font-mono text-sm">
											<span>#{t}</span>
											<span className="text-primary-500 text-xs">
												{tagCounts[t]}
											</span>
										</span>
									) : (
										<Link
											href={`/tags/${slug(t)}`}
											className="hover:text-primary-500 dark:hover:text-primary-400 flex items-center justify-between rounded-md px-2 py-1 font-mono text-sm text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-900"
											aria-label={`View posts tagged ${t}`}
										>
											<span>#{t}</span>
											<span className="text-xs text-gray-500 dark:text-gray-500">
												{tagCounts[t]}
											</span>
										</Link>
									)}
								</div>
							);
						})}
					</div>
				</aside>

				{/* Posts List */}
				<div className="flex-1">
					<div className="space-y-6">
						{displayPosts.map((post) => {
							const { path, date, title, summary, tags, readingTime } = post;
							return (
								<article
									key={path}
									className="terminal-card group hover:border-primary-500/60 dark:hover:border-primary-500/60 flex min-h-[280px] flex-col p-6 transition-colors"
								>
									<div className="flex h-full flex-col space-y-3">
										<div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
											<svg
												className="h-4 w-4"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
											>
												<title>Calendar icon</title>
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
											{readingTime && (
												<>
													<span>•</span>
													<span>{readingTime.text}</span>
												</>
											)}
										</div>

										<h2 className="font-mono text-xl leading-tight font-semibold tracking-tight">
											<Link
												href={`/${path}`}
												className="hover:text-primary-500 dark:hover:text-primary-400 text-gray-900 transition-colors dark:text-gray-100"
											>
												<span className="text-primary-500 mr-1 opacity-70 group-hover:opacity-100">
													&gt;
												</span>
												{title}
											</Link>
										</h2>

										<div className="flex flex-wrap gap-2">
											{tags?.map((tag) => (
												<Tag key={tag} text={tag} />
											))}
										</div>

										<p className="line-clamp-3 flex-1 text-gray-600 dark:text-gray-400">
											{summary}
										</p>

										<Link
											href={`/${path}`}
											className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 w-fit self-start font-mono text-sm"
											aria-label={`Read more: "${title}"`}
										>
											<span className="whitespace-nowrap">
												$ read more<span className="sr-only">: {title}</span>
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
							);
						})}
					</div>
					{pagination && pagination.totalPages > 1 && (
						<Pagination
							currentPage={pagination.currentPage}
							totalPages={pagination.totalPages}
						/>
					)}

					{/* Projects Section */}
					{projects.length > 0 && (
						<div className="mt-12">
							<div className="section-divider mb-4">
								<span className="text-primary-500">{"//"}</span>
								<span>projects</span>
							</div>
							<h3 className="mb-6 font-mono text-xl font-semibold text-gray-900 dark:text-gray-100">
								<span className="text-primary-500">$</span> ls ./projects
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
	);
}
