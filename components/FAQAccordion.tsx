"use client";

import { useState } from "react";
import type { FAQItem } from "@/data/faqData";

interface FAQAccordionProps {
	items: FAQItem[];
	category: FAQItem["category"];
}

export default function FAQAccordion({ items, category }: FAQAccordionProps) {
	const filtered = items.filter((i) => i.category === category);
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	if (filtered.length === 0) return null;

	return (
		<div className="space-y-3">
			{filtered.map((item, index) => {
				const open = openIndex === index;
				return (
					<div
						key={item.question}
						className="overflow-hidden rounded-kj-2xl border border-border bg-card shadow-kj-sm transition-shadow hover:shadow-kj-md"
					>
						<button
							type="button"
							onClick={() => setOpenIndex(open ? null : index)}
							aria-expanded={open}
							className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left transition-colors hover:bg-muted/50"
						>
							<span className="font-sans text-base font-semibold text-foreground sm:text-lg">
								{item.question}
							</span>
							<svg
								className={`h-5 w-5 flex-shrink-0 text-primary transition-transform duration-300 ${open ? "rotate-180" : ""}`}
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								aria-hidden="true"
							>
								<title>Toggle answer</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2.5}
									d="M19 9l-7 7-7-7"
								/>
							</svg>
						</button>
						{open ? (
							<div className="border-t border-border px-6 py-4 text-sm leading-relaxed text-muted-foreground">
								{item.answer}
							</div>
						) : null}
					</div>
				);
			})}
		</div>
	);
}
