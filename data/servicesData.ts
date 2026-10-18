import projectsData, { type Project } from "./projectsData";

export interface ServiceStep {
	title: string;
	description: string;
}

export interface ServiceFaq {
	question: string;
	answer: string;
}

export interface ServiceCta {
	title: string;
	description: string;
	buttonText: string;
	subject: string;
}

export interface Service {
	slug: string;
	title: string;
	/** Short description used on the home page card. */
	cardDescription: string;
	/** Hero headline: the outcome for the client, not the technology. */
	headline: string;
	/** Hero sub-text; also used as the page meta description. */
	summary: string;
	/** Heading of the audience section. Defaults to "Who it's for". */
	audienceTitle?: string;
	/** 2-3 situations in which someone comes to me. */
	audience: string[];
	/** Concrete deliverables. */
	deliverables: string[];
	/** 3-4 steps. */
	process: ServiceStep[];
	/** Why hire me for this instead of the alternatives. */
	whyMe?: string[];
	/** Exact `title` of entries in `projectsData`. */
	proofProjects: string[];
	/** Blog tags that connect posts and this service, in both directions. */
	blogTags: string[];
	faq: ServiceFaq[];
	/** Overrides the default contact block at the bottom of the page. */
	cta?: ServiceCta;
	/** Drafts are visible in development only, like draft blog posts. */
	draft?: boolean;
}

const servicesData: Service[] = [
	{
		slug: "full-stack-development",
		title: "Full-Stack Development",
		cardDescription:
			"Building modern, performant web applications using React, Angular, Next.js, and TypeScript, backed by clean and scalable APIs.",
		headline: "Product build, from idea to production.",
		summary:
			"I take a product from idea to a working release: frontend, backend and the infrastructure underneath, delivered as an MVP with an agreed scope and timeline.",
		audience: [
			"You have a product idea and need a senior engineer to turn it into a working MVP.",
			"Your team has a prototype that has to become something you can safely run in production.",
			"You want one person who can own the frontend, the API and the deployment instead of coordinating three.",
		],
		deliverables: [
			"A working MVP in an agreed scope and timeline",
			"Frontend and API code in your repository, with tests",
			"CI/CD and a production deployment",
			"Documentation, so your team can take it over",
		],
		process: [
			{
				title: "Scope",
				description:
					"We agree on the smallest version that is useful, and on what is explicitly left out.",
			},
			{
				title: "Build",
				description:
					"Short iterations with working software at the end of each, so you see progress instead of status reports.",
			},
			{
				title: "Ship",
				description:
					"Automated deployment to production with monitoring in place from day one.",
			},
			{
				title: "Hand over",
				description:
					"Documentation and a walkthrough, so the product does not depend on me.",
			},
		],
		proofProjects: ["Protokolator — Property Handover Protocol Generator"],
		blogTags: ["react", "next-js", "typescript", "node-js", "tailwind-css"],
		faq: [
			{
				question: "Which technologies do you use?",
				answer:
					"On the frontend mostly TypeScript with React, Angular or Next.js. On the backend Go, Python or Rust. I pick the stack to fit the problem and your team, not the other way around.",
			},
			{
				question: "Do you work remotely and how are you engaged?",
				answer:
					"I work 100% remotely, as an independent contractor on a B2B model.",
			},
		],
	},
	{
		slug: "system-architecture",
		title: "System Architecture",
		cardDescription:
			"Designing clean, decoupled, and pragmatic system architectures in Go, Python, or Rust built for long-term scalability.",
		headline: "Architecture that survives growth.",
		summary:
			"Systems you can maintain and scale: clear boundaries, decisions written down, and a realistic path from what you run today to where you want to be.",
		audience: [
			"Your product is growing and every change is getting slower and riskier.",
			"You are planning a new system, or a migration away from a legacy one, and need the key decisions made well.",
			"You want an independent second opinion before committing to an expensive design.",
		],
		deliverables: [
			"Architecture diagrams of the current and target state",
			"Architecture decision records (ADRs) with the trade-offs considered",
			"A migration plan in small, reversible steps",
		],
		process: [
			{
				title: "Understand",
				description:
					"Constraints first: load, team, budget, what already works and what must not break.",
			},
			{
				title: "Design",
				description:
					"Two or three realistic options with their trade-offs, not a single answer presented as the only one.",
			},
			{
				title: "Decide",
				description:
					"The chosen direction is written down as ADRs, so the reasoning survives team changes.",
			},
			{
				title: "Plan",
				description:
					"An incremental path to get there while the system keeps running.",
			},
		],
		proofProjects: ["Planning Poker Backend & App"],
		blogTags: ["architecture", "systems-design", "reliability"],
		faq: [
			{
				question: "Do you only design, or also implement?",
				answer:
					"Both. Some clients take the design to their own team, others ask me to build the first iterations as well.",
			},
			{
				question: "Which languages do you design for?",
				answer:
					"Mostly Go, Python and Rust on the backend, with TypeScript on the frontend. The principles carry over to other stacks.",
			},
		],
	},
	{
		slug: "cloud-devops",
		title: "Cloud & DevOps",
		cardDescription:
			"Setting up automated CI/CD pipelines, container orchestration (Docker/Kubernetes), and secure AWS/GCP cloud environments.",
		headline: "Reliable delivery, predictable cloud bills.",
		summary:
			"Automated CI/CD, containers and Kubernetes, and secure AWS or GCP environments, set up so releases are routine and the cloud bill holds no surprises.",
		audience: [
			"Releases are manual, slow or stressful, and you want them to be boring.",
			"You are moving to containers or Kubernetes and want to do it without a long outage-prone transition.",
			"Your cloud bill keeps growing and nobody can say exactly why.",
		],
		deliverables: [
			"CI/CD pipelines that build, test and deploy automatically",
			"Infrastructure as code for your environments",
			"Docker and Kubernetes setup",
			"Monitoring and alerting",
			"A cloud cost review with concrete savings",
		],
		process: [
			{
				title: "Assess",
				description:
					"Review how you build, deploy and run today, including security and cost.",
			},
			{
				title: "Automate",
				description:
					"Pipelines and infrastructure as code for the parts that hurt the most first.",
			},
			{
				title: "Harden",
				description:
					"Access, secrets, backups and monitoring, so problems are visible before users notice them.",
			},
			{
				title: "Hand over",
				description: "Runbooks and a walkthrough for your team.",
			},
		],
		proofProjects: ["Planning Poker Backend & App"],
		blogTags: ["devops", "docker", "kubernetes", "cloudflare", "self-hosting"],
		faq: [
			{
				question: "AWS or GCP?",
				answer:
					"I work with both. I recommend whichever fits your existing setup and team, rather than moving clouds for its own sake.",
			},
			{
				question: "Can you review our cloud costs without changing anything?",
				answer:
					"Yes. A cost review produces a list of concrete savings; whether and when to apply them is up to you.",
			},
		],
	},
	{
		slug: "technical-audits-advisory",
		title: "Technical Audits & Advisory",
		cardDescription:
			"Conducting technology evaluations, code audits, architecture reviews, and performance tuning to solve complex bottlenecks.",
		headline: "Fixed-scope audits with a clear result.",
		summary:
			"Instead of open-ended consulting: three audits with a defined scope, a written report and prioritised recommendations you can act on straight away.",
		audienceTitle: "When it helps",
		audience: [
			"You inherited a codebase or system and need to know what you actually have.",
			"Something is slow, fragile or insecure and you want the cause found, not guessed.",
			"You need an independent assessment before a big investment, an acquisition or a rewrite.",
		],
		deliverables: [
			"Architecture Review: how the system is structured, where it will hurt as it grows, and what to change first",
			"Code & Security Audit: code quality, dependencies and common security weaknesses, with prioritised findings",
			"Performance Audit: where time and money go in your application and infrastructure, and how to cut it",
		],
		process: [
			{
				title: "Scope call",
				description:
					"We agree on what is audited, what the result looks like and how long it takes, before any work starts.",
			},
			{
				title: "Audit",
				description: "I go through the code, configuration and running system.",
			},
			{
				title: "Report",
				description:
					"A written report with findings ranked by impact and effort.",
			},
			{
				title: "Walkthrough",
				description:
					"A session with your team to go through the findings and decide what to do next.",
			},
		],
		proofProjects: [],
		blogTags: ["security"],
		faq: [
			{
				question: "How long does an audit take?",
				answer:
					"The scope and the timeline are agreed up front, before any work starts, so you know both the effort and the result in advance.",
			},
			{
				question: "Do we have to continue working together afterwards?",
				answer:
					"No. An audit stands on its own. If you want help implementing the recommendations, we can talk about it after the walkthrough.",
			},
		],
	},
	{
		slug: "ai-automation",
		title: "AI & Process Automation",
		cardDescription:
			"Turning repetitive, manual work into reliable pipelines: document processing, data workflows, internal tools and LLM-powered assistants, integrated with the systems you already run. Production-grade, measurable, and built with data privacy in mind.",
		headline: "Automate the work your team shouldn't be doing manually.",
		summary:
			"Document processing, data workflows, internal tools and LLM-powered assistants, integrated with the systems you already run. Production-grade, measurable, built with data privacy in mind.",
		audienceTitle: "Problems I solve",
		audience: [
			"Invoices and other documents are retyped by hand: OCR and an LLM extract the data and send it to your accounting or ERP system.",
			"Emails and support tickets pile up: incoming messages are classified, routed and answered with a draft for a person to approve.",
			"People keep asking where things are written down: an assistant answers from your internal knowledge, with sources.",
			"Reports and offers take hours to assemble: they are generated from the data you already have.",
			"A legacy system has no API: automation works around it instead of waiting for a rewrite.",
			"A task needs judgement, not just rules: an agent does the work and a person approves the risky steps.",
		],
		deliverables: [
			"A pilot on one process, with a measured before and after",
			"A production rollout with monitoring and alerting",
			"Quality checks for model output, run on real examples before go-live",
			"Code in your repository and documentation for handover",
		],
		process: [
			{
				title: "Process audit",
				description:
					"We pick the process worth automating and estimate what the manual work costs you today.",
			},
			{
				title: "Pilot",
				description:
					"One process, built end to end and measured against the manual baseline.",
			},
			{
				title: "Production",
				description:
					"Rollout with monitoring, error handling and a person in the loop where mistakes are expensive.",
			},
			{
				title: "Handover",
				description:
					"Documentation and a walkthrough, so your team can run and extend it.",
			},
		],
		whyMe: [
			"A senior engineer builds it: production code, not a chain of no-code connectors that nobody can maintain.",
			"The code lives in your repository, and you are not locked into a platform or a vendor.",
			"Model output is tested and evaluated on real examples, so you know how often it is right before it goes live.",
			"Security and GDPR are part of the design, not an afterthought.",
		],
		proofProjects: ["dokufakt — Invoice Intake & KSeF Automation"],
		blogTags: ["ai", "automation", "ocr"],
		faq: [
			{
				question: "Does my data end up in public AI models?",
				answer:
					"Not by default. Which provider and which deployment option are used is decided with you before the pilot, based on what data is involved and your requirements.",
			},
			{
				question: "How much does it cost, and how will I know it pays off?",
				answer:
					"We start by estimating what the manual process costs you now. The pilot is then measured against that baseline, so the return is a number you can check.",
			},
			{
				question: "What if the model gets it wrong?",
				answer:
					"Output is validated, quality is measured on real examples before go-live, and steps where an error would be costly keep a person in the loop.",
			},
		],
		cta: {
			title: "Book a free 30-min process audit",
			description:
				"Tell me which process eats your team's time, and we will look at whether and how it can be automated.",
			buttonText: "Book a process audit",
			subject: "Free process audit • kjaniec.dev",
		},
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

/** Services that use the project as proof; the reverse of `proofProjects`. */
export function getServicesForProject(
	projectTitle: string,
	services: Service[] = getPublishedServices(),
): Service[] {
	return services.filter((service) =>
		service.proofProjects.includes(projectTitle),
	);
}

function overlap(a: string[], b: string[]): number {
	return a.filter((tag) => b.includes(tag)).length;
}

/** Posts sharing tags with the service; best match first, then given order. */
export function getRelatedPosts<T extends { tags?: string[] }>(
	service: Service,
	posts: T[],
	limit = 3,
): T[] {
	return posts
		.map((post, index) => ({
			post,
			index,
			score: overlap(service.blogTags, post.tags ?? []),
		}))
		.filter((entry) => entry.score > 0)
		.sort((a, b) => b.score - a.score || a.index - b.index)
		.slice(0, limit)
		.map((entry) => entry.post);
}

/** The service that fits a post's tags best, if any. */
export function getServiceForTags(
	tags: string[] = [],
	services: Service[] = getPublishedServices(),
): Service | undefined {
	let best: Service | undefined;
	let bestScore = 0;
	for (const service of services) {
		const score = overlap(service.blogTags, tags);
		if (score > bestScore) {
			best = service;
			bestScore = score;
		}
	}
	return best;
}

export function getServiceEmailSubject(service: Service): string {
	return `Inquiry regarding ${service.title} • kjaniec.dev`;
}

export function buildServiceSchema(
	service: Service,
	site: { siteUrl: string; author: string },
) {
	const url = `${site.siteUrl}/services/${service.slug}`;
	return {
		"@context": "https://schema.org",
		"@type": "Service",
		"@id": `${url}#service`,
		name: service.title,
		serviceType: service.title,
		description: service.summary,
		url,
		provider: {
			"@id": `${site.siteUrl}/#person`,
			"@type": "Person",
			name: site.author,
		},
	};
}

/** BreadcrumbList for `/services` (service = undefined) or a service page. */
export function buildServicesBreadcrumbs(
	siteUrl: string,
	service?: Pick<Service, "slug" | "title">,
) {
	const items = [
		{ name: "Home", url: siteUrl },
		{ name: "Services", url: `${siteUrl}/services` },
		...(service
			? [{ name: service.title, url: `${siteUrl}/services/${service.slug}` }]
			: []),
	];
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.name,
			item: item.url,
		})),
	};
}

export default servicesData;
