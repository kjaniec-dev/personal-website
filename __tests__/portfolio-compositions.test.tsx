import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import ContactCTA from "@/components/ContactCTA";
import TopicLink from "@/components/TopicLink";

afterEach(cleanup);

describe("portfolio compositions", () => {
	it("keeps contact as a named region with a direct email link, not a button or new tab", () => {
		render(
			<ContactCTA
				headingId="project-contact"
				title="Discuss a project"
				description="Tell me what you want to build."
				email="hello@example.com"
			/>,
		);
		expect(
			screen.getByRole("region", { name: "Discuss a project" }),
		).toBeDefined();
		const link = screen.getByRole("link", { name: "Let's talk" });
		expect(link.getAttribute("href")).toBe("mailto:hello@example.com");
		expect(link.getAttribute("target")).toBe("_self");
		expect(screen.queryByRole("button")).toBeNull();
	});

	it("omits the contact panel when no email is configured", () => {
		const { container } = render(
			<ContactCTA
				headingId="contact"
				title="Get in touch"
				description="Say hello."
			/>,
		);
		expect(container.childElementCount).toBe(0);
	});

	it.each([
		["React", "/tags/react"],
		["System Design", "/tags/system-design"],
		["CI/CD", "/tags/cicd"],
	])("links the topic %s to its canonical tag route", (tag, href) => {
		render(<TopicLink tag={tag} />);
		const link = screen.getByRole("link", { name: `#${tag}` });
		expect(link.getAttribute("href")).toBe(href);
		expect(link.getAttribute("target")).not.toBe("_blank");
	});
});
