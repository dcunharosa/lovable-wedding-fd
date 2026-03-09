const WaveDivider = ({ className = "" }: { className?: string }) => (
  <svg
    viewBox="0 0 1440 120"
    className={`w-full ${className}`}
    preserveAspectRatio="none"
    fill="none"
  >
    <path
      d="M0 60C240 20 480 100 720 60C960 20 1200 100 1440 60V120H0V60Z"
      stroke="hsl(var(--foreground) / 0.15)"
      strokeWidth="1.5"
      fill="none"
    />
    <path
      d="M0 80C300 40 600 110 900 70C1100 45 1300 90 1440 70V120H0V80Z"
      stroke="hsl(var(--foreground) / 0.1)"
      strokeWidth="1.5"
      fill="none"
    />
  </svg>
);

export default WaveDivider;
