import { genPageMetadata } from "app/seo";
import PageHeader from "@/components/PageHeader";
import ProjectCard from "@/components/ProjectCard";
import projectsData from "@/data/projectsData";

export const metadata = genPageMetadata({ title: "Projects" });

export default function Projects() {
	return (
		<div className="space-y-6">
			<PageHeader
				eyebrow="Portfolio"
				title="Projects"
				description="A collection of projects I've worked on. Each project represents different challenges and learning experiences."
			/>

			<div className="grid gap-6 md:grid-cols-2">
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
						priority={index < 2}
					/>
				))}
			</div>
		</div>
	);
}
