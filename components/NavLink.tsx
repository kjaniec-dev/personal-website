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
      className={`animated-underline rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
        isActive
          ? 'bg-primary-50 text-primary-600 dark:bg-primary-950/50 dark:text-primary-400'
          : 'hover:text-primary-500 dark:hover:text-primary-400 text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
      }`}
    >
      {title}
    </Link>
  )
}

export default NavLink
