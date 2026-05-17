import { genPageMetadata } from "app/seo";
import Card from "@/components/Card";
import projectsData from "@/data/projectsData";

export const metadata = genPageMetadata({ title: "Projects" });

export default function Projects() {
	return (
		<div className="space-y-12">
			<div className="space-y-4">
				<div className="section-divider">
					<span className="text-primary-500">{"//"}</span>
					<span>projects/</span>
				</div>
				<h1 className="font-mono text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">
					<span className="text-primary-500">$</span> ls ./projects
				</h1>
				<p className="max-w-2xl font-mono text-sm leading-relaxed text-gray-600 dark:text-gray-400">
					<span className="text-gray-400"># </span>A collection of projects I've
					worked on. Each project represents different challenges and learning
					experiences.
				</p>
			</div>

			<div className="container">
				<div className="-m-4 flex flex-wrap">
					{projectsData.map((d) => (
						<Card
							key={d.title}
							title={d.title}
							description={d.description}
							imgSrc={d.imgSrc}
							href={d.href}
							repoHref={d.repoHref}
							tags={d.tags}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
