import tagData from "app/tag-data.json";
import { allBlogs } from "contentlayer/generated";
import { slug } from "github-slugger";
import type { MetadataRoute } from "next";
import siteMetadata from "@/data/siteMetadata";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
	const siteUrl = siteMetadata.siteUrl;
	const publishedBlogs = allBlogs.filter((post) => !post.draft);

	const blogRoutes = publishedBlogs.map((post) => ({
		url: `${siteUrl}/${post.path}`,
		lastModified: post.lastmod || post.date,
	}));

	const blogDates = publishedBlogs
		.map((post) => post.lastmod || post.date)
		.filter(Boolean) as string[];
	const latestPostDate =
		[...blogDates].sort().reverse()[0] ||
		new Date().toISOString().split("T")[0];

	const staticRoutes = ["", "about", "projects", "blog", "faq", "tags"].map(
		(route) => ({
			url: `${siteUrl}/${route}`,
			lastModified: latestPostDate,
		}),
	);

	const tagCounts = tagData as Record<string, number>;
	const tagRoutes = Object.keys(tagCounts).map((tag) => {
		const matchingBlogs = publishedBlogs.filter((post) =>
			post.tags?.map((t) => slug(t)).includes(tag),
		);
		const lastModified =
			matchingBlogs
				.map((post) => post.lastmod || post.date)
				.filter(Boolean)
				.sort()
				.reverse()[0] || latestPostDate;

		return {
			url: `${siteUrl}/tags/${encodeURI(tag)}`,
			lastModified,
		};
	});

	return [...staticRoutes, ...tagRoutes, ...blogRoutes];
}
