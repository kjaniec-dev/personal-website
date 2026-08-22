"use client";

import { useEffect, useState } from "react";
import { Fab } from "@/components/ClientUI";

const ScrollTopAndComment = () => {
	const [show, setShow] = useState(false);

	useEffect(() => {
		const handleWindowScroll = () => {
			setShow(window.scrollY > 50);
		};

		window.addEventListener("scroll", handleWindowScroll);
		return () => window.removeEventListener("scroll", handleWindowScroll);
	}, []);

	if (!show) return null;

	return (
		<Fab
			icon={
				<svg
					className="h-5 w-5"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
				>
					<path
						fillRule="evenodd"
						d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
						clipRule="evenodd"
					/>
				</svg>
			}
			label="Scroll to top"
			variant="secondary"
			onClick={() => window.scrollTo({ top: 0 })}
		/>
	);
};

export default ScrollTopAndComment;
