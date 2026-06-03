import Card from "@/components/Card";
import Image from "@/components/Image";
import Link from "@/components/Link";
import Pill from "@/components/Pill";
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
}

const statusLabel: Record<ProjectStatus, string> = {
	"open-source": "Open Source",
	"live-saas": "Live SaaS",
	"client-work": "Client Work",
	experiment: "Experiment",
};

const statusTone: Record<
	ProjectStatus,
	"secondary" | "success" | "primary" | "muted"
> = {
	"open-source": "secondary",
	"live-saas": "success",
	"client-work": "primary",
	experiment: "muted",
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
}: ProjectCardProps) {
	return (
		<Card
			as="article"
			interactive
			padded={false}
			className="flex flex-col overflow-hidden"
		>
			<div className="relative aspect-[16/9] w-full bg-muted">
				{imgSrc ? (
					<Image
						src={imgSrc}
						alt={title}
						fill
						sizes="(min-width: 768px) 50vw, 100vw"
						className="object-cover"
						priority={priority}
					/>
				) : (
					<div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
				)}
				<div className="absolute right-3 top-3">
					<Pill tone={statusTone[status]}>{statusLabel[status]}</Pill>
				</div>
			</div>

			<div className="flex flex-1 flex-col gap-3 p-6">
				{tags.length > 0 ? (
					<div className="flex flex-wrap gap-1.5">
						{tags.map((t) => (
							<Pill key={t} tone="secondary">
								{t}
							</Pill>
						))}
					</div>
				) : null}
				<h3 className="font-sans text-2xl font-bold text-foreground">
					{title}
				</h3>
				<p className="text-sm leading-relaxed text-muted-foreground">
					{description}
				</p>
				<div className="mt-auto flex flex-wrap items-center gap-4 pt-4">
					{href ? (
						<Link
							href={href}
							className="inline-flex items-center gap-1.5 font-mono text-sm font-bold text-primary transition-colors hover:text-primary-hover"
						>
							Launch app →
						</Link>
					) : null}
					{repoHref ? (
						<Link
							href={repoHref}
							className="inline-flex items-center gap-1.5 font-mono text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
						>
							View source →
						</Link>
					) : null}
				</div>
			</div>
		</Card>
	);
}
