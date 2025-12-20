import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import NavLink from './NavLink'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'

const Header = () => {
  let headerClass =
    'relative flex items-center w-full justify-between py-8 transition-all duration-300'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50 glass'
  }

  return (
    <header className={headerClass} role="banner">
      {/* Logo and Brand */}
      <Link href="/" aria-label={`${siteMetadata.headerTitle} - Home`} className="group">
        <div className="flex items-center gap-4">
          {/* Geometric Logo Mark */}
          <div className="relative flex h-12 w-12 items-center justify-center">
            {/* Outer ring */}
            <div className="group-hover:border-accent-500 dark:group-hover:border-accent-400 absolute inset-0 rounded-xl border-2 border-gray-300 transition-all duration-500 group-hover:scale-110 group-hover:rotate-90 dark:border-gray-600" />
            {/* Inner square */}
            <div className="from-accent-500 to-primary-500 absolute inset-2 rounded-lg bg-gradient-to-br opacity-0 transition-all duration-500 group-hover:opacity-100" />
            {/* Letter */}
            <span className="font-display relative z-10 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-white dark:text-white">
              K
            </span>
          </div>

          {/* Brand Text */}
          <div className="hidden sm:block">
            <div className="font-display text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              {siteMetadata.headerTitle}
            </div>
            <div className="mt-0.5 flex items-center gap-2 text-xs font-medium tracking-widest text-gray-500 uppercase dark:text-gray-300">
              <span className="bg-accent-500 h-px w-4" />
              Software Engineer
            </div>
          </div>
        </div>
      </Link>

      {/* Navigation */}
      <div className="flex items-center gap-2">
        {/* Desktop Navigation */}
        <nav className="hidden items-center sm:flex" aria-label="Main navigation">
          <div className="flex items-center rounded-2xl border border-gray-200/80 bg-white/60 p-1.5 backdrop-blur-sm dark:border-gray-700/60 dark:bg-gray-800/60">
            {headerNavLinks
              .filter((link) => link.href !== '/')
              .map((link) => (
                <NavLink key={link.title} href={link.href} title={link.title} />
              ))}
          </div>
        </nav>

        {/* Actions */}
        <div className="ml-2 flex items-center gap-1 rounded-2xl border border-gray-200/80 bg-white/60 p-1.5 backdrop-blur-sm dark:border-gray-700/60 dark:bg-gray-800/60">
          <SearchButton />
          <ThemeSwitch />
        </div>

        <MobileNav />
      </div>
    </header>
  )
}

export default Header
