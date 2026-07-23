import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import MobileNav from "@/components/MobileNav";

describe("MobileNav Component", () => {
	it("renders mobile menu trigger button", () => {
		render(<MobileNav />);
		expect(screen.getByRole("button", { name: /toggle menu/i })).toBeDefined();
	});
});
