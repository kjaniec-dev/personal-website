import type { Blog } from "contentlayer/generated";
import type { CoreContent } from "pliny/utils/contentlayer";
import Link from "@/components/Link";
import TopicLink from "@/components/TopicLink";
import siteMetadata from "@/data/siteMetadata";

export default function BlogPostCard({ post }: { post: CoreContent<Blog> }) {
	const { path, date, title, summary, tags, readingTime } = post;
	return (
		<article className="py-8 sm:py-10">
			<div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-muted-foreground">
				<time dateTime={date}>
					{new Date(date).toLocaleDateString(siteMetadata.locale, {
						year: "numeric",
						month: "long",
						day: "numeric",
						timeZone: "UTC",
					})}
				</time>
				{readingTime && (
					<>
						<span aria-hidden="true">/</span>
						<span>{readingTime.text}</span>
					</>
				)}
			</div>
			<h2 className="text-2xl font-medium leading-tight tracking-tight text-foreground sm:text-3xl">
				<Link
					href={`/${path}`}
					className="rounded-sm transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
				>
					{title}
				</Link>
			</h2>
			{summary && (
				<p className="mt-4 max-w-prose text-sm leading-7 text-muted-foreground sm:text-base">
					{summary}
				</p>
			)}
			{tags && tags.length > 0 && (
				<ul
					aria-label="Article tags"
					className="mt-4 flex flex-wrap gap-x-4 gap-y-1"
				>
					{tags.map((tag) => (
						<li key={tag} className="min-w-0 max-w-full">
							<TopicLink tag={tag} />
						</li>
					))}
				</ul>
			)}
			<Link
				href={`/${path}`}
				className="mt-3 inline-flex min-h-11 items-center gap-3 rounded-sm text-sm font-medium text-primary transition-colors hover:text-primary-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
			>
				Read article<span className="sr-only">: {title}</span>
				<span aria-hidden="true">→</span>
			</Link>
		</article>
	);
}
