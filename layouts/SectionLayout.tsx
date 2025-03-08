import { ReactNode } from 'react'
import SectionContainer from '@/components/SectionContainer'

interface Props {
  children: ReactNode
  title: string
}

export default function SectionLayout({ children, title }: Props) {
  return (
    <div className="my-16 divide-y divide-gray-200 dark:divide-gray-700">
      <h1 className="mt-8 pb-2 text-2xl leading-5 font-extrabold tracking-tight text-gray-900 sm:text-xl sm:leading-10 md:text-3xl md:leading-7 dark:text-gray-100">
        {title}
      </h1>
      <SectionContainer>{children}</SectionContainer>
    </div>
  )
}
