import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import ServicePage from "@/components/ServicePage";
import projectsData from "@/data/projectsData";
import servicesData, {
	buildServiceSchema,
	buildServicesBreadcrumbs,
	getProofProjects,
	getPublishedServices,
	getRelatedPosts,
	getServiceBySlug,
	getServiceEmailSubject,
	getServiceForTags,
	getServicesForProject,
	type Service,
} from "@/data/servicesData";

afterEach(cleanup);

const service: Service = {
	slug: "demo",
	title: "Demo Service",
	cardDescription: "Card text.",
	blogTags: ["react", "docker"],
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

describe("service relations", () => {
	const other: Service = {
		...service,
		slug: "other",
		blogTags: ["docker"],
		proofProjects: [],
	};

	it("finds related posts by shared tags, best match first", () => {
		const posts = [
			{ id: 1, tags: ["react"] },
			{ id: 2, tags: ["vue"] },
			{ id: 3, tags: ["react", "docker"] },
		];
		expect(getRelatedPosts(service, posts).map((p) => p.id)).toEqual([3, 1]);
		expect(getRelatedPosts(service, posts, 1).map((p) => p.id)).toEqual([3]);
	});

	it("picks the service that fits a post best", () => {
		expect(getServiceForTags(["docker"], [service, other])?.slug).toBe("demo");
		expect(getServiceForTags(["react", "docker"], [other, service])?.slug).toBe(
			"demo",
		);
		expect(getServiceForTags(["go"], [service, other])).toBeUndefined();
		expect(getServiceForTags(undefined, [service])).toBeUndefined();
	});

	it("links a project back to the services that use it as proof", () => {
		expect(
			getServicesForProject("Planning Poker Backend & App", [
				service,
				other,
			]).map((s) => s.slug),
		).toEqual(["demo"]);
		expect(getServicesForProject("Nope", [service])).toEqual([]);
	});

	it("builds breadcrumbs for the index and for a service page", () => {
		const names = (schema: ReturnType<typeof buildServicesBreadcrumbs>) =>
			schema.itemListElement.map((entry) => entry.name);

		expect(names(buildServicesBreadcrumbs("https://example.com"))).toEqual([
			"Home",
			"Services",
		]);
		const crumbs = buildServicesBreadcrumbs("https://example.com", service);
		expect(names(crumbs)).toEqual(["Home", "Services", "Demo Service"]);
		expect(crumbs.itemListElement[2]).toMatchObject({
			position: 3,
			item: "https://example.com/services/demo",
		});
	});

	it("builds Service structured data", () => {
		expect(
			buildServiceSchema(service, {
				siteUrl: "https://example.com",
				author: "Jane Doe",
			}),
		).toMatchObject({
			"@type": "Service",
			name: "Demo Service",
			description: "A demo service for tests.",
			url: "https://example.com/services/demo",
			provider: { "@id": "https://example.com/#person", name: "Jane Doe" },
		});
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

	it("shows related reading and a custom CTA when provided", () => {
		render(
			<ServicePage
				service={{
					...service,
					audienceTitle: "Problems I solve",
					whyMe: ["Senior engineer"],
					cta: {
						title: "Book a call",
						description: "Pick a slot.",
						buttonText: "Book now",
						subject: "Call • kjaniec.dev",
					},
				}}
				email="hello@example.com"
				posts={[{ title: "A post", path: "blog/a-post", date: "2026-01-01" }]}
			/>,
		);

		const headings = screen
			.getAllByRole("heading", { level: 2 })
			.map((heading) => heading.textContent);
		expect(headings).toContain("Problems I solve");
		expect(headings).toContain("Why me");
		expect(headings).toContain("Related reading");
		expect(
			screen.getByRole("link", { name: "A post" }).getAttribute("href"),
		).toBe("/blog/a-post");
		const cta = screen.getByRole("link", { name: "Book now" });
		expect(cta.getAttribute("href")).toBe(
			`mailto:hello@example.com?subject=${encodeURIComponent("Call • kjaniec.dev")}`,
		);
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
