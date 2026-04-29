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
		setIsMac(navigator.platform.toUpperCase().indexOf("MAC") >= 0);

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

			if ("requestIdleCallback" in window) {
				requestIdleCallback(() => loadSearchButton());
			} else {
				setTimeout(() => loadSearchButton(), 1);
			}
		}
	}, []);

	const SearchContent = () => (
		<div className="group border-rule text-ink dark:text-paper hover:border-ink dark:hover:border-paper inline-flex h-9 items-center gap-2 border px-3 transition-colors">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className="h-4 w-4"
			>
				<title>Search icon</title>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
				/>
			</svg>
			<span className="label hidden sm:inline-block">Search</span>
			<kbd className="text-ink-muted dark:text-paper-deep hidden font-mono text-[0.65rem] tracking-wider lg:inline-flex">
				{isMac ? "⌘" : "Ctrl"}·K
			</kbd>
		</div>
	);

	if (!SearchButtonComponent) {
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
