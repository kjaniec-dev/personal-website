import type { ReactNode } from "react";
import { Badge } from "@/components/ClientUI";

type PillTone = "default" | "primary" | "secondary" | "success" | "muted";

type PillProps = {
	tone?: PillTone;
	mono?: boolean;
	className?: string;
	children: ReactNode;
};

const variantMap: Record<
	PillTone,
	"neutral" | "primary" | "secondary" | "success" | "neutral"
> = {
	default: "neutral",
	primary: "primary",
	secondary: "secondary",
	success: "success",
	muted: "neutral",
};

export default function Pill({
	tone = "default",
	mono = true,
	className = "",
	children,
}: PillProps) {
	return (
		<Badge
			variant={variantMap[tone]}
			className={[
				"font-semibold leading-snug uppercase tracking-wider text-[10px] py-0.5 px-2.5",
				mono ? "font-mono" : "",
				className,
			]
				.filter(Boolean)
				.join(" ")}
		>
			{children}
		</Badge>
	);
}
