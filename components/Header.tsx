import Image from "@/components/Image";
import headerNavLinks from "@/data/headerNavLinks";
import siteMetadata from "@/data/siteMetadata";
import Link from "./Link";
import MobileNav from "./MobileNav";
import NavLink from "./NavLink";
import SearchButton from "./SearchButton";
import ThemeSwitch from "./ThemeSwitch";

const Header = () => {
	let headerClass =
		"flex items-center w-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-md justify-between py-5";
	if (siteMetadata.stickyNav) {
		headerClass +=
			" sticky top-0 z-50 border-b border-gray-200/60 dark:border-gray-800/60";
	}

	return (
		<header className={headerClass}>
			<Link href="/" aria-label={`${siteMetadata.headerTitle} - Home`}>
				<div className="group flex items-center gap-3 transition-colors">
					<div className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 bg-white/60 dark:border-gray-700 dark:bg-gray-900/60">
						<Image
							className={"dark:invert"}
							width={28}
							height={28}
							src={"/static/images/logo.svg"}
							alt={`${siteMetadata.headerTitle} logo`}
							priority
						/>
					</div>
					{typeof siteMetadata.headerTitle === "string" ? (
						<div className="hidden font-mono text-sm font-medium tracking-tight text-gray-900 sm:flex sm:items-center sm:gap-1 dark:text-gray-100">
							<span className="text-primary-500">~</span>
							<span className="text-gray-400 dark:text-gray-500">/</span>
							<span className="group-hover:text-primary-500 transition-colors">
								{siteMetadata.headerTitle}
							</span>
							<span className="text-primary-500 ml-1">$</span>
						</div>
					) : (
						siteMetadata.headerTitle
					)}
				</div>
			</Link>
			<div className="flex items-center gap-2 leading-5 sm:gap-4">
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
				<div className="flex items-center gap-2">
					<SearchButton />
					<ThemeSwitch />
				</div>
				<MobileNav />
			</div>
		</header>
	);
};

export default Header;
