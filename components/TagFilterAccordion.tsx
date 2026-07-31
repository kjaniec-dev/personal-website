"use client";

import { slug } from "github-slugger";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	Badge,
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
	const [open, setOpen] = useState(pathname?.startsWith("/tags/") ?? false);
	const activeTag = TAG_GROUPS.flatMap((group) => group.tags).find(
		(tag) => pathname === `/tags/${slug(tag)}`,
	);
	const activeGroup = TAG_GROUPS.find((group) =>
		activeTag ? group.tags.includes(activeTag) : false,
	);

	return (
		<div className="rounded-kj-lg border border-border/60 bg-surface p-4 lg:hidden">
			<Button
				variant="ghost"
				size="sm"
				className="flex w-full items-center justify-between px-3 text-left font-mono text-xs font-bold uppercase tracking-[0.2em] text-foreground hover:bg-transparent"
				aria-expanded={open}
				aria-controls={panelId}
				onClick={() => setOpen((current) => !current)}
			>
				<span>Filtruj po tagach</span>
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
				<div id={panelId} className="mt-3">
					<Link
						href="/blog"
						className={`mb-2 block rounded-kj-md px-2.5 py-2 font-sans text-sm transition-colors ${
							pathname === "/blog"
								? "bg-primary/10 font-semibold text-primary"
								: "text-muted-foreground hover:bg-subtle hover:text-foreground"
						}`}
					>
						All posts
					</Link>

					{activeTag ? (
						<div className="mb-2 flex items-center justify-between gap-3 rounded-kj-md bg-primary/5 px-2.5 py-1.5">
							<span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
								Selected tag
							</span>
							<Link
								href={`/tags/${slug(activeTag)}`}
								aria-label={`Selected tag: #${activeTag}`}
							>
								<Badge variant="primary">#{activeTag}</Badge>
							</Link>
						</div>
					) : null}

					<Accordion
						key={pathname}
						type="single"
						defaultValue={activeGroup ? [activeGroup.id] : []}
						className="space-y-2 rounded-none border-none bg-transparent overflow-visible"
					>
						{TAG_GROUPS.map((group) => {
							const groupTags = group.tags.filter((tag) => tag in tagCounts);

							if (groupTags.length === 0) return null;

							return (
								<AccordionItem
									key={group.id}
									value={group.id}
									className="overflow-hidden rounded-kj-md border border-border/60 bg-background"
								>
									<AccordionTrigger className="py-2.5 text-left font-sans text-sm font-semibold text-foreground hover:no-underline">
										<span className="flex w-full items-center justify-between gap-3">
											<span>{group.label}</span>
											<span className="font-mono text-[11px] font-normal text-muted-foreground">
												{groupTags.length} tags
											</span>
										</span>
									</AccordionTrigger>
									<AccordionContent className="pb-2">
										<ul className="space-y-1 border-t border-border/40 pt-2">
											{groupTags.map((tag) => {
												const tagSlug = slug(tag);
												const active = pathname === `/tags/${tagSlug}`;

												return (
													<li key={tag}>
														<Link
															href={`/tags/${tagSlug}`}
															className={`flex items-center justify-between rounded-kj-md px-2.5 py-1.5 font-sans text-sm transition-colors ${
																active
																	? "bg-primary/10 font-semibold text-primary"
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
