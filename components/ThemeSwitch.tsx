'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <div className="h-10 w-10 rounded-full border border-gray-200 bg-gray-50/50 dark:border-gray-700 dark:bg-gray-800/50" />
    )
  }

  const isDark = resolvedTheme === 'dark'

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark')
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="group hover:border-primary-300 hover:bg-primary-50/80 dark:hover:border-primary-700 dark:hover:bg-primary-900/30 relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-gray-50/50 backdrop-blur-sm transition-all duration-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800/50"
    >
      {/* Sun icon (visible in dark mode) */}
      <svg
        className={`group-hover:text-primary-600 dark:group-hover:text-primary-400 absolute h-5 w-5 text-gray-600 transition-all duration-500 dark:text-gray-400 ${
          isDark ? 'scale-100 rotate-0 opacity-100' : 'scale-0 rotate-90 opacity-0'
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>

      {/* Moon icon (visible in light mode) */}
      <svg
        className={`group-hover:text-primary-600 dark:group-hover:text-primary-400 absolute h-5 w-5 text-gray-600 transition-all duration-500 dark:text-gray-400 ${
          isDark ? 'scale-0 -rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>

      {/* Ripple effect on click */}
      <span className="group-active:bg-primary-200/50 dark:group-active:bg-primary-800/50 pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-active:opacity-100" />
    </button>
  )
}

export default ThemeSwitch
