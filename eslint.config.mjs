import typescriptEslint from '@typescript-eslint/eslint-plugin'
import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import js from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import nextPlugin from '@next/eslint-plugin-next'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default [
  // Ignore patterns (migrated from .eslintignore)
  {
    ignores: ['node_modules', '.eslintrc.js', '.contentlayer', '.next', 'public'],
  },

  // Base JS recommended
  js.configs.recommended,

  // TypeScript + project rules
  {
    plugins: {
      '@typescript-eslint': typescriptEslint,
      // Register plugins explicitly for flat config usage
      'jsx-a11y': jsxA11y,
      '@next/next': nextPlugin,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.amd,
        ...globals.node,
      },
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
    },

    rules: {
      // Next.js + React modern defaults
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/no-unescaped-entities': 'off',

      // Accessibility
      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          components: ['Link'],
          specialLink: ['hrefLeft', 'hrefRight'],
          aspects: ['invalidHref', 'preferButton'],
        },
      ],

      // Next.js best practices (subset of core-web-vitals without using legacy extends)
      '@next/next/no-css-tags': 'error',
      '@next/next/no-sync-scripts': 'error',
      '@next/next/no-img-element': 'warn',
      // In the App Router, <Link> usage differs; disable this legacy pages-dir rule
      '@next/next/no-html-link-for-pages': 'off',

      // TypeScript adjustments
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
    },
  },

  // Enable Prettier as an ESLint rule and recommended settings
  eslintPluginPrettierRecommended,
]
