"use client";

import { usePathname } from "next/navigation";
import Link from "@/components/Link";

interface HeaderNavLinkProps {
	href: string;
	title: string;
	mobile?: boolean;
	onClick?: () => void;
}

export default function HeaderNavLink({
	href,
	title,
	mobile = false,
	onClick,
}: HeaderNavLinkProps) {
	const pathname = usePathname();
	const active =
		pathname === href ||
		(href !== "/" && pathname?.startsWith(`${href}/`)) ||
		(href === "/blog" &&
			(pathname === "/tags" || pathname?.startsWith("/tags/")));

	return (
		<Link
			href={href}
			aria-current={active ? "page" : undefined}
			onClick={onClick}
			className={`group flex items-center rounded-kj-sm font-sans transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
				mobile
					? "min-h-12 px-2 py-3 text-lg"
					: "min-h-10 px-2.5 lg:px-3.5 text-sm"
			} ${
				active
					? "font-semibold text-primary"
					: "font-medium text-muted-foreground hover:text-foreground"
			}`}
		>
			<span className="relative">
				{title}
				<span
					aria-hidden="true"
					className={`absolute -bottom-1.5 left-0 h-0.5 w-full rounded-full bg-current transition-opacity ${active ? "opacity-100" : "opacity-0 group-hover:opacity-40"}`}
				/>
			</span>
		</Link>
	);
}
