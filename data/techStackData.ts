export interface TechStackItem {
	name: string;
	short?: string;
}

const techStackData: TechStackItem[] = [
	{ name: "TypeScript", short: "TS" },
	{ name: "Next.js" },
	{ name: "React" },
	{ name: "Node.js" },
	{ name: "Go" },
	{ name: "PostgreSQL" },
	{ name: "Docker" },
	{ name: "Kubernetes" },
];

export default techStackData;
