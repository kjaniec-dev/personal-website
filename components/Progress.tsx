const Skill = ({ percent, name }) => (
  <div className="group flex flex-col items-center justify-center">
    <div className="relative h-28 w-28">
      {/* Background glow effect */}
      <div className="from-primary-500/20 to-accent-cyan/20 absolute inset-0 rounded-full bg-gradient-to-br opacity-0 blur-xl transition-opacity group-hover:opacity-100" />

      <svg
        className="h-full w-full -rotate-90 transform"
        viewBox="0 0 36 36"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background circle */}
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className="stroke-gray-200 dark:stroke-gray-700"
          strokeWidth="2.5"
        />
        {/* Progress circle with gradient */}
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="100"
          strokeDashoffset={`${100 - percent}`}
          className="transition-all duration-1000 ease-out"
          style={{
            animation: 'progressAnimation 1.5s ease-out forwards',
          }}
        />
        {/* Gradient definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-primary-500)" />
            <stop offset="100%" stopColor="var(--color-accent-cyan)" />
          </linearGradient>
        </defs>
      </svg>

      {/* Percentage text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xl font-bold text-gray-900 dark:text-gray-100">{percent}%</span>
      </div>
    </div>

    {/* Skill name */}
    <p className="mt-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">
      {name}
    </p>
  </div>
)

export default Skill
