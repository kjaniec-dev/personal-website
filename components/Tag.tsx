import { Badge } from "@/components/ClientUI";

type TagProps = {
	text: string;
};

export default function Tag({ text }: TagProps) {
	return <Badge variant="neutral">#{text}</Badge>;
}
