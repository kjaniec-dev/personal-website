import { buttonVariants, cn, PageHeader } from "@/components/ClientUI";
import Link from "@/components/Link";

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
				className={cn(
					buttonVariants({ variant: "primary", size: "lg" }),
					"rounded-kj-lg shadow-kj-glow",
				)}
			>
				← Back to home
			</Link>
		</div>
	);
}
