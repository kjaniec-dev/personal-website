import projectsData, { type Project } from "@/data/projectsData";

export interface ServiceStep {
	title: string;
	description: string;
}

export interface ServiceFaq {
	question: string;
	answer: string;
}

export interface Service {
	slug: string;
	title: string;
	/** Hero headline: the outcome for the client, not the technology. */
	headline: string;
	/** Hero sub-text; also used as the page meta description. */
	summary: string;
	/** 2-3 situations in which someone comes to me. */
	audience: string[];
	/** Concrete deliverables. */
	deliverables: string[];
	/** 3-4 steps. */
	process: ServiceStep[];
	/** Exact `title` of entries in `projectsData`. */
	proofProjects: string[];
	faq: ServiceFaq[];
	/** Pages are only published once the copy has been approved. */
	draft?: boolean;
}

const servicesData: Service[] = [
	{
		slug: "template-preview",
		title: "Template Preview",
		headline: "TODO(owner): outcome-focused headline",
		summary: "TODO(owner): one-sentence summary of the service.",
		audience: ["TODO(owner): situation 1", "TODO(owner): situation 2"],
		deliverables: ["TODO(owner): deliverable 1", "TODO(owner): deliverable 2"],
		process: [
			{ title: "Step one", description: "TODO(owner): describe the step." },
			{ title: "Step two", description: "TODO(owner): describe the step." },
			{ title: "Step three", description: "TODO(owner): describe the step." },
		],
		proofProjects: ["Planning Poker Backend & App"],
		faq: [
			{
				question: "TODO(owner): question?",
				answer: "TODO(owner): answer.",
			},
		],
		draft: true,
	},
];

/** Drafts are visible in development only, like draft blog posts. */
export function getPublishedServices(
	services: Service[] = servicesData,
	showDrafts: boolean = process.env.NODE_ENV !== "production",
): Service[] {
	return services.filter((service) => showDrafts || !service.draft);
}

export function getServiceBySlug(
	slug: string,
	services: Service[] = getPublishedServices(),
): Service | undefined {
	return services.find((service) => service.slug === slug);
}

export function getProofProjects(
	service: Service,
	projects: Project[] = projectsData,
): Project[] {
	return service.proofProjects
		.map((title) => projects.find((project) => project.title === title))
		.filter((project): project is Project => project !== undefined);
}

export function getServiceEmailSubject(service: Service): string {
	return `Inquiry regarding ${service.title} • kjaniec.dev`;
}

export default servicesData;
