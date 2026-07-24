"use client";

import { KBarButton } from "pliny/search/KBarButton";
import { useEffect, useState } from "react";
import { Kbd } from "@/components/ClientUI";

export default function SearchButton() {
	const [isMac, setIsMac] = useState(false);

	useEffect(() => {
		setIsMac(navigator.userAgent.includes("Mac"));
	}, []);

	return (
		<KBarButton aria-label="Search">
			<div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs text-muted-foreground hover:bg-subtle hover:text-foreground md:px-3.5 transition-colors cursor-pointer select-none">
				<svg
					className="h-4 w-4 text-muted-foreground"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<title>Search icon</title>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
				<span className="hidden sm:inline font-sans font-semibold">Search</span>
				<Kbd className="hidden md:inline-flex text-[10px]">
					{isMac ? "⌘K" : "Ctrl+K"}
				</Kbd>
			</div>
		</KBarButton>
	);
}
