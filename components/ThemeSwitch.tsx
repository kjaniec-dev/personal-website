"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitch = () => {
	const [mounted, setMounted] = useState(false);
	const { setTheme, resolvedTheme } = useTheme();

	// When mounted on client, now we can show the UI
	useEffect(() => setMounted(true), []);

	if (!mounted) {
		return (
			<div className="h-9 w-9 rounded-kj-md border border-border bg-surface/50" />
		);
	}

	const isDark = resolvedTheme === "dark";

	const toggleTheme = () => {
		setTheme(isDark ? "light" : "dark");
	};

	return (
		<button
			type="button"
			onClick={toggleTheme}
			aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
			className="group relative inline-flex h-9 w-9 items-center justify-center rounded-kj-md border border-border bg-surface/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-primary/5 hover:shadow-kj-sm"
		>
			{/* Sun icon (visible in dark mode) */}
			<svg
				className={`absolute h-5 w-5 text-muted-foreground transition-all duration-500 group-hover:text-primary ${
					isDark
						? "scale-100 rotate-0 opacity-100"
						: "scale-0 rotate-90 opacity-0"
				}`}
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<title>Sun icon</title>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
				/>
			</svg>

			{/* Moon icon (visible in light mode) */}
			<svg
				className={`absolute h-5 w-5 text-muted-foreground transition-all duration-500 group-hover:text-primary ${
					isDark
						? "scale-0 -rotate-90 opacity-0"
						: "scale-100 rotate-0 opacity-100"
				}`}
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<title>Moon icon</title>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
				/>
			</svg>

			{/* Ripple effect on click */}
			<span className="pointer-events-none absolute inset-0 rounded-kj-md bg-primary/10 opacity-0 transition-opacity duration-300 group-active:opacity-100" />
		</button>
	);
};

export default ThemeSwitch;
