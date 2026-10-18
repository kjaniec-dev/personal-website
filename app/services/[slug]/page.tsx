import { genPageMetadata } from "app/seo";
import { allBlogs } from "contentlayer/generated";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allCoreContent, sortPosts } from "pliny/utils/contentlayer";
import ServicePage from "@/components/ServicePage";
import {
	buildServiceSchema,
	buildServicesBreadcrumbs,
	getPublishedServices,
	getRelatedPosts,
	getServiceBySlug,
} from "@/data/servicesData";
import siteMetadata from "@/data/siteMetadata";

export const dynamicParams = false;

// Static export rejects an empty list, so while every service is a draft we
// emit one placeholder param; the page 404s for it.
const NO_SERVICES_SLUG = "_";

export function generateStaticParams() {
	const params = getPublishedServices().map((service) => ({
		slug: service.slug,
	}));
	return params.length > 0 ? params : [{ slug: NO_SERVICES_SLUG }];
}

export async function generateMetadata(props: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata | undefined> {
	const { slug } = await props.params;
	const service = getServiceBySlug(slug);
	if (!service) return;

	return genPageMetadata({
		title: service.title,
		description: service.summary,
	});
}

export default async function Page(props: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await props.params;
	const service = getServiceBySlug(slug);
	if (!service) notFound();

	const posts = getRelatedPosts(
		service,
		allCoreContent(sortPosts(allBlogs.filter((post) => !post.draft))),
	).map((post) => ({
		title: post.title,
		path: post.path,
		date: post.date,
		summary: post.summary,
	}));

	return (
		<>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON.stringify of a plain object built from our own data
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(buildServiceSchema(service, siteMetadata)),
				}}
			/>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON.stringify of a plain object built from our own data
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(
						buildServicesBreadcrumbs(siteMetadata.siteUrl, service),
					),
				}}
			/>
			<ServicePage service={service} email={siteMetadata.email} posts={posts} />
		</>
	);
}
