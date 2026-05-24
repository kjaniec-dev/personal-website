import type { ReactNode } from "react";

type PillTone = "default" | "primary" | "secondary" | "success" | "muted";

type PillProps = {
	tone?: PillTone;
	mono?: boolean;
	className?: string;
	children: ReactNode;
};

const toneClasses: Record<PillTone, string> = {
	default: "border-border bg-background text-muted-foreground",
	primary: "border-primary/30 bg-primary/10 text-primary",
	secondary: "border-secondary/30 bg-secondary/10 text-secondary",
	success: "border-success/30 bg-success-surface text-success",
	muted: "border-border bg-muted text-muted-foreground",
};

export default function Pill({
	tone = "default",
	mono = true,
	className = "",
	children,
}: PillProps) {
	const classes = [
		"inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
		mono ? "font-mono" : "",
		toneClasses[tone],
		className,
	]
		.filter(Boolean)
		.join(" ");

	return <span className={classes}>{children}</span>;
}
