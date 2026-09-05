"use client";

import { type Action, KBarProvider, useKBar } from "kbar";
import { useRouter } from "next/navigation";
import { type ReactNode, useEffect, useMemo, useState } from "react";
import SearchDialog from "@/components/SearchDialog";
import headerNavLinks from "@/data/headerNavLinks";
import siteMetadata from "@/data/siteMetadata";

export const useSearch = () => {
	const { query } = useKBar();
	return { toggleSearch: () => query?.toggle() };
};

interface SearchDocument {
	title: string;
	summary?: string;
	tags?: string[];
	path: string;
	type: "blog" | "project";
}

interface SearchProviderProps {
	children: ReactNode;
}

export const SearchProvider = ({ children }: SearchProviderProps) => {
	const router = useRouter();
	const [documents, setDocuments] = useState<SearchDocument[]>([]);
	const [status, setStatus] = useState<"loading" | "ready" | "error">(
		"loading",
	);

	useEffect(() => {
		const searchPath =
			siteMetadata.search?.provider === "kbar"
				? siteMetadata.search.kbarConfig.searchDocumentsPath
				: "/search.json";
		const controller = new AbortController();
		async function loadDocuments() {
			if (!searchPath) {
				setStatus("ready");
				return;
			}
			try {
				const response = await fetch(searchPath, { signal: controller.signal });
				if (!response.ok) throw new Error("Search index unavailable");
				const json: SearchDocument[] = await response.json();
				if (!Array.isArray(json)) throw new Error("Invalid search index");
				if (!controller.signal.aborted) {
					setDocuments(json);
					setStatus("ready");
				}
			} catch {
				if (!controller.signal.aborted) setStatus("error");
			}
		}
		void loadDocuments();
		return () => controller.abort();
	}, []);

	const actions = useMemo<Action[]>(
		() => [
			...headerNavLinks.map(({ href, title }) => ({
				id: `page:${href}`,
				name: title,
				shortcut: [title[0].toLowerCase()],
				section: "Navigation",
				perform: () => router.push(href),
			})),
			{
				id: "page:/tags",
				name: "Browse all tags",
				keywords: "tags topics categories",
				shortcut: ["t"],
				section: "Blog",
				perform: () => router.push("/tags"),
			},
			...documents.map((doc) => ({
				id: doc.path,
				name: doc.title,
				keywords: [doc.summary, ...(doc.tags ?? [])].filter(Boolean).join(" "),
				section: doc.type === "blog" ? "Articles" : "Projects",
				subtitle: doc.tags?.join(" · "),
				perform: () => {
					if (doc.type === "blog") router.push(`/${doc.path}`);
					else window.location.assign(doc.path);
				},
			})),
		],
		[documents, router],
	);

	return (
		<KBarProvider>
			<SearchDialog actions={actions} status={status} />
			{children}
		</KBarProvider>
	);
};
