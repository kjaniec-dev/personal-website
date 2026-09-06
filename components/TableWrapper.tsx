"use client";

import { Table, TableWrap } from "@/components/ClientUI";

interface TableWrapperProps {
	children: React.ReactNode;
}

export default function TableWrapper({ children }: TableWrapperProps) {
	return (
		<TableWrap
			className="my-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
			role="region"
			aria-label="Scrollable table"
			tabIndex={0}
		>
			<Table>{children}</Table>
		</TableWrap>
	);
}
