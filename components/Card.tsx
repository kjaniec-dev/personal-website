import type { ElementType, ReactNode } from "react";

type CardProps = {
	as?: ElementType;
	padded?: boolean;
	interactive?: boolean;
	glow?: boolean;
	className?: string;
	children: ReactNode;
};

const baseClasses = "rounded-kj-2xl border border-border bg-card shadow-kj-sm";
const paddedClasses = "p-6 sm:p-8";
const interactiveClasses =
	"transition-all duration-300 hover:-translate-y-1 hover:shadow-kj-md";
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
		baseClasses,
		padded ? paddedClasses : "",
		interactive ? interactiveClasses : "",
		glow ? glowClasses : "",
		className,
	]
		.filter(Boolean)
		.join(" ");

	return (
		<Component className={classes}>
			{glow ? (
				<div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
			) : null}
			{glow ? <div className="relative z-10">{children}</div> : children}
		</Component>
	);
}
