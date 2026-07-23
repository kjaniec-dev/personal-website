import type { ReactNode } from "react";
import { Badge } from "@/components/ClientUI";

type PillProps = {
	children: ReactNode;
	tone?: "primary" | "secondary" | "success" | "muted";
	className?: string;
};

const toneToVariantMap: Record<
	NonNullable<PillProps["tone"]>,
	"primary" | "secondary" | "success" | "neutral"
> = {
	primary: "primary",
	secondary: "secondary",
	success: "success",
	muted: "neutral",
};

export default function Pill({
	children,
	tone = "primary",
	className = "",
}: PillProps) {
	return (
		<Badge variant={toneToVariantMap[tone]} className={className}>
			{children}
		</Badge>
	);
}
