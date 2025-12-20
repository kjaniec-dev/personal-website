const Skill = ({ percent, name }: { percent: number; name: string }) => {
  // Circle calculations: r=15, circumference = 2 * π * 15 ≈ 94.25
  const radius = 15
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percent / 100) * circumference

  return (
    <div
      className="group flex flex-col items-center justify-center p-2"
      style={{ minHeight: '160px' }}
    >
      <div className="relative h-28 w-28">
        {/* Background glow effect */}
        <div className="from-accent-500/20 to-primary-500/20 absolute inset-0 rounded-full bg-gradient-to-br opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

        <svg
          className="h-full w-full -rotate-90 transform"
          viewBox="0 0 36 36"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Background circle */}
          <circle
            cx="18"
            cy="18"
            r={radius}
            fill="none"
            className="stroke-gray-200 dark:stroke-gray-700"
            strokeWidth="3"
          />
          {/* Progress circle with gradient */}
          <circle
            cx="18"
            cy="18"
            r={radius}
            fill="none"
            className="stroke-accent-500 transition-all duration-1000 ease-out"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{
              filter: 'drop-shadow(0 0 6px var(--color-accent-500))',
            }}
          />
        </svg>

        {/* Percentage text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-xl font-bold text-gray-900 dark:text-white">
            {percent}%
          </span>
        </div>
      </div>

      {/* Skill name */}
      <p className="mt-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-200">
        {name}
      </p>
    </div>
  )
}

export default Skill
