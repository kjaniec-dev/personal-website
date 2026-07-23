"use client";

import { useState } from "react";
import { Button, Drawer } from "@/components/ClientUI";
import headerNavLinks from "@/data/headerNavLinks";
import Link from "./Link";

export default function MobileNav() {
	const [open, setOpen] = useState(false);

	return (
		<>
			<Button
				variant="ghost"
				size="icon"
				aria-label="Toggle Menu"
				onClick={() => setOpen(true)}
				className="md:hidden text-foreground hover:bg-subtle"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					className="h-6 w-6"
				>
					<title>Menu icon</title>
					<path
						fillRule="evenodd"
						d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
						clipRule="evenodd"
					/>
				</svg>
			</Button>

			<Drawer open={open} onClose={() => setOpen(false)} side="right">
				<div className="flex flex-col space-y-6 pt-6 px-4">
					<nav className="flex flex-col space-y-4">
						{headerNavLinks.map((link) => (
							<Link
								key={link.title}
								href={link.href}
								className="text-xl font-bold tracking-wider text-foreground hover:text-primary transition-colors py-2"
								onClick={() => setOpen(false)}
							>
								{link.title}
							</Link>
						))}
					</nav>
				</div>
			</Drawer>
		</>
	);
}
