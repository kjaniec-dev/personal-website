import { render, screen } from "@testing-library/react";
import type { Blog } from "contentlayer/generated";
import type { CoreContent } from "pliny/utils/contentlayer";
import { describe, expect, it, vi } from "vitest";
import ListLayoutWithTags from "@/layouts/ListLayoutWithTags";

vi.mock("next/navigation", () => ({
	usePathname: () => "/blog/page/2",
	useRouter: () => ({ push: vi.fn() }),
}));

describe("ListLayoutWithTags pagination", () => {
	it("renders top and bottom pagination controls for paginated lists", () => {
		const posts = [
			{
				path: "blog/test-post",
				date: "2026-01-01",
				title: "Test post",
				summary: "Test summary",
				tags: ["react"],
				readingTime: { text: "1 min read" },
			},
		] as CoreContent<Blog>[];

		render(
			<ListLayoutWithTags
				title="Blog"
				posts={posts}
				pagination={{ currentPage: 2, totalPages: 3 }}
			/>,
		);

		expect(
			screen.getAllByRole("navigation", { name: "Paginacja" }),
		).toHaveLength(2);
		expect(screen.getByTestId("mobile-top-pagination").className).toContain(
			"lg:hidden",
		);
		expect(screen.getByTestId("bottom-pagination")).toBeDefined();
	});
});
