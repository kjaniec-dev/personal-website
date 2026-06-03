export interface ExperienceSectionEntry {
	role: string;
	company: string;
	period: string;
	context?: string;
	responsibilities?: string[];
	deliverables?: string[];
	tags?: string[];
	link?: { href: string; text: string };
}

const experienceData: ExperienceSectionEntry[] = [
	{
		role: "Software Developer",
		company: "AMB Software / REWE Digital Poland",
		period: "Jul 2024 – Present",
		context: "Enterprise e-commerce / retail software development",
		responsibilities: [
			"Development and maintenance of enterprise-grade applications in the retail/e-commerce domain.",
			"Backend and frontend feature implementation using Java, Spring Boot, TypeScript and Angular.",
			"Work with distributed systems, APIs, databases and integrations.",
			"Cooperation with remote, cross-functional teams in a B2B contractor model.",
			"Participation in technical analysis, implementation planning, code reviews and delivery.",
			"Contribution to maintainable, scalable and production-ready software.",
		],
		deliverables: [
			"Backend services and business logic implemented in Java/Spring Boot.",
			"Frontend modules and UI features implemented in Angular/TypeScript.",
			"API integrations and improvements to existing enterprise systems.",
			"Refactored, tested and maintainable production code.",
			"Technical support for ongoing product development and system evolution.",
		],
		tags: [
			"Java",
			"Spring Boot",
			"TypeScript",
			"Angular",
			"DB2",
			"Kafka",
			"Keycloak",
			"Docker",
			"Kubernetes",
		],
	},
	{
		role: "Software Engineer",
		company: "BIOT Sp. z o.o.",
		period: "Jul 2019 – Jun 2024",
		context: "IoT platform, microservices and high-density data systems",
		responsibilities: [
			"Development of an IoT platform based on microservices architecture.",
			"Backend development using TypeScript, Node.js, Express/NestJS and related technologies.",
			"Frontend development using React, Material UI, MobX and mapping/data visualization libraries.",
			"Design and implementation of APIs using REST, GraphQL and gRPC.",
			"Work with asynchronous communication and event-driven components using RabbitMQ.",
			"Database design and development with PostgreSQL, TypeORM and Elasticsearch.",
			"Implementation of map-based and geospatial interfaces using Mapbox GL and Deck.gl.",
			"Collaboration on deployment and infrastructure topics using Docker and Kubernetes.",
		],
		deliverables: [
			"Microservices for IoT data processing and business workflows.",
			"Web application features for monitoring, management and visualization.",
			"API layers for frontend/backend and service-to-service communication.",
			"Database models, queries and persistence layers.",
			"Real-time or near-real-time data-driven UI components.",
			"Map-based dashboards and visualizations.",
			"Production-ready features delivered in a remote B2B setup.",
		],
		tags: [
			"TypeScript",
			"Node.js",
			"Express.js",
			"NestJS",
			"React",
			"RabbitMQ",
			"gRPC",
			"GraphQL",
			"TypeORM",
			"PostgreSQL",
			"MobX",
			"Mapbox GL",
			"Deck.gl",
			"Material UI",
			"Elasticsearch",
			"Redis",
			"Docker",
			"Kubernetes",
		],
		link: { href: "https://biotcloud.com", text: "biotcloud" },
	},
	{
		role: "Software Developer Java",
		company: "Cinkciarz.pl",
		period: "Nov 2015 – Jun 2019",
		context: "Financial technology, microservices and business applications",
		responsibilities: [
			"Backend development in Java-based microservice systems.",
			"Implementation of REST APIs and business logic using Java, Spring Boot and Hibernate.",
			"Development and maintenance of frontend modules using Angular.",
			"Database integration and persistence layer implementation.",
			"Work with Docker-based development and deployment workflows.",
			"Participation in code reviews, debugging, refactoring and production support.",
			"Collaboration with product, QA and backend/frontend teams.",
		],
		deliverables: [
			"Java/Spring Boot microservices.",
			"REST APIs and backend business features.",
			"Database integrations and Hibernate-based persistence logic.",
			"Angular frontend modules and UI features.",
			"Dockerized application components.",
			"Refactored and maintainable production code.",
		],
		tags: [
			"Java",
			"Spring Boot",
			"Hibernate",
			"REST",
			"Gradle",
			"Docker",
			"Angular",
			"TypeScript",
			"PostgreSQL",
			"Bootstrap",
		],
	},
	{
		role: "ERP Developer",
		company: "TRAX S.A.",
		period: "Oct 2013 – Oct 2015",
		context: "ERP systems, business processes and database-driven applications",
		responsibilities: [
			"Development and customization of ERP functionality in Infor CloudSuite / Syteline.",
			"Programming business logic and internal tools using Visual Basic.",
			"Database development and reporting using MS SQL Server / T-SQL.",
			"Support for business processes related to ERP, finance, logistics and supply chain.",
			"Maintenance, debugging and improvement of existing ERP modules.",
		],
		deliverables: [
			"ERP customizations and business-process extensions.",
			"SQL queries, reports and database procedures.",
			"Internal tools supporting operational workflows.",
			"Bug fixes, enhancements and system maintenance.",
			"Technical support for ERP users and business stakeholders.",
		],
		tags: [
			"Infor CloudSuite / Syteline",
			"Visual Basic",
			"MS SQL Server",
			"T-SQL",
		],
	},
];

export default experienceData;
