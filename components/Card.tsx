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
		className,
	]
		.filter(Boolean)
		.join(" ");

	return (
		<UICard as={Component} interactive={interactive} className={classes}>
			{glow ? (
				<div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
			) : null}
			{glow ? <div className="relative z-10">{children}</div> : children}
		</UICard>
	);
}
