import Image from "@/components/Image";
import Link from "@/components/Link";
import TechnologyBadge from "@/components/TechnologyBadge";
import type { ProjectStatus } from "@/data/projectsData";

interface ProjectCardProps {
	title: string;
	description: string;
	imgSrc?: string;
	href?: string;
	repoHref?: string;
	tags?: string[];
	status?: ProjectStatus;
	priority?: boolean;
	index?: number;
}

const statusLabel: Record<ProjectStatus, string> = {
	"open-source": "Open Source",
	"live-saas": "Live SaaS",
	"client-work": "Client Work",
	experiment: "Experiment",
};

export default function ProjectCard({
	title,
	description,
	imgSrc,
	href,
	repoHref,
	tags = [],
	status = "open-source",
	priority = false,
	index,
}: ProjectCardProps) {
	return (
		<article
			aria-label={title}
			className="grid gap-6 py-8 sm:gap-8 sm:py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] xl:gap-12 xl:py-12"
		>
			<div className="self-start overflow-hidden rounded-2xl border border-border bg-surface p-3 sm:p-4">
				<div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-subtle">
					{imgSrc ? (
						<Image
							src={imgSrc}
							alt={`${title} — application preview`}
							fill
							sizes="(min-width: 1280px) 440px, (min-width: 768px) 300px, (min-width: 640px) 640px, 90vw"
							className="object-contain"
							priority={priority}
						/>
					) : (
						<div className="absolute inset-0 flex items-center justify-center p-6 text-center font-mono text-xs text-muted-foreground">
							Preview coming soon
						</div>
					)}
				</div>
			</div>

			<div className="flex min-w-0 flex-col items-start gap-4">
				<div className="flex w-full items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
					{index !== undefined && (
						<span
							aria-hidden="true"
							className="text-lg tracking-tight text-primary"
						>
							{String(index + 1).padStart(2, "0")}
						</span>
					)}
					<span aria-hidden="true" className="h-px flex-1 bg-border" />
					<span className="inline-flex items-center gap-2">
						{status === "live-saas" && (
							<span
								aria-hidden="true"
								className="h-1.5 w-1.5 rounded-full bg-primary"
							/>
						)}
						{statusLabel[status]}
					</span>
				</div>
				<h2 className="text-balance text-2xl font-semibold leading-tight tracking-tight text-foreground xl:text-3xl">
					{title}
				</h2>
				<p className="text-sm leading-relaxed text-muted-foreground">
					{description}
				</p>
				{tags.length > 0 ? (
					<div className="flex flex-wrap gap-1.5">
						{tags.map((t) => (
							<TechnologyBadge key={t}>{t}</TechnologyBadge>
						))}
					</div>
				) : null}
				<div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1">
					{href ? (
						<Link
							href={href}
							className="inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-semibold text-primary transition-colors hover:text-primary-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
						>
							Launch app <span aria-hidden="true">↗</span>
							<span className="sr-only">: {title} (opens in a new tab)</span>
						</Link>
					) : null}
					{repoHref ? (
						<Link
							href={repoHref}
							className="inline-flex min-h-11 items-center gap-2 rounded-md text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
						>
							View source <span aria-hidden="true">↗</span>
							<span className="sr-only">: {title} (opens in a new tab)</span>
						</Link>
					) : null}
				</div>
			</div>
		</article>
	);
}
