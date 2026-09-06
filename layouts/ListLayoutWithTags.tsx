"use client";

import tagData from "app/tag-data.json";
import type { Blog } from "contentlayer/generated";
import { slug } from "github-slugger";
import { usePathname, useRouter } from "next/navigation";
import type { CoreContent } from "pliny/utils/contentlayer";
import BlogPostCard from "@/components/BlogPostCard";
import { Pagination } from "@/components/ClientUI";
import Link from "@/components/Link";
import PortfolioPageHeader from "@/components/PortfolioPageHeader";
import ProjectCard from "@/components/ProjectCard";
import TagFilterAccordion from "@/components/TagFilterAccordion";
import type { Project } from "@/data/projectsData";

interface ListPaginationProps {
	totalPages: number;
	currentPage: number;
	className?: string;
}

interface ListLayoutProps {
	posts: CoreContent<Blog>[];
	title: string;
	initialDisplayPosts?: CoreContent<Blog>[];
	pagination?: ListPaginationProps;
	projects?: Project[];
}

function ListPagination({
	totalPages,
	currentPage,
	className = "mt-8",
}: ListPaginationProps) {
	const pathname = usePathname();
	const router = useRouter();
	const basePath = (pathname ?? "/blog").replace(/\/page\/\d+$/, "") || "/blog";

	return (
		<div className={`${className} flex justify-center`}>
			<Pagination
				className="[&_button]:min-h-11 [&_button]:min-w-9 sm:[&_button]:min-w-11"
				page={currentPage}
				pageCount={totalPages}
				onPageChange={(page) =>
					router.push(page <= 1 ? basePath : `${basePath}/page/${page}`)
				}
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
	const basePath = (pathname ?? "/blog").replace(/\/page\/\d+$/, "");
	const tagCounts = tagData as Record<string, number>;
	const sortedTags = Object.keys(tagCounts).sort(
		(a, b) => tagCounts[b] - tagCounts[a],
	);
	const activeTag = sortedTags.find((tag) => basePath === `/tags/${slug(tag)}`);
	const heading = activeTag
		? `#${activeTag}`
		: basePath === "/blog"
			? "Blog"
			: title;
	const displayPosts =
		initialDisplayPosts.length > 0 ? initialDisplayPosts : posts;
	const tagLinkClass = (active: boolean) =>
		`flex min-h-10 items-center justify-between gap-3 rounded-sm text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${active ? "font-medium text-primary underline underline-offset-4 decoration-2" : "text-muted-foreground hover:text-foreground"}`;

	return (
		<div className="pt-12 pb-8 font-sans sm:pt-16">
			<PortfolioPageHeader
				eyebrow="Writing"
				title={heading}
				description={
					activeTag
						? `Notes, guides, and lessons learned while working with ${activeTag}.`
						: "Notes on building software. Practical guides, tools I use, and lessons from projects along the way."
				}
			/>

			<div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-y border-border py-2">
				<p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
					{activeTag ? "Articles" : "All posts"}
					<span className="ml-2 text-primary">
						{String(posts.length).padStart(2, "0")}
					</span>
					{pagination && pagination.totalPages > 1 && (
						<span className="ml-4">
							Page {pagination.currentPage} / {pagination.totalPages}
						</span>
					)}
				</p>
				<nav aria-label="Blog navigation">
					<Link
						href="/tags"
						className="inline-flex min-h-11 items-center gap-2 rounded-sm text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
					>
						Browse all tags <span aria-hidden="true">→</span>
					</Link>
				</nav>
			</div>

			<div className="mt-6 lg:hidden">
				<TagFilterAccordion tagCounts={tagCounts} />
			</div>
			<div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_190px] lg:gap-14">
				<section aria-label="Articles" className="min-w-0">
					{pagination && pagination.totalPages > 1 && (
						<div data-testid="mobile-top-pagination" className="lg:hidden">
							<ListPagination
								className="mt-6"
								currentPage={pagination.currentPage}
								totalPages={pagination.totalPages}
							/>
						</div>
					)}
					<div className="divide-y divide-border">
						{displayPosts.length === 0 && (
							<p className="py-10 text-muted-foreground">No posts found.</p>
						)}
						{displayPosts.map((post) => (
							<BlogPostCard key={post.path} post={post} />
						))}
					</div>
					{pagination && pagination.totalPages > 1 && (
						<div
							data-testid="bottom-pagination"
							className="border-t border-border"
						>
							<ListPagination
								currentPage={pagination.currentPage}
								totalPages={pagination.totalPages}
							/>
						</div>
					)}
				</section>
				<aside
					aria-label="Filter articles by tag"
					className="hidden lg:sticky lg:top-28 lg:mt-10 lg:block lg:max-h-[calc(100dvh-9rem)] lg:self-start lg:overflow-y-auto lg:border-l lg:border-border lg:pl-6 lg:pr-2 lg:pb-2"
				>
					<h2 className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
						Explore tags
					</h2>
					<ul>
						<li>
							<Link
								href="/blog"
								aria-current={basePath === "/blog" ? "page" : undefined}
								className={tagLinkClass(basePath === "/blog")}
							>
								All posts
							</Link>
						</li>
						{sortedTags.map((tag) => (
							<li key={tag}>
								<Link
									href={`/tags/${slug(tag)}`}
									aria-current={activeTag === tag ? "page" : undefined}
									className={tagLinkClass(activeTag === tag)}
								>
									<span className="min-w-0 break-words">
										#{tag.split(" ").join("-")}
									</span>
									<span className="font-mono text-[11px] text-muted-foreground">
										{tagCounts[tag]}
									</span>
								</Link>
							</li>
						))}
					</ul>
				</aside>
			</div>

			{projects.length > 0 && (
				<section
					aria-labelledby="related-projects-heading"
					className="mt-16 border-t border-border pt-8 sm:mt-20"
				>
					<h2
						id="related-projects-heading"
						className="text-2xl font-medium tracking-tight text-foreground"
					>
						Related projects
						<span className="ml-3 font-mono text-sm text-primary">
							{String(projects.length).padStart(2, "0")}
						</span>
					</h2>
					<div className="divide-y divide-border">
						{projects.map((project) => (
							<ProjectCard key={project.title} {...project} />
						))}
					</div>
				</section>
			)}
		</div>
	);
}
