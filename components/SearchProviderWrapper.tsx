"use client";

import type { SearchConfig } from "pliny/search";
import { type ReactNode, Suspense, useEffect, useState } from "react";

interface SearchProviderWrapperProps {
	searchConfig: SearchConfig;
	children: ReactNode;
}

export default function SearchProviderWrapper({
	children,
}: SearchProviderWrapperProps) {
	const [SearchProvider, setSearchProvider] = useState<React.ComponentType<{
		children: ReactNode;
	}> | null>(null);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		let isCancelled = false;
		let isTriggered = false;

		const loadSearchProvider = async (shouldOpen = false) => {
			if (isTriggered && !shouldOpen) return;
			isTriggered = true;

			try {
				const { SearchProvider: SP } = await import("./SearchProvider");
				if (!isCancelled) {
					setSearchProvider(() => SP);
					setIsLoaded(true);
					if (shouldOpen) {
						// Wait for SearchProvider and KBarProvider to mount before triggering
						requestAnimationFrame(() => {
							setTimeout(() => {
								window.dispatchEvent(new CustomEvent("open-search"));
							}, 50);
						});
					}
				}
			} catch {
				// Ignore load failure in background
			}
		};

		// Immediate load on early search button click or shortcut
		const handleOpenEvent = () => {
			void loadSearchProvider(true);
		};

		const handleKeyDown = (e: KeyboardEvent) => {
			if (isTriggered) return;
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				void loadSearchProvider(true);
			}
		};

		window.addEventListener("open-search", handleOpenEvent, { once: true });
		window.addEventListener("keydown", handleKeyDown);

		// Otherwise load when browser is idle
		let timeoutId: ReturnType<typeof setTimeout> | undefined;
		let idleId: number | undefined;
		if (typeof window !== "undefined" && "requestIdleCallback" in window) {
			idleId = (
				window as unknown as {
					requestIdleCallback: (
						cb: () => void,
						opts?: { timeout: number },
					) => number;
				}
			).requestIdleCallback(() => void loadSearchProvider(false), {
				timeout: 2000,
			});
		} else {
			timeoutId = setTimeout(() => void loadSearchProvider(false), 1000);
		}

		return () => {
			isCancelled = true;
			window.removeEventListener("open-search", handleOpenEvent);
			window.removeEventListener("keydown", handleKeyDown);
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
			if (
				idleId &&
				typeof window !== "undefined" &&
				"cancelIdleCallback" in window
			) {
				(
					window as unknown as {
						cancelIdleCallback: (id: number) => void;
					}
				).cancelIdleCallback(idleId);
			}
		};
	}, []);

	// Render children immediately, wrap with search provider once loaded
	if (!isLoaded || !SearchProvider) {
		return <>{children}</>;
	}

	return (
		<Suspense fallback={children}>
			<SearchProvider>{children}</SearchProvider>
		</Suspense>
	);
}
