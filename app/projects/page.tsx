import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Projects' })

export default function Projects() {
  return (
    <>
      <div className="space-y-12">
        {/* Header */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-1 bg-primary-500" />
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-gray-100">
              Projects
            </h1>
          </div>
          <p className="max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">
            A collection of projects I've worked on. Each project represents different challenges
            and learning experiences.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projectsData.map((d) => (
            <Card
              key={d.title}
              title={d.title}
              description={d.description}
              imgSrc={d.imgSrc}
              href={d.href}
              repoHref={d.repoHref}
              tags={d.tags}
            />
          ))}
        </div>
      </div>
    </>
  )
}
