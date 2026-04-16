import type { ReactNode } from "react";
import SectionContainer from "@/components/SectionContainer";

interface Props {
	children: ReactNode;
	title: string;
}

export default function SectionLayout({ children, title }: Props) {
	const slug = title.toLowerCase().replace(/\s+/g, "-");
	return (
		<div className="my-16">
			<div className="mb-8 space-y-2">
				<div className="section-divider">
					<span className="text-primary-500">{"//"}</span>
					<span>{slug}.md</span>
				</div>
				<h2 className="font-mono text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
					<span className="text-primary-500">$</span> cat {slug}.md
				</h2>
			</div>
			<SectionContainer>{children}</SectionContainer>
		</div>
	);
}
