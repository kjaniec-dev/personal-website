"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

// Replaces pliny's Pre: the copy button stays in the DOM so keyboard and touch
// users can reach it, and the <pre> is focusable so wide snippets can be
// scrolled with the arrow keys.
export default function CodeBlock({ children }: { children?: ReactNode }) {
	const preRef = useRef<HTMLPreElement>(null);
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		if (!copied) return;
		const timeout = setTimeout(() => setCopied(false), 2000);
		return () => clearTimeout(timeout);
	}, [copied]);

	const onCopy = async () => {
		try {
			await navigator.clipboard.writeText(preRef.current?.textContent ?? "");
			setCopied(true);
		} catch {
			// Clipboard access can be denied or unavailable; leave the button idle.
		}
	};

	return (
		<div className="group relative">
			<button
				type="button"
				aria-label="Copy code"
				onClick={onCopy}
				className={`absolute top-2 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-md border bg-gray-900/80 opacity-0 backdrop-blur-sm transition focus-visible:opacity-100 group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:transition-none [@media(hover:none)]:opacity-100 ${copied ? "border-emerald-400/60 text-emerald-400" : "border-white/15 text-gray-300 hover:border-white/30 hover:text-white"}`}
			>
				<svg
					aria-hidden="true"
					className="h-4 w-4"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth={2}
					strokeLinecap="round"
					strokeLinejoin="round"
				>
					{copied ? (
						<path d="M20 6 9 17l-5-5" />
					) : (
						<>
							<rect x="9" y="9" width="13" height="13" rx="2" />
							<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
						</>
					)}
				</svg>
			</button>
			<pre
				ref={preRef}
				// biome-ignore lint/a11y/noNoninteractiveTabindex: scrollable code must be reachable by keyboard (WCAG 2.1.1)
				tabIndex={0}
				className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
			>
				{children}
			</pre>
			<span className="sr-only" aria-live="polite">
				{copied ? "Code copied to clipboard" : ""}
			</span>
		</div>
	);
}
