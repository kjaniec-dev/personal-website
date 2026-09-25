import {
	act,
	cleanup,
	fireEvent,
	render,
	screen,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import CodeBlock from "@/components/CodeBlock";

afterEach(() => {
	cleanup();
	vi.unstubAllGlobals();
});

describe("CodeBlock", () => {
	it("keeps the copy button in the DOM without hovering", () => {
		render(<CodeBlock>npm run build</CodeBlock>);
		expect(screen.getByRole("button", { name: "Copy code" })).toBeDefined();
	});

	it("makes the code block keyboard focusable for scrolling", () => {
		const { container } = render(<CodeBlock>npm run build</CodeBlock>);
		expect(container.querySelector("pre")?.getAttribute("tabindex")).toBe("0");
	});

	it("copies the code text and announces it", async () => {
		const writeText = vi.fn().mockResolvedValue(undefined);
		vi.stubGlobal("navigator", { clipboard: { writeText } });
		render(
			<CodeBlock>
				<code>bun run dev</code>
			</CodeBlock>,
		);

		await act(async () => {
			fireEvent.click(screen.getByRole("button", { name: "Copy code" }));
		});

		expect(writeText).toHaveBeenCalledWith("bun run dev");
		expect(screen.getByText("Code copied to clipboard")).toBeDefined();
	});
});
