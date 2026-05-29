import Hero from "@/components/Hero";
import Link from "@/components/Link";
import projectsData from "@/data/projectsData";
import siteMetadata from "@/data/siteMetadata";
import "./layout.css";

export default function Home() {
	const email = siteMetadata.email || "contact@kjaniec.dev";
	const personSchema = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: siteMetadata.author,
		url: siteMetadata.siteUrl,
		sameAs: [siteMetadata.github, siteMetadata.linkedin].filter(Boolean),
		jobTitle: "Software Engineer",
		description: siteMetadata.description,
		image: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
	};

	const websiteSchema = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: siteMetadata.title,
		url: siteMetadata.siteUrl,
		description: siteMetadata.description,
		author: {
			"@type": "Person",
			name: siteMetadata.author,
		},
		potentialAction: {
			"@type": "SearchAction",
			target: {
				"@type": "EntryPoint",
				urlTemplate: `${siteMetadata.siteUrl}/tags/{search_term_string}`,
			},
			"query-input": "required name=search_term_string",
		},
	};

	return (
		<>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON.stringify(personSchema) is safe for personSchema
				dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
			/>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON.stringify(websiteSchema) is safe for websiteSchema
				dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
			/>
			{/* Hero Section */}
			<Hero />

			{/* Services Section */}
			<section className="space-y-8 my-16">
				<div className="space-y-2">
					<p className="text-xs font-bold tracking-[0.2em] text-primary uppercase font-mono">
						Services
					</p>
					<h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-sans">
						What I Do & Deliver
					</h2>
					<p className="text-muted-foreground text-sm max-w-xl font-sans">
						I partner with teams to design, build, and optimize high-performance
						software systems. Here are the core services I provide.
					</p>
				</div>

				<div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
					{[
						{
							title: "Full-Stack Development",
							desc: "Building modern, performant web applications using React, Angular, Next.js, and TypeScript, backed by clean and scalable APIs.",
							href: `mailto:${email}?subject=Inquiry regarding Full-Stack Development • kjaniec.dev`,
							hoverColor: "hover:border-primary/40 hover:bg-primary/[0.02]",
							hoverText: "group-hover:text-primary",
							icon: (
								<svg
									className="h-6 w-6 text-primary"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<title>Full-Stack Development</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
									/>
								</svg>
							),
						},
						{
							title: "System Architecture",
							desc: "Designing clean, decoupled, and pragmatic system architectures in Go, Python, or Rust built for long-term scalability.",
							href: `mailto:${email}?subject=Inquiry regarding System Architecture • kjaniec.dev`,
							hoverColor: "hover:border-secondary/40 hover:bg-secondary/[0.02]",
							hoverText: "group-hover:text-secondary",
							icon: (
								<svg
									className="h-6 w-6 text-secondary"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<title>System Architecture</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
									/>
								</svg>
							),
						},
						{
							title: "Cloud & DevOps",
							desc: "Setting up automated CI/CD pipelines, container orchestration (Docker/Kubernetes), and secure AWS/GCP cloud environments.",
							href: `mailto:${email}?subject=Inquiry regarding Cloud %26 DevOps • kjaniec.dev`,
							hoverColor: "hover:border-primary/40 hover:bg-primary/[0.02]",
							hoverText: "group-hover:text-primary",
							icon: (
								<svg
									className="h-6 w-6 text-primary"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<title>Cloud & DevOps</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
									/>
								</svg>
							),
						},
						{
							title: "Technical Consulting",
							desc: "Conducting technology evaluations, code audits, architecture reviews, and performance tuning to solve complex bottlenecks.",
							href: `mailto:${email}?subject=Inquiry regarding Technical Consulting • kjaniec.dev`,
							hoverColor: "hover:border-secondary/40 hover:bg-secondary/[0.02]",
							hoverText: "group-hover:text-secondary",
							icon: (
								<svg
									className="h-6 w-6 text-secondary"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<title>Technical Consulting</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
									/>
								</svg>
							),
						},
					].map((item) => (
						<Link
							key={item.title}
							href={item.href}
							className={`group block rounded-kj-xl border border-border bg-card p-6 shadow-kj-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-kj-md font-sans ${item.hoverColor}`}
						>
							<div className="mb-4 rounded-kj-lg bg-background p-2.5 w-fit border border-border transition-colors duration-300 group-hover:border-current">
								{item.icon}
							</div>
							<h3
								className={`text-lg font-bold text-foreground mb-2 transition-colors duration-300 ${item.hoverText}`}
							>
								{item.title}
							</h3>
							<p className="text-muted-foreground text-sm leading-relaxed font-sans">
								{item.desc}
							</p>
						</Link>
					))}
				</div>
			</section>

			{/* Featured Projects Section */}
			<section className="space-y-8 my-16">
				<div className="flex items-end justify-between">
					<div className="space-y-2">
						<p className="text-xs font-bold tracking-[0.2em] text-primary uppercase font-mono">
							Portfolio
						</p>
						<h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-sans">
							Featured Work
						</h2>
					</div>
					<Link
						href="/projects"
						className="group inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-hover transition-colors font-mono"
					>
						<span>View all work</span>
						<svg
							className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<title>Arrow right</title>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2.5}
								d="M9 5l7 7-7 7"
							/>
						</svg>
					</Link>
				</div>

				<div className="grid gap-6 md:grid-cols-2">
					{projectsData.slice(0, 4).map((project) => (
						<div
							key={project.title}
							className="group relative flex flex-col justify-between rounded-kj-2xl border border-border bg-card p-6 shadow-kj-sm transition-all duration-300 hover:shadow-kj-md hover:-translate-y-1"
						>
							<div className="space-y-4">
								<div className="flex flex-wrap gap-1.5">
									{project.tags?.map((tag) => (
										<span
											key={tag}
											className="rounded-full border border-secondary/30 bg-secondary/10 px-2.5 py-0.5 text-[10px] font-bold text-secondary uppercase font-mono"
										>
											{tag}
										</span>
									))}
								</div>
								<h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors font-sans">
									{project.title}
								</h3>
								<p className="text-muted-foreground text-sm leading-relaxed font-sans">
									{project.description}
								</p>
							</div>
							<div className="flex items-center gap-4 pt-6">
								{project.href && (
									<Link
										href={project.href}
										className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-hover transition-colors font-mono"
									>
										<span>Launch App</span>
										<svg
											className="h-4 w-4"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<title>External Link</title>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
											/>
										</svg>
									</Link>
								)}
								{project.repoHref && (
									<Link
										href={project.repoHref}
										className="inline-flex items-center gap-1.5 text-sm font-bold text-muted-foreground hover:text-foreground transition-colors font-mono"
									>
										<span>View Source</span>
										<svg
											className="h-4 w-4"
											fill="currentColor"
											viewBox="0 0 24 24"
										>
											<title>GitHub</title>
											<path
												fillRule="evenodd"
												clipRule="evenodd"
												d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
											/>
										</svg>
									</Link>
								)}
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Contact CTA Section */}
			<section className="my-16 rounded-kj-2xl border border-border bg-card p-8 text-center shadow-kj-lg relative overflow-hidden">
				{/* Background mesh glow */}
				<div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />

				<div className="relative z-10 max-w-2xl mx-auto space-y-6">
					<p className="text-xs font-bold tracking-[0.2em] text-primary uppercase font-mono">
						Get in touch
					</p>
					<h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl font-sans">
						Let's Build Something Extraordinary
					</h2>
					<p className="text-muted-foreground text-sm leading-relaxed max-w-xl mx-auto font-sans">
						Whether you're looking for a senior software consultant, backend
						architecture design, or a full-stack engineer to scale your SaaS
						product, I'm ready to collaborate.
					</p>

					<div className="flex flex-wrap justify-center gap-4 pt-4">
						{siteMetadata.email && (
							<Link
								href={`mailto:${siteMetadata.email}`}
								className="inline-flex items-center gap-2 rounded-kj-lg bg-primary hover:bg-primary-hover px-6 py-3 font-semibold text-primary-foreground shadow-kj-glow transition-all"
							>
								<svg
									className="h-4 w-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<title>Email</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
									/>
								</svg>
								<span>Say Hello</span>
							</Link>
						)}

						{siteMetadata.linkedin && (
							<Link
								href={siteMetadata.linkedin}
								className="inline-flex items-center gap-2 rounded-kj-lg border border-border bg-background hover:bg-muted px-6 py-3 font-semibold text-foreground shadow-kj-sm transition-all"
							>
								<svg
									className="h-4 w-4"
									fill="currentColor"
									viewBox="0 0 24 24"
								>
									<title>LinkedIn</title>
									<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
								</svg>
								<span>LinkedIn</span>
							</Link>
						)}
					</div>
				</div>
			</section>
		</>
	);
}
