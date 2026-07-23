"use client";

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ClientUI";
import type { FAQItem } from "@/data/faqData";

interface FAQAccordionProps {
	items: FAQItem[];
	category: FAQItem["category"];
}

export default function FAQAccordion({ items, category }: FAQAccordionProps) {
	const filtered = items.filter((i) => i.category === category);

	if (filtered.length === 0) return null;

	return (
		<Accordion
			type="single"
			className="border-none bg-transparent rounded-none space-y-3"
		>
			{filtered.map((item, index) => {
				const uniqueVal = `${category}-${index}`;
				return (
					<AccordionItem
						key={item.question}
						value={uniqueVal}
						className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm transition-all"
					>
						<AccordionTrigger className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left font-sans text-base font-semibold text-foreground sm:text-lg hover:bg-subtle/50">
							{item.question}
						</AccordionTrigger>
						<AccordionContent className="border-t border-border px-6 py-4 text-sm leading-relaxed text-muted-foreground">
							{item.answer}
						</AccordionContent>
					</AccordionItem>
				);
			})}
		</Accordion>
	);
}
