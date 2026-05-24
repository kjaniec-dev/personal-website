import Link from "@/components/Link";
import SocialIcon from "@/components/social-icons";
import headerNavLinks from "@/data/headerNavLinks";
import siteMetadata from "@/data/siteMetadata";

const services = [
	{ label: "Full-Stack Development", href: "/projects" },
	{ label: "System Architecture", href: "/projects" },
	{ label: "Cloud & DevOps", href: "/projects" },
	{ label: "Technical Consulting", href: "/about" },
];

export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="mt-24 border-t border-border bg-card/40">
			<div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
				<div className="grid gap-10 md:grid-cols-4">
					{/* Brand column */}
					<div className="space-y-4">
						<Link href="/" className="inline-block">
							<span className="font-mono text-xl font-extrabold text-primary">
								KJ
							</span>
						</Link>
						<p className="text-sm leading-relaxed text-muted-foreground">
							{siteMetadata.description}
						</p>
						<div className="flex flex-wrap gap-3 pt-2">
							{siteMetadata.email ? (
								<SocialIcon
									kind="mail"
									href={`mailto:${siteMetadata.email}`}
									size={5}
								/>
							) : null}
							{siteMetadata.github ? (
								<SocialIcon kind="github" href={siteMetadata.github} size={5} />
							) : null}
							{siteMetadata.linkedin ? (
								<SocialIcon
									kind="linkedin"
									href={siteMetadata.linkedin}
									size={5}
								/>
							) : null}
						</div>
					</div>

					{/* Navigation column */}
					<div className="space-y-4">
						<h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-foreground">
							Navigation
						</h3>
						<ul className="space-y-2">
							{headerNavLinks.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className="text-sm text-muted-foreground transition-colors hover:text-primary"
									>
										{link.title}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Services column */}
					<div className="space-y-4">
						<h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-foreground">
							Services
						</h3>
						<ul className="space-y-2">
							{services.map((s) => (
								<li key={s.label}>
									<Link
										href={s.href}
										className="text-sm text-muted-foreground transition-colors hover:text-primary"
									>
										{s.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Contact column */}
					<div className="space-y-4">
						<h3 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-foreground">
							Contact
						</h3>
						<ul className="space-y-2 text-sm text-muted-foreground">
							{siteMetadata.email ? (
								<li>
									<Link
										href={`mailto:${siteMetadata.email}`}
										className="transition-colors hover:text-primary"
									>
										{siteMetadata.email}
									</Link>
								</li>
							) : null}
							<li>Katowice, Polska</li>
						</ul>
					</div>
				</div>

				<div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
					<span>
						© {year} {siteMetadata.author}. Wszelkie prawa zastrzeżone.
					</span>
					<span>
						Built with{" "}
						<Link
							href="https://github.com/timlrx/tailwind-nextjs-starter-blog"
							className="underline-offset-2 hover:text-primary hover:underline"
						>
							Tailwind Nextjs Theme
						</Link>
					</span>
				</div>
			</div>
		</footer>
	);
}
