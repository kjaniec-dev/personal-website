import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import StatCard from "@/components/StatCard";

afterEach(cleanup);

describe("StatCard", () => {
	it("renders label and value with editorial index", () => {
		render(
			<StatCard
				index={0}
				label="Years of experience"
				value={
					<>
						12<span className="text-primary">+</span>
					</>
				}
			/>,
		);

		expect(screen.getByText("Years of experience")).toBeDefined();
		expect(screen.getByText("12")).toBeDefined();
		expect(screen.getByText("+")).toBeDefined();
		expect(screen.getByText("01")).toBeDefined();
	});

	it("renders without index when omitted", () => {
		render(<StatCard label="Contract model" value="B2B" />);

		expect(screen.getByText("Contract model")).toBeDefined();
		expect(screen.getByText("B2B")).toBeDefined();
		expect(screen.queryByText("01")).toBeNull();
	});
});
