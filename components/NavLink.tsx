"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
	href: string;
	title: string;
}

const NavLink = ({ href, title }: NavLinkProps) => {
	const pathname = usePathname();
	const isActive =
		pathname === href || (href !== "/" && pathname.startsWith(href));

	return (
		<Link
			href={href}
			aria-current={isActive ? "page" : undefined}
			className={`group rounded-md px-3 py-1.5 font-mono text-sm transition-colors ${
				isActive
					? "bg-primary-500/10 text-primary-600 dark:bg-primary-500/15 dark:text-primary-400"
					: "hover:text-primary-600 dark:hover:text-primary-400 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-900"
			}`}
		>
			<span
				className={`mr-1 ${
					isActive
						? "text-primary-500"
						: "text-gray-400 group-hover:text-primary-500 dark:text-gray-600"
				}`}
			>
				./
			</span>
			{title.toLowerCase()}
		</Link>
	);
};

export default NavLink;
