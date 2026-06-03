"use client";

import type { ElementType, ReactNode } from "react";
import { Card as UICard } from "@/components/ClientUI";

type CardProps = {
	as?: ElementType;
	padded?: boolean;
	interactive?: boolean;
	glow?: boolean;
	className?: string;
	children: ReactNode;
};

const paddedClasses = "p-6 sm:p-8";
const glowClasses = "shadow-kj-lg relative overflow-hidden";

export default function Card({
	as: Component = "div",
	padded = true,
	interactive = false,
	glow = false,
	className = "",
	children,
}: CardProps) {
	const classes = [
		padded ? paddedClasses : "",
		glow ? glowClasses : "",
		interactive ? "spotlight-card group/card relative overflow-hidden" : "",
		className,
	]
		.filter(Boolean)
		.join(" ");

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!interactive) return;
		const { currentTarget, clientX, clientY } = e;
		const { left, top } = currentTarget.getBoundingClientRect();
		const x = clientX - left;
		const y = clientY - top;
		currentTarget.style.setProperty("--mouse-x", `${x}px`);
		currentTarget.style.setProperty("--mouse-y", `${y}px`);
	};

	return (
		<UICard
			as={Component}
			interactive={interactive}
			className={classes}
			onMouseMove={handleMouseMove}
		>
			{interactive ? (
				<div
					className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
					style={{
						background: `radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), color-mix(in srgb, var(--color-primary) 10%, transparent), transparent 80%)`,
					}}
				/>
			) : null}
			{glow ? (
				<div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
			) : null}
			{glow || interactive ? (
				<div className="relative z-10 flex flex-col h-full w-full">
					{children}
				</div>
			) : (
				children
			)}
		</UICard>
	);
}
