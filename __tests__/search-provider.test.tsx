import {
	cleanup,
	fireEvent,
	render,
	screen,
	waitFor,
} from "@testing-library/react";
import { useMatches } from "kbar";
import { AppRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { SearchProvider } from "@/components/SearchProvider";

const push = vi.hoisted(() => vi.fn());
const router = {
	bfcacheId: "test",
	push,
	back: vi.fn(),
	forward: vi.fn(),
	refresh: vi.fn(),
	replace: vi.fn(),
	prefetch: vi.fn(),
	hmrRefresh: vi.fn(),
};

function renderSearch() {
	return render(
		<AppRouterContext.Provider value={router}>
			<SearchProvider>
				<SearchActions />
			</SearchProvider>
		</AppRouterContext.Provider>,
	);
}

function SearchActions() {
	const { results } = useMatches();
	return results.map((action) =>
		typeof action === "string" ? null : (
			<button
				key={action.id}
				type="button"
				onClick={() => action.command?.perform(action)}
			>
				{action.name}
			</button>
		),
	);
}

beforeEach(() => push.mockClear());
afterEach(() => {
	cleanup();
	vi.unstubAllGlobals();
});

describe("Search document registration", () => {
	it("opens an indexed article through its local blog route", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn().mockResolvedValue({
				ok: true,
				json: async () => [
					{
						title: "Architecture notes",
						path: "blog/architecture",
						type: "blog",
						tags: ["design"],
						summary: "System design",
					},
				],
			}),
		);
		renderSearch();
		fireEvent.click(
			await screen.findByRole("button", { name: "Architecture notes" }),
		);
		expect(push).toHaveBeenCalledWith("/blog/architecture");
	});

	it("keeps page navigation available when the search index cannot load", async () => {
		const fetchIndex = vi.fn().mockRejectedValue(new Error("Offline"));
		vi.stubGlobal("fetch", fetchIndex);
		renderSearch();
		await waitFor(() => expect(fetchIndex).toHaveBeenCalled());
		fireEvent.click(await screen.findByRole("button", { name: "Projects" }));
		expect(push).toHaveBeenCalledWith("/projects");
	});
});
