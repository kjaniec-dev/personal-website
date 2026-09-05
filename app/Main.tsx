import { SectionHeader } from "@/components/ClientUI";
import Hero from "@/components/Hero";
import Link from "@/components/Link";
import ProjectShowcase from "@/components/ProjectShowcase";
import Services from "@/components/Services";
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
		sameAs: [
			siteMetadata.github,
			siteMetadata.linkedin,
			siteMetadata.docker,
			siteMetadata.npm,
		].filter(Boolean),
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
			<Services email={email} />

			{/* Featured Projects Section */}
			<section id="selected-work" className="space-y-8 my-16 scroll-mt-28">
				<SectionHeader
					kicker="Portfolio"
					title="Featured Work"
					actions={
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
					}
				/>

				<ProjectShowcase projects={projectsData} />
			</section>

			{/* Contact CTA Section */}
			<section className="my-16 rounded-kj-2xl border border-border bg-surface p-8 text-center shadow-kj-lg relative overflow-hidden">
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
								className="inline-flex items-center gap-2 rounded-kj-lg border border-border bg-subtle hover:bg-surface px-6 py-3 font-semibold text-foreground shadow-kj-sm transition-all"
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
