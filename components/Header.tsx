"use client";

import { usePathname } from "next/navigation";
import Link from "@/components/Link";
import MobileNav from "@/components/MobileNav";
import SearchButton from "@/components/SearchButton";
import ThemeSwitch from "@/components/ThemeSwitch";
import headerNavLinks from "@/data/headerNavLinks";
import siteMetadata from "@/data/siteMetadata";

export default function Header() {
	const pathname = usePathname();

	return (
		<header className="sticky top-4 z-40 w-full rounded-full border border-border bg-card/65 shadow-kj-md backdrop-blur-lg transition-all duration-300">
			<div className="flex h-14 items-center justify-between gap-4 px-4 sm:px-6">
				<Link
					href="/"
					aria-label={siteMetadata.headerTitle ?? "Home"}
					className="group flex items-center gap-2"
				>
					{/* biome-ignore lint/performance/noImgElement: Native img is intentional to prevent Next.js responsive layout collapse at 1080px and optimize LCP */}
					<img
						src="/static/images/logo-light.png"
						alt="KJ Logo"
						width={120}
						height={32}
						className="h-8 w-auto block dark:hidden object-contain transition-transform duration-300 group-hover:scale-[1.03]"
					/>
					{/* biome-ignore lint/performance/noImgElement: Native img is intentional to prevent Next.js responsive layout collapse at 1080px and optimize LCP */}
					<img
						src="/static/images/logo-dark.png"
						alt="KJ Logo"
						width={120}
						height={32}
						className="h-8 w-auto hidden dark:block object-contain transition-transform duration-300 group-hover:scale-[1.03]"
					/>
				</Link>

				<nav className="hidden items-center gap-1 md:flex">
					{headerNavLinks
						.filter((link) => link.href !== "/")
						.map((link) => {
							const active =
								pathname === link.href || pathname?.startsWith(`${link.href}/`);
							return (
								<Link
									key={link.title}
									href={link.href}
									className={`rounded-full px-3.5 py-1.5 font-sans text-sm font-medium transition-colors ${
										active
											? "bg-primary/10 text-primary font-semibold"
											: "text-muted-foreground hover:bg-muted hover:text-foreground"
									}`}
								>
									{link.title}
								</Link>
							);
						})}
				</nav>

				<div className="flex items-center gap-2">
					<SearchButton />
					<ThemeSwitch />
					{siteMetadata.email ? (
						<Link
							href={`mailto:${siteMetadata.email}`}
							className="hidden h-9 items-center gap-2 rounded-full bg-primary px-5 font-sans text-sm font-semibold whitespace-nowrap text-primary-foreground shadow-kj-glow transition-all duration-300 hover:bg-primary-hover hover:-translate-y-0.5 md:inline-flex"
						>
							Let&apos;s talk
						</Link>
					) : null}
					<MobileNav />
				</div>
			</div>
		</header>
	);
}
