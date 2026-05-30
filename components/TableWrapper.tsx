"use client";

import { Table, TableWrap } from "@/components/ClientUI";

interface TableWrapperProps {
	children: React.ReactNode;
}

export default function TableWrapper({ children }: TableWrapperProps) {
	return (
		<TableWrap className="my-6 w-full overflow-x-auto">
			<Table>{children}</Table>
		</TableWrap>
	);
}
