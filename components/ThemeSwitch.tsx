"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitch = () => {
	const [mounted, setMounted] = useState(false);
	const { setTheme, resolvedTheme } = useTheme();

	useEffect(() => setMounted(true), []);

	if (!mounted) {
		return <div className="border-rule h-9 w-9 border" aria-hidden="true" />;
	}

	const isDark = resolvedTheme === "dark";

	return (
		<button
			type="button"
			onClick={() => setTheme(isDark ? "light" : "dark")}
			aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
			className="group border-rule text-ink dark:text-paper hover:border-ink dark:hover:border-paper relative inline-flex h-9 w-9 items-center justify-center border transition-colors"
		>
			<svg
				className={`absolute h-[18px] w-[18px] transition-all duration-500 ${
					isDark ? "scale-100 opacity-100" : "scale-75 opacity-0"
				}`}
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				strokeWidth={1.4}
			>
				<title>Sun icon</title>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
				/>
			</svg>
			<svg
				className={`absolute h-[18px] w-[18px] transition-all duration-500 ${
					isDark ? "scale-75 opacity-0" : "scale-100 opacity-100"
				}`}
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				strokeWidth={1.4}
			>
				<title>Moon icon</title>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
				/>
			</svg>
		</button>
	);
};

export default ThemeSwitch;
