import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import NavLink from './NavLink'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import Image from '@/components/Image'

const Header = () => {
  let headerClass =
    'flex items-center w-full bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl justify-between px-4 sm:px-6 lg:px-8 py-5 border-b border-gray-200/60 dark:border-gray-800/60 shadow-sm'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }

  return (
    <header className={headerClass} role="banner">
      <Link href="/" aria-label={`${siteMetadata.headerTitle} - Home`}>
        <div className="group flex items-center gap-3 transition-all hover:opacity-90">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <Image
                className="dark:invert transition-transform group-hover:scale-105"
                width={36}
                height={36}
                src={'/static/images/logo.svg'}
                alt={`${siteMetadata.headerTitle} logo`}
                priority
              />
            </div>
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="hidden text-xl font-bold tracking-tight sm:block">
                <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent dark:from-gray-100 dark:to-gray-300">
                  {siteMetadata.headerTitle}
                </span>
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
          </div>
        </div>
      </Link>
      <div className="flex items-center gap-3 leading-5 sm:gap-6">
        <nav className="hidden items-center gap-2 sm:flex" aria-label="Main navigation">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <NavLink key={link.title} href={link.href} title={link.title} />
            ))}
        </nav>
        <div className="flex items-center gap-2 border-l border-gray-200 pl-3 dark:border-gray-800 sm:pl-6">
          <SearchButton />
          <ThemeSwitch />
        </div>
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
