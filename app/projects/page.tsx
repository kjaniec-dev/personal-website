import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Projects' })

export default function Projects() {
  return (
    <>
      <div className="space-y-16">
        {/* Header */}
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-1.5 rounded-full bg-gradient-to-b from-primary-500 to-primary-600" />
              <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl dark:text-gray-100">
                Projects
              </h1>
            </div>
            <p className="max-w-3xl text-xl leading-relaxed text-gray-600 dark:text-gray-400">
              A showcase of projects I've built. Each one represents unique challenges, creative
              solutions, and continuous learning.
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projectsData.map((d, index) => (
            <div
              key={d.title}
              style={{
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'both',
              }}
              className="animate-fade-in"
            >
              <Card
                title={d.title}
                description={d.description}
                imgSrc={d.imgSrc}
                href={d.href}
                repoHref={d.repoHref}
                tags={d.tags}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
