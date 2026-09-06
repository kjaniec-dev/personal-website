import { genPageMetadata } from "app/seo";
import tagData from "app/tag-data.json";
import { slug } from "github-slugger";
import Link from "@/components/Link";
import PortfolioPageHeader from "@/components/PortfolioPageHeader";
import { TAG_GROUPS } from "@/data/tagGroups";

export const metadata = genPageMetadata({
	title: "Tags",
	description: "Things I blog about",
});

export default async function Page() {
	const tagCounts = tagData as Record<string, number>;
	const tagKeys = Object.keys(tagCounts);
	const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a]);
	const groupedTags = new Set(TAG_GROUPS.flatMap((group) => group.tags));
	const groups = [
		...TAG_GROUPS.map((group) => ({
			...group,
			tags: sortedTags.filter((tag) => group.tags.includes(tag)),
		})),
		{
			id: "other-topics",
			label: "Other topics",
			tags: sortedTags.filter((tag) => !groupedTags.has(tag)),
		},
	].filter((group) => group.tags.length > 0);

	return (
		<div className="pt-12 pb-8 font-sans sm:pt-16">
			<PortfolioPageHeader
				eyebrow="Explore topics"
				title="Tags"
				description="Find your next read by topic. From frontend and systems design to personal projects and the tools I use along the way."
			/>

			<div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-y border-border py-2">
				<p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
					All tags
					<span className="ml-2 text-primary">
						{String(tagKeys.length).padStart(2, "0")}
					</span>
				</p>
				<nav aria-label="Blog navigation">
					<Link
						href="/blog"
						className="inline-flex min-h-11 items-center gap-2 rounded-sm text-sm text-muted-foreground transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
					>
						<span aria-hidden="true">←</span> All posts
					</Link>
				</nav>
			</div>

			{tagKeys.length === 0 ? (
				<p className="py-10 text-muted-foreground">No tags found.</p>
			) : (
				<div className="divide-y divide-border">
					{groups.map((group, index) => (
						<section
							key={group.id}
							aria-labelledby={`tags-${group.id}`}
							className="grid gap-5 py-8 sm:py-10 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-14"
						>
							<div>
								<p
									aria-hidden="true"
									className="mb-3 font-mono text-xs text-primary"
								>
									{String(index + 1).padStart(2, "0")}
								</p>
								<h2
									id={`tags-${group.id}`}
									className="text-2xl font-medium leading-snug tracking-tight text-foreground"
								>
									{group.label}
								</h2>
							</div>
							<ul className="grid min-w-0 content-start gap-x-8 sm:grid-cols-2">
								{group.tags.map((tag) => (
									<li key={tag} className="min-w-0 border-b border-border/60">
										<Link
											href={`/tags/${slug(tag)}`}
											className="group flex min-h-14 items-center justify-between gap-3 rounded-sm px-2 py-3 text-sm transition-colors hover:bg-subtle/50 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
											aria-label={`View posts tagged ${tag}: ${tagCounts[tag]} ${tagCounts[tag] === 1 ? "post" : "posts"}`}
										>
											<span className="min-w-0 break-words font-medium text-foreground transition-colors group-hover:text-primary">
												<span className="text-secondary">#</span>
												{tag.split(" ").join("-")}
											</span>
											<span className="shrink-0 font-mono text-xs text-primary">
												{tagCounts[tag]}{" "}
												<span className="text-muted-foreground">
													{tagCounts[tag] === 1 ? "post" : "posts"}
												</span>
											</span>
										</Link>
									</li>
								))}
							</ul>
						</section>
					))}
				</div>
			)}
		</div>
	);
}
