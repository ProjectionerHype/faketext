export function LogoMark({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <defs>
        <linearGradient id="ftGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="55%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
        <linearGradient id="ftGradSoft" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ec4899" stopOpacity="0.35" />
        </linearGradient>
      </defs>
      {/* back bubble (outline = "fake" double) */}
      <path
        d="M14 12h28a8 8 0 0 1 8 8v14a8 8 0 0 1-8 8h-7l-7 6v-6h-14a8 8 0 0 1-8-8V20a8 8 0 0 1 8-8z"
        fill="url(#ftGradSoft)"
        stroke="url(#ftGrad)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      {/* front bubble (filled = real) */}
      <path
        d="M24 22h28a8 8 0 0 1 8 8v14a8 8 0 0 1-8 8h-14l-7 6v-6h-7a8 8 0 0 1-8-8V30a8 8 0 0 1 8-8z"
        fill="url(#ftGrad)"
      />
      {/* dots (typing indicator) */}
      <circle cx="32" cy="37" r="2.4" fill="#fff" />
      <circle cx="40" cy="37" r="2.4" fill="#fff" />
      <circle cx="48" cy="37" r="2.4" fill="#fff" />
      {/* tiny sparkle */}
      <path d="M55 12 L56.5 16 L60.5 17.5 L56.5 19 L55 23 L53.5 19 L49.5 17.5 L53.5 16 Z" fill="#fff" opacity="0.95" />
    </svg>
  );
}

export function LogoWordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display text-xl font-extrabold tracking-tight ${className}`}>
      faketext<span className="gradient-text">.fun</span>
    </span>
  );
}
