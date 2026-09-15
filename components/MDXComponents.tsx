import type { MDXComponents } from "mdx/types";
import Pre from "pliny/ui/Pre";
import TOCInline from "pliny/ui/TOCInline";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
	TableWrap,
} from "@/components/ClientUI";
import Image from "./Image";
import CustomLink from "./Link";

function TableWrapper({ children }: { children: React.ReactNode }) {
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

export const components: MDXComponents = {
	Image,
	TOCInline,
	a: CustomLink,
	pre: Pre,
	table: TableWrapper,
	thead: TableHeader,
	tbody: TableBody,
	tr: TableRow,
	th: TableHead,
	td: TableCell,
	img: Image,
};
