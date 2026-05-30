import Link from "@/components/Link";
import SocialIcon from "@/components/social-icons";
import headerNavLinks from "@/data/headerNavLinks";
import siteMetadata from "@/data/siteMetadata";

export default function Footer() {
	const year = new Date().getFullYear();
	const email = siteMetadata.email || "contact@kjaniec.dev";

	const services = [
		{
			label: "Full-Stack Development",
			href: `mailto:${email}?subject=Inquiry regarding Full-Stack Development • kjaniec.dev`,
		},
		{
			label: "System Architecture",
			href: `mailto:${email}?subject=Inquiry regarding System Architecture • kjaniec.dev`,
		},
		{
			label: "Cloud & DevOps",
			href: `mailto:${email}?subject=Inquiry regarding Cloud %26 DevOps • kjaniec.dev`,
		},
		{
			label: "Technical Consulting",
			href: `mailto:${email}?subject=Inquiry regarding Technical Consulting • kjaniec.dev`,
		},
	];

	return (
		<footer className="mt-24 rounded-kj-2xl border border-border bg-card/30 p-8 sm:p-12 mb-8 shadow-kj-sm">
			<div className="mx-auto max-w-7xl">
				<div className="grid gap-10 md:grid-cols-4">
					{/* Brand column */}
					<div className="space-y-4">
						<Link
							href="/"
							className="flex items-center gap-2 group flex-shrink-0"
						>
							{/* biome-ignore lint/performance/noImgElement: Native img is intentional to prevent Next.js responsive layout collapse at 1080px and optimize LCP */}
							<img
								src="/static/images/logo-light.png"
								alt="KJ Logo"
								width={120}
								height={32}
								className="h-9 w-auto block dark:hidden object-contain transition-transform duration-300 group-hover:scale-[1.03]"
							/>
							{/* biome-ignore lint/performance/noImgElement: Native img is intentional to prevent Next.js responsive layout collapse at 1080px and optimize LCP */}
							<img
								src="/static/images/logo-dark.png"
								alt="KJ Logo"
								width={120}
								height={32}
								className="h-9 w-auto hidden dark:block object-contain transition-transform duration-300 group-hover:scale-[1.03]"
							/>
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
									className="text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:text-primary"
								/>
							) : null}
							{siteMetadata.github ? (
								<SocialIcon
									kind="github"
									href={siteMetadata.github}
									size={5}
									className="text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:text-primary"
								/>
							) : null}
							{siteMetadata.linkedin ? (
								<SocialIcon
									kind="linkedin"
									href={siteMetadata.linkedin}
									size={5}
									className="text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:text-primary"
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
										className="inline-block text-sm text-muted-foreground transition-all duration-300 hover:translate-x-0.5 hover:text-primary"
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
										className="inline-block text-sm text-muted-foreground transition-all duration-300 hover:translate-x-0.5 hover:text-primary"
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
										className="inline-block transition-all duration-300 hover:translate-x-0.5 hover:text-primary"
									>
										{siteMetadata.email}
									</Link>
								</li>
							) : null}
							<li className="font-sans text-sm text-muted-foreground">
								Zielona Góra, Poland
							</li>
						</ul>
					</div>
				</div>

				{/* Bottom Copyright Row */}
				<div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/40 pt-6 text-[11px] font-medium text-muted-foreground font-mono">
					<p>
						© {year} {siteMetadata.headerTitle}. All rights reserved.
					</p>
					<p className="flex items-center gap-1.5">
						<span>Built with Next.js &amp; Tailwind CSS</span>
						<span className="text-border/60">•</span>
						<span>Crafted with passion</span>
					</p>
				</div>
			</div>
		</footer>
	);
}
