"use client";

import type { Authors, Blog } from "contentlayer/generated";
import type { CoreContent } from "pliny/utils/contentlayer";
import { formatDate } from "pliny/utils/formatDate";
import { type ReactNode, useEffect, useState } from "react";
import Card from "@/components/Card";
import Comments from "@/components/Comments";
import Image from "@/components/Image";
import Link from "@/components/Link";
import Pill from "@/components/Pill";
import ScrollTopAndComment from "@/components/ScrollTopAndComment";
import SectionContainer from "@/components/SectionContainer";
import siteMetadata from "@/data/siteMetadata";

export interface TocItem {
	value: string;
	depth: number;
	url: string;
}

interface LayoutProps {
	content: CoreContent<Blog>;
	authorDetails: CoreContent<Authors>[];
	next?: { path: string; title: string };
	prev?: { path: string; title: string };
	toc?: TocItem[];
	children: ReactNode;
}

const editUrl = (path: string) =>
	`${siteMetadata.siteRepo}/blob/main/data/${path}`;

const discussUrl = (path: string) =>
	`https://mobile.twitter.com/search?q=${encodeURIComponent(
		`${siteMetadata.siteUrl}/${path}`,
	)}`;

export default function PostLayout({
	content,
	authorDetails,
	next,
	prev,
	toc = [],
	children,
}: LayoutProps) {
	const { filePath, path, slug, date, title, tags, readingTime } = content;
	const basePath = path.split("/")[0];
	const [activeId, setActiveId] = useState<string>("");

	useEffect(() => {
		if (!toc || toc.length === 0) return;

		const handleIntersection = (entries: IntersectionObserverEntry[]) => {
			// Find headings that are visible in the viewport, prioritizing the one closest to top
			const visibleHeadings = entries
				.filter((entry) => entry.isIntersecting)
				.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

			if (visibleHeadings.length > 0) {
				setActiveId(visibleHeadings[0].target.id);
			}
		};

		const observer = new IntersectionObserver(handleIntersection, {
			rootMargin: "-80px 0px -70% 0px", // triggers when heading is in the upper part of screen
		});

		// Observe all elements that correspond to our TOC URLs
		toc.forEach((item) => {
			const id = item.url.replace(/^#/, "");
			const el = document.getElementById(id);
			if (el) observer.observe(el);
		});

		return () => observer.disconnect();
	}, [toc]);

	return (
		<SectionContainer>
			<ScrollTopAndComment />
			<article className="space-y-8 py-8">
				<Card glow padded>
					<div className="space-y-4">
						{tags && tags.length > 0 ? (
							<div className="flex flex-wrap gap-1.5">
								{tags.map((t) => (
									<Pill key={t} tone="primary">
										{t}
									</Pill>
								))}
							</div>
						) : null}
						<h1 className="font-sans text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
							{title}
						</h1>
						<div className="flex flex-wrap items-center gap-3 font-mono text-xs text-muted-foreground">
							<time dateTime={date}>
								{formatDate(date, siteMetadata.locale)}
							</time>
							{readingTime && (
								<>
									<span>·</span>
									<span>{readingTime.text}</span>
								</>
							)}
							{authorDetails.map((author) => (
								<span
									key={author.name}
									className="inline-flex items-center gap-2"
								>
									<span>·</span>
									{author.avatar ? (
										<Image
											src={author.avatar}
											width={20}
											height={20}
											alt="avatar"
											className="rounded-full"
										/>
									) : null}
									<span className="font-sans text-sm font-semibold text-foreground">
										{author.name}
									</span>
								</span>
							))}
						</div>
					</div>
				</Card>

				<div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-8 items-start">
					<div className="min-w-0 space-y-8 w-full">
						<Card
							as="section"
							padded
							className="prose dark:prose-invert max-w-none"
						>
							{children}
						</Card>
					</div>

					{toc && toc.length > 0 ? (
						<aside className="sticky top-24 hidden lg:block self-start w-full">
							<Card padded className="space-y-4">
								<p className="font-mono text-xs font-bold tracking-[0.2em] text-primary uppercase">
									Spis treści
								</p>
								<nav className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1 scrollbar-thin">
									{toc.map((item) => {
										const id = item.url.replace(/^#/, "");
										const isActive = activeId === id;
										return (
											<a
												key={item.url}
												href={item.url}
												className={`block text-xs leading-relaxed transition-all duration-200 hover:text-foreground font-sans ${
													isActive
														? "text-primary font-bold translate-x-1"
														: "text-muted-foreground font-medium hover:translate-x-0.5"
												}`}
												style={{ paddingLeft: `${(item.depth - 2) * 12}px` }}
											>
												{item.value}
											</a>
										);
									})}
								</nav>
							</Card>
						</aside>
					) : null}
				</div>

				<Card padded>
					<div className="flex flex-wrap items-center justify-between gap-4 text-sm">
						<Link
							href={discussUrl(path)}
							rel="nofollow"
							className="font-mono font-semibold text-muted-foreground transition-colors hover:text-primary"
						>
							Discuss on Twitter
						</Link>
						<Link
							href={editUrl(filePath)}
							className="font-mono font-semibold text-muted-foreground transition-colors hover:text-primary"
						>
							View on GitHub
						</Link>
					</div>
				</Card>

				{siteMetadata.comments ? (
					<Card padded>
						<Comments slug={slug} />
					</Card>
				) : null}

				{(prev || next) && (
					<Card padded>
						<div className="flex flex-wrap items-stretch justify-between gap-4">
							{prev ? (
								<Link href={`/${prev.path}`} className="group flex flex-col">
									<span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
										← Previous
									</span>
									<span className="font-sans text-base font-semibold text-foreground transition-colors group-hover:text-primary">
										{prev.title}
									</span>
								</Link>
							) : (
								<span />
							)}
							{next ? (
								<Link
									href={`/${next.path}`}
									className="group flex flex-col items-end text-right"
								>
									<span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
										Next →
									</span>
									<span className="font-sans text-base font-semibold text-foreground transition-colors group-hover:text-primary">
										{next.title}
									</span>
								</Link>
							) : (
								<span />
							)}
						</div>
					</Card>
				)}

				<div className="pt-2">
					<Link
						href={`/${basePath}`}
						className="font-mono text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
					>
						← Back to the blog
					</Link>
				</div>
			</article>
		</SectionContainer>
	);
}
