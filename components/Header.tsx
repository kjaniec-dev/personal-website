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
    'flex items-center w-full bg-white/90 dark:bg-gray-950/90 backdrop-blur-md justify-between py-4 border-b border-gray-200 dark:border-gray-800'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50'
  }

  return (
    <header className={headerClass} role="banner">
      <Link href="/" aria-label={`${siteMetadata.headerTitle} - Home`}>
        <div className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <div className="flex items-center gap-2">
            <Image
              className={'dark:invert'}
              width={32}
              height={32}
              src={'/static/images/logo.svg'}
              alt={`${siteMetadata.headerTitle} logo`}
              priority
            />
            {typeof siteMetadata.headerTitle === 'string' ? (
              <div className="hidden text-lg font-bold tracking-tight sm:block">
                <span className="mono-accent text-gray-900 dark:text-gray-100">
                  {siteMetadata.headerTitle}
                </span>
              </div>
            ) : (
              siteMetadata.headerTitle
            )}
          </div>
        </div>
      </Link>
      <div className="flex items-center gap-2 leading-5 sm:gap-4">
        <nav className="hidden items-center gap-1 sm:flex" aria-label="Main navigation">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <NavLink key={link.title} href={link.href} title={link.title} />
            ))}
        </nav>
        <div className="flex items-center gap-2">
          <SearchButton />
          <ThemeSwitch />
        </div>
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
