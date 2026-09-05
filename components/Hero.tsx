import HeroArtwork from "@/components/HeroArtwork";
import Link from "@/components/Link";
import siteMetadata from "@/data/siteMetadata";

export default function Hero() {
	return (
		<section
			aria-labelledby="hero-title"
			className="relative isolate pt-12 pb-4 sm:pt-16 sm:pb-6"
		>
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,var(--color-primary),transparent)] opacity-[0.035] lg:left-[20%] dark:opacity-[0.045]"
			/>
			<div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-5 pr-4 sm:pr-6">
				<div className="flex items-center gap-3">
					<span aria-hidden="true" className="h-8 w-px bg-primary/70" />
					<div className="space-y-1">
						<p className="text-sm font-semibold text-foreground">
							{siteMetadata.author}
						</p>
						<p className="font-mono text-xs text-muted-foreground">
							Senior Software Engineer
						</p>
					</div>
				</div>
				<p className="flex items-center gap-2.5 rounded-full border border-border bg-surface/60 px-3.5 py-2 font-mono text-[10px] tracking-wide text-muted-foreground sm:text-[11px]">
					<span
						aria-hidden="true"
						className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary ring-4 ring-primary/10"
					/>
					Available for contract work
				</p>
			</div>

			<div className="mt-10 grid items-center gap-8 sm:mt-12 lg:mt-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:gap-2">
				<div className="relative z-10 min-w-0">
					<p className="font-mono text-[10px] font-medium tracking-[0.08em] text-muted-foreground uppercase sm:text-[11px] sm:tracking-[0.14em]">
						Full-stack · Architecture · DevOps
					</p>
					<h1
						id="hero-title"
						className="mt-5 text-[clamp(2.375rem,6.2vw,4.5rem)] leading-[1.06] font-medium tracking-[-0.055em] text-foreground"
					>
						<span className="block">From first idea</span>{" "}
						<span className="block bg-linear-to-r from-primary via-primary to-primary-hover bg-clip-text text-transparent">
							to production.
						</span>
					</h1>

					<p className="mt-6 max-w-[29rem] text-base leading-relaxed text-muted-foreground sm:text-lg">
						I design the architecture, build the product, and shape the
						infrastructure — connecting every layer, from interface to
						deployment.
					</p>

					<div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
						<Link
							href={`mailto:${siteMetadata.email}`}
							target="_self"
							className="group inline-flex min-h-12 items-center justify-center gap-5 rounded-kj-lg border border-primary/50 bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-kj-glow transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
						>
							Let's talk
							<svg
								aria-hidden="true"
								className="h-4 w-4 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth={1.75}
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M7 17 17 7M7 7h10v10" />
							</svg>
						</Link>
						<Link
							href="#selected-work"
							className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-kj-sm px-1 py-3 text-sm font-medium text-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
						>
							View selected work
							<svg
								aria-hidden="true"
								className="h-4 w-4 motion-safe:transition-transform motion-safe:group-hover:translate-y-0.5"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth={1.75}
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<path d="M12 5v14m-5-5 5 5 5-5" />
							</svg>
						</Link>
					</div>
				</div>
				<div
					className="pointer-events-none relative w-full max-w-[20rem] justify-self-center select-none sm:max-w-[22rem] lg:max-w-[25rem] lg:justify-self-end"
					aria-hidden="true"
				>
					<p className="absolute top-0 left-4 font-mono text-[9px] tracking-[0.18em] text-muted-foreground uppercase sm:left-8">
						Every layer. One engineer.
					</p>
					<HeroArtwork />
					<div className="mx-2 mt-2 flex justify-between gap-2 border-t border-border/70 pt-4 font-mono text-[9px] text-muted-foreground sm:mx-8 sm:gap-3">
						<span>
							<span className="text-primary">01</span> Interface
						</span>
						<span>
							<span className="text-primary">02</span> Systems
						</span>
						<span>
							<span className="text-primary">03</span> Infrastructure
						</span>
					</div>
				</div>
			</div>

			<div className="mt-10 grid gap-5 border-y border-border py-5 pr-4 sm:mt-14 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-10 sm:py-6 sm:pr-6">
				<p className="flex items-baseline gap-3 sm:border-r sm:border-border sm:pr-10">
					<span className="text-xl font-medium tracking-tight text-foreground">
						12+ years
					</span>
					<span className="text-xs text-muted-foreground">
						building software
					</span>
				</p>
				<div className="flex flex-wrap items-center gap-x-6 gap-y-3 sm:justify-end sm:gap-x-8">
					<p className="font-mono text-[10px] tracking-wide text-muted-foreground">
						Experience at
					</p>
					<ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium tracking-tight text-foreground/80 sm:gap-x-8 sm:text-base">
						<li>REWE Digital</li>
						<li>Cinkciarz.pl</li>
						<li>Biot</li>
					</ul>
				</div>
			</div>
		</section>
	);
}
