"use client";

import HeaderNavLink from "@/components/HeaderNavLink";
import Link from "@/components/Link";
import MobileNav from "@/components/MobileNav";
import SearchButton from "@/components/SearchButton";
import ThemeSwitch from "@/components/ThemeSwitch";
import headerNavLinks from "@/data/headerNavLinks";
import siteMetadata from "@/data/siteMetadata";

export default function Header() {
	return (
		<header className="sticky top-4 z-40 w-full rounded-full border border-border bg-surface/65 backdrop-blur-lg">
			<div className="flex h-14 items-center justify-between gap-1 px-4 md:gap-2.5 lg:gap-3 xl:gap-4 xl:px-6">
				<Link
					href="/"
					aria-label={siteMetadata.headerTitle ?? "Home"}
					className="group flex items-center gap-2 flex-shrink-0"
				>
					{/* biome-ignore lint/performance/noImgElement: Native img is intentional to prevent Next.js responsive layout collapse at 1080px and optimize LCP */}
					<img
						src="/static/images/logo-light.png"
						alt="KJ Logo"
						width={120}
						height={32}
						className="h-7 sm:h-8 xl:h-9 w-auto block dark:hidden object-contain transition-transform duration-300 group-hover:scale-[1.03]"
					/>
					{/* biome-ignore lint/performance/noImgElement: Native img is intentional to prevent Next.js responsive layout collapse at 1080px and optimize LCP */}
					<img
						src="/static/images/logo-dark.png"
						alt="KJ Logo"
						width={120}
						height={32}
						className="h-7 sm:h-8 xl:h-9 w-auto hidden dark:block object-contain transition-transform duration-300 group-hover:scale-[1.03]"
					/>
				</Link>

				<nav
					aria-label="Main navigation"
					className="hidden items-center gap-0.5 lg:gap-1 xl:gap-1.5 md:flex"
				>
					{headerNavLinks
						.filter((link) => link.href !== "/")
						.map((link) => (
							<HeaderNavLink key={link.href} {...link} />
						))}
				</nav>

				<div className="flex shrink-0 items-center gap-0 sm:gap-1 xl:gap-2">
					<SearchButton />
					<ThemeSwitch />
					{siteMetadata.email ? (
						<a
							href={`mailto:${siteMetadata.email}`}
							className="hidden min-h-10 items-center justify-center gap-2 rounded-full bg-primary px-4 font-sans text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface md:inline-flex"
						>
							Let&apos;s talk <span aria-hidden="true">↗</span>
						</a>
					) : null}
					<MobileNav />
				</div>
			</div>
		</header>
	);
}
