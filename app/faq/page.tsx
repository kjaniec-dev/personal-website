import { genPageMetadata } from "app/seo";
import FAQAccordion from "@/components/FAQAccordion";
import Link from "@/components/Link";
import faqData from "@/data/faqData";
import siteMetadata from "@/data/siteMetadata";

export const metadata = genPageMetadata({ title: "FAQ" });

const categories: {
	id: "technical" | "work" | "personal" | "contact";
	title: string;
}[] = [
	{ id: "work", title: "Work & Experience" },
	{ id: "contact", title: "Contact & Process" },
	{ id: "technical", title: "Technical Preferences" },
	{ id: "personal", title: "Personal" },
];

export default function FAQ() {
	return (
		<div className="pt-12 pb-8 font-sans sm:pt-16">
			<header className="pb-10 sm:pb-14">
				<p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-primary">
					Good to know
				</p>
				<div className="grid gap-6 md:grid-cols-2 md:items-end md:gap-10">
					<h1 className="text-5xl font-medium leading-none tracking-tight text-foreground sm:text-6xl xl:text-7xl">
						FAQ<span className="text-primary">.</span>
					</h1>
					<p className="max-w-lg text-base leading-relaxed text-muted-foreground">
						Common questions about how I work, my preferences, and how to get in
						touch.
					</p>
				</div>
			</header>

			<div className="divide-y divide-border border-t border-border">
				{categories.map((cat, index) => (
					<section
						key={cat.id}
						aria-labelledby={`faq-${cat.id}-heading`}
						className="grid gap-5 py-8 sm:py-10 md:grid-cols-[220px_minmax(0,1fr)] md:gap-10 lg:gap-16"
					>
						<div>
							<p
								aria-hidden="true"
								className="mb-3 font-mono text-xs text-primary"
							>
								{String(index + 1).padStart(2, "0")}
							</p>
							<h2
								id={`faq-${cat.id}-heading`}
								className="text-2xl font-medium tracking-tight text-foreground"
							>
								{cat.title}
							</h2>
						</div>
						<FAQAccordion items={faqData} category={cat.id} />
					</section>
				))}
			</div>

			{siteMetadata.email && (
				<section
					aria-labelledby="faq-contact-heading"
					className="mt-4 flex flex-col items-start justify-between gap-6 rounded-2xl border border-border bg-surface p-6 sm:flex-row sm:items-center sm:p-8"
				>
					<div className="space-y-2">
						<h2
							id="faq-contact-heading"
							className="text-2xl font-medium tracking-tight text-foreground"
						>
							Still have questions?
						</h2>
						<p className="text-sm leading-relaxed text-muted-foreground">
							Get in touch to talk about your project or working together.
						</p>
					</div>
					<Link
						href={`mailto:${siteMetadata.email}`}
						target="_self"
						className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
					>
						Let's talk <span aria-hidden="true">↗</span>
					</Link>
				</section>
			)}
		</div>
	);
}
