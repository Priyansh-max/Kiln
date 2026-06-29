import React from 'react';

// ---- simplified kiln emblem geometry (viewBox 64) ----
const DOME = 'M6 50 C5 29 16 9 32 9 C48 9 59 29 58 50 Z';
const CHIM = 'M27.5 11 L28.4 3.4 C28.45 2.6 29 2 29.8 2 L34.2 2 C35 2 35.55 2.6 35.6 3.4 L36.5 11 Z';
const MOUTH = 'M25 50 L25 40.5 C25 32.5 39 32.5 39 40.5 L39 50 Z';

/**
 * Kiln logo — a fired-clay dome with a chimney, with warm light spilling out of
 * its firing mouth: the opening glows, the light blooms onto the bricks and
 * pools on the ground, and the kiln casts a soft contact shadow. Static. Dome
 * uses the brand lime; the light is warm. Reads as a kiln and stays legible
 * down to favicon size.
 */
export const KilnMark = ({ className = '' }) => (
  <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="kilnVol" x1="0" y1="0" x2="0" y2="64" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#fff" stopOpacity="0.40" />
        <stop offset="0.44" stopColor="#fff" stopOpacity="0" />
        <stop offset="0.64" stopColor="#000" stopOpacity="0" />
        <stop offset="1" stopColor="#000" stopOpacity="0.34" />
      </linearGradient>
      <radialGradient id="kilnShadow" cx="32" cy="54.5" r="25" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#000" stopOpacity="0.34" />
        <stop offset="0.55" stopColor="#000" stopOpacity="0.14" />
        <stop offset="1" stopColor="#000" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="kilnPool" cx="32" cy="53.5" r="18" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#FFE9AE" stopOpacity="0.9" />
        <stop offset="0.5" stopColor="#FFCB45" stopOpacity="0.45" />
        <stop offset="1" stopColor="#FFCB45" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="kilnBloom" cx="32" cy="45" r="20" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#FFEFB0" stopOpacity="0.85" />
        <stop offset="0.4" stopColor="#FFCB45" stopOpacity="0.4" />
        <stop offset="0.72" stopColor="#E4F35C" stopOpacity="0.16" />
        <stop offset="1" stopColor="#D7F23C" stopOpacity="0" />
      </radialGradient>
      <radialGradient id="kilnMouthLight" cx="32" cy="46.5" r="9.5" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#FFFEF8" />
        <stop offset="0.4" stopColor="#FFE89C" />
        <stop offset="0.75" stopColor="#FFC24E" stopOpacity="0.7" />
        <stop offset="1" stopColor="#FFC24E" stopOpacity="0" />
      </radialGradient>
      <clipPath id="kilnStruct">
        <path d={DOME} />
        <path d={CHIM} />
      </clipPath>
    </defs>

    {/* ground contact shadow */}
    <ellipse cx="32" cy="54.5" rx="25" ry="5.5" fill="url(#kilnShadow)" />

    {/* chimney + dome */}
    <path d={CHIM} fill="hsl(var(--primary))" />
    <path d={DOME} fill="hsl(var(--primary))" />
    <g clipPath="url(#kilnStruct)">
      <path d={DOME} fill="url(#kilnVol)" />
      <path d={CHIM} fill="url(#kilnVol)" />
    </g>

    {/* firing mouth opening */}
    <path d={MOUTH} fill="hsl(var(--primary-foreground))" />

    {/* light coming out, blooming on the bricks and pooling on the ground */}
    <g>
      <path d={DOME} fill="url(#kilnBloom)" clipPath="url(#kilnStruct)" />
      <path d={MOUTH} fill="url(#kilnMouthLight)" />
      <ellipse cx="32" cy="53.5" rx="18" ry="4" fill="url(#kilnPool)" />
    </g>
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
