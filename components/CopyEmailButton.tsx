"use client";

import { useEffect, useState } from "react";
import { buttonVariants, cn } from "@/components/ClientUI";

type ButtonVariantsProps = NonNullable<Parameters<typeof buttonVariants>[0]>;

export interface CopyEmailButtonProps {
	email: string;
	variant?: ButtonVariantsProps["variant"];
	size?: ButtonVariantsProps["size"];
	className?: string;
}

export default function CopyEmailButton({
	email,
	variant = "outline",
	size = "md",
	className = "",
}: CopyEmailButtonProps) {
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		if (!copied) return;
		const timer = setTimeout(() => {
			setCopied(false);
		}, 2000);
		return () => clearTimeout(timer);
	}, [copied]);

	const handleCopy = async () => {
		try {
			if (navigator?.clipboard?.writeText) {
				await navigator.clipboard.writeText(email);
			} else {
				const textArea = document.createElement("textarea");
				textArea.value = email;
				textArea.style.position = "fixed";
				textArea.style.opacity = "0";
				document.body.appendChild(textArea);
				textArea.select();
				document.execCommand("copy");
				document.body.removeChild(textArea);
			}
			setCopied(true);
		} catch {
			// If copy fails, ignore error
		}
	};

	return (
		<button
			type="button"
			onClick={handleCopy}
			aria-label={
				copied ? "Email copied to clipboard" : `Copy ${email} to clipboard`
			}
			className={cn(
				buttonVariants({ variant, size }),
				"cursor-pointer transition-all",
				className,
			)}
		>
			{copied ? (
				<>
					<svg
						aria-hidden="true"
						className="h-4 w-4 text-primary"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth={2}
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<polyline points="20 6 9 17 4 12" />
					</svg>
					<span>Copied!</span>
				</>
			) : (
				<>
					<svg
						aria-hidden="true"
						className="h-4 w-4"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth={1.75}
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
						<path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
					</svg>
					<span>Copy email</span>
				</>
			)}
			<span aria-live="polite" className="sr-only">
				{copied ? "Email copied to clipboard" : ""}
			</span>
		</button>
	);
}
