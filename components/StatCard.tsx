import type { ReactNode } from "react";

interface StatCardProps {
	label: string;
	value: ReactNode;
	index?: number;
	className?: string;
}

export default function StatCard({
	label,
	value,
	index,
	className = "",
}: StatCardProps) {
	return (
		<article
			className={`group flex flex-col justify-between rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-primary/40 sm:p-6 ${className}`}
		>
			<div className="flex items-center justify-between gap-3 font-mono text-xs">
				{index !== undefined && (
					<span
						aria-hidden="true"
						className="font-mono text-xs font-medium text-primary"
					>
						{String(index + 1).padStart(2, "0")}
					</span>
				)}
				<span
					aria-hidden="true"
					className="h-px flex-1 bg-border/60 transition-colors group-hover:bg-primary/20"
				/>
			</div>

			<div className="mt-4 sm:mt-6">
				<span className="block text-3xl font-medium tracking-tight text-foreground sm:text-4xl tabular-nums leading-none">
					{value}
				</span>
				<span className="mt-2 block font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
					{label}
				</span>
			</div>
		</article>
	);
}
