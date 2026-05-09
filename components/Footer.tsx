import SocialIcon from "@/components/social-icons";
import siteMetadata from "@/data/siteMetadata";
import Link from "./Link";

const SOCIAL_KINDS = [
	"mail",
	"github",
	"linkedin",
	"twitter",
	"x",
	"facebook",
	"youtube",
	"bluesky",
	"instagram",
	"threads",
	"medium",
] as const;

type SocialKind = (typeof SOCIAL_KINDS)[number];

const SOCIAL_META_KEY: Record<SocialKind, keyof typeof siteMetadata> = {
	mail: "email",
	github: "github",
	linkedin: "linkedin",
	twitter: "twitter",
	x: "x",
	facebook: "facebook",
	youtube: "youtube",
	bluesky: "bluesky",
	instagram: "instagram",
	threads: "threads",
	medium: "medium",
};

export default function Footer() {
	const year = new Date().getFullYear();

	const socials = SOCIAL_KINDS.flatMap((kind) => {
		const value = siteMetadata[SOCIAL_META_KEY[kind]];
		if (!value || typeof value !== "string") return [];
		const href = kind === "mail" ? `mailto:${value}` : value;
		return [{ kind, href }];
	});

	return (
		<footer className="relative z-10 mt-28">
			{/* Thick masthead rule — signals end of the issue */}
			<hr className="bg-ink dark:bg-paper h-[2px] border-0" />

			<div className="grid grid-cols-1 gap-8 py-10 md:grid-cols-12 md:gap-10">
				{/* Colophon */}
				<div className="md:col-span-5">
					<span className="label text-vermilion">Colophon</span>
					<p className="font-display text-ink dark:text-paper mt-3 text-xl leading-snug tracking-tight">
						Set in <span className="italic">Fraunces</span> &amp;{" "}
						<span className="italic">Newsreader</span>, with{" "}
						<span className="font-mono text-base not-italic">
							JetBrains&nbsp;Mono
						</span>{" "}
						for the technical asides.
					</p>
					<p className="text-ink-muted dark:text-paper-deep mt-3 max-w-sm text-sm leading-relaxed">
						A personal journal of software engineering practice, written in
						Poland and published to the open web. Built with Next.js,
						Contentlayer, and Tailwind.
					</p>
				</div>

				{/* Index / nav */}
				<nav aria-label="Footer navigation" className="md:col-span-4">
					<span className="label text-vermilion">Index</span>
					<ul className="font-display text-ink dark:text-paper mt-3 grid grid-cols-2 gap-y-2 text-base">
						<li>
							<Link href="/blog" className="editorial-link">
								Journal
							</Link>
						</li>
						<li>
							<Link href="/projects" className="editorial-link">
								Projects
							</Link>
						</li>
						<li>
							<Link href="/about" className="editorial-link">
								About
							</Link>
						</li>
						<li>
							<Link href="/tags" className="editorial-link">
								Tags
							</Link>
						</li>
						<li>
							<Link href="/faq" className="editorial-link">
								FAQ
							</Link>
						</li>
						<li>
							<Link href="/feed.xml" className="editorial-link">
								RSS
							</Link>
						</li>
					</ul>
				</nav>

				{/* Correspondence */}
				<div className="md:col-span-3">
					<span className="label text-vermilion">Correspondence</span>
					<ul className="mt-3 flex flex-wrap gap-x-4 gap-y-3">
						{socials.map(({ kind, href }) => (
							<li key={kind}>
								<SocialIcon
									kind={kind}
									href={href}
									size={5}
									className="text-ink dark:text-paper hover:text-vermilion transition-colors"
								/>
							</li>
						))}
					</ul>
					{siteMetadata.email && (
						<Link
							href={`mailto:${siteMetadata.email}`}
							className="editorial-link font-mono text-ink dark:text-paper mt-4 inline-block text-xs"
						>
							{siteMetadata.email}
						</Link>
					)}
				</div>
			</div>

			<hr className="rule h-px border-0" />

			{/* Imprint */}
			<div className="text-ink-muted dark:text-paper-deep flex flex-wrap items-baseline justify-between gap-y-2 py-6 text-xs">
				<span className="label">
					© {year} · {siteMetadata.author} · Remote, EU
				</span>
				<span className="label">No. {year} · Printed to the open web</span>
			</div>
		</footer>
	);
}
