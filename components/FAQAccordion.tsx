"use client";

import { useId } from "react";
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
	const id = useId();
	const filtered = items.filter((i) => i.category === category);

	if (filtered.length === 0) return null;

	return (
		<Accordion
			type="single"
			data-faq-accordion=""
			className="min-w-0 self-start rounded-none border-0 border-b border-border bg-transparent overflow-visible motion-reduce:[&_*]:transition-none"
		>
			{filtered.map((item, index) => {
				const uniqueVal = `${category}-${index}`;
				const panelId = `${id}-${uniqueVal}`;
				return (
					<AccordionItem
						key={item.question}
						value={uniqueVal}
						className="border-t border-border first:border-t"
					>
						<AccordionTrigger
							aria-controls={panelId}
							className="min-h-14 bg-transparent px-3 py-4 text-left font-sans text-base font-medium leading-relaxed text-foreground hover:bg-subtle/50 aria-expanded:text-primary aria-expanded:[&>svg]:text-primary focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary sm:px-4"
						>
							{item.question}
						</AccordionTrigger>
						<AccordionContent
							id={panelId}
							className="px-3 pt-0 pb-5 text-sm leading-relaxed text-muted-foreground sm:px-4"
						>
							<p className="max-w-prose">{item.answer}</p>
						</AccordionContent>
					</AccordionItem>
				);
			})}
		</Accordion>
	);
}
