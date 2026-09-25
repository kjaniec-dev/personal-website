import { genPageMetadata } from "app/seo";
import { allBlogs } from "contentlayer/generated";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allCoreContent, sortPosts } from "pliny/utils/contentlayer";
import ListLayout from "@/layouts/ListLayoutWithTags";

const POSTS_PER_PAGE = 6;

export async function generateMetadata(props: {
	params: Promise<{ page: string }>;
}): Promise<Metadata> {
	const params = await props.params;
	return genPageMetadata({
		title: `Blog - Page ${params.page}`,
		description:
			"Notes on building software. Practical guides, tools I use, and lessons from projects along the way.",
	});
}

export const generateStaticParams = async () => {
	const totalPages = Math.ceil(allBlogs.length / POSTS_PER_PAGE);
	const paths = Array.from({ length: totalPages }, (_, i) => ({
		page: (i + 1).toString(),
	}));

	return paths;
};

export default async function Page(props: {
	params: Promise<{ page: string }>;
}) {
	const params = await props.params;
	const posts = allCoreContent(sortPosts(allBlogs));
	const pageNumber = parseInt(params.page as string, 10);
	const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

	// Return 404 for invalid page numbers or empty pages
	if (pageNumber <= 0 || pageNumber > totalPages || Number.isNaN(pageNumber)) {
		return notFound();
	}
	const initialDisplayPosts = posts.slice(
		POSTS_PER_PAGE * (pageNumber - 1),
		POSTS_PER_PAGE * pageNumber,
	);
	const pagination = {
		currentPage: pageNumber,
		totalPages: totalPages,
	};

	return (
		<ListLayout
			posts={posts}
			initialDisplayPosts={initialDisplayPosts}
			pagination={pagination}
			title="All Posts"
		/>
	);
}
