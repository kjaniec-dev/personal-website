import type { ReactNode } from "react";

type PageHeaderProps = {
	eyebrow: string;
	title: string;
	description?: string;
	actions?: ReactNode;
};

export default function PageHeader({
	eyebrow,
	title,
	description,
	actions,
}: PageHeaderProps) {
	return (
		<header className="py-12 md:py-16">
			<div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
				<div className="space-y-3 max-w-2xl">
					<p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-primary">
						{eyebrow}
					</p>
					<h1 className="font-sans text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
						{title}
					</h1>
					{description ? (
						<p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
							{description}
						</p>
					) : null}
				</div>
				{actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
			</div>
		</header>
	);
}
