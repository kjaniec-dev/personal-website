import headerNavLinks from "@/data/headerNavLinks";
import siteMetadata from "@/data/siteMetadata";
import Link from "./Link";
import MobileNav from "./MobileNav";
import NavLink from "./NavLink";
import SearchButton from "./SearchButton";
import ThemeSwitch from "./ThemeSwitch";

const Header = () => {
	const stickyClass = siteMetadata.stickyNav
		? "sticky top-0 z-40 bg-paper/85 dark:bg-gray-950/85 backdrop-blur"
		: "";

	return (
		<header className={`relative z-20 ${stickyClass}`}>
			{/* Top meta strip — the masthead micro-info */}
			<div className="border-rule flex items-center justify-between border-b py-2">
				<span className="label text-ink-muted dark:text-paper-deep">
					kjaniec.dev · a journal of software in practice
				</span>
				<span className="label text-ink-muted dark:text-paper-deep hidden sm:block">
					Issue {new Date().getFullYear()}
				</span>
			</div>

			{/* Main masthead — wordmark left, nav right */}
			<div className="flex items-end justify-between pt-6 pb-5">
				<Link
					href="/"
					aria-label={`${siteMetadata.headerTitle} — Home`}
					className="group"
				>
					<div className="flex items-baseline gap-2">
						<span className="font-display text-ink dark:text-paper text-3xl leading-none font-[600] tracking-[-0.03em] sm:text-4xl">
							kjaniec
						</span>
						<span
							className="text-vermilion font-display text-3xl leading-none font-[600] italic sm:text-4xl"
							aria-hidden="true"
						>
							.dev
						</span>
					</div>
					<span className="label text-ink-muted dark:text-paper-deep mt-1 block">
						Krzysztof Janiec — Engineer, Writer
					</span>
				</Link>

				<div className="flex items-center gap-3">
					<nav
						className="hidden items-center gap-1 sm:flex"
						aria-label="Main navigation"
					>
						{headerNavLinks
							.filter((link) => link.href !== "/")
							.map((link) => (
								<NavLink key={link.title} href={link.href} title={link.title} />
							))}
					</nav>
					<div className="border-rule hidden items-center gap-1 border-l pl-3 sm:flex">
						<SearchButton />
						<ThemeSwitch />
					</div>
					<div className="flex items-center gap-2 sm:hidden">
						<SearchButton />
						<ThemeSwitch />
						<MobileNav />
					</div>
				</div>
			</div>

			{/* Thick rule below — like the masthead bar of a printed journal */}
			<hr className="bg-ink dark:bg-paper h-[2px] border-0" />
		</header>
	);
};

export default Header;
