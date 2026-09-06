interface PortfolioPageHeaderProps {
	eyebrow: string;
	title: string;
	description: string;
}

// Editorial composition over KJ tokens; the kit's PageHeader has a fixed layout.
export default function PortfolioPageHeader({
	eyebrow,
	title,
	description,
}: PortfolioPageHeaderProps) {
	return (
		<header className="pb-10 sm:pb-14">
			<p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-primary">
				{eyebrow}
			</p>
			<div className="grid gap-6 md:grid-cols-2 md:items-end md:gap-10">
				<h1 className="min-w-0 break-words text-5xl font-medium leading-none tracking-tight text-foreground sm:text-6xl xl:text-7xl">
					{title}
					<span className="text-primary">.</span>
				</h1>
				<p className="max-w-lg text-base leading-relaxed text-muted-foreground">
					{description}
				</p>
			</div>
		</header>
	);
}
