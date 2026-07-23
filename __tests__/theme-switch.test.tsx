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
	it("renders ThemeSwitch toggle trigger button", () => {
		render(<ThemeSwitch />);
		expect(screen.getByRole("button", { name: /toggle theme/i })).toBeDefined();
	});
});
