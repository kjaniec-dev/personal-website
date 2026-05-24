"use client";

import tagData from "app/tag-data.json";
import type { Blog } from "contentlayer/generated";
import { slug } from "github-slugger";
import { usePathname } from "next/navigation";
import type { CoreContent } from "pliny/utils/contentlayer";
import { formatDate } from "pliny/utils/formatDate";
import Card from "@/components/Card";
import Link from "@/components/Link";
import PageHeader from "@/components/PageHeader";
import Pill from "@/components/Pill";
import siteMetadata from "@/data/siteMetadata";

interface PaginationProps {
	totalPages: number;
	currentPage: number;
}

interface ListLayoutProps {
	posts: CoreContent<Blog>[];
	title: string;
	initialDisplayPosts?: CoreContent<Blog>[];
	pagination?: PaginationProps;
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
	const pathname = usePathname();
	const basePath = pathname?.split("/")[1] ?? "blog";
	const prevPage = currentPage - 1 > 0;
	const nextPage = currentPage + 1 <= totalPages;

	return (
		<nav
			aria-label="Pagination"
			className="mt-12 flex items-center justify-between"
		>
			{prevPage ? (
				<Link
					href={
						currentPage - 1 === 1
							? `/${basePath}`
							: `/${basePath}/page/${currentPage - 1}`
					}
					className="rounded-kj-lg border border-border bg-card px-4 py-2 font-sans text-sm font-semibold text-foreground transition-colors hover:bg-muted"
					rel="prev"
				>
					← Previous
				</Link>
			) : (
				<span />
			)}
			<span className="font-mono text-xs text-muted-foreground">
				Page {currentPage} of {totalPages}
			</span>
			{nextPage ? (
				<Link
					href={`/${basePath}/page/${currentPage + 1}`}
					className="rounded-kj-lg border border-border bg-card px-4 py-2 font-sans text-sm font-semibold text-foreground transition-colors hover:bg-muted"
					rel="next"
				>
					Next →
				</Link>
			) : (
				<span />
			)}
		</nav>
	);
}

export default function ListLayoutWithTags({
	posts,
	title,
	initialDisplayPosts = [],
	pagination,
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
											: "text-muted-foreground hover:bg-muted hover:text-foreground"
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
													: "text-muted-foreground hover:bg-muted hover:text-foreground"
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

				<section className="space-y-6">
					{displayPosts.length === 0 ? (
						<p className="text-muted-foreground">No posts found.</p>
					) : null}
					{displayPosts.map((post) => {
						const { path, date, title, summary, tags } = post;
						return (
							<Card key={path} as="article" interactive>
								<Link href={`/${path}`} className="group block space-y-3">
									<div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-muted-foreground">
										<time dateTime={date}>
											{formatDate(date, siteMetadata.locale)}
										</time>
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
												<Pill key={t} tone="default">
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
						<Pagination
							currentPage={pagination.currentPage}
							totalPages={pagination.totalPages}
						/>
					) : null}
				</section>
			</div>
		</div>
	);
}
