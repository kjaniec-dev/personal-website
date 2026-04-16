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

	// Handle body scroll lock with CSS instead of JS for better performance
	useEffect(() => {
		setMounted(true);

		if (navShow) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}

		// Cleanup on unmount
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
				className="sm:hidden"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					className="hover:text-primary-500 dark:hover:text-primary-400 h-8 w-8 text-gray-900 dark:text-gray-100"
				>
					<title>Menu icon</title>
					<path
						fillRule="evenodd"
						d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
						clipRule="evenodd"
					/>
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
							<div className="fixed inset-0 z-60 bg-black/25" />
						</TransitionChild>

						<TransitionChild
							as={Fragment}
							enter="transition ease-in-out duration-300 transform"
							enterFrom="translate-x-full opacity-0"
							enterTo="translate-x-0 opacity-95"
							leave="transition ease-in duration-200 transform"
							leaveFrom="translate-x-0 opacity-95"
							leaveTo="translate-x-full opacity-0"
							unmount={false}
						>
							<DialogPanel className="grid-bg fixed top-0 left-0 z-70 h-full w-full bg-white/98 duration-300 dark:bg-gray-950/98">
								<nav className="mt-24 flex h-full basis-0 flex-col items-start overflow-y-auto px-8 pt-2 text-left">
									<div className="mb-6 font-mono text-xs tracking-widest text-gray-500 uppercase">
										<span className="text-primary-500">{">"}</span> navigation
									</div>
									{headerNavLinks.map((link, idx) => (
										<Link
											key={link.title}
											href={link.href}
											className="hover:text-primary-500 dark:hover:text-primary-400 group mb-3 flex items-baseline gap-3 py-2 font-mono text-2xl font-medium text-gray-900 outline outline-0 dark:text-gray-100"
											onClick={onToggleNav}
										>
											<span className="text-primary-500 text-sm">
												{String(idx + 1).padStart(2, "0")}
											</span>
											<span className="text-gray-400 dark:text-gray-600">
												./
											</span>
											<span>{link.title.toLowerCase()}</span>
										</Link>
									))}
								</nav>

								<button
									type="button"
									className="hover:text-primary-500 dark:hover:text-primary-400 fixed top-7 right-4 z-80 h-16 w-16 p-4 text-gray-900 dark:text-gray-100"
									aria-label="Toggle Menu"
									onClick={onToggleNav}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 20 20"
										fill="currentColor"
									>
										<title>Close icon</title>
										<path
											fillRule="evenodd"
											d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
											clipRule="evenodd"
										/>
									</svg>
								</button>
							</DialogPanel>
						</TransitionChild>
					</Dialog>
				</Transition>
			)}
		</>
	);
};

export default MobileNav;
