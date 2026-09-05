import { act, cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ProjectStack from "@/components/ProjectStack";

let resize: () => void;
const disconnect = vi.fn();

beforeEach(() => {
	vi.stubGlobal("innerHeight", 800);
	vi.stubGlobal(
		"ResizeObserver",
		class {
			constructor(callback: () => void) {
				resize = callback;
			}
			observe() {}
			disconnect = disconnect;
		},
	);
});

afterEach(() => {
	cleanup();
	vi.restoreAllMocks();
	vi.unstubAllGlobals();
	disconnect.mockClear();
});

function renderStack() {
	return render(
		<ProjectStack>
			<article style={{ scrollMarginTop: "112px" }}>First project</article>
			<article style={{ scrollMarginTop: "112px" }}>Second project</article>
		</ProjectStack>,
	);
}

describe("ProjectStack", () => {
	it("enables stacking only when every panel fits below the header", () => {
		const bounds = vi
			.spyOn(HTMLElement.prototype, "getBoundingClientRect")
			.mockReturnValue({ height: 600 } as DOMRect);
		const { container } = renderStack();
		expect(container.firstElementChild?.getAttribute("data-stackable")).toBe(
			"true",
		);

		bounds.mockReturnValue({ height: 700 } as DOMRect);
		act(() => resize());
		expect(container.firstElementChild?.getAttribute("data-stackable")).toBe(
			"false",
		);

		bounds.mockReturnValue({ height: 600 } as DOMRect);
		act(() => resize());
		expect(container.firstElementChild?.getAttribute("data-stackable")).toBe(
			"true",
		);
	});

	it("rechecks the available space after the viewport height changes", () => {
		vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
			height: 600,
		} as DOMRect);
		const { container, unmount } = renderStack();
		vi.stubGlobal("innerHeight", 700);
		act(() => window.dispatchEvent(new Event("resize")));
		expect(container.firstElementChild?.getAttribute("data-stackable")).toBe(
			"false",
		);
		unmount();
		expect(disconnect).toHaveBeenCalledOnce();
	});

	it("retains normal flow if measurement is unavailable", () => {
		vi.stubGlobal("ResizeObserver", undefined);
		const { container } = renderStack();
		expect(container.firstElementChild?.getAttribute("data-stackable")).toBe(
			"false",
		);
	});
});
