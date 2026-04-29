import HeroAnimationWrapper from "@/components/HeroAnimationWrapper";
import Link from "@/components/Link";
import siteMetadata from "@/data/siteMetadata";

const heroLines: { prompt: string; command: string; output?: string }[] = [
	{
		prompt: "~ $",
		command: "whoami",
		output: siteMetadata.author,
	},
	{
		prompt: "~ $",
		command: "cat role.txt",
		output: "Software Engineer — building tomorrow's software.",
	},
	{
		prompt: "~ $",
		command: "cat bio.txt",
		output: siteMetadata.description,
	},
];

const focusAreas = [
	{
		title: "full-stack",
		desc: "Frontend, Backend, APIs & Databases",
	},
	{
		title: "architecture",
		desc: "Scalable & maintainable systems",
	},
	{
		title: "devops",
		desc: "CI/CD, cloud & observability",
	},
];

export default function Hero() {
	return (
		<HeroAnimationWrapper>
			<section className="relative flex min-h-[64vh] items-center overflow-hidden py-8">
				{/* Grid backdrop */}
				<div
					aria-hidden="true"
					className="grid-bg pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]"
				/>

				<div className="relative mx-auto w-full max-w-7xl">
					<div className="grid grid-cols-1 items-start gap-10 xl:grid-cols-12 xl:gap-16">
						{/* Left column — Terminal window */}
						<div className="space-y-8 xl:col-span-7">
							{/* Kicker badge */}
							<div className="hero-badge-reveal inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white/60 px-3 py-1 font-mono text-xs text-gray-600 backdrop-blur dark:border-gray-700 dark:bg-gray-900/60 dark:text-gray-400">
								<span className="relative flex h-2 w-2">
									<span className="bg-primary-500 absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
									<span className="bg-primary-500 relative inline-flex h-2 w-2 rounded-full" />
								</span>
								<span>
									<span className="text-primary-500">$</span> status:{" "}
									<span className="text-gray-900 dark:text-gray-100">
										available for opportunities
									</span>
								</span>
							</div>

							{/* Terminal card */}
							<div className="terminal-card overflow-hidden shadow-sm">
								<div className="terminal-chrome">
									<span className="ml-auto select-none">
										{siteMetadata.author.toLowerCase().replace(/\s+/g, "-")}
										@portfolio — zsh
									</span>
								</div>

								<div className="hero-title-reveal space-y-3 p-5 font-mono text-sm leading-relaxed sm:p-6 sm:text-base">
									{heroLines.map((line, idx) => (
										<div key={line.command} className="space-y-1">
											<div className="flex items-baseline gap-2">
												<span className="text-primary-500 select-none">
													{line.prompt}
												</span>
												<span className="text-gray-900 dark:text-gray-100">
													{line.command}
												</span>
												{idx === heroLines.length - 1 && (
													<span aria-hidden="true" className="caret ml-1" />
												)}
											</div>
											{line.output && (
												<div className="pl-8 text-gray-600 dark:text-gray-400">
													{line.output}
												</div>
											)}
										</div>
									))}
								</div>
							</div>

							{/* CTAs */}
							<div className="hero-cta-reveal flex flex-wrap gap-3">
								<Link
									href="/about"
									className="group border-primary-500 bg-primary-500/10 text-primary-700 hover:bg-primary-500 dark:text-primary-300 inline-flex items-center gap-2 rounded-md border px-5 py-2.5 font-mono text-sm transition-colors duration-200 hover:text-white dark:hover:text-black"
								>
									<span className="opacity-70 group-hover:opacity-100">$</span>
									<span>./about</span>
									<svg
										className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<title>Arrow right icon</title>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M17 8l4 4m0 0l-4 4m4-4H3"
										/>
									</svg>
								</Link>

								<Link
									href="/blog"
									className="group inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white/60 px-5 py-2.5 font-mono text-sm text-gray-700 transition-colors duration-200 hover:border-gray-900 hover:bg-gray-900 hover:text-white dark:border-gray-700 dark:bg-gray-900/60 dark:text-gray-300 dark:hover:border-gray-100 dark:hover:bg-gray-100 dark:hover:text-gray-900"
								>
									<span className="text-primary-500 opacity-70 group-hover:opacity-100">
										$
									</span>
									<span>cat blog/*</span>
								</Link>
							</div>
						</div>

						{/* Right column — focus areas */}
						<div className="hero-description-reveal space-y-6 xl:col-span-5">
							<div className="terminal-card p-6">
								<div className="section-divider mb-5">
									<span className="text-primary-500">{"//"}</span>
									<span>focus areas</span>
								</div>
								<ul className="space-y-4">
									{focusAreas.map((item) => (
										<li
											key={item.title}
											className="group flex items-start gap-3 font-mono text-sm"
										>
											<span className="text-primary-500 mt-0.5 select-none">
												▸
											</span>
											<div className="space-y-0.5">
												<div className="font-medium text-gray-900 dark:text-gray-100">
													<span className="text-gray-400 dark:text-gray-600">
														./
													</span>
													{item.title}
												</div>
												<p className="text-xs leading-relaxed text-gray-600 dark:text-gray-400">
													{item.desc}
												</p>
											</div>
										</li>
									))}
								</ul>

								<Link
									href="/projects"
									className="hover:text-primary-500 group mt-5 inline-flex items-center gap-2 font-mono text-xs text-gray-600 dark:text-gray-400"
								>
									<span className="text-primary-500">$</span>
									<span>ls ./projects</span>
									<span className="transition-transform duration-200 group-hover:translate-x-0.5">
										→
									</span>
								</Link>
							</div>

							{/* Stats grid */}
							<div className="grid grid-cols-3 gap-3">
								{[
									{ number: "12+", label: "years" },
									{ number: "E2E", label: "ownership" },
									{ number: "100%", label: "dedication" },
								].map((stat) => (
									<div
										key={stat.label}
										className="terminal-card p-3 text-center"
									>
										<div className="text-primary-500 font-mono text-xl font-semibold">
											{stat.number}
										</div>
										<div className="mt-0.5 font-mono text-[0.7rem] tracking-wider text-gray-500 lowercase dark:text-gray-400">
											{stat.label}
										</div>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</section>
		</HeroAnimationWrapper>
	);
}
