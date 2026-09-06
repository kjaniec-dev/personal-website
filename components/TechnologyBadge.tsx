import { Badge } from "@/components/ClientUI";

export default function TechnologyBadge({ children }: { children: string }) {
	return (
		<Badge
			variant="secondary"
			className="max-w-full break-words rounded-md py-1 font-mono text-[11px] font-normal leading-relaxed"
		>
			{children}
		</Badge>
	);
}
