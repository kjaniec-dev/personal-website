'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavLinkProps {
  href: string
  title: string
}

const NavLink = ({ href, title }: NavLinkProps) => {
  const pathname = usePathname()
  const isActive = pathname === href || (href !== '/' && pathname.startsWith(href))

  return (
    <Link
      href={href}
      aria-current={isActive ? 'page' : undefined}
      className={`group relative rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
        isActive
          ? 'from-accent-500 to-primary-500 shadow-accent-500/25 bg-gradient-to-r text-white shadow-lg'
          : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
      }`}
    >
      <span className="relative z-10">{title}</span>
      {!isActive && (
        <span className="absolute inset-0 rounded-xl bg-gray-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-gray-700/50" />
      )}
    </Link>
  )
}

export default NavLink
