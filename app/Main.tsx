import ButtonLink from "@/components/ButtonLink";
import { SectionHeader } from "@/components/ClientUI";
import CopyEmailButton from "@/components/CopyEmailButton";
import Hero from "@/components/Hero";
import Link from "@/components/Link";
import ProjectShowcase from "@/components/ProjectShowcase";
import Services from "@/components/Services";
import projectsData from "@/data/projectsData";
import siteMetadata from "@/data/siteMetadata";

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
					className="[&_h2]:font-medium [&_h2]:tracking-[-0.035em]"
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
			<section
				aria-labelledby="contact-heading"
				className="my-16 grid gap-8 border-t border-border pt-12 sm:pt-16 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16"
			>
				<div className="min-w-0 space-y-5">
					<p className="font-mono text-xs font-bold tracking-[0.2em] text-primary uppercase">
						Get in touch
					</p>
					<h2
						id="contact-heading"
						className="text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.08] font-medium tracking-[-0.05em] text-foreground"
					>
						<span className="block">Have a product in mind?</span>{" "}
						<span className="block bg-linear-to-r from-primary via-primary to-primary-hover bg-clip-text text-transparent">
							Let's build it.
						</span>
					</h2>
					<p className="max-w-xl text-base leading-relaxed text-muted-foreground">
						Senior consulting, backend architecture, or a full-stack engineer to
						scale your product — tell me what you're working on.
					</p>
				</div>

				<div className="flex flex-wrap items-center gap-3 sm:gap-4">
					<ButtonLink
						href={`mailto:${email}`}
						target="_self"
						variant="primary"
						size="lg"
						className="group min-h-12 gap-5 rounded-kj-lg shadow-kj-glow"
					>
						Say hello
						<svg
							aria-hidden="true"
							className="h-4 w-4 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth={1.75}
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M7 17 17 7M7 7h10v10" />
						</svg>
					</ButtonLink>

					<CopyEmailButton
						email={email}
						size="lg"
						className="min-h-12 rounded-kj-lg px-5"
					/>

					{siteMetadata.linkedin && (
						<ButtonLink
							href={siteMetadata.linkedin}
							variant="ghost"
							size="lg"
							className="min-h-12 gap-3 rounded-kj-sm text-foreground hover:text-primary"
						>
							<svg
								aria-hidden="true"
								className="h-4 w-4"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
							</svg>
							LinkedIn
						</ButtonLink>
					)}
				</div>
			</section>
		</>
	);
}
