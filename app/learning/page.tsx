import { genPageMetadata } from "app/seo";
import Card from "@/components/Card";
import Link from "@/components/Link";
import PageHeader from "@/components/PageHeader";
import coursesData from "@/data/coursesData";

export const metadata = genPageMetadata({ title: "Learning" });

export default function Learning() {
	return (
		<div className="space-y-6">
			<PageHeader
				eyebrow="Continuous Growth"
				title="Learning"
				description="Courses and certifications I've completed to stay sharp across the stack."
			/>

			<div className="grid gap-4 md:grid-cols-2">
				{coursesData.map((c) => (
					<Card key={c.title} as="article" interactive>
						<div className="flex flex-wrap items-start justify-between gap-3">
							<div className="space-y-1">
								<h2 className="font-sans text-lg font-bold text-foreground">
									{c.title}
								</h2>
								<p className="font-mono text-xs text-muted-foreground">
									{c.description}
								</p>
							</div>
						</div>
						{c.href ? (
							<div className="pt-4">
								<Link
									href={c.href}
									className="inline-flex items-center gap-1.5 font-mono text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
								>
									View certificate →
								</Link>
							</div>
						) : null}
					</Card>
				))}
			</div>
		</div>
	);
}
