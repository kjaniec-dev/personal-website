"use client";

import { useEffect, useState } from "react";
import { Button, Kbd } from "@/components/ClientUI";
import { useSearch } from "./SearchProvider";

export default function SearchButton() {
	const { toggleSearch } = useSearch();
	const [isMac, setIsMac] = useState(false);

	useEffect(() => {
		setIsMac(navigator.userAgent.includes("Mac"));
	}, []);

	return (
		<Button
			variant="ghost"
			onClick={toggleSearch}
			aria-label="Search"
			className="flex items-center gap-2 rounded-full px-3 py-1.5 text-xs text-muted-foreground hover:bg-subtle hover:text-foreground md:px-3.5"
		>
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
			<span className="hidden sm:inline">Search</span>
			<Kbd className="hidden md:inline-flex text-[10px]">
				{isMac ? "⌘K" : "Ctrl+K"}
			</Kbd>
		</Button>
	);
}
