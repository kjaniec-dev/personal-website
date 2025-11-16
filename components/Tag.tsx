import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="bg-primary-50 text-primary-700 ring-primary-500/20 hover:bg-primary-100 hover:ring-primary-500/40 dark:bg-primary-950/50 dark:text-primary-300 dark:ring-primary-400/20 dark:hover:bg-primary-900/50 dark:hover:ring-primary-400/40 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 transition-all"
    >
      #{text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
