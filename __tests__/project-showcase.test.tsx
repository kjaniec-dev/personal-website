import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import ProjectShowcase from "@/components/ProjectShowcase";
import projectsData, { type Project } from "@/data/projectsData";

afterEach(cleanup);

describe("ProjectShowcase", () => {
	it("preserves the four featured projects, previews, descriptions, and destinations", () => {
		render(<ProjectShowcase projects={projectsData} />);
		const projects = projectsData
			.filter((project) => project.featured !== false)
			.slice(0, 4);
		expect(screen.getAllByRole("article")).toHaveLength(4);

		for (const project of projects) {
			const panel = within(
				screen.getByRole("article", { name: project.title }),
			);
			expect(
				panel.getByRole("heading", { level: 3, name: project.title }),
			).toBeDefined();
			expect(panel.getByText(project.description)).toBeDefined();
			expect(
				panel
					.getByRole("img", { name: `${project.title} — application preview` })
					.getAttribute("loading"),
			).toBe("lazy");
			for (const [label, href] of [
				["Launch App", project.href],
				["View Source", project.repoHref],
			]) {
				if (href) {
					const link = panel.getByRole("link", {
						name: `${label} : ${project.title} (opens in a new tab)`,
					});
					expect(link.getAttribute("href")).toBe(href);
					expect(link.getAttribute("target")).toBe("_blank");
					expect(link.getAttribute("rel")).toContain("noopener");
				}
			}
		}
	});

	it("excludes opted-out projects before limiting the selection", () => {
		const projects: Project[] = Array.from({ length: 6 }, (_, index) => ({
			title: `Project ${index}`,
			description: "Description",
			featured: index !== 0,
		}));
		render(<ProjectShowcase projects={projects} />);
		expect(
			screen.getAllByRole("heading").map((heading) => heading.textContent),
		).toEqual(["Project 1", "Project 2", "Project 3", "Project 4"]);
	});

	it("supports missing images, tags, and destinations without empty links", () => {
		render(
			<ProjectShowcase
				projects={[{ title: "Upcoming project", description: "In progress" }]}
			/>,
		);
		expect(screen.getByText("Preview coming soon")).toBeDefined();
		expect(screen.queryByRole("img")).toBeNull();
		expect(screen.queryByRole("link")).toBeNull();
	});

	it("handles an empty selection", () => {
		render(<ProjectShowcase projects={[]} />);
		expect(screen.queryByRole("article")).toBeNull();
	});
});
