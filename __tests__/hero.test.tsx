import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import Hero from "@/components/Hero";
import siteMetadata from "@/data/siteMetadata";

afterEach(cleanup);

describe("Hero Component", () => {
	it("introduces an end-to-end engineer across full-stack, architecture, and DevOps", () => {
		render(<Hero />);

		expect(
			screen.getByRole("heading", {
				level: 1,
				name: "From first idea to production.",
			}),
		).toBeDefined();
		expect(screen.getByText(siteMetadata.author)).toBeDefined();
		expect(screen.getByText("Senior Software Engineer")).toBeDefined();
		expect(screen.getByText("12+ years")).toBeDefined();
		expect(
			screen.getByText("Full-stack · Architecture · DevOps"),
		).toBeDefined();
	});

	it("prioritizes direct contact and selected work on the same page", () => {
		render(<Hero />);

		const links = screen.getAllByRole("link");
		const contactLink = screen.getByRole("link", { name: "Let's talk" });
		const workLink = screen.getByRole("link", { name: "View selected work" });

		expect(links).toEqual([contactLink, workLink]);
		expect(contactLink.getAttribute("href")).toBe(
			`mailto:${siteMetadata.email}`,
		);
		expect(contactLink.getAttribute("target")).toBe("_self");
		expect(workLink.getAttribute("href")).toBe("#selected-work");
		expect(workLink.getAttribute("target")).toBeNull();
	});
});
