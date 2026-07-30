"use client";

import tagData from "app/tag-data.json";
import type { Blog } from "contentlayer/generated";
import { slug } from "github-slugger";
import { usePathname, useRouter } from "next/navigation";
import type { CoreContent } from "pliny/utils/contentlayer";
import { formatDate } from "pliny/utils/formatDate";
import Card from "@/components/Card";
import { PageHeader, Pagination } from "@/components/ClientUI";
import Link from "@/components/Link";
import Pill from "@/components/Pill";
import ProjectCard from "@/components/ProjectCard";
import type { Project } from "@/data/projectsData";
import siteMetadata from "@/data/siteMetadata";

interface ListPaginationProps {
	totalPages: number;
	currentPage: number;
}

interface ListLayoutProps {
	posts: CoreContent<Blog>[];
	title: string;
	initialDisplayPosts?: CoreContent<Blog>[];
	pagination?: ListPaginationProps;
	projects?: Project[];
}

function ListPagination({ totalPages, currentPage }: ListPaginationProps) {
	const pathname = usePathname();
	const router = useRouter();
	const basePath = (pathname ?? "/blog").replace(/\/page\/\d+$/, "") || "/blog";

	const hrefForPage = (page: number) =>
		page <= 1 ? basePath : `${basePath}/page/${page}`;

	return (
		<div className="mt-12 flex justify-center">
			<Pagination
				page={currentPage}
				pageCount={totalPages}
				onPageChange={(page) => {
					router.push(hrefForPage(page));
				}}
			/>
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
		<div className="space-y-6">
			<PageHeader
				eyebrow="Writing"
				title={title}
				description={siteMetadata.description}
			/>

			<div className="grid gap-8 lg:grid-cols-[260px_1fr]">
				<aside className="lg:sticky lg:top-24 lg:self-start">
					<Card padded>
						<h2 className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-foreground">
							Tags
						</h2>
						<ul className="space-y-1">
							<li>
								<Link
									href="/blog"
									className={`block rounded-kj-md px-2.5 py-1.5 font-sans text-sm transition-colors ${
										pathname === "/blog"
											? "bg-primary/10 text-primary font-semibold"
											: "text-muted-foreground hover:bg-subtle hover:text-foreground"
									}`}
								>
									All posts
								</Link>
							</li>
							{sortedTags.map((tag) => {
								const tagSlug = slug(tag);
								const active = pathname === `/tags/${tagSlug}`;
								return (
									<li key={tag}>
										<Link
											href={`/tags/${tagSlug}`}
											className={`flex items-center justify-between rounded-kj-md px-2.5 py-1.5 font-sans text-sm transition-colors ${
												active
													? "bg-primary/10 text-primary font-semibold"
													: "text-muted-foreground hover:bg-subtle hover:text-foreground"
											}`}
										>
											<span>#{tag.split(" ").join("-")}</span>
											<span className="font-mono text-[11px] text-muted-foreground">
												{tagCounts[tag]}
											</span>
										</Link>
									</li>
								);
							})}
						</ul>
					</Card>
				</aside>

				<section className="space-y-8">
					{projects && projects.length > 0 ? (
						<div className="space-y-4">
							<h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
								Related Projects ({projects.length})
							</h3>
							<div className="grid gap-4 md:grid-cols-2">
								{projects.map((p, index) => (
									<ProjectCard
										key={p.title}
										title={p.title}
										description={p.description}
										imgSrc={p.imgSrc}
										href={p.href}
										repoHref={p.repoHref}
										tags={p.tags}
										status={p.status}
										priority={index < 2}
									/>
								))}
							</div>
							<div className="border-b border-border/40 pb-2" />
						</div>
					) : null}

					<div className="space-y-6">
						{projects && projects.length > 0 ? (
							<h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
								Related Posts ({posts.length})
							</h3>
						) : null}
						{displayPosts.length === 0 ? (
							<p className="text-muted-foreground">No posts found.</p>
						) : null}
						{displayPosts.map((post) => {
							const { path, date, title, summary, tags, readingTime } = post;
							return (
								<Card key={path} as="article" interactive>
									<Link href={`/${path}`} className="group block space-y-3">
										<div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] text-muted-foreground">
											<time dateTime={date}>
												{formatDate(date, siteMetadata.locale)}
											</time>
											{readingTime && (
												<>
													<span>•</span>
													<div className="flex items-center gap-1">
														<svg
															className="h-3 w-3 stroke-muted-foreground/80"
															viewBox="0 0 24 24"
															fill="none"
															stroke="currentColor"
															strokeWidth="2.5"
															strokeLinecap="round"
															strokeLinejoin="round"
															aria-hidden="true"
														>
															<circle cx="12" cy="12" r="10" />
															<polyline points="12 6 12 12 16 14" />
														</svg>
														<span>{readingTime.text}</span>
													</div>
												</>
											)}
										</div>
										<h2 className="font-sans text-2xl font-bold text-foreground transition-colors group-hover:text-primary">
											{title}
										</h2>
										{summary ? (
											<p className="text-sm leading-relaxed text-muted-foreground">
												{summary}
											</p>
										) : null}
										{tags && tags.length > 0 ? (
											<div className="flex flex-wrap gap-1.5 pt-1">
												{tags.map((t) => (
													<Pill key={t} tone="secondary">
														{t}
													</Pill>
												))}
											</div>
										) : null}
										<div className="pt-2 font-mono text-xs font-semibold text-primary">
											Read article →
										</div>
									</Link>
								</Card>
							);
						})}

						{pagination && pagination.totalPages > 1 ? (
							<ListPagination
								currentPage={pagination.currentPage}
								totalPages={pagination.totalPages}
							/>
						) : null}
					</div>
				</section>
			</div>
		</div>
	);
}
