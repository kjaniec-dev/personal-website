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
  {
    title: 'Cyberpunk Voxel City - Interactive Resume',
    description: `An interactive 3D resume disguised as a browser-based game. Explore a sprawling cyberpunk city
    rendered entirely from voxels, discovering skill boxes that represent technical expertise. Features custom
    voxel engine with greedy meshing, procedural city generation, dynamic lighting effects, and chunk-based
    streaming for smooth 60 FPS performance. Think Minecraft meets Blade Runner in your browser.`,
    href: 'https://3dresume.kjaniec.dev',
    tags: ['Babylon.js', 'WebGL', 'TypeScript', 'Resume'],
  },
]

export default projectsData
