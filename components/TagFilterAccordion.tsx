"use client";

import { slug } from "github-slugger";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	Button,
} from "@/components/ClientUI";
import Link from "@/components/Link";
import { TAG_GROUPS } from "@/data/tagGroups";

interface TagFilterAccordionProps {
	tagCounts: Record<string, number>;
}

const panelId = "mobile-tag-filter-panel";

export default function TagFilterAccordion({
	tagCounts,
}: TagFilterAccordionProps) {
	const pathname = usePathname();
	const basePath = pathname?.replace(/\/page\/\d+$/, "");
	const [open, setOpen] = useState(pathname?.startsWith("/tags/") ?? false);
	const activeTag = TAG_GROUPS.flatMap((group) => group.tags).find(
		(tag) => basePath === `/tags/${slug(tag)}`,
	);
	const activeGroup = TAG_GROUPS.find((group) =>
		activeTag ? group.tags.includes(activeTag) : false,
	);

	return (
		<div
			data-tag-filter=""
			className="rounded-kj-lg border border-border bg-surface p-2 lg:hidden"
		>
			<Button
				variant="ghost"
				size="sm"
				className="flex min-h-11 w-full items-center justify-between px-3 text-left font-mono text-xs font-bold uppercase tracking-[0.2em] text-foreground hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
				aria-expanded={open}
				aria-controls={panelId}
				onClick={() => setOpen((current) => !current)}
			>
				<span>Filter by tags</span>
				<svg
					className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					aria-hidden="true"
				>
					<path d="m6 9 6 6 6-6" />
				</svg>
			</Button>

			{open ? (
				<div id={panelId} className="mt-2">
					<Link
						href="/blog"
						aria-current={basePath === "/blog" ? "page" : undefined}
						className={`mb-2 flex min-h-11 items-center rounded-kj-md px-3 py-2 font-sans text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
							basePath === "/blog"
								? "font-semibold text-primary underline underline-offset-4"
								: "text-muted-foreground hover:bg-subtle hover:text-foreground"
						}`}
					>
						All posts
					</Link>

					{activeTag ? (
						<div className="mb-2 flex flex-wrap items-center justify-between gap-x-3 px-3">
							<span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
								Selected tag
							</span>
							<Link
								href={`/tags/${slug(activeTag)}`}
								aria-label={`Selected tag: #${activeTag}`}
								className="inline-flex min-h-11 items-center rounded-sm font-mono text-xs text-primary underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
							>
								#{activeTag}
							</Link>
						</div>
					) : null}

					<Accordion
						key={pathname}
						type="single"
						defaultValue={activeGroup ? [activeGroup.id] : []}
						className="rounded-none border-none bg-transparent overflow-visible"
					>
						{TAG_GROUPS.map((group) => {
							const groupTags = group.tags
								.filter((tag) => tag in tagCounts)
								.sort((a, b) => tagCounts[b] - tagCounts[a]);

							if (groupTags.length === 0) return null;

							return (
								<AccordionItem
									key={group.id}
									value={group.id}
									className="border-t border-border/60 first:border-t"
								>
									<AccordionTrigger className="min-h-11 bg-transparent px-3 py-3 text-left font-sans text-sm font-medium text-foreground hover:bg-subtle hover:no-underline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary">
										<span className="flex w-full items-center justify-between gap-3">
											<span>{group.label}</span>
											<span className="shrink-0 font-mono text-[11px] font-normal text-muted-foreground">
												{groupTags.length} tags
											</span>
										</span>
									</AccordionTrigger>
									<AccordionContent className="px-3 pb-3">
										<ul className="space-y-1">
											{groupTags.map((tag) => {
												const tagSlug = slug(tag);
												const active = basePath === `/tags/${tagSlug}`;

												return (
													<li key={tag}>
														<Link
															href={`/tags/${tagSlug}`}
															aria-current={active ? "page" : undefined}
															className={`flex min-h-11 items-center justify-between gap-3 rounded-kj-md px-3 py-2 font-sans text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
																active
																	? "bg-primary/5 font-semibold text-primary underline underline-offset-4"
																	: "text-muted-foreground hover:bg-subtle hover:text-foreground"
															}`}
														>
															<span>#{tag}</span>
															<span className="font-mono text-[11px] text-muted-foreground">
																{tagCounts[tag]}
															</span>
														</Link>
													</li>
												);
											})}
										</ul>
									</AccordionContent>
								</AccordionItem>
							);
						})}
					</Accordion>
				</div>
			) : null}
		</div>
	);
}
