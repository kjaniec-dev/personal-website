import 'css/tailwind.css'
import 'remark-github-blockquote-alert/alert.css'

import { Space_Grotesk } from 'next/font/google'
import { AnalyticsConfig } from 'pliny/analytics'
import { SearchConfig } from 'pliny/search'
import Header from '@/components/Header'
import SectionContainer from '@/components/SectionContainer'
import Footer from '@/components/Footer'
import siteMetadata from '@/data/siteMetadata'
import { ThemeProviders } from './theme-providers'
import { Metadata } from 'next'
import SearchProviderWrapper from '@/components/SearchProviderWrapper'
import AnalyticsWrapper from '@/components/AnalyticsWrapper'
import WebVitalsReporter from '@/components/WebVitals'

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  preload: true,
  adjustFontFallback: true,
})

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
    url: './',
    siteName: siteMetadata.title,
    images: [
      {
        url: siteMetadata.socialBanner,
        width: 1200,
        height: 630,
        alt: siteMetadata.title,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const basePath = process.env.BASE_PATH || ''

  return (
    <html
      lang={siteMetadata.language}
      className={`${space_grotesk.variable} scroll-smooth`}
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
      <link rel="manifest" href={`${basePath}/static/favicons/site.webmanifest`} />
      <link
        rel="mask-icon"
        href={`${basePath}/static/favicons/safari-pinned-tab.svg`}
        color="#5bbad5"
      />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
      <link rel="alternate" type="application/rss+xml" href={`${basePath}/feed.xml`} />
      <body className="relative min-h-screen bg-white pl-[calc(100vw-100%)] text-black antialiased dark:bg-gray-950 dark:text-white">
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="bg-primary-500 absolute top-0 left-0 z-50 -translate-y-full transform px-4 py-3 text-white transition-transform duration-200 focus:translate-y-0"
        >
          Skip to main content
        </a>

        {/* Decorative background elements */}
        <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div className="bg-primary-500/5 dark:bg-primary-400/5 absolute -top-1/4 -right-1/4 h-96 w-96 rounded-full blur-3xl" />
          <div className="bg-accent-cyan/5 absolute top-1/2 -left-1/4 h-96 w-96 rounded-full blur-3xl" />
          <div className="bg-accent-pink/5 dark:bg-accent-pink/3 absolute right-1/3 -bottom-1/4 h-96 w-96 rounded-full blur-3xl" />
        </div>

        <ThemeProviders>
          <AnalyticsWrapper analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
          <WebVitalsReporter />
          <SectionContainer>
            <SearchProviderWrapper searchConfig={siteMetadata.search as SearchConfig}>
              <Header />
              <main id="main-content" className="mb-auto">
                {children}
              </main>
            </SearchProviderWrapper>
            <Footer />
          </SectionContainer>
        </ThemeProviders>
      </body>
    </html>
  )
}
