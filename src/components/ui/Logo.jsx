import React from 'react';

/**
 * Kiln logo — a clean flame mark in the brand lime, with a soft inner core.
 * The fire that hardens raw ideas into something solid. Works at any size.
 */
export const KilnMark = ({ className = '' }) => (
  <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden="true">
    <path
      d="M16 3.2c2.7 6.3 7.8 9 7.8 15.3a7.8 7.8 0 1 1-15.6 0C8.2 12.2 13.3 9.5 16 3.2Z"
      fill="hsl(var(--primary))"
    />
    <path
      d="M16 13.4c1.4 3 3.2 3.9 3.2 6.5a3.2 3.2 0 1 1-6.4 0c0-2.6 1.8-3.5 3.2-6.5Z"
      fill="hsl(var(--primary-foreground))"
      opacity="0.55"
    />
  </svg>
);

export const Logo = ({ className = '', markClass = 'w-7 h-7', wordClass = 'text-lg', showWord = true }) => (
  <span className={`inline-flex items-center gap-2 text-foreground ${className}`}>
    <KilnMark className={markClass} />
    {showWord && (
      <span className={`font-display font-bold tracking-tight ${wordClass}`}>Kiln</span>
    )}
  </span>
);

export default Logo;
