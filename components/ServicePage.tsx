import type { ReactNode } from "react";
import ButtonLink from "@/components/ButtonLink";
import FAQAccordion from "@/components/FAQAccordion";
import PortfolioPageHeader from "@/components/PortfolioPageHeader";
import ProjectCard from "@/components/ProjectCard";
import type { FAQItem } from "@/data/faqData";
import {
	getProofProjects,
	getServiceEmailSubject,
	type Service,
} from "@/data/servicesData";

interface ServicePageProps {
	service: Service;
	email: string;
}

function Section({
	id,
	index,
	title,
	children,
}: {
	id: string;
	index: number;
	title: string;
	children: ReactNode;
}) {
	return (
		<section
			aria-labelledby={id}
			className="grid gap-5 py-8 sm:py-10 md:grid-cols-[220px_minmax(0,1fr)] md:gap-10 lg:gap-16"
		>
			<div>
				<p aria-hidden="true" className="mb-3 font-mono text-xs text-primary">
					{String(index + 1).padStart(2, "0")}
				</p>
				<h2
					id={id}
					className="text-2xl font-medium tracking-tight text-foreground"
				>
					{title}
				</h2>
			</div>
			<div className="min-w-0">{children}</div>
		</section>
	);
}

export default function ServicePage({ service, email }: ServicePageProps) {
	const proofProjects = getProofProjects(service);
	const faqItems: FAQItem[] = service.faq.map((item) => ({
		...item,
		category: "work",
	}));
	const mailto = `mailto:${email}?subject=${encodeURIComponent(getServiceEmailSubject(service))}`;
	const prefix = `service-${service.slug}`;

	const sections = [
		{
			id: `${prefix}-audience`,
			title: "Who it's for",
			content: (
				<ul className="space-y-3 text-base leading-relaxed text-muted-foreground">
					{service.audience.map((item) => (
						<li key={item}>{item}</li>
					))}
				</ul>
			),
		},
		{
			id: `${prefix}-deliverables`,
			title: "What you get",
			content: (
				<ul className="space-y-3 text-base leading-relaxed text-muted-foreground">
					{service.deliverables.map((item) => (
						<li key={item}>{item}</li>
					))}
				</ul>
			),
		},
		{
			id: `${prefix}-process`,
			title: "How I work",
			content: (
				<ol className="space-y-5">
					{service.process.map((step, index) => (
						<li key={step.title} className="flex gap-4">
							<span
								aria-hidden="true"
								className="pt-0.5 font-mono text-sm text-primary"
							>
								{index + 1}.
							</span>
							<div className="space-y-1">
								<h3 className="text-base font-medium text-foreground">
									{step.title}
								</h3>
								<p className="text-sm leading-relaxed text-muted-foreground">
									{step.description}
								</p>
							</div>
						</li>
					))}
				</ol>
			),
		},
		...(proofProjects.length > 0
			? [
					{
						id: `${prefix}-proof`,
						title: "Proof",
						content: (
							<div className="divide-y divide-border">
								{proofProjects.map((project) => (
									<ProjectCard
										key={project.title}
										title={project.title}
										description={project.description}
										imgSrc={project.imgSrc}
										href={project.href}
										repoHref={project.repoHref}
										tags={project.tags}
										status={project.status}
									/>
								))}
							</div>
						),
					},
				]
			: []),
		...(faqItems.length > 0
			? [
					{
						id: `${prefix}-faq`,
						title: "FAQ",
						content: <FAQAccordion items={faqItems} category="work" />,
					},
				]
			: []),
	];

	return (
		<div className="pt-12 pb-8 font-sans sm:pt-16">
			<PortfolioPageHeader
				eyebrow="Services"
				title={service.title}
				description={service.summary}
			/>
			<p className="-mt-6 mb-10 max-w-2xl text-xl font-medium tracking-tight text-foreground sm:-mt-8">
				{service.headline}
			</p>

			<div className="divide-y divide-border border-t border-border">
				{sections.map((section, index) => (
					<Section
						key={section.id}
						id={section.id}
						index={index}
						title={section.title}
					>
						{section.content}
					</Section>
				))}
			</div>

			<section
				aria-labelledby={`${prefix}-cta`}
				className="mt-4 flex flex-col items-start justify-between gap-6 rounded-2xl border border-border bg-surface p-6 sm:flex-row sm:items-center sm:p-8"
			>
				<div className="min-w-0 space-y-2">
					<h2
						id={`${prefix}-cta`}
						className="text-2xl font-medium tracking-tight text-foreground"
					>
						Let's talk about {service.title}
					</h2>
					<p className="text-sm leading-relaxed text-muted-foreground">
						Tell me what you're working on and I'll reply with next steps.
					</p>
				</div>
				<ButtonLink
					href={mailto}
					target="_self"
					variant="primary"
					size="lg"
					className="min-h-12 shrink-0 rounded-kj-lg"
				>
					Get in touch
				</ButtonLink>
			</section>
		</div>
	);
}
