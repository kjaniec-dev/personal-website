import Link from "@/components/Link";
import PageHeader from "@/components/PageHeader";

export default function NotFound() {
	return (
		<div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
			<PageHeader
				eyebrow="404"
				title="Page not found"
				description="The page you're looking for doesn't exist or has been moved."
			/>
			<Link
				href="/"
				className="inline-flex items-center gap-2 rounded-kj-lg bg-primary px-6 py-3 font-sans text-sm font-semibold text-primary-foreground shadow-kj-glow transition-colors hover:bg-primary-hover"
			>
				← Back to home
			</Link>
		</div>
	);
}
