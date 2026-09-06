import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import FAQAccordion from "@/components/FAQAccordion";

afterEach(cleanup);

describe("FAQAccordion Component", () => {
	it("only shows questions and answers belonging to the requested category", () => {
		render(
			<FAQAccordion
				category="work"
				items={[
					{
						question: "Can we work remotely?",
						answer: "Remote only.",
						category: "work",
					},
					{
						question: "Which editor?",
						answer: "JetBrains.",
						category: "technical",
					},
				]}
			/>,
		);
		fireEvent.click(
			screen.getByRole("button", { name: "Can we work remotely?" }),
		);
		const trigger = screen.getByRole("button", {
			name: "Can we work remotely?",
		});
		const panelId = trigger.getAttribute("aria-controls");
		expect(panelId).toBeTruthy();
		expect(document.getElementById(panelId ?? "")?.textContent).toBe(
			"Remote only.",
		);
		expect(screen.getByText("Remote only.")).toBeDefined();
		expect(screen.queryByText("Which editor?")).toBeNull();
		expect(screen.queryByText("JetBrains.")).toBeNull();
	});

	it("renders FAQ accordion questions", () => {
		const mockItems = [
			{
				question: "What is this?",
				answer: "A test FAQ item.",
				category: "technical" as const,
			},
		];
		render(<FAQAccordion items={mockItems} category="technical" />);
		expect(screen.getByText("What is this?")).toBeDefined();
	});
});
