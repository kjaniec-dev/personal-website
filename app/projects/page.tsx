import { genPageMetadata } from "app/seo";
import ContactCTA from "@/components/ContactCTA";
import PortfolioPageHeader from "@/components/PortfolioPageHeader";
import ProjectCard from "@/components/ProjectCard";
import projectsData from "@/data/projectsData";
import siteMetadata from "@/data/siteMetadata";

export const metadata = genPageMetadata({ title: "Projects" });

export default function Projects() {
	return (
		<div className="pt-12 pb-8 font-sans sm:pt-16">
			<PortfolioPageHeader
				eyebrow="Portfolio"
				title="Projects"
				description="Products, developer tools, and experiments. A closer look at the software I design, build, and ship."
			/>

			<div className="flex flex-wrap items-center justify-between gap-3 border-y border-border py-4 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
				<span>
					All work{" "}
					<span className="ml-2 text-primary">
						{String(projectsData.length).padStart(2, "0")}
					</span>
				</span>
				<span>From idea to production</span>
			</div>
			<div className="divide-y divide-border">
				{projectsData.map((p, index) => (
					<ProjectCard
						key={p.title}
						title={p.title}
						description={p.description}
						imgSrc={p.imgSrc}
						href={p.href}
						repoHref={p.repoHref}
						tags={p.tags}
						status={p.status}
						index={index}
						priority={index === 0}
					/>
				))}
			</div>
			<ContactCTA
				headingId="project-contact-heading"
				title="Have something in mind?"
				description="Let’s talk about what you want to build."
				email={siteMetadata.email}
				className="mt-4"
			/>
		</div>
	);
}
