"use client";

import { useKBar } from "kbar";
import { useEffect, useState } from "react";
import { Button } from "@/components/ClientUI";

export default function SearchButton() {
	const { query } = useKBar();
	const [isMac, setIsMac] = useState(false);

	useEffect(() => {
		setIsMac(navigator.userAgent.includes("Mac"));
	}, []);

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={() => query?.toggle()}
			aria-label="Search"
			title={`Search (${isMac ? "⌘" : "Ctrl"}+K)`}
			className="h-12 w-12 shrink-0 rounded-full text-muted-foreground hover:bg-subtle hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring md:h-10 md:w-10 [&_svg]:h-5 [&_svg]:w-5"
		>
			<svg
				className="h-5 w-5"
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
		</Button>
	);
}
