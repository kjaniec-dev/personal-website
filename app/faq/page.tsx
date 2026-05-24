import { genPageMetadata } from "app/seo";
import FAQAccordion from "@/components/FAQAccordion";
import PageHeader from "@/components/PageHeader";
import faqData from "@/data/faqData";

export const metadata = genPageMetadata({ title: "FAQ" });

const categories: {
	id: "technical" | "work" | "personal" | "contact";
	title: string;
}[] = [
	{ id: "technical", title: "Technical Preferences" },
	{ id: "work", title: "Work & Experience" },
	{ id: "personal", title: "Personal" },
	{ id: "contact", title: "Contact & Process" },
];

export default function FAQ() {
	return (
		<div className="space-y-10 pb-16">
			<PageHeader
				eyebrow="FAQ"
				title="Frequently asked questions"
				description="Common questions about how I work, my preferences, and how to get in touch."
			/>

			{categories.map((cat) => (
				<section key={cat.id} className="space-y-4">
					<h2 className="font-sans text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
						{cat.title}
					</h2>
					<FAQAccordion items={faqData} category={cat.id} />
				</section>
			))}
		</div>
	);
}
