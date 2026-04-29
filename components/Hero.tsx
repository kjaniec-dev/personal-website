import HeroAnimationWrapper from "@/components/HeroAnimationWrapper";
import Link from "@/components/Link";
import siteMetadata from "@/data/siteMetadata";

const PRACTICE_AREAS = [
	{
		no: "I.",
		title: "Full-stack engineering",
		note: "Frontend, backend, APIs, databases — end to end.",
	},
	{
		no: "II.",
		title: "System architecture",
		note: "Scalable, maintainable designs for the long run.",
	},
	{
		no: "III.",
		title: "DevOps & infrastructure",
		note: "CI/CD, cloud deployment, observability.",
	},
];

export default function Hero() {
	const year = new Date().getFullYear();

	return (
		<HeroAnimationWrapper>
			<section className="relative isolate pt-10 pb-16 md:pt-16 md:pb-24">
				{/* Masthead row — publication name + running metadata, like a trade journal header */}
				<div className="flex items-baseline justify-between">
					<span className="label text-ink-muted hero-eyebrow dark:text-paper-deep">
						The practice of —
					</span>
					<span className="label text-ink-muted hero-eyebrow dark:text-paper-deep">
						№ 01 · Vol. {year}
					</span>
				</div>

				{/* Drawing rule — the load-in gesture */}
				<hr className="rule hero-rule bg-ink dark:bg-paper mt-3 h-px border-0" />

				{/* Eyebrow — category mark */}
				<div className="mt-8 flex items-center gap-3">
					<span className="bg-vermilion inline-block h-[3px] w-10" />
					<span className="label text-vermilion hero-eyebrow">
						Fullstack engineering · est. 2013
					</span>
				</div>

				{/* Display title — three lines, staggered rise, italic accent on line 2 */}
				<h1 className="font-display text-ink dark:text-paper mt-8 text-[14vw] leading-[0.92] font-[600] tracking-[-0.03em] sm:text-[10vw] lg:text-[7.8rem] xl:text-[8.6rem]">
					<span
						className="hero-title-line hero-title-line-1 block"
						style={{ fontVariationSettings: "'opsz' 144" }}
					>
						Software,
					</span>
					<span
						className="hero-title-line hero-title-line-2 block italic"
						style={{ fontVariationSettings: "'opsz' 144" }}
					>
						considered —
					</span>
					<span
						className="hero-title-line hero-title-line-3 text-ink-muted dark:text-paper-deep block"
						style={{ fontVariationSettings: "'opsz' 144" }}
					>
						built to endure.
					</span>
				</h1>

				{/* Body column + aside — classic editorial asymmetry */}
				<div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-12">
					{/* Main column — lede, byline, CTA */}
					<div className="md:col-span-8">
						{/* Byline row */}
						<div className="hero-lede flex flex-wrap items-baseline gap-x-4 gap-y-2">
							<span className="label text-ink-muted dark:text-paper-deep">
								By
							</span>
							<span className="font-display text-ink dark:text-paper text-xl font-medium tracking-tight">
								{siteMetadata.author}
							</span>
							<span className="text-rule" aria-hidden="true">
								/
							</span>
							<span className="label text-vermilion inline-flex items-center gap-2">
								<span
									aria-hidden="true"
									className="bg-vermilion inline-block h-[6px] w-[6px] rounded-full"
								/>
								Currently accepting engagements
							</span>
						</div>

						{/* Lede with drop cap */}
						<p className="hero-lede drop-cap text-ink-soft dark:text-paper-deep mt-8 max-w-[58ch] text-lg leading-[1.65] md:text-[1.33rem] md:leading-[1.58]">
							<span className="font-serif italic">A</span> software engineer of
							ten-plus years, writing about the craft of building maintainable
							systems — fullstack, pragmatic, remote-first from Poland. This is
							a working journal of projects shipped, architectures chosen, and
							lessons the codebase only teaches you once.
						</p>

						{/* CTA row — editorial links, not pill buttons */}
						<div className="hero-cta border-rule mt-12 flex flex-wrap items-center gap-x-10 gap-y-4 border-t pt-6">
							<Link
								href="/about"
								className="group font-display text-ink dark:text-paper inline-flex items-center gap-3 text-lg tracking-tight"
							>
								<span
									aria-hidden="true"
									className="text-vermilion font-mono text-sm"
								>
									→
								</span>
								<span className="border-ink dark:border-paper border-b pb-0.5 transition-[border-color] duration-200 group-hover:border-transparent">
									Read the dossier
								</span>
							</Link>
							<Link
								href="/blog"
								className="group font-display text-ink-soft dark:text-paper-deep inline-flex items-center gap-3 text-lg tracking-tight"
							>
								<span
									aria-hidden="true"
									className="text-vermilion font-mono text-sm"
								>
									→
								</span>
								<span className="border-rule border-b pb-0.5 transition-[border-color] duration-200 group-hover:border-current">
									Field notes from the journal
								</span>
							</Link>
						</div>
					</div>

					{/* Aside — practice areas as a framed colophon */}
					<aside className="hero-aside border-ink dark:border-paper md:col-span-4 md:border-l md:pl-8">
						<div className="flex items-baseline justify-between">
							<span className="label text-vermilion">The practice</span>
							<span className="label text-ink-muted dark:text-paper-deep">
								§ I–III
							</span>
						</div>

						<ul className="divide-rule mt-5 divide-y">
							{PRACTICE_AREAS.map((item) => (
								<li key={item.title} className="py-5 first:pt-0 last:pb-0">
									<div className="flex items-baseline gap-3">
										<span className="text-vermilion font-mono text-xs tracking-wider">
											{item.no}
										</span>
										<h3 className="font-display text-ink dark:text-paper text-lg leading-tight font-medium tracking-tight">
											{item.title}
										</h3>
									</div>
									<p className="marginalia text-ink-muted dark:text-paper-deep mt-1.5 pl-7">
										{item.note}
									</p>
								</li>
							))}
						</ul>

						<Link
							href="/projects"
							className="editorial-link mt-6 inline-flex items-center gap-2 pl-7 text-sm"
						>
							<span className="font-mono">→</span> Survey of projects
						</Link>
					</aside>
				</div>

				{/* Running footer — section colophon */}
				<div className="text-ink-muted dark:text-paper-deep mt-16 flex items-baseline justify-between">
					<span className="label">A journal of software, in practice</span>
					<span className="label">Remote · B2B · EU</span>
				</div>
			</section>
		</HeroAnimationWrapper>
	);
}
