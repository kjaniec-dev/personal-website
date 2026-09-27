import { SectionHeader } from "@/components/ClientUI";
import Link from "@/components/Link";

const services = [
	{
		title: "Full-Stack Development",
		desc: "Building modern, performant web applications using React, Angular, Next.js, and TypeScript, backed by clean and scalable APIs.",
	},
	{
		title: "System Architecture",
		desc: "Designing clean, decoupled, and pragmatic system architectures in Go, Python, or Rust built for long-term scalability.",
	},
	{
		title: "Cloud & DevOps",
		desc: "Setting up automated CI/CD pipelines, container orchestration (Docker/Kubernetes), and secure AWS/GCP cloud environments.",
	},
	{
		title: "Technical Consulting",
		desc: "Conducting technology evaluations, code audits, architecture reviews, and performance tuning to solve complex bottlenecks.",
	},
];

export default function Services({ email }: { email: string }) {
	return (
		<section
			aria-labelledby="services-heading"
			className="mt-10 mb-16 space-y-8 wrap-anywhere md:mt-12"
		>
			<SectionHeader
				className="[&_h2]:font-medium [&_h2]:tracking-[-0.035em]"
				kicker="Services"
				title={<span id="services-heading">What I Do &amp; Deliver</span>}
				description="I partner with teams to design, build, and optimize high-performance software systems. Here are the core services I provide."
			/>
			<ol className="min-w-0 divide-y divide-border border-y border-border font-sans">
				{services.map((item, index) => (
					<li
						key={item.title}
						className="grid grid-cols-[2rem_minmax(0,1fr)] items-start gap-x-3 gap-y-4 px-2 py-7 sm:grid-cols-[2rem_minmax(0,1fr)_auto] sm:gap-x-5 sm:gap-y-0 sm:px-4 sm:py-8"
					>
						<span
							aria-hidden="true"
							className="pt-1 font-mono text-lg leading-none tracking-tight text-primary"
						>
							{String(index + 1).padStart(2, "0")}
						</span>
						<div className="min-w-0 space-y-3">
							<h3 className="text-xl font-medium leading-snug tracking-[-0.035em] text-foreground sm:text-2xl xl:text-3xl">
								{item.title}
							</h3>
							<p
								id={`service-description-${index}`}
								className="max-w-xl text-sm leading-relaxed text-muted-foreground"
							>
								{item.desc}
							</p>
						</div>
						<div className="col-start-2 pt-1 sm:col-start-3">
							<Link
								href={`mailto:${email}?subject=${encodeURIComponent(`Inquiry regarding ${item.title} • kjaniec.dev`)}`}
								target="_self"
								aria-label={`Discuss ${item.title} by email`}
								aria-describedby={`service-description-${index}`}
								className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-4 py-2 text-xs font-semibold text-foreground shadow-xs transition-colors hover:border-primary/40 hover:bg-subtle hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
							>
								<span>Discuss</span>
								<svg
									aria-hidden="true"
									className="h-3.5 w-3.5 text-muted-foreground transition-colors group-hover:text-primary motion-safe:transition-transform motion-safe:duration-200 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={1.5}
										d="M7 17 17 7M7 7h10v10"
									/>
								</svg>
							</Link>
						</div>
					</li>
				))}
			</ol>
		</section>
	);
}
