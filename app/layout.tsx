import 'css/tailwind.css'
import 'css/prism.css'
import 'remark-github-blockquote-alert/alert.css'

import { Syne, Instrument_Sans } from 'next/font/google'
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

const syne = Syne({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-syne',
  preload: true,
  weight: ['600', '700'], // Only load weights actually used for display font
})

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-instrument',
  preload: true,
  weight: ['400', '600'], // Only load regular and semibold
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
      className={`${syne.variable} ${instrumentSans.variable} scroll-smooth`}
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
        color="#10b981"
      />
      {/* Resource hints for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <meta name="msapplication-TileColor" content="#0f172a" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#f8fafc" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0f172a" />
      <link rel="alternate" type="application/rss+xml" href={`${basePath}/feed.xml`} />
      {/* Performance optimizations */}
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      <body className="relative min-h-screen bg-gray-50 pl-[calc(100vw-100%)] font-sans text-gray-900 antialiased dark:bg-gray-950 dark:text-gray-50">
        {/* Skip to main content link for accessibility */}
        <a
          href="#main-content"
          className="bg-accent-500 absolute top-0 left-0 z-50 -translate-y-full transform rounded-lg px-6 py-3 font-semibold text-white shadow-lg transition-transform duration-200 focus:translate-y-0"
        >
          Skip to main content
        </a>

        {/* Simplified Background System - optimized for performance */}
        <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-100/50 to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950" />

          {/* Static gradient orbs - no animation for better performance */}
          <div className="bg-accent-400/10 dark:bg-accent-500/8 absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full blur-3xl" />
          <div className="bg-primary-400/8 dark:bg-primary-500/5 absolute top-1/3 -left-48 h-[400px] w-[400px] rounded-full blur-3xl" />

          {/* Subtle vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.02)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.08)_100%)]" />
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
