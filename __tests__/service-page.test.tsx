import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import ServicePage from "@/components/ServicePage";
import projectsData from "@/data/projectsData";
import servicesData, {
	getProofProjects,
	getPublishedServices,
	getServiceBySlug,
	getServiceEmailSubject,
	type Service,
} from "@/data/servicesData";

afterEach(cleanup);

const service: Service = {
	slug: "demo",
	title: "Demo Service",
	headline: "Ship the demo",
	summary: "A demo service for tests.",
	audience: ["You have a demo"],
	deliverables: ["A working demo"],
	process: [
		{ title: "Discover", description: "Talk." },
		{ title: "Build", description: "Code." },
	],
	proofProjects: ["Planning Poker Backend & App", "Does not exist"],
	faq: [{ question: "Why?", answer: "Because." }],
};

describe("servicesData", () => {
	it("has unique, URL-safe slugs", () => {
		const slugs = servicesData.map((item) => item.slug);
		expect(new Set(slugs).size).toBe(slugs.length);
		for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
	});

	it("only references projects that exist in Featured Work", () => {
		const titles = new Set(projectsData.map((project) => project.title));
		for (const item of servicesData) {
			for (const title of item.proofProjects)
				expect(titles.has(title)).toBe(true);
		}
	});

	it("hides drafts in production and shows them in development", () => {
		const drafts = [
			{ ...service, slug: "a" },
			{ ...service, slug: "b", draft: true },
		];
		expect(getPublishedServices(drafts, false).map((s) => s.slug)).toEqual([
			"a",
		]);
		expect(getPublishedServices(drafts, true).map((s) => s.slug)).toEqual([
			"a",
			"b",
		]);
	});

	it("looks a service up by slug", () => {
		expect(getServiceBySlug("demo", [service])).toBe(service);
		expect(getServiceBySlug("missing", [service])).toBeUndefined();
	});

	it("skips unknown proof projects", () => {
		expect(getProofProjects(service).map((p) => p.title)).toEqual([
			"Planning Poker Backend & App",
		]);
	});
});

describe("ServicePage", () => {
	it("renders the template sections in order", () => {
		render(<ServicePage service={service} email="hello@example.com" />);

		expect(
			screen.getByRole("heading", { level: 1, name: /Demo Service/ }),
		).toBeDefined();
		expect(screen.getByText("Ship the demo")).toBeDefined();

		const headings = screen
			.getAllByRole("heading", { level: 2 })
			.map((heading) => heading.textContent);
		expect(headings.slice(0, 3)).toEqual([
			"Who it's for",
			"What you get",
			"How I work",
		]);
		expect(headings).toContain("Proof");
		expect(headings).toContain("FAQ");
	});

	it("lists the process steps and the proof projects", () => {
		render(<ServicePage service={service} email="hello@example.com" />);

		const process = screen.getByRole("region", { name: "How I work" });
		expect(
			within(process).getByRole("heading", { level: 3, name: "Discover" }),
		).toBeDefined();
		expect(
			within(process).getByRole("heading", { level: 3, name: "Build" }),
		).toBeDefined();
		expect(
			screen.getByRole("article", { name: "Planning Poker Backend & App" }),
		).toBeDefined();
	});

	it("omits Proof and FAQ when a service has none", () => {
		render(
			<ServicePage
				service={{ ...service, proofProjects: [], faq: [] }}
				email="hello@example.com"
			/>,
		);
		const headings = screen
			.getAllByRole("heading", { level: 2 })
			.map((heading) => heading.textContent);
		expect(headings).not.toContain("Proof");
		expect(headings).not.toContain("FAQ");
	});

	it("opens an email with a per-service subject", () => {
		render(<ServicePage service={service} email="hello+x@example.com" />);

		const link = screen.getByRole("link", { name: "Get in touch" });
		expect(link.getAttribute("href")).toBe(
			`mailto:hello+x@example.com?subject=${encodeURIComponent(getServiceEmailSubject(service))}`,
		);
		expect(link.getAttribute("target")).toBe("_self");
	});
});
