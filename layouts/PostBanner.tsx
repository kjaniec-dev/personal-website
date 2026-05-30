import type { Blog } from "contentlayer/generated";
import type { CoreContent } from "pliny/utils/contentlayer";
import { formatDate } from "pliny/utils/formatDate";
import type { ReactNode } from "react";
import Card from "@/components/Card";
import Comments from "@/components/Comments";
import Image from "@/components/Image";
import Link from "@/components/Link";
import Pill from "@/components/Pill";
import ScrollTopAndComment from "@/components/ScrollTopAndComment";
import SectionContainer from "@/components/SectionContainer";
import siteMetadata from "@/data/siteMetadata";

interface LayoutProps {
	content: CoreContent<Blog>;
	next?: { path: string; title: string };
	prev?: { path: string; title: string };
	children: ReactNode;
}

export default function PostBanner({
	content,
	next,
	prev,
	children,
}: LayoutProps) {
	const { path, slug, date, title, tags, images, readingTime } = content;
	const basePath = path.split("/")[0];

	return (
		<SectionContainer>
			<ScrollTopAndComment />
			<article className="space-y-8 py-8">
				<Card glow padded>
					<div className="space-y-4">
						{images && images.length > 0 ? (
							<div className="-m-6 mb-6 overflow-hidden sm:-m-8 sm:mb-8">
								<Image
									src={images[0]}
									alt={title}
									width={1600}
									height={900}
									className="h-64 w-full object-cover sm:h-80 md:h-96"
									priority
								/>
							</div>
						) : null}
						{tags && tags.length > 0 ? (
							<div className="flex flex-wrap gap-1.5">
								{tags.map((t) => (
									<Pill key={t} tone="primary">
										{t}
									</Pill>
								))}
							</div>
						) : null}
						<h1 className="font-sans text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
							{title}
						</h1>
						<div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
							<time dateTime={date}>
								{formatDate(date, siteMetadata.locale)}
							</time>
							{readingTime && (
								<>
									<span>•</span>
									<span>{readingTime.text}</span>
								</>
							)}
						</div>
					</div>
				</Card>

				<Card
					as="section"
					padded
					className="prose dark:prose-invert max-w-none"
				>
					{children}
				</Card>

				{siteMetadata.comments ? (
					<Card padded>
						<Comments slug={slug} />
					</Card>
				) : null}

				{(prev || next) && (
					<Card padded>
						<div className="flex flex-wrap items-stretch justify-between gap-4">
							{prev ? (
								<Link href={`/${prev.path}`} className="group flex flex-col">
									<span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
										← Previous
									</span>
									<span className="font-sans text-base font-semibold text-foreground transition-colors group-hover:text-primary">
										{prev.title}
									</span>
								</Link>
							) : (
								<span />
							)}
							{next ? (
								<Link
									href={`/${next.path}`}
									className="group flex flex-col items-end text-right"
								>
									<span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
										Next →
									</span>
									<span className="font-sans text-base font-semibold text-foreground transition-colors group-hover:text-primary">
										{next.title}
									</span>
								</Link>
							) : (
								<span />
							)}
						</div>
					</Card>
				)}

				<div className="pt-2">
					<Link
						href={`/${basePath}`}
						className="font-mono text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
					>
						← Back to the blog
					</Link>
				</div>
			</article>
		</SectionContainer>
	);
}
