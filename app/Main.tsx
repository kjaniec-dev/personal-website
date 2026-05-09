import NewsletterForm from "pliny/ui/NewsletterForm";
import { formatDate } from "pliny/utils/formatDate";
import Hero from "@/components/Hero";
import Link from "@/components/Link";
import siteMetadata from "@/data/siteMetadata";
import "./layout.css";

const MAX_DISPLAY = 4;

export default function Home({ posts }) {
	const personSchema = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: siteMetadata.author,
		url: siteMetadata.siteUrl,
		sameAs: [siteMetadata.github, siteMetadata.linkedin].filter(Boolean),
		jobTitle: "Software Engineer",
		description: siteMetadata.description,
		image: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
	};

	const websiteSchema = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: siteMetadata.title,
		url: siteMetadata.siteUrl,
		description: siteMetadata.description,
		author: {
			"@type": "Person",
			name: siteMetadata.author,
		},
		potentialAction: {
			"@type": "SearchAction",
			target: {
				"@type": "EntryPoint",
				urlTemplate: `${siteMetadata.siteUrl}/tags/{search_term_string}`,
			},
			"query-input": "required name=search_term_string",
		},
	};

	return (
		<>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON.stringify(personSchema) is safe for personSchema
				dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
			/>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON.stringify(websiteSchema) is safe for websiteSchema
				dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
			/>

			<Hero />

			{/* Field notes — latest posts, as an editorial index */}
			<section className="mt-8 md:mt-16">
				<div className="flex items-baseline justify-between">
					<div className="flex items-baseline gap-3">
						<span className="section-mark">§ 02</span>
						<span className="label text-vermilion">Field notes</span>
					</div>
					{posts.length > MAX_DISPLAY && (
						<Link
							href="/blog"
							className="editorial-link font-mono text-xs tracking-wide"
						>
							All entries →
						</Link>
					)}
				</div>

				<h2 className="font-display text-ink dark:text-paper mt-3 text-4xl leading-[1.05] font-[600] tracking-[-0.025em] md:text-5xl">
					From the journal —{" "}
					<span className="text-ink-muted dark:text-paper-deep italic">
						recent entries.
					</span>
				</h2>

				<hr className="rule mt-6 h-px border-0" />

				{!posts.length && (
					<p className="text-ink-muted dark:text-paper-deep mt-10 text-base">
						No entries yet. Check back soon.
					</p>
				)}

				<ul className="divide-[color:var(--color-rule)] mt-2 divide-y">
					{posts.slice(0, MAX_DISPLAY).map((post, index) => {
						const { slug, date, title, summary, tags, readingTime } = post;
						const entryNo = String(index + 1).padStart(2, "0");
						return (
							<li key={slug} className="group relative py-8 md:py-10">
								<Link
									href={`/blog/${slug}`}
									prefetch={false}
									className="grid grid-cols-1 gap-y-4 md:grid-cols-12 md:gap-x-8"
								>
									{/* Entry number + date — the spine of the entry */}
									<div className="md:col-span-3">
										<div className="flex items-baseline gap-3">
											<span className="font-mono text-vermilion text-xs tracking-wider">
												№ {entryNo}
											</span>
											<time
												dateTime={date}
												className="label text-ink-muted dark:text-paper-deep"
											>
												{formatDate(date, siteMetadata.locale)}
											</time>
										</div>
										{readingTime && (
											<span className="marginalia mt-1 block">
												{readingTime.text}
											</span>
										)}
									</div>

									{/* Headline + dek + tags */}
									<div className="md:col-span-9">
										<h3 className="font-display text-ink dark:text-paper group-hover:text-vermilion text-2xl leading-[1.15] font-[600] tracking-tight transition-colors md:text-[1.9rem]">
											{title}
										</h3>
										<p className="text-ink-soft dark:text-paper-deep mt-2 max-w-[58ch] text-base leading-relaxed md:text-[1.05rem]">
											{summary}
										</p>
										{tags?.length ? (
											<ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
												{tags.map((tag: string) => (
													<li
														key={tag}
														className="label text-ink-muted dark:text-paper-deep"
													>
														#{tag}
													</li>
												))}
											</ul>
										) : null}
									</div>
								</Link>
							</li>
						);
					})}
				</ul>
			</section>

			{siteMetadata.newsletter?.provider && (
				<section className="border-ink dark:border-paper mt-24 border-t-2 pt-10 pb-4">
					<div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
						<div className="md:col-span-5">
							<span className="label text-vermilion">Subscribe</span>
							<h3 className="font-display text-ink dark:text-paper mt-3 text-3xl leading-tight font-[600] tracking-tight md:text-4xl">
								Delivered by post,
								<br />
								<span className="italic">rather than algorithm.</span>
							</h3>
						</div>
						<div className="md:col-span-7 md:border-l md:border-[color:var(--color-rule)] md:pl-10">
							<p className="text-ink-soft dark:text-paper-deep max-w-md text-base leading-relaxed">
								New entries in your inbox when they're published — no tracking,
								no cadence pressure, unsubscribe at any time.
							</p>
							<div className="mt-5 max-w-md">
								<NewsletterForm />
							</div>
						</div>
					</div>
				</section>
			)}
		</>
	);
}
