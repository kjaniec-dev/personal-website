import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProjectCard from "@/components/ProjectCard";

describe("ProjectCard Component", () => {
	it("renders ProjectCard with title, description, and status badge", () => {
		render(
			<ProjectCard
				title="Test Project"
				description="A cool project description"
				status="live-saas"
				tags={["react", "nextjs"]}
			/>,
		);
		expect(screen.getByText("Test Project")).toBeDefined();
		expect(screen.getByText("A cool project description")).toBeDefined();
		expect(screen.getByText("Live SaaS")).toBeDefined();
	});
});
