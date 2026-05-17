import { slug } from "github-slugger";
import Link from "next/link";

interface Props {
	text: string;
}

const Tag = ({ text }: Props) => {
	return (
		<Link
			href={`/tags/${slug(text)}`}
			className="hover:border-primary-500 hover:text-primary-600 dark:hover:border-primary-500 dark:hover:text-primary-400 inline-flex items-center rounded border border-gray-300 bg-gray-50 px-2 py-0.5 font-mono text-xs text-gray-700 transition-colors dark:border-gray-700 dark:bg-gray-900/40 dark:text-gray-300"
		>
			#{text.split(" ").join("-")}
		</Link>
	);
};

export default Tag;
