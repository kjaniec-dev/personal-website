import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from './Link'
import MobileNav from './MobileNav'
import ThemeSwitch from './ThemeSwitch'
import SearchButton from './SearchButton'
import Image from '@/components/Image'

const Header = () => {
  let headerClass =
    'flex items-center w-full bg-white/80 dark:bg-gray-950/80 backdrop-blur-md justify-between py-6'
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-50 border-b border-gray-200/50 dark:border-gray-800/50'
  }

  return (
    <header className={headerClass}>
      <Link href="/" aria-label={siteMetadata.headerTitle}>
        <div className="flex items-center justify-between transition-transform hover:scale-105">
          <div className="mr-3">
            <Image
              className={'dark:invert'}
              width={48}
              height={48}
              src={'/static/images/logo.svg'}
              alt={'Logo'}
            />
          </div>
          {typeof siteMetadata.headerTitle === 'string' ? (
            <div className="hidden text-xl font-bold tracking-tight text-gray-900 sm:block dark:text-gray-100">
              <span className="gradient-text">{siteMetadata.headerTitle}</span>
            </div>
          ) : (
            siteMetadata.headerTitle
          )}
        </div>
      </Link>
      <div className="flex items-center gap-2 leading-5 sm:gap-4">
        <nav className="no-scrollbar hidden max-w-40 items-center gap-1 overflow-x-auto sm:flex md:max-w-72 lg:max-w-96">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className="animated-underline hover:text-primary-500 dark:hover:text-primary-400 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                {link.title}
              </Link>
            ))}
        </nav>
        <div className="flex items-center gap-3">
          <SearchButton />
          <ThemeSwitch />
        </div>
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
