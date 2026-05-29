"use client";

import { type ComponentType, useEffect, useState } from "react";
import siteMetadata from "@/data/siteMetadata";

const SearchButton = () => {
	const [SearchButtonComponent, setSearchButtonComponent] =
		useState<ComponentType<{
			"aria-label": string;
			children: React.ReactNode;
		}> | null>(null);
	const [isMac, setIsMac] = useState(false);

	useEffect(() => {
		// Detect if user is on Mac
		setIsMac(navigator.platform.toUpperCase().indexOf("MAC") >= 0);

		// Only load search button component when component mounts
		if (
			siteMetadata.search &&
			(siteMetadata.search.provider === "algolia" ||
				siteMetadata.search.provider === "kbar")
		) {
			const loadSearchButton = async () => {
				if (siteMetadata.search?.provider === "algolia") {
					const { AlgoliaButton } = await import("pliny/search/AlgoliaButton");
					setSearchButtonComponent(() => AlgoliaButton);
				} else if (siteMetadata.search?.provider === "kbar") {
					const { KBarButton } = await import("pliny/search/KBarButton");
					setSearchButtonComponent(() => KBarButton);
				}
			};

			// Defer loading until browser is idle
			if ("requestIdleCallback" in window) {
				requestIdleCallback(() => loadSearchButton());
			} else {
				setTimeout(() => loadSearchButton(), 1);
			}
		}
	}, []);

	const SearchContent = () => (
		<div className="group relative inline-flex h-9 items-center gap-1.5 sm:gap-2 rounded-kj-lg border border-border bg-card/50 px-2.5 sm:px-3.5 xl:px-4 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-primary/5 hover:shadow-kj-sm">
			{/* Search icon */}
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className="h-4 w-4 text-muted-foreground transition-colors duration-300 group-hover:text-primary"
			>
				<title>Search icon</title>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
				/>
			</svg>

			{/* Search text */}
			<span className="hidden text-sm font-medium text-muted-foreground transition-colors duration-300 group-hover:text-primary sm:inline-block">
				Search
			</span>

			{/* Keyboard shortcut */}
			<kbd className="hidden items-center gap-0.5 rounded-kj-sm border border-border bg-card px-1.5 py-0.5 font-mono text-xs font-medium text-muted-foreground shadow-sm transition-all duration-300 group-hover:border-primary/30 group-hover:text-primary xl:inline-flex">
				{isMac ? "⌘" : "Ctrl"}K
			</kbd>
		</div>
	);

	if (!SearchButtonComponent) {
		// Show placeholder button while loading
		return (
			<button type="button" aria-label="Search" className="cursor-pointer">
				<SearchContent />
			</button>
		);
	}

	return (
		<SearchButtonComponent aria-label="Search">
			<SearchContent />
		</SearchButtonComponent>
	);
};

export default SearchButton;
