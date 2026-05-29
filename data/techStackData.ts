export interface TechStackItem {
	name: string;
	short?: string;
}

const techStackData: TechStackItem[] = [
	{ name: "Java" },
	{ name: "Spring Boot", short: "Spring" },
	{ name: "TypeScript", short: "TS" },
	{ name: "Next.js" },
	{ name: "React" },
	{ name: "Angular" },
	{ name: "Node.js" },
	{ name: "PostgreSQL" },
	{ name: "Docker" },
	{ name: "Kubernetes" },
];

export default techStackData;
