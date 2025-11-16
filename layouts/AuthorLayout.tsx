import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const { name, avatar, occupation, company, email, twitter, bluesky, linkedin, github } = content

  return (
    <>
      <div className="space-y-12">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-gray-100">
            <span className="gradient-text">About Me</span>
          </h1>
          <p className="max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Get to know me, my background, and what I'm passionate about.
          </p>
        </div>

        {/* Profile Card */}
        <div className="relative overflow-hidden rounded-3xl border border-gray-200/60 bg-white/80 p-8 shadow-xl backdrop-blur-sm dark:border-gray-700/60 dark:bg-gray-900/80">
          {/* Decorative gradient */}
          <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-gradient-to-br from-primary-500/20 to-accent-cyan/20 blur-3xl" />

          <div className="relative items-center gap-8 space-y-8 xl:flex xl:space-y-0">
            {/* Avatar */}
            <div className="flex flex-shrink-0 justify-center">
              {avatar && (
                <div className="group relative">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-primary-500 to-accent-cyan opacity-75 blur transition-all group-hover:opacity-100" />
                  <Image
                    src={avatar}
                    alt="avatar"
                    width={192}
                    height={192}
                    className="relative h-48 w-48 rounded-full border-4 border-white object-cover shadow-2xl dark:border-gray-800"
                  />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 text-center xl:text-left">
              <h2 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                {name}
              </h2>
              <p className="mb-1 text-lg font-medium text-primary-500 dark:text-primary-400">
                {occupation}
              </p>
              <p className="mb-6 text-gray-600 dark:text-gray-400">{company}</p>

              {/* Social Icons */}
              <div className="flex justify-center gap-4 xl:justify-start">
                {email && (
                  <SocialIcon
                    kind="mail"
                    href={`mailto:${email}`}
                    size={5}
                    className="text-gray-500 transition-all hover:-translate-y-1 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
                  />
                )}
                {github && (
                  <SocialIcon
                    kind="github"
                    href={github}
                    size={5}
                    className="text-gray-500 transition-all hover:-translate-y-1 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
                  />
                )}
                {linkedin && (
                  <SocialIcon
                    kind="linkedin"
                    href={linkedin}
                    size={5}
                    className="text-gray-500 transition-all hover:-translate-y-1 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
                  />
                )}
                {twitter && (
                  <SocialIcon
                    kind="x"
                    href={twitter}
                    size={5}
                    className="text-gray-500 transition-all hover:-translate-y-1 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
                  />
                )}
                {bluesky && (
                  <SocialIcon
                    kind="bluesky"
                    href={bluesky}
                    size={5}
                    className="text-gray-500 transition-all hover:-translate-y-1 hover:text-primary-500 dark:text-gray-400 dark:hover:text-primary-400"
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bio Content */}
        <div className="prose dark:prose-invert max-w-none rounded-2xl border border-gray-200/60 bg-white/60 p-8 backdrop-blur-sm dark:border-gray-700/60 dark:bg-gray-900/60">
          {children}
        </div>
      </div>
    </>
  )
}
