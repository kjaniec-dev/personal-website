'use client'

import { Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'
import Link from './Link'
import headerNavLinks from '@/data/headerNavLinks'
import { usePathname } from 'next/navigation'

const MobileNav = () => {
  const [navShow, setNavShow] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  const onToggleNav = () => {
    setNavShow((status) => !status)
  }

  useEffect(() => {
    setMounted(true)

    if (navShow) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [navShow])

  return (
    <>
      {/* Hamburger Button */}
      <button
        aria-label="Toggle Menu"
        onClick={onToggleNav}
        className="hover:border-accent-400 hover:bg-accent-50 dark:hover:border-accent-500 dark:hover:bg-accent-900/50 flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm transition-all duration-300 sm:hidden dark:border-gray-700 dark:bg-gray-800/80"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          className="h-5 w-5 text-gray-700 dark:text-gray-300"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {mounted && (
        <Transition appear show={navShow} as={Fragment} unmount={false}>
          <Dialog as="div" onClose={onToggleNav} unmount={false}>
            {/* Backdrop */}
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              unmount={false}
            >
              <div className="fixed inset-0 z-60 bg-gray-950/60 backdrop-blur-sm" />
            </TransitionChild>

            {/* Panel */}
            <TransitionChild
              as={Fragment}
              enter="transition ease-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in duration-200 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
              unmount={false}
            >
              <DialogPanel className="fixed top-0 right-0 z-70 h-full w-full max-w-sm bg-white/98 shadow-2xl backdrop-blur-xl dark:bg-gray-900/98">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-6 dark:border-gray-700">
                  <div className="font-display text-lg font-bold text-gray-900 dark:text-white">
                    Menu
                  </div>
                  <button
                    className="hover:border-accent-400 hover:bg-accent-50 dark:hover:border-accent-500 dark:hover:bg-accent-900/50 flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 transition-all duration-300 dark:border-gray-700"
                    aria-label="Close Menu"
                    onClick={onToggleNav}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      className="h-5 w-5 text-gray-700 dark:text-gray-300"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-2 p-6">
                  {headerNavLinks.map((link, index) => {
                    const isActive =
                      pathname === link.href ||
                      (link.href !== '/' && pathname.startsWith(link.href))

                    return (
                      <Link
                        key={link.title}
                        href={link.href}
                        className={`group flex items-center justify-between rounded-xl px-4 py-4 text-lg font-semibold transition-all duration-300 ${
                          isActive
                            ? 'from-accent-500 to-primary-500 bg-gradient-to-r text-white'
                            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800/70'
                        }`}
                        onClick={onToggleNav}
                        style={{
                          animation: 'fadeIn 0.4s ease forwards',
                          animationDelay: `${0.1 + index * 0.05}s`,
                          opacity: 0,
                        }}
                      >
                        <span>{link.title}</span>
                        <svg
                          className={`h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 ${
                            isActive ? 'text-white/80' : 'text-gray-400'
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    )
                  })}
                </nav>

                {/* Decorative bottom */}
                <div className="absolute right-6 bottom-8 left-6">
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 to-transparent dark:via-gray-600" />
                  <p className="mt-4 text-center text-xs text-gray-400 dark:text-gray-400">
                    Crafting digital experiences
                  </p>
                </div>
              </DialogPanel>
            </TransitionChild>
          </Dialog>
        </Transition>
      )}
    </>
  )
}

export default MobileNav
