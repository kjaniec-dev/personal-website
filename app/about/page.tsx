import { genPageMetadata } from "app/seo";
import { allAuthors } from "contentlayer/generated";
import { MDXLayoutRenderer } from "pliny/mdx-components";
import Card from "@/components/Card";
import { PageHeader, Progress } from "@/components/ClientUI";
import Image from "@/components/Image";
import { components } from "@/components/MDXComponents";
import Pill from "@/components/Pill";
import StatBadge from "@/components/StatBadge";
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
							<StatBadge value="12+" label="Years of Exp." />
							<StatBadge
								value="B2B"
								label="Contract Model"
								accent="secondary"
							/>
							<StatBadge value="100%" label="Remote Focus" />
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
				<div className="space-y-4">
					{experienceData.map((entry) => (
						<Card key={`${entry.primaryText}-${entry.secondaryText}`} padded>
							<div className="space-y-3">
								<p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
									{entry.secondaryText}
								</p>
								<h3 className="font-sans text-lg font-bold text-foreground">
									{entry.primaryText}
								</h3>
								{entry.tags && entry.tags.length > 0 ? (
									<div className="flex flex-wrap gap-1.5">
										{entry.tags.map((t) => (
											<Pill key={t}>{t}</Pill>
										))}
									</div>
								) : null}
								{entry.link ? (
									<a
										href={entry.link.href}
										className="font-mono text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
									>
										{entry.link.text} →
									</a>
								) : null}
							</div>
						</Card>
					))}
				</div>
			</section>

			<div className="grid gap-6 md:grid-cols-2">
				<Card padded>
					<div className="space-y-4">
						<p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-primary">
							Education
						</p>
						<ul className="space-y-3">
							{educationData.map((e) => (
								<li key={e.primaryText} className="space-y-0.5">
									<p className="font-sans text-base font-semibold text-foreground">
										{e.primaryText}
									</p>
									<p className="font-mono text-xs text-muted-foreground">
										{e.secondaryText}
									</p>
								</li>
							))}
						</ul>
					</div>
				</Card>

				<Card padded>
					<div className="space-y-4">
						<p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-primary">
							Skills
						</p>
						<ul className="space-y-3">
							{skillsData.map((s, i) => (
								<li key={s.title} className="space-y-1">
									<div className="flex items-center justify-between">
										<span className="font-sans text-sm font-semibold text-foreground">
											{s.title}
										</span>
										<span className="font-mono text-xs text-muted-foreground">
											{s.percent}%
										</span>
									</div>
									<Progress
										value={s.percent}
										className="h-1.5"
										barClassName="skill-bar-animation"
										style={{ "--delay": `${i * 0.07}s` } as React.CSSProperties}
									/>
								</li>
							))}
						</ul>
					</div>
				</Card>
			</div>
		</div>
	);
}
