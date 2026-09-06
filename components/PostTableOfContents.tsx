"use client";

import { useEffect, useRef, useState } from "react";

export interface TocItem {
	value: string;
	depth: number;
	url: string;
}

export default function PostTableOfContents({ toc }: { toc: TocItem[] }) {
	const [activeId, setActiveId] = useState("");
	const disclosure = useRef<HTMLDetailsElement>(null);

	useEffect(() => {
		const headings = toc
			.map((item) =>
				document.getElementById(decodeURIComponent(item.url.slice(1))),
			)
			.filter((heading): heading is HTMLElement => heading !== null);
		let frame = 0;
		const update = () => {
			frame = 0;
			let current = "";
			for (const heading of headings) {
				if (heading.getBoundingClientRect().top > 160) break;
				current = heading.id;
			}
			setActiveId(current);
		};
		const schedule = () => {
			if (!frame) frame = requestAnimationFrame(update);
		};
		schedule();
		window.addEventListener("scroll", schedule, { passive: true });
		window.addEventListener("resize", schedule);
		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener("scroll", schedule);
			window.removeEventListener("resize", schedule);
		};
	}, [toc]);

	if (toc.length === 0) return null;

	const links = (mobile: boolean) => (
		<nav aria-label="Table of contents">
			<ol className="space-y-1">
				{toc.map((item) => {
					const active = activeId === decodeURIComponent(item.url.slice(1));
					return (
						<li key={item.url}>
							<a
								href={item.url}
								aria-current={active ? "location" : undefined}
								onClick={() => {
									if (mobile && disclosure.current)
										disclosure.current.open = false;
								}}
								className={`flex min-h-11 items-center border-l-2 py-2 pr-2 text-sm leading-relaxed transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary motion-reduce:transition-none lg:min-h-8 lg:text-xs ${item.depth > 2 ? "pl-6" : "pl-3"} ${active ? "border-primary font-medium text-primary" : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"}`}
							>
								{item.value}
							</a>
						</li>
					);
				})}
			</ol>
		</nav>
	);

	return (
		<aside className="min-w-0 lg:sticky lg:top-28 lg:col-start-2 lg:row-start-1 lg:self-start">
			<details
				ref={disclosure}
				className="group rounded-xl border border-border bg-surface lg:hidden"
			>
				<summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 font-mono text-xs uppercase tracking-widest text-foreground focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary [&::-webkit-details-marker]:hidden">
					On this page
					<svg
						aria-hidden="true"
						className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180 motion-reduce:transition-none"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
					>
						<path d="m6 9 6 6 6-6" />
					</svg>
				</summary>
				<div className="max-h-[60dvh] overflow-y-auto overscroll-contain border-t border-border p-3">
					{links(true)}
				</div>
			</details>
			<div className="hidden lg:block">
				<p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
					On this page
				</p>
				<div className="max-h-[calc(100dvh-10rem)] overflow-y-auto overscroll-contain pr-2">
					{links(false)}
				</div>
			</div>
		</aside>
	);
}
