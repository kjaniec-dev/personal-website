import HeroAnimationWrapper from "@/components/HeroAnimationWrapper";
import Link from "@/components/Link";
import siteMetadata from "@/data/siteMetadata";
import techStackData from "@/data/techStackData";

export default function Hero() {
	return (
		<HeroAnimationWrapper>
			<section className="relative flex min-h-[70vh] items-center overflow-hidden pt-12 pb-8 md:pt-20 md:pb-10">
				{/* Subtle background pattern of dots or grid */}
				<div
					className="pointer-events-none absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
					style={{
						backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0V0zm20 20h20v20H20V20z' fill='%23000' fill-opacity='.15' fill-rule='evenodd'/%3E%3C/svg%3E")`,
					}}
				/>

				<div className="mx-auto w-full max-w-7xl">
					<div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-16">
						{/* Left Column - Positioning and CTAs */}
						<div className="space-y-8 lg:col-span-6 xl:col-span-7">
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
						<div className="hero-description-reveal lg:col-span-6 xl:col-span-5 max-w-xl lg:max-w-none mx-auto w-full">
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
									<div className="rounded-kj-lg border border-border bg-background p-4 space-y-2.5 transition-all duration-300 hover:border-primary/40">
										<div className="flex justify-between items-center text-xs font-semibold text-muted-foreground font-mono">
											<span>BACKEND ARCHITECTURE</span>
											<span className="rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold text-primary tracking-wider uppercase">
												ROBUST
											</span>
										</div>
										<p className="text-lg font-bold text-foreground leading-tight">
											Distributed &amp; Event-Driven Systems
										</p>
										<p className="text-xs leading-relaxed text-muted-foreground">
											Designed enterprise microservices at REWE Digital,
											Cinkciarz.pl, and Biot. Expert in transactional event
											streams (Kafka, RabbitMQ) and high-scale Java/Spring Boot
											&amp; TypeScript/Node.js backends.
										</p>
										<div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/40 text-[10px] font-semibold text-muted-foreground font-mono">
											<div className="flex items-center gap-1">
												<span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
												<span>Kafka Cluster: Healthy</span>
											</div>
											<span className="text-border/60">•</span>
											<div className="flex items-center gap-1">
												<span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
												<span>JVM / TS: Scaled</span>
											</div>
										</div>
									</div>

									<div className="rounded-kj-lg border border-border bg-background p-4 space-y-2.5 transition-all duration-300 hover:border-secondary/40">
										<div className="flex justify-between items-center text-xs font-semibold text-muted-foreground font-mono">
											<span>RICH FRONTEND &amp; WEBGL</span>
											<span className="rounded-full bg-secondary/10 px-2 py-0.5 text-[9px] font-bold text-secondary tracking-wider uppercase">
												ACTIVE
											</span>
										</div>
										<p className="text-lg font-bold text-foreground leading-tight">
											Performant UIs &amp; Interactive Graphics
										</p>
										<p className="text-xs leading-relaxed text-muted-foreground">
											Created a custom 3D WebGL voxel engine in Babylon.js with
											chunk streaming (60 FPS), real-time collaborative
											workspace synchronization via WebSockets, and heavy
											analytical React &amp; Angular UIs.
										</p>
										<div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border/40 text-[10px] font-semibold text-muted-foreground font-mono">
											<div className="flex items-center gap-1">
												<span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
												<span>WebGL Render: 60 FPS</span>
											</div>
											<span className="text-border/60">•</span>
											<div className="flex items-center gap-1">
												<span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
												<span>WebSockets: Synchronized</span>
											</div>
										</div>
									</div>

									<div className="grid grid-cols-3 gap-2">
										<div className="group rounded-kj-lg border border-border bg-background p-2.5 text-center transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 cursor-default">
											<p className="text-[9px] font-bold text-muted-foreground tracking-wider uppercase transition-colors duration-300 group-hover:text-primary/70">
												Experience
											</p>
											<p className="text-xs font-bold text-foreground mt-0.5 transition-colors duration-300 group-hover:text-primary">
												12+ yrs
											</p>
										</div>
										<div className="group rounded-kj-lg border border-border bg-background p-2.5 text-center transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 cursor-default">
											<p className="text-[9px] font-bold text-muted-foreground tracking-wider uppercase transition-colors duration-300 group-hover:text-primary/70">
												Backend
											</p>
											<p className="text-xs font-bold text-foreground mt-0.5 transition-colors duration-300 group-hover:text-primary">
												Java &amp; Node
											</p>
										</div>
										<div className="group rounded-kj-lg border border-border bg-background p-2.5 text-center transition-all duration-300 hover:border-secondary/40 hover:bg-secondary/5 cursor-default">
											<p className="text-[9px] font-bold text-muted-foreground tracking-wider uppercase transition-colors duration-300 group-hover:text-secondary/70">
												Frontend
											</p>
											<p className="text-xs font-bold text-foreground mt-0.5 transition-colors duration-300 group-hover:text-secondary">
												React &amp; Angular
											</p>
										</div>
									</div>

									{/* Tech stack */}
									<div className="flex flex-wrap gap-1.5 pt-1">
										{techStackData.map((item) => (
											<span
												key={item.name}
												className="rounded-kj-sm border border-border bg-background px-2 py-0.5 font-mono text-[10px] font-semibold text-muted-foreground transition-all duration-300 hover:border-primary/40 hover:bg-primary/5 hover:text-primary cursor-default"
											>
												{item.short ?? item.name}
											</span>
										))}
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
