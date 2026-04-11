import type { Metadata } from "next";
import siteMetadata from "@/data/siteMetadata";

interface PageSEOProps {
	title: string;
	description?: string;
	image?: string;
	// biome-ignore lint/suspicious/noExplicitAny: Metadata and its nested properties are complex, [key: string]: any is standard for rest props in SEO functions
	[key: string]: any;
}

export function genPageMetadata({
	title,
	description,
	image,
	...rest
}: PageSEOProps): Metadata {
	return {
		title,
		description: description || siteMetadata.description,
		openGraph: {
			title: `${title} | ${siteMetadata.title}`,
			description: description || siteMetadata.description,
			url: "./",
			siteName: siteMetadata.title,
			images: image ? [image] : [siteMetadata.socialBanner],
			locale: "en_US",
			type: "website",
		},
		twitter: {
			title: `${title} | ${siteMetadata.title}`,
			card: "summary_large_image",
			images: image ? [image] : [siteMetadata.socialBanner],
		},
		...rest,
	};
}
