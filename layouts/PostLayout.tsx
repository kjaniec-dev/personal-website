import type { Authors, Blog } from "contentlayer/generated";
import { slug } from "github-slugger";
import type { CoreContent } from "pliny/utils/contentlayer";
import { formatDate } from "pliny/utils/formatDate";
import type { ReactNode } from "react";
import Image from "@/components/Image";
import Link from "@/components/Link";
import PostTableOfContents, {
	type TocItem,
} from "@/components/PostTableOfContents";
import ScrollTopAndComment from "@/components/ScrollTopAndComment";
import siteMetadata from "@/data/siteMetadata";

export type { TocItem } from "@/components/PostTableOfContents";

export interface PostLayoutProps {
	content: CoreContent<Blog>;
	authorDetails?: CoreContent<Authors>[];
	next?: { path: string; title: string };
	prev?: { path: string; title: string };
	toc?: TocItem[];
	children: ReactNode;
	showBanner?: boolean;
	showSourceLinks?: boolean;
}

const focus =
	"focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary";

export default function PostLayout({
	content,
	authorDetails = [],
	next,
	prev,
	toc = [],
	children,
	showBanner = false,
	showSourceLinks = true,
}: PostLayoutProps) {
	const { filePath, path, date, title, summary, tags, images, readingTime } =
		content;
	const sections = toc.filter((item) => item.depth >= 2 && item.depth <= 3);
	const banner = showBanner ? images?.[0] : undefined;

	return (
		<article className="pt-12 pb-8 font-sans sm:pt-16">
			<ScrollTopAndComment />
			<header className="border-b border-border pb-8 sm:pb-10">
				<Link
					href="/blog"
					className={`mb-6 inline-flex min-h-11 items-center gap-2 rounded-sm font-mono text-xs uppercase tracking-[0.2em] text-primary transition-colors hover:text-primary-hover ${focus}`}
				>
					<span aria-hidden="true">←</span> Back to the blog
				</Link>
				<h1 className="max-w-4xl text-balance break-words text-3xl font-medium leading-[1.15] tracking-tight text-foreground sm:text-5xl xl:text-6xl">
					{title}
				</h1>
				{summary && (
					<p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
						{summary}
					</p>
				)}
				<div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted-foreground">
					{authorDetails.map((author) => (
						<span
							key={author.slug}
							className="inline-flex items-center gap-2.5 text-foreground"
						>
							{author.avatar && (
								<Image
									src={author.avatar}
									width={28}
									height={28}
									alt=""
									className="h-7 w-7 rounded-full border border-border object-cover"
								/>
							)}
							{author.name}
						</span>
					))}
					<div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs">
						<time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
						{readingTime && (
							<>
								<span aria-hidden="true">·</span>
								<span>{readingTime.text}</span>
							</>
						)}
					</div>
				</div>
				{tags && tags.length > 0 && (
					<ul
						aria-label="Post tags"
						className="mt-5 flex flex-wrap gap-x-4 gap-y-1"
					>
						{tags.map((tag) => (
							<li key={tag}>
								<Link
									href={`/tags/${slug(tag)}`}
									className={`inline-flex min-h-11 items-center rounded-sm font-mono text-xs text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary hover:decoration-primary ${focus}`}
								>
									#{tag}
								</Link>
							</li>
						))}
					</ul>
				)}
				{banner && (
					<Image
						src={banner}
						alt={title}
						width={1600}
						height={900}
						sizes="(min-width: 1280px) 1024px, 100vw"
						className="mt-8 aspect-video w-full rounded-2xl border border-border object-cover"
						priority
					/>
				)}
			</header>
			<div
				className={`grid min-w-0 gap-8 py-8 sm:py-10 ${sections.length > 0 ? "lg:grid-cols-[minmax(0,1fr)_220px] lg:gap-10 xl:gap-14" : ""}`}
			>
				{sections.length > 0 && (
					<PostTableOfContents key={path} toc={sections} />
				)}
				<div className="post-prose prose min-w-0 w-full dark:prose-invert lg:col-start-1 lg:row-start-1">
					{children}
				</div>
			</div>
			<footer className="border-t border-border">
				{showSourceLinks && (
					<div className="flex flex-wrap gap-x-6 gap-y-2 border-b border-border py-4">
						<Link
							href={`https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/${path}`)}`}
							rel="nofollow"
							className={`inline-flex min-h-11 items-center rounded-sm text-sm text-muted-foreground hover:text-primary ${focus}`}
						>
							Discuss on Twitter{" "}
							<span className="ml-2" aria-hidden="true">
								↗
							</span>
						</Link>
						<Link
							href={`${siteMetadata.siteRepo}/blob/main/data/${filePath}`}
							className={`inline-flex min-h-11 items-center rounded-sm text-sm text-muted-foreground hover:text-primary ${focus}`}
						>
							View on GitHub{" "}
							<span className="ml-2" aria-hidden="true">
								↗
							</span>
						</Link>
					</div>
				)}
				{(prev || next) && (
					<nav
						aria-label="More posts"
						className="grid divide-y divide-border border-b border-border sm:grid-cols-2 sm:divide-x sm:divide-y-0"
					>
						{prev && (
							<Link
								href={`/${prev.path}`}
								rel="prev"
								className={`group flex min-w-0 flex-col gap-3 py-6 sm:pr-6 ${focus}`}
							>
								<span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
									← Previous
								</span>
								<span className="text-lg font-medium leading-snug text-foreground transition-colors group-hover:text-primary">
									{prev.title}
								</span>
							</Link>
						)}
						{next && (
							<Link
								href={`/${next.path}`}
								rel="next"
								className={`group flex min-w-0 flex-col gap-3 py-6 sm:col-start-2 sm:pl-6 ${focus}`}
							>
								<span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
									Next →
								</span>
								<span className="text-lg font-medium leading-snug text-foreground transition-colors group-hover:text-primary">
									{next.title}
								</span>
							</Link>
						)}
					</nav>
				)}
				<Link
					href="/blog"
					className={`mt-5 inline-flex min-h-11 items-center rounded-sm text-sm font-medium text-primary transition-colors hover:text-primary-hover ${focus}`}
				>
					← Back to the blog
				</Link>
			</footer>
		</article>
	);
}
