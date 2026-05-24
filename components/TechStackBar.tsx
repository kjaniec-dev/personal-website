import techStackData from "@/data/techStackData";

export default function TechStackBar() {
	return (
		<div className="flex flex-wrap items-center gap-2 sm:gap-3">
			<span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
				Tech Stack
			</span>
			<span className="text-muted-foreground/40">·</span>
			{techStackData.map((item) => (
				<span
					key={item.name}
					className="rounded-kj-md border border-border bg-card px-2.5 py-1 font-mono text-[11px] font-semibold text-muted-foreground"
				>
					{item.short ?? item.name}
				</span>
			))}
		</div>
	);
}
