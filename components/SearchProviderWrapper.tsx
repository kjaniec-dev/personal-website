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
		initialOpen?: boolean;
	}> | null>(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [initialOpen, setInitialOpen] = useState(false);

	useEffect(() => {
		let isCancelled = false;
		let isTriggered = false;
		let triggerOpenOnLoad = false;
		let timeoutId: ReturnType<typeof setTimeout> | undefined;
		let idleId: number | undefined;

		const cancelIdleTimer = () => {
			if (timeoutId) {
				clearTimeout(timeoutId);
				timeoutId = undefined;
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
				idleId = undefined;
			}
		};

		const removeEventListeners = () => {
			window.removeEventListener("open-search", handleOpenEvent);
			window.removeEventListener("keydown", handleKeyDown);
		};

		const loadSearchProvider = async (shouldOpen = false) => {
			if (shouldOpen) {
				triggerOpenOnLoad = true;
			}
			if (isTriggered) return;
			isTriggered = true;
			cancelIdleTimer();

			try {
				const { SearchProvider: SP } = await import("./SearchProvider");
				if (!isCancelled) {
					removeEventListeners();
					if (triggerOpenOnLoad) {
						setInitialOpen(true);
					}
					setSearchProvider(() => SP);
					setIsLoaded(true);
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
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				void loadSearchProvider(true);
			}
		};

		window.addEventListener("open-search", handleOpenEvent);
		window.addEventListener("keydown", handleKeyDown);

		// Otherwise load when browser is idle
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
			cancelIdleTimer();
			removeEventListeners();
		};
	}, []);

	// Render children immediately, wrap with search provider once loaded
	if (!isLoaded || !SearchProvider) {
		return <>{children}</>;
	}

	return (
		<Suspense fallback={children}>
			<SearchProvider initialOpen={initialOpen}>{children}</SearchProvider>
		</Suspense>
	);
}
