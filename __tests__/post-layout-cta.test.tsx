import { cleanup, render, screen } from "@testing-library/react";
import type { Blog } from "contentlayer/generated";
import type { CoreContent } from "pliny/utils/contentlayer";
import { afterEach, describe, expect, it } from "vitest";
import siteMetadata from "@/data/siteMetadata";
import PostLayout from "@/layouts/PostLayout";

afterEach(cleanup);

const mockContent: CoreContent<Blog> = {
	type: "Blog",
	slug: "test-post",
	date: "2024-01-01",
	title: "Test Post Title",
	tags: ["test"],
	path: "blog/test-post",
	filePath: "blog/test-post.mdx",
	toc: [],
	readingTime: { text: "1 min read", minutes: 1, time: 60000, words: 100 },
	structuredData: {},
};

describe("PostLayout ContactCTA", () => {
	it("renders ContactCTA with inquiry heading and copy email button in footer", () => {
		render(
			<PostLayout content={mockContent}>
				<p>Post body</p>
			</PostLayout>,
		);

		expect(
			screen.getByRole("heading", {
				level: 2,
				name: "Working on a technical challenge?",
			}),
		).toBeDefined();

		expect(
			screen.getByText(
				"I partner with teams on architecture, performance, and full-stack development. Let's discuss your project.",
			),
		).toBeDefined();

		const contactLink = screen.getByRole("link", { name: /Let's talk/i });
		expect(contactLink.getAttribute("href")).toBe(
			`mailto:${siteMetadata.email}`,
		);

		expect(
			screen.getByRole("button", {
				name: /Copy contact@kjaniec.dev to clipboard/i,
			}),
		).toBeDefined();
	});
});
