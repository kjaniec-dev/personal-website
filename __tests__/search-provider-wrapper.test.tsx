import {
	cleanup,
	fireEvent,
	render,
	screen,
	waitFor,
} from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import SearchProviderWrapper from "@/components/SearchProviderWrapper";

vi.mock("next/navigation", () => ({
	useRouter: () => ({
		push: vi.fn(),
	}),
}));

vi.mock("@/components/SearchProvider", () => ({
	SearchProvider: ({
		children,
		initialOpen,
	}: {
		children: ReactNode;
		initialOpen?: boolean;
	}) => (
		<div data-testid="search-provider" data-initial-open={String(initialOpen)}>
			{children}
		</div>
	),
}));

describe("SearchProviderWrapper", () => {
	beforeEach(() => {
		vi.useRealTimers();
	});

	afterEach(() => {
		cleanup();
		vi.restoreAllMocks();
	});

	it("renders children immediately while unloaded", () => {
		render(
			<SearchProviderWrapper searchConfig={{} as never}>
				<div>Content</div>
			</SearchProviderWrapper>,
		);
		expect(screen.getByText("Content")).toBeDefined();
		expect(screen.queryByTestId("search-provider")).toBeNull();
	});

	it("loads SearchProvider with initialOpen=true when open-search event is dispatched", async () => {
		render(
			<SearchProviderWrapper searchConfig={{} as never}>
				<div>Content</div>
			</SearchProviderWrapper>,
		);

		fireEvent(window, new CustomEvent("open-search"));

		await waitFor(() => {
			const provider = screen.getByTestId("search-provider");
			expect(provider).toBeDefined();
			expect(provider.getAttribute("data-initial-open")).toBe("true");
		});
	});

	it("loads SearchProvider with initialOpen=false on idle timeout", async () => {
		render(
			<SearchProviderWrapper searchConfig={{} as never}>
				<div>Content</div>
			</SearchProviderWrapper>,
		);

		await waitFor(
			() => {
				const provider = screen.getByTestId("search-provider");
				expect(provider).toBeDefined();
				expect(provider.getAttribute("data-initial-open")).toBe("false");
			},
			{ timeout: 3000 },
		);
	});
});
