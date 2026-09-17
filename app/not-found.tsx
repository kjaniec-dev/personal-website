import ButtonLink from "@/components/ButtonLink";
import { PageHeader } from "@/components/ClientUI";

export default function NotFound() {
	return (
		<div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
			<PageHeader
				eyebrow="404"
				title="Page not found"
				description="The page you're looking for doesn't exist or has been moved."
			/>
			<ButtonLink
				href="/"
				variant="primary"
				size="lg"
				className="rounded-kj-lg shadow-kj-glow"
			>
				← Back to home
			</ButtonLink>
		</div>
	);
}
