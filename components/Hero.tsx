import HeroAnimationWrapper from "@/components/HeroAnimationWrapper";
import Link from "@/components/Link";
import siteMetadata from "@/data/siteMetadata";

export default function Hero() {
	return (
		<HeroAnimationWrapper>
			<section className="relative flex min-h-[70vh] items-center overflow-hidden py-12 md:py-20">
				{/* Subtle background pattern of dots or grid */}
				<div
					className="pointer-events-none absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
					style={{
						backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0V0zm20 20h20v20H20V20z' fill='%23000' fill-opacity='.15' fill-rule='evenodd'/%3E%3C/svg%3E")`,
					}}
				/>

				<div className="mx-auto w-full max-w-7xl">
					<div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
						{/* Left Column - Positioning and CTAs */}
						<div className="space-y-8 lg:col-span-7">
							{/* Status Badge */}
							<div className="inline-flex items-center gap-2.5 rounded-full border border-border bg-card/60 px-3.5 py-1.5 shadow-kj-xs backdrop-blur-sm">
								<span className="relative flex h-2 w-2">
									<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
									<span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
								</span>
								<span className="text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
									Available for senior contract roles
								</span>
							</div>

							{/* Hero Headline */}
							<div className="space-y-4">
								<h1 className="hero-title-reveal font-sans text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
									Crafting{" "}
									<span className="text-primary font-extrabold">robust</span>{" "}
									systems,
									<br />
									building elegant products.
								</h1>
							</div>

							{/* Short bio / Positioning statement */}
							<p className="hero-subtitle-reveal text-lg leading-relaxed text-muted-foreground max-w-2xl">
								I'm{" "}
								<span className="font-semibold text-foreground">
									{siteMetadata.author}
								</span>
								, a Senior Software Engineer specializing in backend
								architecture, performant full-stack development, and
								developer-first design systems.
							</p>

							{/* Actions */}
							<div className="hero-cta-reveal flex flex-wrap gap-4 pt-2">
								<Link
									href="/projects"
									className="group inline-flex items-center justify-center gap-2 rounded-kj-lg bg-primary hover:bg-primary-hover px-6 py-3.5 font-semibold text-primary-foreground shadow-kj-glow transition-all duration-300 hover:-translate-y-0.5"
								>
									<span>Explore My Work</span>
									<svg
										className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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
									className="group inline-flex items-center justify-center gap-2 rounded-kj-lg border border-border bg-card hover:bg-muted px-6 py-3.5 font-semibold text-foreground shadow-kj-sm transition-all duration-300 hover:-translate-y-0.5"
								>
									<span>Read My Insights</span>
									<svg
										className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
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
							</div>
						</div>

						{/* Right Column - Premium SaaS / Code sandbox Widget */}
						<div className="hero-description-reveal lg:col-span-5">
							<div className="relative rounded-kj-2xl border border-border bg-card p-6 shadow-kj-lg backdrop-blur-md">
								{/* Card browser header */}
								<div className="flex items-center justify-between border-b border-border pb-4 mb-5">
									<div className="flex gap-1.5">
										<span className="h-3 w-3 rounded-full bg-red-500/80"></span>
										<span className="h-3 w-3 rounded-full bg-yellow-500/80"></span>
										<span className="h-3 w-3 rounded-full bg-green-500/80"></span>
									</div>
									<div className="text-xs font-semibold text-muted-foreground font-mono">
										@kj/design • Activated
									</div>
								</div>

								{/* Mock content */}
								<div className="space-y-5">
									<div className="rounded-kj-lg border border-border bg-background p-4 space-y-2">
										<div className="flex justify-between items-center text-xs font-semibold text-muted-foreground font-mono">
											<span>SYSTEM SCALE</span>
											<span className="text-secondary font-bold">ACTIVE</span>
										</div>
										<p className="text-xl font-bold text-foreground">
											High-Traffic APIs
										</p>
										<div className="flex items-center justify-between pt-1">
											<div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
												<div className="h-full bg-secondary w-[89%] rounded-full"></div>
											</div>
											<span className="text-xs font-semibold text-foreground ml-3 font-mono">
												10M+ req/day
											</span>
										</div>
									</div>

									<div className="rounded-kj-lg border border-border bg-background p-4 space-y-2">
										<div className="flex justify-between items-center text-xs font-semibold text-muted-foreground font-mono">
											<span>LIGHTHOUSE SCORE</span>
											<span className="text-primary font-bold">OPTIMIZED</span>
										</div>
										<p className="text-xl font-bold text-foreground">
											This Website
										</p>
										<div className="flex items-center justify-between pt-1">
											<div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
												<div className="h-full bg-primary w-[97%] rounded-full"></div>
											</div>
											<span className="text-xs font-semibold text-foreground ml-3 font-mono">
												97 / 100
											</span>
										</div>
									</div>

									<div className="flex gap-4">
										<div className="flex-1 rounded-kj-lg border border-border bg-background p-3 text-center">
											<p className="text-[10px] font-bold text-muted-foreground tracking-wider uppercase">
												EXPERIENCE
											</p>
											<p className="text-lg font-bold text-foreground mt-0.5">
												7+ yrs
											</p>
										</div>
										<div className="flex-1 rounded-kj-lg border border-border bg-background p-3 text-center">
											<p className="text-[10px] font-bold text-muted-foreground tracking-wider uppercase">
												PROJECTS
											</p>
											<p className="text-lg font-bold text-foreground mt-0.5">
												30+
											</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</HeroAnimationWrapper>
	);
}
