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
			className={`group font-display relative px-2.5 py-1.5 text-[0.95rem] tracking-tight transition-colors ${
				isActive
					? "text-vermilion"
					: "text-ink hover:text-vermilion dark:text-paper"
			}`}
		>
			<span className="relative">
				{title}
				<span
					aria-hidden="true"
					className={`bg-vermilion absolute -bottom-1 left-0 h-[2px] transition-all duration-300 ${
						isActive ? "w-full" : "w-0 group-hover:w-full"
					}`}
				/>
			</span>
		</Link>
	);
};

export default NavLink;
