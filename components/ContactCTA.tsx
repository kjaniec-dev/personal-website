import type { ReactNode } from "react";
import ButtonLink from "@/components/ButtonLink";
import ContactLink from "@/components/ContactLink";
import CopyEmailButton from "@/components/CopyEmailButton";

interface ContactCTAProps {
	headingId: string;
	title: ReactNode;
	description: string;
	email?: string;
	eyebrow?: string;
	buttonText?: string;
	linkedinHref?: string;
	variant?: "card" | "large";
	className?: string;
}

export default function ContactCTA({
	headingId,
	title,
	description,
	email,
	eyebrow,
	buttonText,
	linkedinHref,
	variant = "card",
	className = "",
}: ContactCTAProps) {
	if (!email) return null;

	if (variant === "large") {
		return (
			<section
				aria-labelledby={headingId}
				className={`my-16 grid gap-8 border-t border-border pt-12 sm:pt-16 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16 ${className}`}
			>
				<div className="min-w-0 space-y-5">
					{eyebrow && (
						<p className="font-mono text-xs font-bold tracking-[0.2em] text-primary uppercase">
							{eyebrow}
						</p>
					)}
					<h2
						id={headingId}
						className="text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.08] font-medium tracking-[-0.05em] text-foreground"
					>
						{title}
					</h2>
					<p className="max-w-xl text-base leading-relaxed text-muted-foreground">
						{description}
					</p>
				</div>

				<div className="flex flex-wrap items-center gap-3 sm:gap-4">
					<ButtonLink
						href={`mailto:${email}`}
						target="_self"
						variant="primary"
						size="lg"
						className="group min-h-12 gap-5 rounded-kj-lg shadow-kj-glow"
					>
						{buttonText || "Say hello"}
						<svg
							aria-hidden="true"
							className="h-4 w-4 motion-safe:transition-transform motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth={1.75}
							strokeLinecap="round"
							strokeLinejoin="round"
						>
							<path d="M7 17 17 7M7 7h10v10" />
						</svg>
					</ButtonLink>

					<CopyEmailButton
						email={email}
						size="lg"
						className="min-h-12 rounded-kj-lg px-5"
					/>

					{linkedinHref && (
						<ButtonLink
							href={linkedinHref}
							variant="ghost"
							size="lg"
							className="min-h-12 gap-3 rounded-kj-sm text-foreground hover:text-primary"
						>
							<svg
								aria-hidden="true"
								className="h-4 w-4"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
							</svg>
							LinkedIn
						</ButtonLink>
					)}
				</div>
			</section>
		);
	}

	return (
		<section
			aria-labelledby={headingId}
			className={`flex flex-col items-start justify-between gap-6 rounded-2xl border border-border bg-surface p-6 sm:flex-row sm:items-center sm:p-8 ${className}`}
		>
			<div className="min-w-0 space-y-2">
				{eyebrow && (
					<p className="font-mono text-xs font-bold tracking-[0.2em] text-primary uppercase">
						{eyebrow}
					</p>
				)}
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
