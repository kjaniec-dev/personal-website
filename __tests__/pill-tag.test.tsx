import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Pill from "@/components/Pill";
import Tag from "@/components/Tag";

describe("Pill and Tag Components", () => {
	it("renders Pill with correct variant mapping", () => {
		render(<Pill tone="success">Active</Pill>);
		expect(screen.getByText("Active")).toBeDefined();
	});

	it("renders Tag with text", () => {
		render(<Tag text="react" />);
		expect(screen.getByText(/react/)).toBeDefined();
	});
});
