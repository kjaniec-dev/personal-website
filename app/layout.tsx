import "css/tailwind.css";
import "css/prism.css";
import "remark-github-blockquote-alert/alert.css";

import type { Metadata } from "next";
import { Fraunces, JetBrains_Mono, Newsreader } from "next/font/google";
import type { AnalyticsConfig } from "pliny/analytics";
import type { SearchConfig } from "pliny/search";
import AnalyticsWrapper from "@/components/AnalyticsWrapper";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SearchProviderWrapper from "@/components/SearchProviderWrapper";
import SectionContainer from "@/components/SectionContainer";
import WebVitalsReporter from "@/components/WebVitals";
import siteMetadata from "@/data/siteMetadata";
import { ThemeProviders } from "./theme-providers";

const fraunces = Fraunces({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-fraunces",
	axes: ["opsz", "SOFT"],
	style: ["normal", "italic"],
	preload: true,
	fallback: ["Georgia", "serif"],
});

const newsreader = Newsreader({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-newsreader",
	style: ["normal", "italic"],
	preload: true,
	fallback: ["Georgia", "serif"],
});

const jetbrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	display: "swap",
	variable: "--font-jetbrains",
	preload: false,
	fallback: ["ui-monospace", "monospace"],
});

export const metadata: Metadata = {
	metadataBase: new URL(siteMetadata.siteUrl),
	title: {
		default: siteMetadata.title,
		template: `%s | ${siteMetadata.title}`,
	},
	description: siteMetadata.description,
	openGraph: {
		title: siteMetadata.title,
		description: siteMetadata.description,
		url: "./",
		siteName: siteMetadata.title,
		images: [
			{
				url: siteMetadata.socialBanner,
				width: 1200,
				height: 630,
				alt: siteMetadata.title,
			},
		],
		locale: "en_US",
		type: "website",
	},
	alternates: {
		canonical: "./",
		types: {
			"application/rss+xml": `${siteMetadata.siteUrl}/feed.xml`,
		},
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	twitter: {
		title: siteMetadata.title,
		card: "summary_large_image",
		images: [siteMetadata.socialBanner],
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const basePath = process.env.BASE_PATH || "";

	return (
		<html
			lang={siteMetadata.language}
			className={`${fraunces.variable} ${newsreader.variable} ${jetbrainsMono.variable} scroll-smooth`}
			data-scroll-behavior="smooth"
			suppressHydrationWarning
		>
			<link
				rel="apple-touch-icon"
				sizes="76x76"
				href={`${basePath}/static/favicons/apple-touch-icon.png`}
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="32x32"
				href={`${basePath}/static/favicons/favicon-32x32.png`}
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="16x16"
				href={`${basePath}/static/favicons/favicon-16x16.png`}
			/>
			<link
				rel="manifest"
				href={`${basePath}/static/favicons/site.webmanifest`}
			/>
			<link
				rel="mask-icon"
				href={`${basePath}/static/favicons/safari-pinned-tab.svg`}
				color="#D63A1E"
			/>
			<meta name="msapplication-TileColor" content="#14110F" />
			<meta
				name="theme-color"
				media="(prefers-color-scheme: light)"
				content="#F4EFE4"
			/>
			<meta
				name="theme-color"
				media="(prefers-color-scheme: dark)"
				content="#14110F"
			/>
			<link
				rel="alternate"
				type="application/rss+xml"
				href={`${basePath}/feed.xml`}
			/>
			<meta
				name="viewport"
				content="width=device-width, initial-scale=1, viewport-fit=cover"
			/>
			<meta httpEquiv="x-ua-compatible" content="ie=edge" />
			<body className="bg-paper text-ink dark:bg-gray-950 dark:text-paper relative min-h-screen pl-[calc(100vw-100%)] font-sans antialiased">
				<a
					href="#main-content"
					className="bg-vermilion text-paper absolute top-0 left-0 z-50 -translate-y-full transform px-4 py-3 text-sm font-medium tracking-wide transition-transform duration-200 focus:translate-y-0"
				>
					Skip to main content
				</a>

				<ThemeProviders>
					<AnalyticsWrapper
						analyticsConfig={siteMetadata.analytics as AnalyticsConfig}
					/>
					<WebVitalsReporter />
					<SectionContainer>
						<SearchProviderWrapper
							searchConfig={siteMetadata.search as SearchConfig}
						>
							<Header />
							<main id="main-content" className="relative z-10 mb-auto">
								{children}
							</main>
						</SearchProviderWrapper>
						<Footer />
					</SectionContainer>
				</ThemeProviders>
			</body>
		</html>
	);
}
