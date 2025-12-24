import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import NewsletterForm from 'pliny/ui/NewsletterForm'

const MAX_DISPLAY = 6

export default function Home({ posts }) {
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteMetadata.author,
    url: siteMetadata.siteUrl,
    sameAs: [siteMetadata.github, siteMetadata.linkedin].filter(Boolean),
    jobTitle: 'Software Engineer',
    description: siteMetadata.description,
    image: `${siteMetadata.siteUrl}${siteMetadata.siteLogo}`,
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteMetadata.title,
    url: siteMetadata.siteUrl,
    description: siteMetadata.description,
    author: {
      '@type': 'Person',
      name: siteMetadata.author,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteMetadata.siteUrl}/tags/{search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      {/* Hero Section - Professional & Modern */}
      <section className="relative overflow-hidden border-b border-gray-100 bg-white dark:border-gray-800 dark:bg-gray-950">
        {/* Subtle Background Gradient */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:64px_64px]" />
          <div className="from-primary-500/5 absolute top-0 left-0 h-full w-1/2 bg-gradient-to-br via-transparent to-transparent" />
          <div className="from-accent-cyan/5 absolute right-0 bottom-0 h-full w-1/2 bg-gradient-to-tl via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-4xl">
            {/* Main Content */}
            <div className="space-y-10">
              {/* Header */}
              <div className="space-y-8">
                <div
                  className="animate-fade-in border-primary-500/20 bg-primary-50/50 text-primary-700 dark:border-primary-500/30 dark:bg-primary-900/20 dark:text-primary-300 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium"
                  style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="bg-primary-500 absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
                    <span className="bg-primary-500 relative inline-flex h-2 w-2 rounded-full"></span>
                  </span>
                  Open to new opportunities
                </div>

                <div
                  className="animate-slide-up space-y-6"
                  style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
                >
                  <h1 className="text-5xl leading-tight font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl dark:text-white">
                    {siteMetadata.author}
                  </h1>
                  <p className="text-2xl leading-relaxed font-medium text-gray-600 dark:text-gray-400">
                    {siteMetadata.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div
                className="animate-fade-in flex flex-wrap items-center gap-4"
                style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
              >
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
                >
                  <span>About me</span>
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
                <Link
                  href="/projects"
                  className="group inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-transparent px-6 py-3 text-sm font-semibold text-gray-900 transition-all hover:border-gray-400 hover:bg-gray-50 dark:border-gray-700 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-900"
                >
                  <span>View projects</span>
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
                <Link
                  href="/blog"
                  className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                >
                  <span>Read blog</span>
                  <svg
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              </div>

              {/* Tech Stack */}
              <div
                className="animate-slide-up space-y-6 border-t border-gray-200 pt-10 dark:border-gray-800"
                style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
              >
                <h3 className="text-sm font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                  Technologies & Tools
                </h3>
                <div className="grid grid-cols-4 gap-4 sm:grid-cols-6 md:grid-cols-8">
                  {/* TypeScript */}
                  <div
                    className="group flex flex-col items-center gap-2 rounded-lg border border-gray-200 bg-gray-50/50 p-4 transition-all hover:border-gray-300 hover:bg-gray-100 hover:shadow-sm dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-gray-700 dark:hover:bg-gray-800"
                    title="TypeScript"
                  >
                    <svg className="h-8 w-8" viewBox="0 0 128 128" fill="none">
                      <rect width="128" height="128" rx="6" fill="#3178C6" />
                      <path
                        d="M22.67 47h33.544v8.412h-11.634v41.037H33.703V55.412H22.67V47zm64.217 0v41.037c0 2.898.104 5.242.309 7.034.206 1.793.618 3.483 1.235 5.072.617 1.588 1.543 2.898 2.781 3.93 1.237 1.03 2.885 1.544 4.944 1.544 1.647 0 3.19-.309 4.635-.927a11.04 11.04 0 003.827-2.781c1.03-1.237 1.854-2.781 2.472-4.635.617-1.854.926-4.017.926-6.49V47h10.877v41.346c0 4.12-.72 7.653-2.163 10.597-1.443 2.945-3.397 5.383-5.866 7.316-2.472 1.93-5.348 3.396-8.618 4.427-3.27 1.03-6.698 1.545-10.288 1.545-3.589 0-7.018-.515-10.288-1.545-3.27-1.03-6.146-2.497-8.618-4.427-2.469-1.933-4.424-4.371-5.866-7.316-1.443-2.944-2.164-6.477-2.164-10.597V47h10.877z"
                        fill="white"
                      />
                    </svg>
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      TypeScript
                    </span>
                  </div>

                  {/* React */}
                  <div
                    className="group flex flex-col items-center gap-2 rounded-lg border border-gray-200 bg-gray-50/50 p-4 transition-all hover:border-gray-300 hover:bg-gray-100 hover:shadow-sm dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-gray-700 dark:hover:bg-gray-800"
                    title="React"
                  >
                    <svg className="h-8 w-8" viewBox="0 0 128 128">
                      <g fill="#61DAFB">
                        <circle cx="64" cy="64" r="11.4" />
                        <path d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9 9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8zM92.5 14.7c4.1 2.4 5.5 9.8 3.8 20.3-.3 2.1-.8 4.3-1.4 6.6-5.2-1.2-10.7-2-16.5-2.5-3.4-4.8-6.9-9.1-10.4-13 7.4-7.3 14.9-12.3 21-12.3 1.3 0 2.5.3 3.5.9zM81.3 74c-1.8 3.2-3.9 6.4-6.1 9.6-3.7.3-7.4.4-11.2.4-3.9 0-7.6-.1-11.2-.4-2.2-3.2-4.2-6.4-6-9.6-1.9-3.3-3.7-6.7-5.3-10 1.6-3.3 3.4-6.7 5.3-10 1.8-3.2 3.9-6.4 6.1-9.6 3.7-.3 7.4-.4 11.2-.4 3.9 0 7.6.1 11.2.4 2.2 3.2 4.2 6.4 6 9.6 1.9 3.3 3.7 6.7 5.3 10-1.7 3.3-3.4 6.6-5.3 10zm8.3-3.3c1.5 3.5 2.7 6.9 3.8 10.3-3.4.8-7 1.4-10.8 1.9 1.2-1.9 2.5-3.9 3.6-6 1.2-2.1 2.3-4.2 3.4-6.2zM64 97.8c-2.4-2.6-4.7-5.4-6.9-8.3 2.3.1 4.6.2 6.9.2 2.3 0 4.6-.1 6.9-.2-2.2 2.9-4.5 5.7-6.9 8.3zm-18.6-15c-3.8-.5-7.4-1.1-10.8-1.9 1.1-3.3 2.3-6.8 3.8-10.3 1.1 2 2.2 4.1 3.4 6.1 1.2 2.2 2.4 4.1 3.6 6.1zm-7-25.5c-1.5-3.5-2.7-6.9-3.8-10.3 3.4-.8 7-1.4 10.8-1.9-1.2 1.9-2.5 3.9-3.6 6-1.2 2.1-2.3 4.2-3.4 6.2zM64 30.2c2.4 2.6 4.7 5.4 6.9 8.3-2.3-.1-4.6-.2-6.9-.2-2.3 0-4.6.1-6.9.2 2.2-2.9 4.5-5.7 6.9-8.3zm22.2 21.1c-1.2-2.2-2.4-4.2-3.6-6.1-1.2-2-2.5-3.9-3.6-5.8 3.8.5 7.4 1.1 10.8 1.9-1.1 3.3-2.3 6.8-3.8 10.3-1.1-2.1-2.2-4.2-3.4-6.2zm-54.5-16.2c0-6.2 12.5-11.3 28.1-11.3 15.6 0 28.1 5.1 28.1 11.3 0 6.2-12.5 11.3-28.1 11.3-15.6 0-28.1-5.1-28.1-11.3z" />
                      </g>
                    </svg>
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      React
                    </span>
                  </div>

                  {/* Next.js */}
                  <div
                    className="group flex flex-col items-center gap-2 rounded-lg border border-gray-200 bg-gray-50/50 p-4 transition-all hover:border-gray-300 hover:bg-gray-100 hover:shadow-sm dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-gray-700 dark:hover:bg-gray-800"
                    title="Next.js"
                  >
                    <svg className="h-8 w-8" viewBox="0 0 128 128">
                      <path
                        d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64c11.2 0 21.7-2.9 30.8-7.9L48.4 55.3v36.6h-6.8V41.8h6.8l50.5 75.8C116.4 106.2 128 86.5 128 64c0-35.3-28.7-64-64-64zm22.1 84.6l-7.5-11.3V41.8h7.5v42.8z"
                        className="fill-gray-900 dark:fill-white"
                      />
                    </svg>
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      Next.js
                    </span>
                  </div>

                  {/* Node.js */}
                  <div
                    className="group flex flex-col items-center gap-2 rounded-lg border border-gray-200 bg-gray-50/50 p-4 transition-all hover:border-gray-300 hover:bg-gray-100 hover:shadow-sm dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-gray-700 dark:hover:bg-gray-800"
                    title="Node.js"
                  >
                    <svg className="h-8 w-8" viewBox="0 0 128 128">
                      <path
                        fill="#83CD29"
                        d="M112.771 30.334L68.674 4.729c-2.781-1.584-6.402-1.584-9.205 0L14.901 30.334C12.031 31.985 10 35.088 10 38.407v51.142c0 3.319 2.084 6.423 4.954 8.083l11.775 6.688c5.628 2.772 7.617 2.772 10.178 2.772 8.333 0 13.093-5.039 13.093-13.828v-50.49c0-.713-.371-1.774-1.071-1.774h-5.623C42.594 41 41 42.061 41 42.773v50.49c0 3.896-3.524 7.773-10.11 4.48L18.723 90.73c-.424-.23-.723-.693-.723-1.181V38.407c0-.482.555-.966.982-1.213l44.424-25.561c.415-.235 1.025-.235 1.439 0l43.882 25.555c.42.253.272.722.272 1.219v51.142c0 .488.183.963-.232 1.198l-44.086 25.576c-.378.227-.847.227-1.261 0l-11.307-6.749c-.341-.198-.746-.269-1.073-.086-3.146 1.783-3.726 2.02-6.677 3.043-.726.253-1.797.692.41 1.929l14.798 8.754a9.294 9.294 0 004.647 1.246c1.642 0 3.25-.426 4.667-1.246l43.885-25.582c2.87-1.672 4.23-4.764 4.23-8.083V38.407c0-3.319-1.36-6.414-4.229-8.073zM77.91 81.445c-11.726 0-14.309-3.235-15.17-9.066-.1-.628-.633-1.379-1.272-1.379h-5.731c-.709 0-1.279.86-1.279 1.566 0 7.466 4.059 16.512 23.453 16.512 14.039 0 22.088-5.455 22.088-15.109 0-9.572-6.467-12.084-20.082-13.886-13.762-1.819-15.16-2.738-15.16-5.962 0-2.658 1.184-6.203 11.374-6.203 9.105 0 12.461 1.954 13.842 8.091.118.577.645.991 1.24.991h5.754c.354 0 .692-.143.94-.396.24-.272.38-.613.356-.979-.891-10.568-7.912-15.493-22.131-15.493-12.686 0-20.247 5.455-20.247 14.544 0 9.711 7.563 12.384 19.588 13.594 14.382 1.409 15.654 3.543 15.654 6.534 0 5.09-4.096 7.264-13.745 7.264z"
                      />
                    </svg>
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      Node.js
                    </span>
                  </div>

                  {/* Tailwind CSS */}
                  <div
                    className="group flex flex-col items-center gap-2 rounded-lg border border-gray-200 bg-gray-50/50 p-4 transition-all hover:border-gray-300 hover:bg-gray-100 hover:shadow-sm dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-gray-700 dark:hover:bg-gray-800"
                    title="Tailwind CSS"
                  >
                    <svg className="h-8 w-8" viewBox="0 0 128 128">
                      <path
                        d="M64.004 25.602c-17.067 0-27.73 8.53-32 25.597 6.398-8.531 13.867-11.73 22.398-9.597 4.871 1.214 8.352 4.746 12.207 8.66C72.883 56.629 80.145 64 96.004 64c17.066 0 27.73-8.531 32-25.602-6.399 8.536-13.867 11.735-22.399 9.602-4.87-1.215-8.347-4.746-12.207-8.66-6.27-6.367-13.53-13.738-29.394-13.738zM32.004 64c-17.066 0-27.73 8.531-32 25.602C6.402 81.066 13.87 77.867 22.402 80c4.871 1.215 8.352 4.746 12.207 8.66 6.274 6.367 13.536 13.738 29.395 13.738 17.066 0 27.73-8.53 32-25.597-6.399 8.531-13.867 11.73-22.399 9.597-4.87-1.214-8.347-4.746-12.207-8.66C55.128 71.371 47.868 64 32.004 64zm0 0"
                        fill="#38bdf8"
                      />
                    </svg>
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      Tailwind
                    </span>
                  </div>

                  {/* Git */}
                  <div
                    className="group flex flex-col items-center gap-2 rounded-lg border border-gray-200 bg-gray-50/50 p-4 transition-all hover:border-gray-300 hover:bg-gray-100 hover:shadow-sm dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-gray-700 dark:hover:bg-gray-800"
                    title="Git"
                  >
                    <svg className="h-8 w-8" viewBox="0 0 128 128">
                      <path
                        fill="#F34F29"
                        d="M124.737 58.378L69.621 3.264c-3.172-3.174-8.32-3.174-11.497 0L46.68 14.71l14.518 14.518c3.375-1.139 7.243-.375 9.932 2.314 2.703 2.706 3.461 6.607 2.294 9.993l13.992 13.993c3.385-1.167 7.292-.413 9.994 2.295 3.78 3.777 3.78 9.9 0 13.679a9.673 9.673 0 01-13.683 0 9.677 9.677 0 01-2.105-10.521L68.574 47.933l-.002 34.341a9.708 9.708 0 012.559 1.828c3.778 3.777 3.778 9.898 0 13.683-3.779 3.777-9.904 3.777-13.679 0-3.778-3.784-3.778-9.905 0-13.683a9.65 9.65 0 013.167-2.11V47.333a9.581 9.581 0 01-3.167-2.111c-2.862-2.86-3.551-7.06-2.083-10.576L41.056 20.333 3.264 58.123a8.133 8.133 0 000 11.5l55.117 55.114c3.174 3.174 8.32 3.174 11.499 0l54.858-54.858a8.135 8.135 0 00-.001-11.501z"
                      />
                    </svg>
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      Git
                    </span>
                  </div>

                  {/* Docker */}
                  <div
                    className="group flex flex-col items-center gap-2 rounded-lg border border-gray-200 bg-gray-50/50 p-4 transition-all hover:border-gray-300 hover:bg-gray-100 hover:shadow-sm dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-gray-700 dark:hover:bg-gray-800"
                    title="Docker"
                  >
                    <svg className="h-8 w-8" viewBox="0 0 128 128">
                      <path
                        fill="#019BC6"
                        d="M124.8 52.1c-4.3-2.5-10-2.8-14.8-1.4-.6-5.2-4-9.7-8-12.9l-1.6-1.3-1.4 1.6c-2.7 3.1-3.5 8.3-3.1 12.3.3 2.9 1.2 5.9 3 8.3-1.4.8-2.9 1.9-4.3 2.4-2.8 1-5.9 2-8.9 2H79V49H66V24H51v12H26v13H13v14H1.8l.2 1.5c.5 6.4 3.1 12 7.7 16.5 4.8 4.7 11.1 7.5 18.4 8.3 3.3.4 6.7.5 10 .5 5.4 0 10.9-.4 16.2-1.3 4.2-.7 8.4-1.9 12.4-3.3 3.8-1.4 7.5-3.1 10.8-5.3 3.1-2 6-4.4 8.6-7.1 2.5-2.5 4.7-5.3 6.5-8.3 2.9-4.8 5.1-10 6.5-15.5 1-3.9 1.7-7.9 2.2-11.9h7.5c2.8 0 5.6-.9 7.9-2.5 2.2-1.5 3.9-3.6 5-6l.5-1.2-1.1-.7z"
                      />
                      <path
                        fill="#019BC6"
                        d="M51 34h13v12H51V34zm14 0h13v12H65V34zm14 0h13v12H79V34zm-42 13h13v12H37V47zm14 0h13v12H51V47zm14 0h13v12H65V47zm14 0h13v12H79V47zM37 61h13v12H37V61zm14 0h13v12H51V61zm14 0h13v12H65V61z"
                      />
                    </svg>
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      Docker
                    </span>
                  </div>

                  {/* PostgreSQL */}
                  <div
                    className="group flex flex-col items-center gap-2 rounded-lg border border-gray-200 bg-gray-50/50 p-4 transition-all hover:border-gray-300 hover:bg-gray-100 hover:shadow-sm dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-gray-700 dark:hover:bg-gray-800"
                    title="PostgreSQL"
                  >
                    <svg className="h-8 w-8" viewBox="0 0 128 128">
                      <path
                        fill="#336791"
                        d="M105.555 91.484c-1.17 0-2.204.281-3.148.812a8.765 8.765 0 00-2.531 2.172 10.53 10.53 0 00-1.688 3.102 13.283 13.283 0 00-.609 3.992c0 1.484.203 2.844.609 4.078.406 1.234.984 2.297 1.734 3.188a7.72 7.72 0 002.531 2.031 6.88 6.88 0 003.102.719c1.109 0 2.094-.266 2.938-.797a7.753 7.753 0 002.25-2.078 9.65 9.65 0 001.406-3.016 12.44 12.44 0 00.484-3.406v-1.031a14.115 14.115 0 00-.484-3.828 9.71 9.71 0 00-1.453-3.188 7.375 7.375 0 00-2.297-2.172c-.875-.531-1.938-.797-3.156-.797h-.688zm-67.157 0c-1.172 0-2.203.281-3.148.812a8.765 8.765 0 00-2.531 2.172 10.53 10.53 0 00-1.688 3.102 13.283 13.283 0 00-.609 3.992c0 1.484.203 2.844.609 4.078.406 1.234.984 2.297 1.734 3.188a7.72 7.72 0 002.531 2.031 6.88 6.88 0 003.102.719c1.109 0 2.094-.266 2.938-.797a7.753 7.753 0 002.25-2.078 9.65 9.65 0 001.406-3.016 12.44 12.44 0 00.484-3.406v-1.031a14.115 14.115 0 00-.484-3.828 9.71 9.71 0 00-1.453-3.188 7.375 7.375 0 00-2.297-2.172c-.875-.531-1.938-.797-3.156-.797h-.688zM64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0z"
                      />
                    </svg>
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      PostgreSQL
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div
                className="animate-fade-in flex items-center gap-4 border-t border-gray-200 pt-8 dark:border-gray-800"
                style={{ animationDelay: '0.5s', animationFillMode: 'both' }}
              >
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Connect
                </span>
                <div className="flex gap-2">
                  {siteMetadata.github && (
                    <a
                      href={siteMetadata.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white"
                      aria-label="GitHub"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                  )}
                  {siteMetadata.linkedin && (
                    <a
                      href={siteMetadata.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white"
                      aria-label="LinkedIn"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  )}
                  {siteMetadata.email && (
                    <a
                      href={`mailto:${siteMetadata.email}`}
                      className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white"
                      aria-label="Email"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <div className="mt-12 space-y-8 md:mt-16">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Latest Posts
          </h2>
          {posts.length > MAX_DISPLAY && (
            <Link
              href="/blog"
              className="animated-underline text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            >
              View all posts →
            </Link>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {!posts.length && <p className="text-gray-500 dark:text-gray-400">No posts found.</p>}
          {posts.slice(0, MAX_DISPLAY).map((post, index) => {
            const { slug, date, title, summary, tags } = post
            return (
              <article
                key={slug}
                className="hover-lift group relative rounded-2xl border border-gray-200/80 bg-white p-6 transition-all dark:border-gray-700/80 dark:bg-gray-900/50"
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animationFillMode: 'both',
                }}
              >
                {/* Gradient border on hover */}
                <div className="from-primary-500/0 via-primary-500/0 to-accent-cyan/0 group-hover:from-primary-500/20 group-hover:to-accent-cyan/20 absolute inset-0 -z-10 rounded-2xl bg-gradient-to-r opacity-0 blur-sm transition-opacity group-hover:opacity-100" />

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                    <time dateTime={date} className="flex items-center gap-1">
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {formatDate(date, siteMetadata.locale)}
                    </time>
                  </div>

                  <h3 className="text-xl leading-tight font-bold tracking-tight">
                    <Link
                      href={`/blog/${slug}`}
                      className="hover:text-primary-500 dark:hover:text-primary-400 text-gray-900 transition-colors dark:text-gray-100"
                    >
                      {title}
                    </Link>
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </div>

                  <p className="line-clamp-3 text-gray-600 dark:text-gray-400">{summary}</p>
                  <Link
                    href={`/blog/${slug}`}
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 w-fit self-start font-medium"
                    aria-label={`Read more: "${title}"`}
                  >
                    <span className="animated-underline whitespace-nowrap">
                      Read more
                      <svg
                        className="ml-1 inline-block h-4 w-4 align-middle transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </div>

      {siteMetadata.newsletter?.provider && (
        <div className="mt-16 flex items-center justify-center">
          <div className="w-full max-w-xl rounded-2xl border border-gray-200 bg-gray-50/50 p-8 dark:border-gray-700 dark:bg-gray-900/50">
            <h3 className="mb-4 text-center text-2xl font-bold text-gray-900 dark:text-gray-100">
              Subscribe to the newsletter
            </h3>
            <p className="mb-6 text-center text-gray-600 dark:text-gray-400">
              Get notified when I publish new content. No spam, unsubscribe anytime.
            </p>
            <NewsletterForm />
          </div>
        </div>
      )}
    </>
  )
}
