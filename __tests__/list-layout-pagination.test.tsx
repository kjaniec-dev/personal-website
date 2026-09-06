import {
	cleanup,
	fireEvent,
	render,
	screen,
	within,
} from "@testing-library/react";
import type { Blog } from "contentlayer/generated";
import type { CoreContent } from "pliny/utils/contentlayer";
import { afterEach, describe, expect, it, vi } from "vitest";
import ListLayoutWithTags from "@/layouts/ListLayoutWithTags";

const navigation = vi.hoisted(() => ({
	pathname: "/blog/page/2",
	push: vi.fn(),
}));

vi.mock("next/navigation", () => ({
	usePathname: () => navigation.pathname,
	useRouter: () => ({ push: navigation.push }),
}));

afterEach(() => {
	cleanup();
	vi.unstubAllEnvs();
	navigation.pathname = "/blog/page/2";
	navigation.push.mockClear();
});

describe("ListLayoutWithTags pagination", () => {
	it("keeps the tag heading and active filter on later tag pages", () => {
		navigation.pathname = "/tags/react/page/2";
		render(<ListLayoutWithTags title="React" posts={[]} />);
		expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(
			"#react.",
		);
		const sidebar = screen.getByRole("complementary", {
			name: "Filter articles by tag",
		});
		expect(
			within(sidebar)
				.getByRole("link", { name: /^#react/ })
				.getAttribute("aria-current"),
		).toBe("page");
	});

	it.each(["/blog", "/tags/react"])(
		"routes pagination within %s",
		(basePath) => {
			navigation.pathname = `${basePath}/page/2`;
			render(
				<ListLayoutWithTags
					title="Posts"
					posts={[]}
					pagination={{ currentPage: 2, totalPages: 3 }}
				/>,
			);
			const pager = within(screen.getByTestId("bottom-pagination"));
			fireEvent.click(pager.getByRole("button", { name: "Previous" }));
			expect(navigation.push).toHaveBeenLastCalledWith(basePath);
			fireEvent.click(pager.getByRole("button", { name: "Next" }));
			expect(navigation.push).toHaveBeenLastCalledWith(`${basePath}/page/3`);
		},
	);

	it("keeps All posts active on later blog pages", () => {
		render(<ListLayoutWithTags title="All Posts" posts={[]} />);
		expect(
			screen
				.getByRole("link", { name: "All posts" })
				.getAttribute("aria-current"),
		).toBe("page");
	});

	it("keeps publication dates stable across viewer time zones", () => {
		vi.stubEnv("TZ", "Europe/Warsaw");
		const posts: CoreContent<Blog>[] = [
			{
				type: "Blog",
				slug: "date-test",
				filePath: "blog/date-test.mdx",
				toc: [],
				structuredData: {},
				path: "blog/date-test",
				date: "2026-01-01T23:30:00Z",
				title: "Date test",
				readingTime: { text: "1 min read" },
				tags: [],
			},
		];
		render(<ListLayoutWithTags title="All Posts" posts={posts} />);
		expect(screen.getByText("January 1, 2026")).toBeDefined();
	});
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
		const article = screen.getByRole("article");
		const tagLink = within(article).getByRole("link", { name: "#react" });
		expect(tagLink.getAttribute("href")).toBe("/tags/react");
		expect(tagLink.parentElement?.closest("a")).toBeNull();
		expect(
			within(article)
				.getByRole("link", { name: "Test post" })
				.getAttribute("href"),
		).toBe("/blog/test-post");
		expect(
			screen
				.getByRole("link", { name: "Browse all tags" })
				.getAttribute("href"),
		).toBe("/tags");
	});
});
