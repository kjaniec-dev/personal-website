export default function GridBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10"
      aria-hidden="true"
      style={{
        backgroundImage:
          'linear-gradient(to right, rgb(209 213 219 / 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgb(209 213 219 / 0.15) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        WebkitMaskImage:
          'radial-gradient(ellipse 80% 60% at 50% 50%, #000 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
        maskImage:
          'radial-gradient(ellipse 80% 60% at 50% 50%, #000 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
      }}
    >
      {/* Dark mode overlay - grid lines adapt to theme */}
      <div
        className="absolute inset-0 opacity-0 dark:opacity-100"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgb(75 85 99 / 0.2) 1px, transparent 1px), linear-gradient(to bottom, rgb(75 85 99 / 0.2) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 60% at 50% 50%, #000 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
          maskImage:
            'radial-gradient(ellipse 80% 60% at 50% 50%, #000 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
        }}
      />
    </div>
  )
}
