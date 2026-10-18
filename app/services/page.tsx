import { genPageMetadata } from "app/seo";
import ContactCTA from "@/components/ContactCTA";
import PortfolioPageHeader from "@/components/PortfolioPageHeader";
import Services from "@/components/Services";
import { buildServicesBreadcrumbs } from "@/data/servicesData";
import siteMetadata from "@/data/siteMetadata";

const description =
	"Full-stack development, system architecture, cloud & DevOps, technical audits and AI process automation: what I offer and how I work.";

export const metadata = genPageMetadata({
	title: "Services",
	description,
});

export default function ServicesPage() {
	return (
		<>
			<script
				type="application/ld+json"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: JSON.stringify of a plain object built from our own data
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(
						buildServicesBreadcrumbs(siteMetadata.siteUrl),
					),
				}}
			/>
			<div className="pt-12 pb-8 font-sans sm:pt-16">
				<PortfolioPageHeader
					eyebrow="What I do"
					title="Services"
					description={description}
				/>
				<Services email={siteMetadata.email} standalone />
				<ContactCTA
					headingId="services-cta-heading"
					title="Not sure which one fits?"
					description="Tell me what you're working on and I'll point you to the right starting point."
					email={siteMetadata.email}
				/>
			</div>
		</>
	);
}
