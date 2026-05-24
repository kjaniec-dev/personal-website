import Link from "@/components/Link";
import MobileNav from "@/components/MobileNav";
import SearchButton from "@/components/SearchButton";
import ThemeSwitch from "@/components/ThemeSwitch";
import headerNavLinks from "@/data/headerNavLinks";
import siteMetadata from "@/data/siteMetadata";

export default function Header() {
	return (
		<header className="sticky top-0 z-40 border-b border-border bg-card/70 backdrop-blur-md">
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
				<Link href="/" aria-label={siteMetadata.headerTitle ?? "Home"}>
					<span className="font-mono text-xl font-extrabold text-primary">
						KJ
					</span>
				</Link>

				<nav className="hidden items-center gap-1 md:flex">
					{headerNavLinks
						.filter((link) => link.href !== "/")
						.map((link) => (
							<Link
								key={link.title}
								href={link.href}
								className="rounded-kj-md px-3 py-2 font-sans text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
							>
								{link.title}
							</Link>
						))}
				</nav>

				<div className="flex items-center gap-2">
					<SearchButton />
					<ThemeSwitch />
					{siteMetadata.email ? (
						<Link
							href={`mailto:${siteMetadata.email}`}
							className="hidden items-center gap-2 rounded-kj-lg bg-primary px-4 py-2 font-sans text-sm font-semibold text-primary-foreground shadow-kj-glow transition-colors hover:bg-primary-hover md:inline-flex"
						>
							Porozmawiajmy
						</Link>
					) : null}
					<MobileNav />
				</div>
			</div>
		</header>
	);
}
