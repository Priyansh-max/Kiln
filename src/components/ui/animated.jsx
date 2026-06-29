import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

/* Rising forge embers — lightweight CSS-animated spark particles */
export const Embers = ({ count = 26 }) => {
  const sparks = useMemo(
    () =>
      Array.from({ length: count }).map(() => ({
        left: Math.random() * 100,
        size: 1.5 + Math.random() * 3,
        delay: Math.random() * 9,
        duration: 7 + Math.random() * 9,
        drift: (Math.random() - 0.5) * 90,
        opacity: 0.25 + Math.random() * 0.5,
      })),
    [count]
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {sparks.map((s, i) => (
        <span
          key={i}
          className="ember"
          style={{
            left: `${s.left}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            '--drift': `${s.drift}px`,
            '--ember-opacity': s.opacity,
          }}
        />
      ))}
    </div>
  );
};

/* Infinite horizontal marquee — pauses on hover */
export const Marquee = ({ children, speed = 38, reverse = false, className = '', gap = '1.25rem' }) => (
  <div className={`marquee ${className}`}>
    <div
      className="marquee-track"
      style={{ animationDuration: `${speed}s`, animationDirection: reverse ? 'reverse' : 'normal', gap }}
    >
      <div className="marquee-group" style={{ gap }}>{children}</div>
      <div className="marquee-group" style={{ gap }} aria-hidden="true">{children}</div>
    </div>
  </div>
);

/* Count-up number that fires when scrolled into view */
export const AnimatedCounter = ({ value, prefix = '', suffix = '', duration = 1.5, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(value * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {Math.round(display).toLocaleString()}
      {suffix}
    </span>
  );
};

/* Card wrapper with a lime glow that follows the cursor */
export const SpotlightCard = ({ children, className = '', as: Tag = 'div', ...rest }) => {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  return (
    <Tag ref={ref} onMouseMove={onMove} className={`spotlight-card ${className}`} {...rest}>
      {children}
    </Tag>
  );
};
