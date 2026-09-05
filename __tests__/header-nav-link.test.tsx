import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import HeaderNavLink from "@/components/HeaderNavLink";
import headerNavLinks from "@/data/headerNavLinks";

const route = vi.hoisted(() => ({ pathname: "/" as string | null }));

vi.mock("next/navigation", () => ({
	usePathname: () => route.pathname,
}));

afterEach(cleanup);

describe("Header navigation", () => {
	it("prioritizes portfolio pages and keeps tags out of the main navigation", () => {
		expect(
			headerNavLinks
				.filter(({ href }) => href !== "/")
				.map(({ title }) => title),
		).toEqual(["Projects", "About", "Blog", "FAQ"]);
	});

	it.each([
		["/", "/", true],
		["/projects", "/", false],
		["/projects", "/projects", true],
		["/projects/example", "/projects", true],
		["/projects-other", "/projects", false],
		["/blog/post", "/blog", true],
		["/blog/page/2", "/blog", true],
		["/tags", "/blog", true],
		["/tags/react", "/blog", true],
		["/tags-other", "/blog", false],
		["/about", "/blog", false],
		[null, "/blog", false],
	])("marks %s against %s consistently", (pathname, href, active) => {
		route.pathname = pathname;
		render(<HeaderNavLink href={href} title="Section" />);
		expect(screen.getByRole("link").getAttribute("aria-current")).toBe(
			active ? "page" : null,
		);
	});
});
