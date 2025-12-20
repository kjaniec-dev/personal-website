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
      className={`group relative rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
        isActive
          ? 'bg-primary-50 text-primary-700 shadow-sm dark:bg-primary-950/50 dark:text-primary-300'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-100'
      }`}
    >
      {title}
      {isActive && (
        <span className="absolute -bottom-1 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-gradient-to-r from-primary-500 to-primary-600" />
      )}
    </Link>
  )
}

export default NavLink
