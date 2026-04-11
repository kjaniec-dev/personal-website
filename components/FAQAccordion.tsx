"use client";

import { useState } from "react";
import type { FAQItem } from "@/data/faqData";

interface FAQAccordionProps {
	items: FAQItem[];
	category: string;
}

const FAQAccordion = ({ items, category }: FAQAccordionProps) => {
	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const filteredItems = items.filter((item) => item.category === category);

	const toggleAccordion = (index: number) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<div className="space-y-3">
			{filteredItems.map((item) => (
				<div
					key={item.question}
					className="hover-lift group overflow-hidden rounded-xl border border-gray-200/60 bg-white/80 shadow-sm backdrop-blur-sm transition-all hover:shadow-md dark:border-gray-700/60 dark:bg-gray-900/80"
				>
					<button
						type="button"
						onClick={() => toggleAccordion(filteredItems.indexOf(item))}
						className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
						aria-expanded={openIndex === filteredItems.indexOf(item)}
					>
						<span className="pr-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
							{item.question}
						</span>
						<span
							className={`text-primary-500 dark:text-primary-400 flex-shrink-0 transition-transform duration-300 ${
								openIndex === filteredItems.indexOf(item) ? "rotate-180" : ""
							}`}
						>
							<svg
								title="Chevron icon"
								className="h-5 w-5"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<title>Chevron icon</title>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M19 9l-7 7-7-7"
								/>
							</svg>
						</span>
					</button>
					<div
						className={`overflow-hidden transition-all duration-300 ease-in-out ${
							openIndex === filteredItems.indexOf(item)
								? "max-h-96 opacity-100"
								: "max-h-0 opacity-0"
						}`}
					>
						<div className="border-t border-gray-200/60 px-6 py-4 dark:border-gray-700/60">
							<p className="leading-relaxed text-gray-600 dark:text-gray-400">
								{item.answer}
							</p>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default FAQAccordion;
