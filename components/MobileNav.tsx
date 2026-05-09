"use client";

import {
	Dialog,
	DialogPanel,
	Transition,
	TransitionChild,
} from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import headerNavLinks from "@/data/headerNavLinks";
import Link from "./Link";

const MobileNav = () => {
	const [navShow, setNavShow] = useState(false);
	const [mounted, setMounted] = useState(false);

	const onToggleNav = () => {
		setNavShow((status) => !status);
	};

	useEffect(() => {
		setMounted(true);

		if (navShow) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}

		return () => {
			document.body.style.overflow = "";
		};
	}, [navShow]);

	return (
		<>
			<button
				type="button"
				aria-label="Toggle Menu"
				onClick={onToggleNav}
				className="border-rule text-ink dark:text-paper flex h-9 w-9 items-center justify-center border sm:hidden"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="1.5"
					className="h-4 w-4"
				>
					<title>Menu icon</title>
					<path strokeLinecap="round" d="M3 7h18M3 12h18M3 17h18" />
				</svg>
			</button>
			{mounted && (
				<Transition appear show={navShow} as={Fragment} unmount={false}>
					<Dialog as="div" onClose={onToggleNav} unmount={false}>
						<TransitionChild
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
							unmount={false}
						>
							<div className="fixed inset-0 z-60 bg-black/40" />
						</TransitionChild>

						<TransitionChild
							as={Fragment}
							enter="transition ease-in-out duration-300 transform"
							enterFrom="translate-x-full opacity-0"
							enterTo="translate-x-0 opacity-100"
							leave="transition ease-in duration-200 transform"
							leaveFrom="translate-x-0 opacity-100"
							leaveTo="translate-x-full opacity-0"
							unmount={false}
						>
							<DialogPanel className="bg-paper dark:bg-gray-950 fixed top-0 right-0 z-70 h-full w-full max-w-sm duration-300">
								<div className="border-rule flex items-center justify-between border-b px-6 py-5">
									<span className="label text-ink-muted dark:text-paper-deep">
										Index
									</span>
									<button
										type="button"
										className="text-ink dark:text-paper border-rule flex h-9 w-9 items-center justify-center border"
										aria-label="Close menu"
										onClick={onToggleNav}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="1.5"
											className="h-4 w-4"
										>
											<title>Close icon</title>
											<path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
										</svg>
									</button>
								</div>
								<nav className="flex flex-col divide-y divide-[color:var(--color-rule)] px-6">
									{headerNavLinks.map((link, i) => (
										<Link
											key={link.title}
											href={link.href}
											className="group font-display text-ink hover:text-vermilion dark:text-paper flex items-baseline gap-4 py-5 text-3xl font-medium tracking-tight transition-colors"
											onClick={onToggleNav}
										>
											<span className="text-vermilion font-mono text-xs tracking-wider">
												{String(i + 1).padStart(2, "0")}
											</span>
											{link.title}
										</Link>
									))}
								</nav>
							</DialogPanel>
						</TransitionChild>
					</Dialog>
				</Transition>
			)}
		</>
	);
};

export default MobileNav;
