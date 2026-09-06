import { genPageMetadata } from "app/seo";
import { allAuthors } from "contentlayer/generated";
import { MDXLayoutRenderer } from "pliny/mdx-components";
import DownloadCvButton from "@/components/DownloadCvButton";
import Image from "@/components/Image";
import Link from "@/components/Link";
import { components } from "@/components/MDXComponents";
import educationData from "@/data/educationData";
import experienceData from "@/data/experienceData";
import siteMetadata from "@/data/siteMetadata";
import skillsData, { type Skill } from "@/data/skillsData";

export const metadata = genPageMetadata({ title: "About" });

function ExperienceDetails({
	title,
	items,
}: {
	title: string;
	items?: string[];
}) {
	if (!items?.length) return null;

	return (
		<div>
			<h4 className="mb-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
				{title}
			</h4>
			<ul className="list-disc space-y-2 pl-4 text-sm leading-6 text-muted-foreground marker:text-primary">
				{items.map((item) => (
					<li key={item} className="pl-1">
						{item}
					</li>
				))}
			</ul>
		</div>
	);
}

function SkillList({ title, skills }: { title: string; skills: Skill[] }) {
	return (
		<div>
			<h3 className="mb-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
				{title}
			</h3>
			<dl className="divide-y divide-border/60">
				{skills.map((skill) => (
					<div
						key={skill.title}
						className="flex items-baseline justify-between gap-4 py-3"
					>
						<dt className="text-sm text-foreground">{skill.title}</dt>
						<dd className="shrink-0 font-mono text-xs text-primary">
							{skill.years}
						</dd>
					</div>
				))}
			</dl>
		</div>
	);
}

export default function About() {
	const author = allAuthors.find((a) => a.slug === "default") ?? allAuthors[0];

	return (
		<div className="pt-12 pb-8 font-sans sm:pt-16">
			<header className="pb-10 sm:pb-14">
				<p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-primary">
					Behind the work
				</p>
				<div className="grid gap-6 md:grid-cols-2 md:items-end md:gap-10">
					<h1 className="text-5xl font-medium leading-none tracking-tight text-foreground sm:text-6xl xl:text-7xl">
						About<span className="text-primary">.</span>
					</h1>
					<p className="max-w-lg text-base leading-relaxed text-muted-foreground">
						Senior software engineer based in Poland. Full-stack development,
						systems architecture, and a product mindset.
					</p>
				</div>
			</header>

			<dl className="grid grid-cols-3 gap-3 border-y border-border py-5 sm:gap-8 sm:py-6">
				{[
					{ value: "12+", label: "Years of experience" },
					{ value: "B2B", label: "Contract model" },
					{ value: "100%", label: "Remote work" },
				].map((metric) => (
					<div key={metric.label} className="flex flex-col gap-2">
						<dt className="order-2 font-mono text-[10px] uppercase leading-relaxed tracking-wider text-muted-foreground sm:text-[11px]">
							{metric.label}
						</dt>
						<dd className="text-2xl font-medium tracking-tight text-primary sm:text-3xl">
							{metric.value}
						</dd>
					</div>
				))}
			</dl>

			<section
				aria-labelledby="about-profile-heading"
				className="grid gap-8 py-10 md:grid-cols-[220px_minmax(0,1fr)] md:gap-12 sm:py-14 lg:gap-16"
			>
				<div className="grid grid-cols-[112px_minmax(0,1fr)] items-start gap-5 self-start sm:grid-cols-[160px_minmax(0,1fr)] sm:gap-6 md:sticky md:top-28 md:block">
					{author.avatar && (
						<Image
							src={author.avatar}
							alt={author.name}
							width={220}
							height={220}
							sizes="(min-width: 768px) 220px, (min-width: 640px) 160px, 112px"
							className="h-28 w-28 rounded-2xl border border-border object-cover sm:h-40 sm:w-40 md:mb-6 md:h-55 md:w-55"
							priority
						/>
					)}
					<div>
						<h2
							id="about-profile-heading"
							className="text-2xl font-medium tracking-tight text-foreground"
						>
							{siteMetadata.author}
						</h2>
						<p className="mt-2 text-sm leading-relaxed text-muted-foreground">
							Senior Software Engineer
						</p>
						<DownloadCvButton
							variant="outline"
							size="md"
							className="mt-5 min-h-11 rounded-full border-border bg-transparent px-5 text-foreground shadow-none hover:bg-subtle focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
						/>
					</div>
				</div>
				<div className="prose prose-sm max-w-none min-w-0 text-muted-foreground dark:prose-invert sm:prose-base prose-p:leading-relaxed prose-headings:font-medium prose-headings:tracking-tight prose-headings:text-foreground prose-h3:mt-8 prose-h3:text-xl prose-strong:font-medium prose-strong:text-foreground prose-ul:pl-5 prose-li:my-3 prose-li:leading-relaxed prose-li:marker:text-primary [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">
					<MDXLayoutRenderer code={author.body.code} components={components} />
				</div>
			</section>

			<section
				aria-labelledby="experience-heading"
				className="border-t border-border pt-8 sm:pt-10"
			>
				<p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
					Experience
				</p>
				<h2
					id="experience-heading"
					className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl"
				>
					Where I've worked
				</h2>
				<div className="mt-8 divide-y divide-border">
					{experienceData.map((entry, index) => (
						<article
							key={`${entry.role}-${entry.company}`}
							className="grid gap-5 py-8 md:grid-cols-[190px_minmax(0,1fr)] md:gap-10 sm:py-10"
						>
							<div className="flex items-baseline gap-4 md:flex-col md:gap-3">
								<span
									aria-hidden="true"
									className="font-mono text-xs text-primary"
								>
									{String(index + 1).padStart(2, "0")}
								</span>
								<p className="font-mono text-xs leading-relaxed text-muted-foreground">
									{entry.period}
								</p>
							</div>
							<div className="min-w-0">
								<h3 className="text-2xl font-medium leading-tight tracking-tight text-foreground">
									{entry.role}
								</h3>
								<p className="mt-2 text-base leading-relaxed text-primary">
									{entry.company}
								</p>
								{entry.context && (
									<p className="mt-3 text-sm leading-relaxed text-muted-foreground">
										{entry.context}
									</p>
								)}

								<div className="mt-6 grid gap-6 lg:grid-cols-2 lg:gap-8">
									<ExperienceDetails
										title="Responsibilities"
										items={entry.responsibilities}
									/>
									<ExperienceDetails
										title="Key deliverables"
										items={entry.deliverables}
									/>
								</div>

								{entry.tags && entry.tags.length > 0 && (
									<ul
										aria-label="Technologies used"
										className="mt-6 flex flex-wrap gap-2"
									>
										{entry.tags.map((tag) => (
											<li
												key={tag}
												className="rounded-md border border-border px-2.5 py-1 font-mono text-[11px] leading-relaxed text-muted-foreground"
											>
												{tag}
											</li>
										))}
									</ul>
								)}
								{entry.link && (
									<Link
										href={entry.link.href}
										className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-sm text-sm font-medium text-primary transition-colors hover:text-primary-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
									>
										{entry.link.text}
										<span aria-hidden="true">↗</span>
									</Link>
								)}
							</div>
						</article>
					))}
				</div>
			</section>

			<div className="grid gap-12 border-t border-border py-10 sm:py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-16">
				<section aria-labelledby="education-heading">
					<p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
						Education
					</p>
					<h2
						id="education-heading"
						className="text-3xl font-medium tracking-tight text-foreground"
					>
						Where I studied
					</h2>
					<ul className="mt-6 divide-y divide-border">
						{educationData.map((entry) => (
							<li key={entry.primaryText} className="py-5">
								<h3 className="text-lg font-medium leading-snug text-foreground">
									{entry.primaryText}
								</h3>
								<p className="mt-2 font-mono text-xs leading-relaxed text-muted-foreground">
									{entry.secondaryText}
								</p>
							</li>
						))}
					</ul>
				</section>
				<section aria-labelledby="skills-heading">
					<p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
						Skills
					</p>
					<h2
						id="skills-heading"
						className="text-3xl font-medium tracking-tight text-foreground"
					>
						Tools of the trade
					</h2>
					<div className="mt-8 grid gap-8 sm:grid-cols-2">
						<SkillList
							title="Primary stack"
							skills={skillsData.filter((skill) => skill.level === "primary")}
						/>
						<SkillList
							title="Secondary stack"
							skills={skillsData.filter((skill) => skill.level === "secondary")}
						/>
					</div>
				</section>
			</div>

			{siteMetadata.email && (
				<section
					aria-labelledby="about-contact-heading"
					className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-border bg-surface p-6 sm:flex-row sm:items-center sm:p-8"
				>
					<div className="space-y-2">
						<h2
							id="about-contact-heading"
							className="text-2xl font-medium tracking-tight text-foreground"
						>
							Let's build something together.
						</h2>
						<p className="text-sm leading-relaxed text-muted-foreground">
							Remote collaboration, on a B2B basis.
						</p>
					</div>
					<Link
						href={`mailto:${siteMetadata.email}`}
						target="_self"
						className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
					>
						Let's talk <span aria-hidden="true">↗</span>
					</Link>
				</section>
			)}
		</div>
	);
}
