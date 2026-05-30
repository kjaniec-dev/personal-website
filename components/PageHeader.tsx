import type { ReactNode } from "react";
import { PageHeader as UIPageHeader } from "@/components/ClientUI";

type PageHeaderProps = {
	eyebrow?: string;
	title: string;
	description?: string;
	actions?: ReactNode;
};

export default function PageHeader({
	eyebrow,
	title,
	description,
	actions,
}: PageHeaderProps) {
	return (
		<UIPageHeader
			eyebrow={eyebrow}
			title={title}
			description={description}
			actions={actions}
		/>
	);
}
