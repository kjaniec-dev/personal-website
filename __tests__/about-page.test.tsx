import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("contentlayer/generated", () => ({
	allAuthors: [
		{
			slug: "default",
			name: "Kamil Janiec",
			avatar: "/static/images/avatar.png",
			body: { code: "" },
		},
	],
}));

vi.mock("pliny/mdx-components", () => ({
	MDXLayoutRenderer: () => null,
}));

import About from "../app/about/page";

afterEach(cleanup);

describe("About page", () => {
	it("renders key stats using MetricCard with primary accents", () => {
		render(<About />);
		expect(screen.getByText("Years of experience")).toBeDefined();
		expect(screen.getByText("12+")).toBeDefined();
		expect(screen.getAllByText("01").length).toBeGreaterThanOrEqual(1);
		expect(screen.getByText("Contract model")).toBeDefined();
		expect(screen.getByText("B2B")).toBeDefined();
		expect(screen.getAllByText("02").length).toBeGreaterThanOrEqual(1);
		expect(screen.getByText("Remote work")).toBeDefined();
		expect(screen.getByText("100%")).toBeDefined();
		expect(screen.getAllByText("03").length).toBeGreaterThanOrEqual(1);
	});
});
