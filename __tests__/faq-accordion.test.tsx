import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import FAQAccordion from "@/components/FAQAccordion";

describe("FAQAccordion Component", () => {
	it("renders FAQ accordion questions", () => {
		const mockItems = [
			{
				question: "What is this?",
				answer: "A test FAQ item.",
				category: "general" as const,
			},
		];
		render(<FAQAccordion items={mockItems} category="general" />);
		expect(screen.getByText("What is this?")).toBeDefined();
	});
});
