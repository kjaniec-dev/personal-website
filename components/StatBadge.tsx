type StatBadgeProps = {
	value: string;
	label: string;
	accent?: "primary" | "secondary";
};

export default function StatBadge({
	value,
	label,
	accent = "primary",
}: StatBadgeProps) {
	const accentClass = accent === "primary" ? "text-primary" : "text-secondary";
	return (
		<div className="flex flex-col gap-1">
			<span
				className={`font-sans text-3xl font-bold tracking-tight sm:text-4xl ${accentClass}`}
			>
				{value}
			</span>
			<span className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
				{label}
			</span>
		</div>
	);
}
