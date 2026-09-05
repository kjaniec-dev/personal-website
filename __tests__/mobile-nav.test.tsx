import {
	cleanup,
	fireEvent,
	render,
	screen,
	within,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import MobileNav from "@/components/MobileNav";
import siteMetadata from "@/data/siteMetadata";

vi.mock("next/navigation", () => ({
	usePathname: () => "/blog/example-post",
}));

afterEach(cleanup);

describe("MobileNav Component", () => {
	it("renders mobile menu trigger button", () => {
		render(<MobileNav />);
		expect(screen.getByRole("button", { name: /toggle menu/i })).toBeDefined();
	});

	it("keeps the closed drawer out of the accessibility tree", () => {
		render(<MobileNav />);
		expect(screen.queryByRole("dialog")).toBeNull();
		expect(
			screen
				.getByRole("button", { name: /toggle menu/i })
				.getAttribute("aria-expanded"),
		).toBe("false");
	});

	it("shows portfolio links, the active section and a contact link", () => {
		render(<MobileNav />);
		const trigger = screen.getByRole("button", { name: /toggle menu/i });
		fireEvent.click(trigger);
		const panel = screen.getByRole("dialog", { name: "Menu" });
		const nav = within(panel).getByRole("navigation");
		expect(
			within(nav)
				.getAllByRole("link")
				.map((link) => link.textContent),
		).toEqual(["Home", "Projects", "About", "Blog", "FAQ"]);
		expect(
			within(nav)
				.getByRole("link", { name: "Blog" })
				.getAttribute("aria-current"),
		).toBe("page");
		expect(
			within(nav)
				.getByRole("link", { name: "Home" })
				.hasAttribute("aria-current"),
		).toBe(false);
		expect(trigger.getAttribute("aria-expanded")).toBe("true");
		const controlled = document.getElementById(
			trigger.getAttribute("aria-controls") ?? "",
		);
		expect(controlled?.contains(nav)).toBe(true);
		const contact = within(panel).getByRole("link", { name: "Let's talk" });
		expect(contact.getAttribute("href")).toBe(`mailto:${siteMetadata.email}`);
		expect(contact.querySelector("button")).toBeNull();
	});

	it.each(["Blog", "Let's talk"])("closes after selecting %s", (label) => {
		render(<MobileNav />);
		fireEvent.click(screen.getByRole("button", { name: /toggle menu/i }));
		const link = within(screen.getByRole("dialog")).getByRole("link", {
			name: label,
		});
		link.addEventListener("click", (event) => event.preventDefault());
		fireEvent.click(link);
		expect(screen.queryByRole("dialog")).toBeNull();
		expect(document.body.style.overflow).toBe("");
	});

	it("closes with Escape and restores focus to the trigger", () => {
		render(<MobileNav />);
		const trigger = screen.getByRole("button", { name: /toggle menu/i });
		trigger.focus();
		fireEvent.click(trigger);
		fireEvent.keyDown(document, { key: "Escape" });
		expect(screen.queryByRole("dialog")).toBeNull();
		expect(document.activeElement).toBe(trigger);
	});
});
