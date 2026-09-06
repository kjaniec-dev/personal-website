import {
	act,
	cleanup,
	fireEvent,
	render,
	screen,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import PostTableOfContents from "@/components/PostTableOfContents";

const toc = [
	{ value: "Overview", url: "#overview", depth: 2 },
	{ value: "Details", url: "#details", depth: 3 },
];
let frames: Map<number, FrameRequestCallback>;
let frameId = 0;

beforeEach(() => {
	frames = new Map();
	vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
		frames.set(++frameId, callback);
		return frameId;
	});
	vi.stubGlobal("cancelAnimationFrame", (id: number) => frames.delete(id));
});

afterEach(() => {
	cleanup();
	vi.restoreAllMocks();
	vi.unstubAllGlobals();
});

function flushScroll() {
	act(() => {
		fireEvent.scroll(window);
		const pending = [...frames.values()];
		frames.clear();
		for (const callback of pending) callback(0);
	});
}

describe("Post table of contents", () => {
	it("tracks the last heading above the reading offset when scrolling down and back up", () => {
		render(
			<>
				<PostTableOfContents toc={toc} />
				<h2 id="overview">Overview body</h2>
				<h3 id="details">Details body</h3>
			</>,
		);
		let overviewTop = 300;
		let detailsTop = 800;
		vi.spyOn(
			screen.getByText("Overview body"),
			"getBoundingClientRect",
		).mockImplementation(() => ({ top: overviewTop }) as DOMRect);
		vi.spyOn(
			screen.getByText("Details body"),
			"getBoundingClientRect",
		).mockImplementation(() => ({ top: detailsTop }) as DOMRect);
		const active = () =>
			[...document.querySelectorAll('a[aria-current="location"]')].map((a) =>
				a.getAttribute("href"),
			);
		flushScroll();
		expect(active()).toEqual([]);
		overviewTop = 100;
		flushScroll();
		expect(active()).toEqual(["#overview", "#overview"]);
		overviewTop = -500;
		detailsTop = 130;
		flushScroll();
		expect(active()).toEqual(["#details", "#details"]);
		overviewTop = -100;
		detailsTop = 300;
		flushScroll();
		expect(active()).toEqual(["#overview", "#overview"]);
	});

	it("closes the mobile disclosure when choosing a section while preserving its native anchor", () => {
		const { container } = render(<PostTableOfContents toc={toc} />);
		const disclosure = container.querySelector("details");
		if (!disclosure) throw new Error("Missing mobile contents");
		disclosure.open = true;
		const link = disclosure.querySelector('a[href="#details"]');
		if (!link) throw new Error("Missing section link");
		fireEvent.click(link);
		expect(disclosure.open).toBe(false);
		expect(link.getAttribute("href")).toBe("#details");
	});

	it("omits navigation for posts without headings", () => {
		const { container } = render(<PostTableOfContents toc={[]} />);
		expect(container.innerHTML).toBe("");
	});
});
