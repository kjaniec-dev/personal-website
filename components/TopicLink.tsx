import { slug } from "github-slugger";
import Link from "@/components/Link";

export default function TopicLink({ tag }: { tag: string }) {
	return (
		<Link
			href={`/tags/${slug(tag)}`}
			className="inline-flex min-h-11 max-w-full items-center break-words rounded-sm font-mono text-xs text-secondary transition-colors hover:text-secondary-hover hover:underline hover:underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
		>
			#{tag}
		</Link>
	);
}
