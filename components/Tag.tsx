import Link from 'next/link'
import { slug } from 'github-slugger'

interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="group hover:border-accent-400 hover:bg-accent-50 hover:text-accent-700 dark:hover:border-accent-500 dark:hover:bg-accent-900/50 dark:hover:text-accent-300 inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-gray-600 backdrop-blur-sm transition-all duration-300 dark:border-gray-700 dark:bg-gray-800/80 dark:text-gray-300"
    >
      <span className="text-accent-500 transition-transform duration-300 group-hover:scale-110">
        #
      </span>
      <span>{text.split(' ').join('-')}</span>
    </Link>
  )
}

export default Tag
