import { genPageMetadata } from 'app/seo'
import faqData from '@/data/faqData'
import FAQAccordion from '@/components/FAQAccordion'

export const metadata = genPageMetadata({ title: 'FAQ' })

const categories = [
  {
    id: 'technical',
    title: 'Technical Preferences',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
        />
      </svg>
    ),
  },
  {
    id: 'work',
    title: 'Work & Experience',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    id: 'personal',
    title: 'Personal',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
  },
  {
    id: 'contact',
    title: 'Contact & Collaboration',
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
]

export default function FAQ() {
  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-gray-100">
          <span className="gradient-text">FAQ</span>
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">
          Frequently asked questions about me, my work, and my technical preferences. Get to know me
          better through these common questions.
        </p>
      </div>

      <div className="space-y-10">
        {categories.map((category) => (
          <section key={category.id}>
            <div className="mb-4 flex items-center gap-3">
              <span className="text-primary-500 dark:text-primary-400">{category.icon}</span>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {category.title}
              </h2>
            </div>
            <FAQAccordion items={faqData} category={category.id} />
          </section>
        ))}
      </div>
    </div>
  )
}
