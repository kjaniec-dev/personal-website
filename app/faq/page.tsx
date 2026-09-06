import { genPageMetadata } from "app/seo";
import ContactCTA from "@/components/ContactCTA";
import FAQAccordion from "@/components/FAQAccordion";
import PortfolioPageHeader from "@/components/PortfolioPageHeader";
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
			<PortfolioPageHeader
				eyebrow="Good to know"
				title="FAQ"
				description="Common questions about how I work, my preferences, and how to get in touch."
			/>

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

			<ContactCTA
				headingId="faq-contact-heading"
				title="Still have questions?"
				description="Get in touch to talk about your project or working together."
				email={siteMetadata.email}
				className="mt-4"
			/>
		</div>
	);
}
