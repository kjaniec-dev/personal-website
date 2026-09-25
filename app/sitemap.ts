import tagData from "app/tag-data.json";
import { allBlogs } from "contentlayer/generated";
import type { MetadataRoute } from "next";
import siteMetadata from "@/data/siteMetadata";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
	const siteUrl = siteMetadata.siteUrl;
	const today = new Date().toISOString().split("T")[0];

	const blogRoutes = allBlogs
		.filter((post) => !post.draft)
		.map((post) => ({
			url: `${siteUrl}/${post.path}`,
			lastModified: post.lastmod || post.date,
		}));

	const routes = ["", "blog", "projects", "about", "faq", "tags"].map(
		(route) => ({
			url: `${siteUrl}/${route}`,
			lastModified: today,
		}),
	);

	const tagRoutes = Object.keys(tagData).map((tag) => ({
		url: `${siteUrl}/tags/${tag}`,
		lastModified: today,
	}));

	return [...routes, ...blogRoutes, ...tagRoutes];
}
