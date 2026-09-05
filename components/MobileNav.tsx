"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { Button, Drawer } from "@/components/ClientUI";
import HeaderNavLink from "@/components/HeaderNavLink";
import headerNavLinks from "@/data/headerNavLinks";
import siteMetadata from "@/data/siteMetadata";

export default function MobileNav() {
	const [open, setOpen] = useState(false);
	const [mounted, setMounted] = useState(false);
	const panelId = useId();
	const closeMenu = useCallback(() => setOpen(false), []);

	useEffect(() => {
		setMounted(true);
	}, []);

	useEffect(() => {
		const closeOnDesktop = () => {
			if (window.innerWidth >= 768) closeMenu();
		};
		window.addEventListener("resize", closeOnDesktop);
		return () => window.removeEventListener("resize", closeOnDesktop);
	}, [closeMenu]);

	return (
		<>
			<Button
				variant="ghost"
				size="icon"
				aria-label="Toggle Menu"
				aria-expanded={open}
				aria-controls={mounted ? panelId : undefined}
				aria-haspopup="dialog"
				onClick={() => setOpen(true)}
				className="h-12 w-12 shrink-0 rounded-full text-muted-foreground hover:bg-subtle hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring md:hidden"
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
					<div
						id={panelId}
						aria-hidden={!open}
						inert={!open}
						className="[&_[id=drawer-title]]:sr-only"
					>
						<Drawer
							open={open}
							onClose={closeMenu}
							side="right"
							title="Menu"
							width="max-w-sm"
						>
							<div className="flex min-h-full flex-col gap-8">
								<nav
									aria-label="Mobile navigation"
									className="flex flex-col gap-2"
								>
									{headerNavLinks.map((link) => (
										<HeaderNavLink
											key={link.href}
											{...link}
											mobile
											onClick={closeMenu}
										/>
									))}
								</nav>
								{siteMetadata.email ? (
									<div className="mt-auto border-t border-border pt-6 pb-[env(safe-area-inset-bottom)]">
										<a
											href={`mailto:${siteMetadata.email}`}
											onClick={closeMenu}
											className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-4 font-sans text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
										>
											Let&apos;s talk <span aria-hidden="true">↗</span>
										</a>
									</div>
								) : null}
							</div>
						</Drawer>
					</div>,
					document.body,
				)}
		</>
	);
}
