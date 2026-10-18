import { genPageMetadata } from "app/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServicePage from "@/components/ServicePage";
import { getPublishedServices, getServiceBySlug } from "@/data/servicesData";
import siteMetadata from "@/data/siteMetadata";

export const dynamicParams = false;

export function generateStaticParams() {
	return getPublishedServices().map((service) => ({ slug: service.slug }));
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

	return <ServicePage service={service} email={siteMetadata.email} />;
}
