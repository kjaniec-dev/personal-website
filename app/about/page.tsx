import { genPageMetadata } from "app/seo";
import { allAuthors } from "contentlayer/generated";
import { MDXLayoutRenderer } from "pliny/mdx-components";
import Card from "@/components/Card";
import { MetricCard, PageHeader } from "@/components/ClientUI";
import Image from "@/components/Image";
import { components } from "@/components/MDXComponents";
import Pill from "@/components/Pill";
import educationData from "@/data/educationData";
import experienceData from "@/data/experienceData";
import siteMetadata from "@/data/siteMetadata";
import skillsData from "@/data/skillsData";

export const metadata = genPageMetadata({ title: "About" });

export default function About() {
	const author = allAuthors.find((a) => a.slug === "default") ?? allAuthors[0];

	return (
		<div className="space-y-10 pb-16">
			<PageHeader
				eyebrow="About"
				title={`Hi, I'm ${siteMetadata.author}`}
				description={siteMetadata.description}
			/>

			<Card padded glow>
				<div className="grid items-center gap-8 md:grid-cols-[200px_1fr]">
					{author.avatar ? (
						<Image
							src={author.avatar}
							alt={author.name}
							width={200}
							height={200}
							className="mx-auto rounded-kj-2xl border border-border shadow-kj-sm"
							priority
						/>
					) : null}
					<div className="space-y-4">
						<div className="space-y-1">
							<h3 className="font-sans text-2xl font-bold tracking-tight text-foreground">
								Senior Software Engineer
							</h3>
							<p className="font-mono text-xs font-semibold text-primary uppercase tracking-wider">
								B2B Contractor • Remote Specialist
							</p>
						</div>
						<div className="grid grid-cols-3 gap-4 pt-3 border-t border-border/40">
							<MetricCard title="Years of Exp." value="12+" />
							<MetricCard title="Contract Model" value="B2B" />
							<MetricCard title="Remote Focus" value="100%" />
						</div>
					</div>
				</div>
			</Card>

			<div className="prose dark:prose-invert max-w-none pt-2">
				<MDXLayoutRenderer code={author.body.code} components={components} />
			</div>

			<section className="space-y-6">
				<div className="space-y-2">
					<p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-primary">
						Experience
					</p>
					<h2 className="font-sans text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
						Where I&apos;ve worked
					</h2>
				</div>
				<div className="space-y-6">
					{experienceData.map((entry) => (
						<Card key={`${entry.role}-${entry.company}`} padded>
							<div className="space-y-4">
								<div className="flex flex-col space-y-1.5 md:flex-row md:items-baseline md:justify-between">
									<h3 className="font-sans text-xl font-bold tracking-tight text-foreground">
										{entry.role}{" "}
										<span className="font-normal text-muted-foreground">
											at
										</span>{" "}
										<span className="text-primary">{entry.company}</span>
									</h3>
									<p className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
										{entry.period}
									</p>
								</div>

								{entry.context ? (
									<p className="text-sm font-sans text-muted-foreground/80 italic border-l-2 border-primary/20 pl-3 py-0.5">
										Context: {entry.context}
									</p>
								) : null}

								<div className="grid gap-6 md:grid-cols-2 pt-2">
									{entry.responsibilities &&
									entry.responsibilities.length > 0 ? (
										<div className="space-y-2">
											<h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-primary">
												Responsibilities
											</h4>
											<ul className="list-none space-y-1.5 text-sm text-muted-foreground">
												{entry.responsibilities.map((r) => (
													<li
														key={r}
														className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-primary/40"
													>
														{r}
													</li>
												))}
											</ul>
										</div>
									) : null}

									{entry.deliverables && entry.deliverables.length > 0 ? (
										<div className="space-y-2">
											<h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-secondary">
												Key Deliverables
											</h4>
											<ul className="list-none space-y-1.5 text-sm text-muted-foreground">
												{entry.deliverables.map((d) => (
													<li
														key={d}
														className="relative pl-4 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-secondary/40"
													>
														{d}
													</li>
												))}
											</ul>
										</div>
									) : null}
								</div>

								{entry.tags && entry.tags.length > 0 ? (
									<div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/30">
										{entry.tags.map((t) => (
											<Pill key={t}>{t}</Pill>
										))}
									</div>
								) : null}

								{entry.link ? (
									<div className="pt-1">
										<a
											href={entry.link.href}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-primary transition-colors hover:text-primary-hover"
										>
											{entry.link.text} <span className="text-[10px]">↗</span>
										</a>
									</div>
								) : null}
							</div>
						</Card>
					))}
				</div>
			</section>

			<div className="grid gap-8 md:grid-cols-2">
				<div className="flex flex-col space-y-6">
					<div className="space-y-2">
						<p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-primary">
							Education
						</p>
						<h2 className="font-sans text-3xl font-bold tracking-tight text-foreground">
							Where I studied
						</h2>
					</div>
					<Card padded className="flex-1">
						<ul className="space-y-4">
							{educationData.map((e) => (
								<li key={e.primaryText} className="space-y-1">
									<p className="font-sans text-lg font-bold text-foreground leading-snug">
										{e.primaryText}
									</p>
									<p className="font-mono text-xs text-muted-foreground">
										{e.secondaryText}
									</p>
								</li>
							))}
						</ul>
					</Card>
				</div>

				<div className="flex flex-col space-y-6">
					<div className="space-y-2">
						<p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-primary">
							Skills
						</p>
						<h2 className="font-sans text-3xl font-bold tracking-tight text-foreground">
							Tools of the trade
						</h2>
					</div>
					<Card padded className="flex-1">
						<div className="space-y-5">
							<div className="space-y-2.5">
								<h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
									Primary Stack
								</h4>
								<div className="flex flex-wrap gap-2">
									{skillsData
										.filter((s) => s.level === "primary")
										.map((s) => (
											<div
												key={s.title}
												className="group flex items-center gap-2 rounded-kj-xl border border-primary/20 bg-primary/5 px-3 py-1.5 text-sm font-sans font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/45 hover:bg-primary/10 hover:shadow-kj-sm"
											>
												<span>{s.title}</span>
												<span className="rounded-kj-md bg-primary/10 px-2 py-0.5 font-mono text-[10px] font-bold text-primary group-hover:bg-primary/20 transition-colors">
													{s.years}
												</span>
											</div>
										))}
								</div>
							</div>

							<div className="space-y-2.5">
								<h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
									Secondary Stack
								</h4>
								<div className="flex flex-wrap gap-2">
									{skillsData
										.filter((s) => s.level === "secondary")
										.map((s) => (
											<div
												key={s.title}
												className="group flex items-center gap-2 rounded-kj-xl border border-border/80 bg-surface/40 px-3 py-1.5 text-sm font-sans text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/30 hover:text-foreground hover:shadow-kj-sm"
											>
												<span>{s.title}</span>
												<span className="rounded-kj-md bg-subtle px-2 py-0.5 font-mono text-[10px] font-bold text-muted-foreground group-hover:bg-border transition-colors">
													{s.years}
												</span>
											</div>
										))}
								</div>
							</div>
						</div>
					</Card>
				</div>
			</div>
		</div>
	);
}
