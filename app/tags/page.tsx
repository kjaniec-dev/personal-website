import { genPageMetadata } from "app/seo";
import tagData from "app/tag-data.json";
import { slug } from "github-slugger";
import { PageHeader } from "@/components/ClientUI";
import Link from "@/components/Link";

export const metadata = genPageMetadata({
	title: "Tags",
	description: "Things I blog about",
});

export default async function Page() {
	const tagCounts = tagData as Record<string, number>;
	const tagKeys = Object.keys(tagCounts);
	const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a]);

	return (
		<div className="space-y-6">
			<PageHeader
				eyebrow="Topics"
				title="Tags"
				description="Browse posts by topic. Counts reflect published articles."
			/>

			{tagKeys.length === 0 ? (
				<p className="text-muted-foreground">No tags found.</p>
			) : (
				<ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
					{sortedTags.map((t) => (
						<li key={t}>
							<Link
								href={`/tags/${slug(t)}`}
								className="group flex items-center justify-between rounded-kj-xl border border-border bg-card px-4 py-3 shadow-kj-sm transition-all hover:-translate-y-0.5 hover:shadow-kj-md"
								aria-label={`View posts tagged ${t}`}
							>
								<span className="font-sans text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
									#{t.split(" ").join("-")}
								</span>
								<span className="font-mono text-xs font-semibold text-muted-foreground">
									{tagCounts[t]}
								</span>
							</Link>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
