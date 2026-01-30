interface Project {
  title: string
  description: string
  href?: string
  repoHref?: string
  imgSrc?: string
  tags?: string[]
}

const projectsData: Project[] = [
  {
    title: 'Personal Website',
    description: `My personal website and portfolio built with Next.js 15, TypeScript, and Tailwind CSS v4.
    Features a modern glassmorphic design, dark mode support, blog with MDX, and optimized performance
    with excellent Lighthouse scores. Showcases my work, skills, and thoughts on software development.`,
    href: 'https://kjaniec.dev',
    repoHref: 'https://github.com/kjaniec-dev/personal-website',
    tags: ['next-js', 'TypeScript', 'Tailwind CSS', 'MDX'],
  },
  {
    title: 'Planning Poker',
    description: `Real-time collaborative estimation tool for agile teams. Enables remote teams to conduct
    planning poker sessions with instant vote synchronization, room management, and intuitive card selection.
    Built with modern web technologies for seamless team collaboration during sprint planning.`,
    href: 'https://planning-poker.kjaniec.dev',
    repoHref: 'https://github.com/kjaniec-dev/planning-poker',
    tags: ['React', 'WebSocket', 'Real-time', 'Agile'],
  },
]

export default projectsData
