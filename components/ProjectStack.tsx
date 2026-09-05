"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

export default function ProjectStack({ children }: { children: ReactNode }) {
	const ref = useRef<HTMLDivElement>(null);
	const [canStack, setCanStack] = useState(false);

	// biome-ignore lint/correctness/useExhaustiveDependencies: Re-observe panels when the server-rendered selection changes.
	useEffect(() => {
		const container = ref.current;
		if (!container || typeof ResizeObserver === "undefined") return;

		const panels = Array.from(container.children);
		const measure = () => {
			const offset = panels[0]
				? Number.parseFloat(getComputedStyle(panels[0]).scrollMarginTop) || 0
				: 0;
			setCanStack(
				panels.length > 0 &&
					panels.every(
						(panel) =>
							panel.getBoundingClientRect().height <=
							window.innerHeight - offset - 16,
					),
			);
		};

		const observer = new ResizeObserver(measure);
		for (const panel of panels) observer.observe(panel);
		window.addEventListener("resize", measure);
		measure();

		return () => {
			observer.disconnect();
			window.removeEventListener("resize", measure);
		};
	}, [children]);

	return (
		<div
			ref={ref}
			data-stackable={canStack}
			className="project-showcase relative isolate space-y-6 lg:grid lg:auto-rows-fr lg:gap-12 lg:space-y-0"
		>
			{children}
		</div>
	);
}
