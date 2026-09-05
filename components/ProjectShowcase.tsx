import { Badge } from "@/components/ClientUI";
import Image from "@/components/Image";
import Link from "@/components/Link";
import ProjectStack from "@/components/ProjectStack";
import type { Project } from "@/data/projectsData";

const panelAccents = [
	"from-primary/10",
	"from-secondary/10",
	"from-accent-cyan/10",
	"from-accent-orange/10",
];

export default function ProjectShowcase({ projects }: { projects: Project[] }) {
	const featuredProjects = projects
		.filter((project) => project.featured !== false)
		.slice(0, 4);

	return (
		<ProjectStack>
			{featuredProjects.map((project, index) => (
				<article
					key={project.title}
					aria-labelledby={`featured-project-${index}`}
					className="project-panel relative scroll-mt-28 rounded-kj-2xl border border-border bg-surface shadow-kj-lg"
				>
					<div
						className={`grid h-full overflow-hidden rounded-[inherit] bg-linear-to-br ${panelAccents[index]} via-transparent to-transparent lg:grid-cols-2`}
					>
						<div className="order-2 flex min-w-0 flex-col gap-5 p-6 sm:p-8 lg:order-1 lg:p-10">
							<div className="flex items-center gap-4 font-mono text-xs text-muted-foreground">
								<span
									className="text-3xl font-medium tracking-tight text-foreground"
									aria-hidden="true"
								>
									{String(index + 1).padStart(2, "0")}
								</span>
								<span className="h-px flex-1 bg-border" aria-hidden="true" />
								<span className="uppercase tracking-widest">Selected work</span>
							</div>
							<h3
								id={`featured-project-${index}`}
								className="text-balance font-sans text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl xl:text-4xl"
							>
								{project.title}
							</h3>
							<p className="text-sm leading-relaxed text-muted-foreground">
								{project.description}
							</p>
							{project.tags?.length ? (
								<div className="flex flex-wrap gap-1.5">
									{project.tags.map((tag) => (
										<Badge
											key={tag}
											variant="neutral"
											className="font-mono text-[10px] uppercase tracking-wider"
										>
											{tag}
										</Badge>
									))}
								</div>
							) : null}
							<div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">
								{project.href && (
									<Link
										href={project.href}
										className="inline-flex min-h-11 items-center gap-2 rounded-kj-md bg-primary px-4 font-mono text-sm font-bold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
									>
										Launch App <span aria-hidden="true">↗</span>
										<span className="sr-only">
											: {project.title} (opens in a new tab)
										</span>
									</Link>
								)}
								{project.repoHref && (
									<Link
										href={project.repoHref}
										className="inline-flex min-h-11 items-center gap-2 rounded-kj-md font-mono text-sm font-bold text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
									>
										View Source <span aria-hidden="true">↗</span>
										<span className="sr-only">
											: {project.title} (opens in a new tab)
										</span>
									</Link>
								)}
							</div>
						</div>
						<div className="order-1 flex min-w-0 items-center bg-subtle/50 p-4 sm:p-8 lg:order-2 lg:p-6 xl:p-8">
							<div className="relative aspect-[4/3] w-full overflow-hidden rounded-kj-lg border border-border bg-surface shadow-kj-md">
								{project.imgSrc ? (
									<Image
										src={project.imgSrc}
										alt={`${project.title} — application preview`}
										fill
										sizes="(min-width: 1280px) 560px, (min-width: 1024px) 45vw, 90vw"
										className="object-contain"
									/>
								) : (
									<div className="flex h-full items-center justify-center bg-linear-to-br from-primary/10 to-secondary/10 p-8 text-center font-mono text-sm text-muted-foreground">
										Preview coming soon
									</div>
								)}
							</div>
						</div>
					</div>
				</article>
			))}
		</ProjectStack>
	);
}
