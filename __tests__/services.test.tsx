import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import Services from "@/components/Services";

afterEach(cleanup);

const titles = [
	"Full-Stack Development",
	"System Architecture",
	"Cloud & DevOps",
	"Technical Consulting",
];

const descriptions = [
	"Building modern, performant web applications using React, Angular, Next.js, and TypeScript, backed by clean and scalable APIs.",
	"Designing clean, decoupled, and pragmatic system architectures in Go, Python, or Rust built for long-term scalability.",
	"Setting up automated CI/CD pipelines, container orchestration (Docker/Kubernetes), and secure AWS/GCP cloud environments.",
	"Conducting technology evaluations, code audits, architecture reviews, and performance tuning to solve complex bottlenecks.",
];

describe("Services", () => {
	it("presents the four services in order with descriptions always rendered", () => {
		render(<Services email="hello@example.com" />);

		const section = screen.getByRole("region", { name: "What I Do & Deliver" });
		expect(
			within(section).getByRole("heading", {
				level: 2,
				name: "What I Do & Deliver",
			}),
		).toBeDefined();
		const items = within(section).getAllByRole("listitem");
		expect(items).toHaveLength(4);
		expect(within(section).queryByRole("button")).toBeNull();

		for (const [index, title] of titles.entries()) {
			const item = within(items[index]);
			expect(
				item.getByRole("heading", { level: 3, name: title }),
			).toBeDefined();
			expect(
				item
					.getByText(String(index + 1).padStart(2, "0"))
					.getAttribute("aria-hidden"),
			).toBe("true");
			const link = item.getByRole("link", {
				name: `Discuss ${title} by email`,
			});
			const description = document.getElementById(
				link.getAttribute("aria-describedby") || "",
			);
			expect(description?.textContent).toBe(descriptions[index]);
			expect(items[index].contains(description)).toBe(true);
		}
	});

	it("opens an email inquiry with an intact subject for every service", () => {
		render(<Services email="hello+portfolio@example.com" />);

		for (const title of titles) {
			const link = screen.getByRole("link", {
				name: `Discuss ${title} by email`,
			});
			expect(link.getAttribute("href")).toBe(
				`mailto:hello+portfolio@example.com?subject=${encodeURIComponent(`Inquiry regarding ${title} • kjaniec.dev`)}`,
			);
			const href = new URL(link.getAttribute("href") || "");
			expect(href.protocol).toBe("mailto:");
			expect(href.pathname).toBe("hello+portfolio@example.com");
			expect([...href.searchParams.keys()]).toEqual(["subject"]);
			expect(href.searchParams.get("subject")).toBe(
				`Inquiry regarding ${title} • kjaniec.dev`,
			);
			expect(link.getAttribute("target")).toBe("_self");
		}
	});
});
