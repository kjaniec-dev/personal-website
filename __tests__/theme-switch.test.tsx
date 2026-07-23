import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ThemeSwitch from "@/components/ThemeSwitch";

vi.mock("next-themes", () => ({
	useTheme: () => ({
		theme: "dark",
		setTheme: vi.fn(),
		resolvedTheme: "dark",
	}),
}));

describe("ThemeSwitch Component", () => {
	it("renders ThemeSwitch with tablist role and theme options", () => {
		render(<ThemeSwitch />);
		expect(screen.getByRole("tablist")).toBeDefined();
	});
});
