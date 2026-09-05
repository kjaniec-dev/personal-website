import { genPageMetadata } from "app/seo";
import Link from "@/components/Link";
import ProjectCard from "@/components/ProjectCard";
import projectsData from "@/data/projectsData";
import siteMetadata from "@/data/siteMetadata";

export const metadata = genPageMetadata({ title: "Projects" });

export default function Projects() {
	return (
		<div className="pt-12 pb-8 font-sans sm:pt-16">
			<header className="pb-10 sm:pb-14">
				<p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-primary">
					Portfolio
				</p>
				<div className="grid gap-6 md:grid-cols-2 md:items-end md:gap-10">
					<h1 className="text-5xl font-medium leading-none tracking-tight text-foreground sm:text-6xl xl:text-7xl">
						Projects<span className="text-primary">.</span>
					</h1>
					<p className="max-w-lg text-base leading-relaxed text-muted-foreground">
						Products, developer tools, and experiments. A closer look at the
						software I design, build, and ship.
					</p>
				</div>
			</header>

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
			{siteMetadata.email && (
				<section
					aria-labelledby="project-contact-heading"
					className="mt-4 flex flex-col items-start justify-between gap-6 rounded-2xl border border-border bg-surface p-6 sm:flex-row sm:items-center sm:p-8"
				>
					<div className="space-y-2">
						<h2
							id="project-contact-heading"
							className="text-2xl font-medium tracking-tight text-foreground"
						>
							Have something in mind?
						</h2>
						<p className="text-sm leading-relaxed text-muted-foreground">
							Let’s talk about what you want to build.
						</p>
					</div>
					<Link
						href={`mailto:${siteMetadata.email}`}
						target="_self"
						className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
					>
						Let’s talk <span aria-hidden="true">↗</span>
					</Link>
				</section>
			)}
		</div>
	);
}
