import ContactLink from "@/components/ContactLink";
import CopyEmailButton from "@/components/CopyEmailButton";

interface ContactCTAProps {
	headingId: string;
	title: string;
	description: string;
	email?: string;
	className?: string;
}

export default function ContactCTA({
	headingId,
	title,
	description,
	email,
	className = "",
}: ContactCTAProps) {
	if (!email) return null;

	return (
		<section
			aria-labelledby={headingId}
			className={`flex flex-col items-start justify-between gap-6 rounded-2xl border border-border bg-surface p-6 sm:flex-row sm:items-center sm:p-8 ${className}`}
		>
			<div className="min-w-0 space-y-2">
				<h2
					id={headingId}
					className="text-2xl font-medium tracking-tight text-foreground"
				>
					{title}
				</h2>
				<p className="text-sm leading-relaxed text-muted-foreground">
					{description}
				</p>
			</div>
			<div className="flex shrink-0 flex-wrap items-center gap-3 sm:flex-nowrap">
				<ContactLink email={email} />
				<CopyEmailButton
					email={email}
					size="lg"
					className="min-h-12 shrink-0 rounded-full px-5 text-sm"
				/>
			</div>
		</section>
	);
}
