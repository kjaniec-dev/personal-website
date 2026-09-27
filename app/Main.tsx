import { SectionHeader } from "@/components/ClientUI";
import ContactCTA from "@/components/ContactCTA";
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
		"@id": `${siteMetadata.siteUrl}/#person`,
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
		"@id": `${siteMetadata.siteUrl}/#website`,
		name: siteMetadata.title,
		url: siteMetadata.siteUrl,
		description: siteMetadata.description,
		author: {
			"@id": `${siteMetadata.siteUrl}/#person`,
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
			<ContactCTA
				variant="large"
				headingId="contact-heading"
				eyebrow="Get in touch"
				title={
					<>
						<span className="block">Have a product in mind?</span>{" "}
						<span className="block bg-linear-to-r from-primary via-primary to-primary-hover bg-clip-text text-transparent">
							Let's build it.
						</span>
					</>
				}
				description="Senior consulting, backend architecture, or a full-stack engineer to scale your product — tell me what you're working on."
				email={email}
				linkedinHref={siteMetadata.linkedin}
			/>
		</>
	);
}
