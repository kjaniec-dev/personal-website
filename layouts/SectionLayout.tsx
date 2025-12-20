import { ReactNode } from 'react'
import SectionContainer from '@/components/SectionContainer'

interface Props {
  children: ReactNode
  title: string
}

export default function SectionLayout({ children, title }: Props) {
  return (
    <div className="my-16">
      <div className="mb-8 flex items-center gap-4">
        <h2 className="font-display text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h2>
        <div className="from-accent-500/50 h-px flex-1 bg-gradient-to-r to-transparent" />
      </div>
      <SectionContainer>{children}</SectionContainer>
    </div>
  )
}
