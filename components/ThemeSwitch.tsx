"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ClientUI";

const SunIcon = () => (
	<svg
		className="h-4 w-4"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
	>
		<title>Light theme</title>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
		/>
	</svg>
);

const MoonIcon = () => (
	<svg
		className="h-4 w-4"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
	>
		<title>Dark theme</title>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
		/>
	</svg>
);

const SystemIcon = () => (
	<svg
		className="h-4 w-4"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
	>
		<title>System theme</title>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 002-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
		/>
	</svg>
);

const CheckIcon = () => (
	<svg
		className="h-3.5 w-3.5 text-primary ml-auto"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
	>
		<title>Selected</title>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2.5}
			d="M5 13l4 4L19 7"
		/>
	</svg>
);

export default function ThemeSwitch() {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return <div className="h-9 w-9" />;
	}

	const currentTheme = theme || "system";

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					aria-label="Toggle theme"
					className="rounded-full bg-surface hover:bg-subtle text-foreground shadow-sm border-border"
				>
					{currentTheme === "light" ? (
						<SunIcon />
					) : currentTheme === "dark" ? (
						<MoonIcon />
					) : (
						<SystemIcon />
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-36">
				<DropdownMenuItem
					onClick={() => setTheme("light")}
					className="flex items-center gap-2 cursor-pointer"
				>
					<SunIcon />
					<span>Light</span>
					{currentTheme === "light" && <CheckIcon />}
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => setTheme("dark")}
					className="flex items-center gap-2 cursor-pointer"
				>
					<MoonIcon />
					<span>Dark</span>
					{currentTheme === "dark" && <CheckIcon />}
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => setTheme("system")}
					className="flex items-center gap-2 cursor-pointer"
				>
					<SystemIcon />
					<span>System</span>
					{currentTheme === "system" && <CheckIcon />}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
