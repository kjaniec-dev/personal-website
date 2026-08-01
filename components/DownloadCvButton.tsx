"use client";

import { Button } from "@/components/ClientUI";
import siteMetadata from "@/data/siteMetadata";

const DownloadIcon = (
	<svg
		className="h-[1.05em] w-[1.05em]"
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
		aria-hidden="true"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2}
			d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
		/>
	</svg>
);

type DownloadCvButtonProps = {
	variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
	size?: "sm" | "md" | "lg" | "icon" | "icon-sm";
	className?: string;
	onClick?: () => void;
};

export default function DownloadCvButton({
	variant = "secondary",
	size = "sm",
	className,
	onClick,
}: DownloadCvButtonProps) {
	return (
		<Button
			variant={variant}
			size={size}
			className={className}
			leadingIcon={DownloadIcon}
			onClick={() => {
				const link = document.createElement("a");
				link.href = siteMetadata.resume;
				link.download = "CV-kjaniec-dev.pdf";
				link.rel = "noopener";
				document.body.appendChild(link);
				link.click();
				link.remove();
				onClick?.();
			}}
		>
			Download CV
		</Button>
	);
}
