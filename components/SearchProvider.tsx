'use client'

import { KBarSearchProvider } from 'pliny/search/KBar'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

interface SearchDocument {
  title: string
  summary?: string
  tags?: string[]
  path: string
  type: 'blog' | 'project'
}

interface SearchProviderProps {
  children: ReactNode
}

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const router = useRouter()
  return (
    <KBarSearchProvider
      kbarConfig={{
        searchDocumentsPath: 'search.json',
        defaultActions: [
          {
            id: 'homepage',
            name: 'Homepage',
            keywords: '',
            shortcut: ['h'],
            section: 'Navigation',
            perform: () => router.push('/'),
          },
          {
            id: 'blog',
            name: 'Blog',
            keywords: '',
            shortcut: ['b'],
            section: 'Navigation',
            perform: () => router.push('/blog'),
          },
          {
            id: 'projects',
            name: 'Projects',
            keywords: '',
            shortcut: ['p'],
            section: 'Navigation',
            perform: () => router.push('/projects'),
          },
          {
            id: 'tags',
            name: 'Tags',
            keywords: '',
            shortcut: ['t'],
            section: 'Navigation',
            perform: () => router.push('/tags'),
          },
          {
            id: 'about',
            name: 'About',
            keywords: '',
            shortcut: ['a'],
            section: 'Navigation',
            perform: () => router.push('/about'),
          },
        ],
        onSearchDocumentsLoad(json) {
          return json.map((doc: SearchDocument) => ({
            id: doc.path,
            name: doc.title,
            keywords: doc?.summary || '',
            section: doc.type === 'blog' ? 'Blog Posts' : 'Projects',
            subtitle: doc.tags?.join(', ') || '',
            perform: () => {
              // For blog posts, navigate to the blog path
              // For projects, use the external link
              if (doc.type === 'blog') {
                router.push('/' + doc.path)
              } else {
                // For projects, open in same tab since it's the user's own project
                window.location.href = doc.path
              }
            },
          }))
        },
      }}
    >
      {children}
    </KBarSearchProvider>
  )
}
