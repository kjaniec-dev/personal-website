"use client";

import {
	type Action,
	KBarAnimator,
	KBarPortal,
	KBarPositioner,
	KBarResults,
	KBarSearch,
	useKBar,
	useMatches,
	useRegisterActions,
} from "kbar";
import { useLayoutEffect, useRef } from "react";

type SearchStatus = "loading" | "ready" | "error";

export default function SearchDialog({
	actions,
	status,
}: {
	actions: Action[];
	status: SearchStatus;
}) {
	useRegisterActions(actions, [actions]);
	return (
		<KBarPortal>
			<KBarPositioner
				className="z-[100] bg-background/70 backdrop-blur-sm"
				style={{ padding: "min(10dvh, 80px) 16px 16px" }}
			>
				<KBarAnimator className="w-full max-w-xl">
					<SearchPanel status={status} />
				</KBarAnimator>
			</KBarPositioner>
		</KBarPortal>
	);
}

function SearchPanel({ status }: { status: SearchStatus }) {
	const { query } = useKBar();
	const { results } = useMatches();
	const closeRef = useRef<HTMLButtonElement>(null);

	useLayoutEffect(() => {
		// Register before KBar's result handler so the close button supports Enter.
		const handleKey = (event: KeyboardEvent) => {
			const close = closeRef.current;
			if (event.key === "Tab") {
				event.preventDefault();
				event.stopImmediatePropagation();
				if (document.activeElement === close) query.getInput().focus();
				else close?.focus();
			} else if (
				document.activeElement === close &&
				(event.key === "Enter" || event.key === " ")
			) {
				event.preventDefault();
				event.stopImmediatePropagation();
				query.toggle();
			}
		};
		window.addEventListener("keydown", handleKey, true);
		return () => window.removeEventListener("keydown", handleKey, true);
	}, [query]);

	return (
		<div
			role="dialog"
			aria-modal="true"
			aria-label="Search"
			className="overflow-hidden rounded-3xl border border-border bg-surface font-sans text-foreground shadow-kj-lg"
		>
			<div className="flex items-center gap-2 border-b border-border p-3 sm:gap-3 sm:p-4">
				<div className="flex min-w-0 flex-1 items-center gap-2 rounded-2xl border border-border bg-background px-3 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
					<svg
						aria-hidden="true"
						className="h-5 w-5 shrink-0 text-muted-foreground"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.75"
					>
						<circle cx="10.5" cy="10.5" r="6.5" />
						<path strokeLinecap="round" d="m16 16 4.5 4.5" />
					</svg>
					<KBarSearch
						aria-label="Search articles and projects"
						defaultPlaceholder="Search articles and projects…"
						className="h-12 w-full min-w-0 text-ellipsis border-0 bg-transparent p-0 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-0"
					/>
				</div>
				<button
					ref={closeRef}
					type="button"
					onClick={() => query.toggle()}
					aria-label="Close search"
					className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-subtle hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
				>
					<svg
						aria-hidden="true"
						className="h-5 w-5"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.75"
					>
						<path strokeLinecap="round" d="m6 6 12 12M18 6 6 18" />
					</svg>
				</button>
			</div>
			{status !== "ready" && (
				<p role="status" className="px-5 py-3 text-sm text-muted-foreground">
					{status === "loading"
						? "Loading articles and projects…"
						: "Search content is unavailable. You can still navigate to pages below."}
				</p>
			)}
			<div className="p-2 [&>div]:max-h-[min(55dvh,420px)]! [&>div]:overscroll-contain">
				{results.length ? (
					<KBarResults
						items={results}
						maxHeight={420}
						onRender={({ item, active }) =>
							typeof item === "string" ? (
								<div className="px-3 pt-4 pb-2 font-mono text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
									{item}
								</div>
							) : (
								<div
									className={`flex min-h-12 cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-3 transition-colors ${active ? "bg-primary/10 text-primary" : "text-foreground"}`}
								>
									<div className="min-w-0">
										<div className="text-sm font-medium break-words">
											{item.name}
										</div>
										{item.subtitle && (
											<div className="mt-1 line-clamp-1 text-xs text-muted-foreground">
												{item.subtitle}
											</div>
										)}
									</div>
									{item.shortcut?.length ? (
										<div
											aria-hidden="true"
											className="hidden shrink-0 gap-1 sm:flex"
										>
											{item.shortcut.map((key) => (
												<kbd
													key={key}
													className="flex h-6 min-w-6 items-center justify-center rounded-md border border-border bg-subtle px-1 font-mono text-[11px] text-muted-foreground"
												>
													{key}
												</kbd>
											))}
										</div>
									) : null}
								</div>
							)
						}
					/>
				) : (
					<p
						role="status"
						className="px-3 py-10 text-center text-sm text-muted-foreground"
					>
						No results. Try another title, topic or technology.
					</p>
				)}
			</div>
			<div
				aria-hidden="true"
				className="hidden items-center gap-4 border-t border-border px-5 py-3 font-mono text-[11px] text-muted-foreground sm:flex"
			>
				<span>↑ ↓ navigate</span>
				<span>↵ open</span>
				<span className="ml-auto">esc close</span>
			</div>
		</div>
	);
}
