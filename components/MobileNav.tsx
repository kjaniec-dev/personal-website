"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Button, Drawer } from "@/components/ClientUI";
import headerNavLinks from "@/data/headerNavLinks";
import Link from "./Link";

export default function MobileNav() {
	const [open, setOpen] = useState(false);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

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

			{mounted &&
				createPortal(
					<Drawer
						open={open}
						onClose={() => setOpen(false)}
						side="right"
						title="Navigation"
					>
						<div className="flex flex-col space-y-6 pt-2">
							<nav className="flex flex-col space-y-3">
								{headerNavLinks.map((link) => (
									<Link
										key={link.title}
										href={link.href}
										className="text-lg font-bold tracking-wider text-foreground hover:text-primary transition-colors py-2"
										onClick={() => setOpen(false)}
									>
										{link.title}
									</Link>
								))}
							</nav>
						</div>
					</Drawer>,
					document.body,
				)}
		</>
	);
}
