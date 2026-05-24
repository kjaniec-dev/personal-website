import { slug } from "github-slugger";
import Link from "next/link";

interface Props {
	text: string;
}

const Tag = ({ text }: Props) => {
	return (
		<Link
			href={`/tags/${slug(text)}`}
			className="inline-flex items-center rounded-full border border-secondary/30 bg-secondary/10 px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-secondary transition-colors hover:bg-secondary/20"
		>
			#{text.split(" ").join("-")}
		</Link>
	);
};

export default Tag;
