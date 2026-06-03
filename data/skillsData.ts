export interface Skill {
	title: string;
	years: string;
	level: "primary" | "secondary";
}

const skillsData: Skill[] = [
	{ title: "Java", years: "8+ yrs", level: "primary" },
	{ title: "TypeScript", years: "10+ yrs", level: "primary" },
	{ title: "React", years: "5+ yrs", level: "primary" },
	{ title: "Spring Boot", years: "8+ yrs", level: "primary" },
	{ title: "Node.js", years: "6+ yrs", level: "primary" },
	{ title: "PostgreSQL", years: "10+ yrs", level: "primary" },
	{ title: "Docker", years: "11+ yrs", level: "primary" },
	{ title: "Kubernetes", years: "8+ yrs", level: "primary" },
	{ title: "Go", years: "3+ yrs", level: "secondary" },
	{ title: "Angular", years: "5+ yrs", level: "secondary" },
	{ title: "NestJS / Express", years: "5+ yrs", level: "secondary" },
	{ title: "Kafka", years: "2+ yrs", level: "secondary" },
	{ title: "Redis / RabbitMQ", years: "5+ yrs", level: "secondary" },
];

export default skillsData;
