import { ReactNode } from 'react'
import SectionContainer from '@/components/SectionContainer'

interface Props {
  children: ReactNode
  title: string
}

export default function SectionLayout({ children, title }: Props) {
  return (
    <div className="my-16">
      <div className="mb-8 flex items-center gap-3">
        <div className="h-8 w-1 bg-primary-500" />
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {title}
        </h2>
      </div>
      <SectionContainer>{children}</SectionContainer>
    </div>
  )
}
