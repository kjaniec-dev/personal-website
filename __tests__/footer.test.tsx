import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import Footer from "@/components/Footer";

afterEach(cleanup);

describe("Footer", () => {
	it("keeps bottom spacing within the footer background instead of exposing page decoration", () => {
		render(<Footer />);

		const footer = screen.getByRole("contentinfo");
		expect(footer.classList.contains("bg-canvas")).toBe(true);
		expect(footer.classList.contains("pb-8")).toBe(true);
		expect(footer.classList.contains("mb-8")).toBe(false);
	});
});
