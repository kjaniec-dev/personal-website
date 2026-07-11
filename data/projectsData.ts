export type ProjectStatus =
	| "open-source"
	| "live-saas"
	| "client-work"
	| "experiment";

export interface Project {
	title: string;
	description: string;
	href?: string;
	repoHref?: string;
	imgSrc?: string;
	tags?: string[];
	status?: ProjectStatus;
	featured?: boolean;
}

const projectsData: Project[] = [
	{
		title: "Protokolator — Property Handover Protocol Generator",
		description: `A free, privacy-first Polish web app for generating property handover protocols (protokół zdawczo-odbiorczy) for rentals, sales, and garages. Fill in a guided form, attach photos and a handwritten signature, then export a polished PDF or DOCX — no account needed, with all data processed entirely in the browser via localStorage. Its standout feature is a return-protocol comparison mode that automatically diffs meter readings, equipment, and new defects against the original handover.`,
		href: "https://protokolator.pl",
		imgSrc: "/static/images/protokolator.png",
		tags: ["next-js", "typescript", "react", "pdf", "productivity"],
		status: "live-saas",
	},
	{
		title: "UI Kit & Design System",
		description: `A premium React + TypeScript component library and token-driven design system. Built as a monorepo containing @kjaniec-dev/design for design tokens and @kjaniec-dev/ui for accessible, interactive components. Configured with Tailwind CSS v4, Storybook previews, and a standalone gallery, powering a cohesive visual language across my personal web projects.`,
		href: "https://ui.kjaniec.dev",
		repoHref: "https://github.com/kjaniec-dev/ui-kit",
		imgSrc: "/static/images/ui-kit.png",
		tags: ["react", "typescript", "tailwind-css", "design", "dx"],
		status: "open-source",
	},
	{
		title: "Planning Poker Backend & App",
		description: `Real-time collaborative estimation tool for agile teams. Built with a TypeScript/Node.js and Go WebSocket server cluster, with Redis pub/sub adapter for seamless multi-instance synchronization. Deployed on Kubernetes with horizontal scaling, supporting instant session coordination, active room management, and secure room auth.`,
		href: "https://planning-poker.kjaniec.dev",
		repoHref: "https://github.com/kjaniec-dev/planning-poker",
		imgSrc: "/static/images/planning-poker.png",
		tags: ["react", "typescript", "node-js", "productivity", "showcase"],
		status: "live-saas",
	},
	{
		title: "Glidepath Retirement Simulator",
		description: `A Monte Carlo retirement simulator that runs thousands of randomized asset-return and inflation paths through custom, age-based equity allocation glidepaths. Features a vectorized NumPy simulation engine (Python) exposed via a FastAPI endpoint, with an interactive React + Recharts frontend showing success statistics, wealth fan bands, and terminal wealth distributions.`,
		href: "https://glidepath.kjaniec.dev",
		repoHref: "https://github.com/kjaniec-dev/glidepath",
		imgSrc: "/static/images/glidepath-dark.png",
		tags: ["python", "numpy", "react", "fastapi", "docker", "showcase"],
		status: "open-source",
	},
	{
		title: "VoxPad Voxel Editor",
		description: `A web-native 3D voxel modeling workspace built with React, Three.js, and React Three Fiber. Allows interactive voxel drawing, painting, erasing, and layer-based scene organization in the browser. Powered by @kjaniec-dev/ui and @kjaniec-dev/design visual components and theme configurations, deployed to Netlify via Vite.`,
		href: "https://voxpad.kjaniec.dev",
		repoHref: "https://github.com/kjaniec-dev/voxpad",
		imgSrc: "/static/images/voxpad.png",
		tags: ["react", "three-js", "vite", "typescript", "design", "showcase"],
		status: "open-source",
		featured: false,
	},
	{
		title: "MUI Greyscale Admin Dashboard",
		description: `A comprehensive, production-ready admin dashboard template with a minimalist greyscale design. Covers 27 feature domains including CRM, finance, inventory, marketing, and security — all built with React 19, Material UI v9, and Vite 7. Fully open source and ready to use as a starting point for your next internal tool or admin panel.`,
		href: "https://dashboard.kjaniec.dev",
		repoHref: "https://github.com/kjaniec-dev/mui-greyscale-admin-dashboard",
		imgSrc: "/static/images/mui-dashboard-dark.png",
		tags: ["react", "typescript", "design", "frontend", "showcase"],
		status: "open-source",
		featured: false,
	},
	{
		title: "Cyberpunk Voxel City - Interactive Resume",
		description: `An interactive 3D resume disguised as a browser-based game. Explore a sprawling cyberpunk city rendered entirely from voxels, discovering skill boxes that represent technical expertise. Features custom voxel engine with greedy meshing, procedural city generation, dynamic lighting effects, and chunk-based streaming for smooth 60 FPS performance.`,
		href: "https://3dresume.kjaniec.dev",
		imgSrc: "/static/images/cyberpunk-resume.png",
		tags: ["typescript", "frontend", "showcase"],
		status: "experiment",
	},
];

export default projectsData;
