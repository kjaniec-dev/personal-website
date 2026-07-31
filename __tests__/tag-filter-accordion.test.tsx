import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import TagFilterAccordion from "@/components/TagFilterAccordion";
import { TAG_GROUPS } from "@/data/tagGroups";
import tagData from "../app/tag-data.json";

const navigation = vi.hoisted(() => ({ pathname: "/blog" }));

vi.mock("next/navigation", () => ({
	usePathname: () => navigation.pathname,
}));

afterEach(() => {
	cleanup();
	navigation.pathname = "/blog";
});

const tagCounts = Object.fromEntries(
	TAG_GROUPS.flatMap((group) =>
		group.tags.map((tag) => [
			tag,
			tag === "next-js" ? 7 : tag === "react" ? 11 : 1,
		]),
	),
);

describe("TagFilterAccordion", () => {
	it("renders mobile tag filter with five grouped sections", () => {
		render(<TagFilterAccordion tagCounts={tagCounts} />);

		expect(
			screen.getByRole("button", { name: /filtruj po tagach/i }),
		).toBeDefined();
		expect(screen.getByText("Frontend & UX")).toBeDefined();
		expect(screen.getByText("Backend & Data")).toBeDefined();
		expect(screen.getByText("Infrastructure & Reliability")).toBeDefined();
		expect(screen.getByText("Projects & Open Source")).toBeDefined();
		expect(screen.getByText("Life & Productivity")).toBeDefined();
	});

	it("renders grouped tag links with their counts", () => {
		render(<TagFilterAccordion tagCounts={tagCounts} />);

		expect(screen.getByRole("link", { name: /#next-js/i })).toBeDefined();
		expect(screen.getByText("7")).toBeDefined();
	});

	it("maps every generated tag to exactly one group", () => {
		const mappedTags = TAG_GROUPS.flatMap((group) => group.tags);
		const uniqueTags = new Set(mappedTags);

		expect(uniqueTags.size).toBe(mappedTags.length);
		expect([...uniqueTags].sort()).toEqual(Object.keys(tagData).sort());
	});

	it("keeps filter trigger inset and grouped accordion full width", () => {
		const { container } = render(<TagFilterAccordion tagCounts={tagCounts} />);
		const filterTrigger = screen.getByRole("button", {
			name: /filtruj po tagach/i,
		});
		const categoryItem = container.querySelector(".bg-background");

		expect(filterTrigger.className).toContain("px-3");
		expect(filterTrigger.className).toContain("w-full");
		const accordionRoot = container.querySelector(".border-none");

		expect(categoryItem?.className).not.toContain("px-2");
		expect(categoryItem?.className).toContain("overflow-hidden");
		expect(accordionRoot?.className).toContain("overflow-visible");
	});

	it("shows selected tag chip on tag pages", () => {
		navigation.pathname = "/tags/react";
		render(<TagFilterAccordion tagCounts={tagCounts} />);

		expect(
			screen.getByRole("link", { name: /selected tag: #react/i }),
		).toBeDefined();
	});

	it("collapses groups after navigating from a tag page to all posts", () => {
		navigation.pathname = "/tags/react";
		const { rerender } = render(<TagFilterAccordion tagCounts={tagCounts} />);
		const frontendTrigger = () =>
			screen.getByRole("button", { name: /frontend & ux/i });

		expect(frontendTrigger().getAttribute("aria-expanded")).toBe("true");

		navigation.pathname = "/blog";
		rerender(<TagFilterAccordion tagCounts={tagCounts} />);

		expect(frontendTrigger().getAttribute("aria-expanded")).toBe("false");
	});
});
