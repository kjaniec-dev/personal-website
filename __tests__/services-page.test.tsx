import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import ServicesPage from "../app/services/page";

afterEach(cleanup);

describe("Services page", () => {
	it("lists every service under a single h1 and links to each page", () => {
		render(<ServicesPage />);

		expect(
			screen.getByRole("heading", { level: 1, name: /Services/ }),
		).toBeDefined();
		const list = screen.getByRole("region", { name: "Services" });
		expect(within(list).getAllByRole("listitem")).toHaveLength(5);
		expect(
			within(list)
				.getByRole("link", { name: "Learn more about AI & Process Automation" })
				.getAttribute("href"),
		).toBe("/services/ai-automation");
		expect(screen.queryByText("What I Do & Deliver")).toBeNull();
	});
});
