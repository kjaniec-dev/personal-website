export interface TagGroup {
	id: string;
	label: string;
	tags: string[];
}

export const TAG_GROUPS: TagGroup[] = [
	{
		id: "frontend-ux",
		label: "Frontend & UX",
		tags: [
			"frontend",
			"react",
			"next-js",
			"tailwind-css",
			"design",
			"three-js",
			"vite",
			"dx",
		],
	},
	{
		id: "backend-data",
		label: "Backend & Data",
		tags: [
			"typescript",
			"node-js",
			"go",
			"python",
			"fastapi",
			"streamlit",
			"numpy",
		],
	},
	{
		id: "infrastructure-reliability",
		label: "Infrastructure & Reliability",
		tags: [
			"docker",
			"kubernetes",
			"devops",
			"cloudflare",
			"self-hosting",
			"security",
			"reliability",
			"architecture",
			"systems-design",
		],
	},
	{
		id: "projects-open-source",
		label: "Projects & Open Source",
		tags: ["showcase", "open-source", "development", "pdf"],
	},
	{
		id: "life-productivity",
		label: "Life & Productivity",
		tags: ["productivity", "retirement", "finances", "gaming"],
	},
];
