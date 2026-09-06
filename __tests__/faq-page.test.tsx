import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import FAQ from "../app/faq/page";

afterEach(cleanup);

describe("FAQ page", () => {
	it("offers a direct email contact when the questions do not answer a visitor's needs", () => {
		render(<FAQ />);
		const contact = screen.getByRole("link", { name: /let.s talk/i });
		expect(contact.getAttribute("href")).toBe("mailto:contact@kjaniec.dev");
		expect(contact.getAttribute("target")).toBe("_self");
	});
});
