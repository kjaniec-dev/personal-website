import {
  Mail,
  Github,
  Facebook,
  Youtube,
  Linkedin,
  Twitter,
  X,
  Mastodon,
  Threads,
  Instagram,
  Medium,
  Bluesky,
} from './icons'

const components = {
  mail: Mail,
  github: Github,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
  x: X,
  mastodon: Mastodon,
  threads: Threads,
  instagram: Instagram,
  medium: Medium,
  bluesky: Bluesky,
}

type SocialIconProps = {
  kind: keyof typeof components
  href?: string | undefined
  size?: number
  className?: string
}

const SocialIcon = ({ kind, href, size = 8, className }: SocialIconProps) => {
  const SocialSvg = components[kind]

  // If no href provided, render just the icon (for use inside Link wrappers)
  if (!href) {
    return (
      <SocialSvg className={`h-${size} w-${size} fill-current text-current transition-colors`} />
    )
  }

  // Validate mailto links
  if (kind === 'mail' && !/^mailto:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(href)) {
    return null
  }

  return (
    <a
      className={
        className ||
        'text-sm text-gray-500 transition hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300'
      }
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <span className="sr-only">{kind}</span>
      <SocialSvg
        className={`fill-current h-${size} w-${size} ${className ? '' : 'hover:text-accent-500 dark:hover:text-accent-400 text-gray-700 dark:text-gray-200'}`}
      />
    </a>
  )
}

export default SocialIcon
