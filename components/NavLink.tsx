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
      className={`relative rounded-md px-3 py-2 text-sm font-medium transition-all ${
        isActive
          ? 'text-primary-600 dark:text-primary-400'
          : 'text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400'
      }`}
    >
      {title}
      {isActive && (
        <span className="absolute bottom-0 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-primary-500" />
      )}
    </Link>
  )
}

export default NavLink
