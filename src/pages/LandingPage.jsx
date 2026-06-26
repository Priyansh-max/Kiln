import React, { useRef, useState, useLayoutEffect } from 'react';
import {
  Lightbulb,
  Users,
  GitMerge,
  ArrowRight,
  Github,
  GitPullRequest,
  GitCommitHorizontal,
  CircleDot,
  Trophy,
  Rocket,
  ShieldCheck,
  Sparkles,
  Compass,
  MessagesSquare,
  TrendingUp,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import supabase from '../lib/supabase';
import { toast } from 'react-hot-toast';
import { Embers, Marquee, AnimatedCounter, SpotlightCard } from '@/components/ui/animated';
import { KilnMark } from '@/components/ui/Logo';
import {
  SiReact, SiTypescript, SiNodedotjs, SiPython, SiRust, SiGo, SiNextdotjs,
  SiPostgresql, SiSupabase, SiTailwindcss, SiSolidity, SiSwift, SiFlutter,
  SiDjango, SiFigma,
} from 'react-icons/si';

const signInWithGitHub = async () => {
  try {
    const loadingToast = toast.loading('Signing you in...');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}/idealist`,
        skipBrowserRedirect: false,
      },
    });
    if (error) throw error;
    setTimeout(() => toast.dismiss(loadingToast), 2000);
  } catch (error) {
    console.error('Error signing in:', error.message);
    toast.error('Failed to sign in with GitHub');
  }
};

const stacks = [
  { name: 'React', Icon: SiReact, color: '#61DAFB' },
  { name: 'TypeScript', Icon: SiTypescript, color: '#3178C6' },
  { name: 'Node', Icon: SiNodedotjs, color: '#5FA04E' },
  { name: 'Python', Icon: SiPython, color: '#3776AB' },
  { name: 'Rust', Icon: SiRust, color: '#D5896F' },
  { name: 'Go', Icon: SiGo, color: '#00ADD8' },
  { name: 'Next.js', Icon: SiNextdotjs, color: '#A0A0A0' },
  { name: 'Postgres', Icon: SiPostgresql, color: '#4169E1' },
  { name: 'Supabase', Icon: SiSupabase, color: '#3FCF8E' },
  { name: 'Tailwind', Icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'LLMs', Icon: Sparkles, color: '#A6CE1A' },
  { name: 'Solidity', Icon: SiSolidity, color: '#8C8C8C' },
  { name: 'Swift', Icon: SiSwift, color: '#F05138' },
  { name: 'Flutter', Icon: SiFlutter, color: '#54C5F8' },
  { name: 'Django', Icon: SiDjango, color: '#44B78B' },
  { name: 'Figma', Icon: SiFigma, color: '#F24E1E' },
];

const steps = [
  { icon: Lightbulb, title: 'Post your idea', body: 'Drop the startup and the builder you need.' },
  { icon: Users, title: 'Match with builders', body: 'People who can ship apply with a real pitch.' },
  { icon: Rocket, title: 'Team up & connect', body: 'Accept a match and spin up a workspace.' },
  { icon: GitMerge, title: 'Ship it on GitHub', body: 'Build in the open. Every PR counts.' },
];

const sampleIdeas = [
  { initial: 'L', title: 'Ledgerlite', by: 'Aria Mehta', desc: 'A dead-simple double-entry ledger for founders who hate spreadsheets.', skills: ['React', 'Postgres'] },
  { initial: 'F', title: 'Forge UI', by: 'Kenji Rao', desc: 'An open component library generated straight from your design tokens.', skills: ['a11y', 'CSS'] },
  { initial: 'S', title: 'Standup Bot', by: 'Sofia Lund', desc: 'Async standups that summarise themselves. Backend-heavy.', skills: ['Node', 'LLMs'] },
  { initial: 'M', title: 'Mapline', by: 'Diego Park', desc: 'Turn any spreadsheet of addresses into a shareable live map.', skills: ['Mapbox', 'Vue'] },
  { initial: 'C', title: 'Crate', by: 'Noor Ali', desc: 'One-click reproducible dev environments for open-source repos.', skills: ['Rust', 'Docker'] },
  { initial: 'P', title: 'Practa', by: 'Liam Shaw', desc: 'Spaced-repetition for engineering interviews, built on real PRs.', skills: ['Python', 'LLMs'] },
];

const meritStats = [
  { icon: GitCommitHorizontal, label: 'commits', value: 1284, prefix: '', width: '82%' },
  { icon: GitPullRequest, label: 'merged PRs', value: 312, prefix: '', width: '64%' },
  { icon: CircleDot, label: 'issues closed', value: 86, prefix: '', width: '40%' },
  { icon: Trophy, label: 'contribution score', value: 247, prefix: '+', width: '74%' },
];

const LandingPage = () => {
  const reduce = useReducedMotion();

  const rise = { hidden: { opacity: 0, y: reduce ? 0 : 24 }, visible: { opacity: 1, y: 0 } };
  const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
  const wordWrap = { hidden: {}, visible: { transition: { staggerChildren: 0.075, delayChildren: 0.1 } } };
  const word = { hidden: { opacity: 0, y: reduce ? 0 : 18 }, visible: { opacity: 1, y: 0 } };

  return (
    <div>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden min-h-[88vh] flex items-center">
        <div className="hero-aurora" aria-hidden="true" />
        <HeroBg reduce={reduce} />
        {!reduce && <Embers count={28} />}
        <motion.div
          aria-hidden="true"
          className="foundry-glow absolute left-1/2 -top-32 -translate-x-1/2 w-[760px] max-w-[140vw] h-[480px] rounded-full blur-2xl pointer-events-none"
          animate={reduce ? {} : { scale: [1, 1.07, 1], opacity: [0.65, 1, 0.65] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* fade the rings out toward the bottom (into the stack marquee) */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent pointer-events-none"
        />

        <div className="relative w-full container mx-auto px-4 py-20 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 font-mono text-xs sm:text-[13px] uppercase tracking-[0.18em] text-primary mb-7"
          >
            <span className="w-6 h-px bg-primary" />
            Find · Team up · Ship
          </motion.span>

          <motion.h1
            variants={wordWrap}
            initial="hidden"
            animate="visible"
            className="font-display font-bold tracking-tight text-foreground text-4xl sm:text-6xl lg:text-7xl leading-[1.04] max-w-4xl mx-auto"
          >
            {['Find', 'the', 'people', "who'll"].map((w) => (
              <motion.span key={w} variants={word} className="inline-block mr-[0.25em]">{w}</motion.span>
            ))}
            <br className="hidden sm:block" />
            <motion.span variants={word} className="inline-block mr-[0.25em]">actually</motion.span>
            <motion.span variants={word} className="ink-highlight">build it.</motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            The idea is the easy part. Kiln is where you find the team that ships —
            then proves it, commit by commit, in the open.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-9 flex flex-col sm:flex-row gap-3 justify-center items-center"
          >
            <button
              onClick={signInWithGitHub}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold shadow-lg shadow-primary/30 hover:-translate-y-0.5 hover:shadow-primary/40 transition-all"
            >
              <Github className="w-5 h-5" />
              Sign in with GitHub
            </button>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-foreground font-medium hover:border-primary hover:text-primary transition-colors"
            >
              See how it works
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* tech-stack marquee — merges into the page, brand-coloured icons */}
      <div className="py-10">
        <p className="text-center font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-5">
          Builders ship in every stack
        </p>
        <Marquee speed={34}>
          {stacks.map(({ name, Icon, color }) => (
            <span
              key={name}
              className="mx-2 inline-flex items-center gap-2 font-mono text-sm px-4 py-1.5 rounded-full border border-border bg-card/50 text-muted-foreground"
            >
              <Icon className="w-4 h-4 shrink-0" style={{ color }} />
              {name}
            </span>
          ))}
        </Marquee>
      </div>

      {/* ============ HOW IT WORKS — boxes revealed by a travelling arrow ============ */}
      <section id="how-it-works" className="container mx-auto px-4 py-16 sm:py-24">
        <SectionHead idx="01" title="From idea to shipped, in four moves" />
        <StepsFlow reduce={reduce} />
      </section>

      {/* ============ DASHBOARD PREVIEW ============ */}
      <section id="dashboard" className="container mx-auto px-4 py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <SectionHead idx="02" title="A dashboard that tracks the real work" noMargin />
            <p className="mt-5 text-muted-foreground text-base sm:text-lg leading-relaxed">
              Once your team forms, every project gets a live dashboard wired to your repo —
              commits over time, merged PRs and who's actually shipping. No status meetings,
              no guessing.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                'Daily commit activity, straight from GitHub',
                'Per-member contribution at a glance',
                "Spam-aware so the numbers stay honest",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                  <TrendingUp className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <DashboardPreview reduce={reduce} />
        </div>
      </section>

      {/* ============ FEATURES — bento ============ */}
      <section className="container mx-auto px-4 py-16 sm:py-24">
        <SectionHead idx="03" title="Everything a team needs to ship together" />
        <Bento reduce={reduce} rise={rise} stagger={stagger} />
      </section>

      {/* ============ MERIT ============ */}
      <section id="merit" className="container mx-auto px-4 py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <SectionHead idx="04" title="Merit you can measure" noMargin />
            <p className="mt-5 text-muted-foreground text-base sm:text-lg leading-relaxed">
              Anyone can say they contributed. Kiln reads it straight from GitHub and turns
              real work into a score that follows you across projects. Spam and low-effort
              commits get filtered, so the number actually means something.
            </p>
          </div>

          <SpotlightCard className="relative rounded-2xl border border-border bg-card p-6 sm:p-8 overflow-hidden">
            <div className="foundry-glow absolute -right-16 -top-16 w-56 h-56 rounded-full blur-2xl pointer-events-none" />
            <div className="relative flex items-center justify-between mb-6">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Example builder profile</span>
              <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border border-border text-muted-foreground">sample</span>
            </div>
            <div className="relative grid grid-cols-2 gap-6">
              {meritStats.map((s) => (
                <div key={s.label}>
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <s.icon className="w-4 h-4" />
                    <span className="text-[11px] uppercase tracking-wider">{s.label}</span>
                  </div>
                  <div className="font-mono text-3xl sm:text-4xl font-semibold text-foreground tnum">
                    <AnimatedCounter value={s.value} prefix={s.prefix} />
                  </div>
                  <div className="mt-2.5 h-1.5 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-primary"
                      initial={{ width: 0 }}
                      whileInView={{ width: s.width }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.1, ease: 'easeOut', delay: 0.1 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </SpotlightCard>
        </div>
      </section>

      {/* ============ FOR FOUNDERS / FOR BUILDERS ============ */}
      <section className="container mx-auto px-4 py-16 sm:py-24">
        <div className="grid md:grid-cols-2 gap-5">
          <SplitCard
            tag="For founders"
            title="Post an idea. Build a team you trust."
            points={['Post in under a minute', 'Read pitches that passed an AI screen', 'See who actually ships before you commit']}
            mascot="founder"
            reduce={reduce}
          />
          <SplitCard
            tag="For builders"
            title="Find work worth your time. Prove it."
            points={['Apply to ideas you believe in', 'Build in the open with a real team', 'Earn a score that travels with you']}
            mascot="builder"
            reduce={reduce}
          />
        </div>
      </section>

      {/* ============ FEATURED IDEAS (marquee) ============ */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <SectionHead idx="05" title="An idea looking for a builder, every day" />
        </div>
        <Marquee speed={50}>
          {sampleIdeas.map((idea) => (
            <SpotlightCard
              key={idea.title}
              className="group mx-2.5 w-[320px] shrink-0 flex flex-col rounded-2xl border border-border bg-card p-6 hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-primary/70 text-primary-foreground font-display font-bold">
                  {idea.initial}
                </span>
                <div>
                  <h3 className="font-semibold text-foreground leading-tight">{idea.title}</h3>
                  <p className="text-xs text-muted-foreground">by {idea.by}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{idea.desc}</p>
              <div className="flex flex-wrap gap-2 mb-5">
                {idea.skills.map((s) => (
                  <span key={s} className="font-mono text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary">{s}</span>
                ))}
              </div>
              <div className="mt-auto flex items-center justify-between">
                <span className="font-mono text-[11px] text-muted-foreground">open role</span>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                  Apply <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </SpotlightCard>
          ))}
        </Marquee>
      </section>

      {/* ============ FINAL CTA (elevated) ============ */}
      <section className="container mx-auto px-4 py-16 sm:py-24">
        <div className="relative rounded-[1.75rem] p-px overflow-hidden">
          {!reduce && (
            <div
              aria-hidden="true"
              className="absolute -inset-[45%] -z-0"
              style={{
                background: 'conic-gradient(from 0deg, transparent 0deg, hsl(var(--primary) / 0.55) 40deg, transparent 110deg)',
                animation: 'cta-spin 9s linear infinite',
              }}
            />
          )}
          <SpotlightCard className="relative rounded-[calc(1.75rem-1px)] border border-border bg-card overflow-hidden text-center px-6 py-12 sm:py-16">
            {!reduce && <Embers count={18} />}
            <div className="foundry-glow absolute left-1/2 top-0 -translate-x-1/2 w-[640px] max-w-[120vw] h-64 rounded-full blur-2xl pointer-events-none" />
            <div className="relative max-w-2xl mx-auto">
              <motion.div
                className="inline-flex mb-4"
                animate={reduce ? {} : { scale: [1, 1.09, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <KilnMark className="w-14 h-14 text-foreground" />
              </motion.div>
              <h2 className="font-display font-bold text-4xl sm:text-6xl tracking-tight text-foreground">
                Got an idea? <span className="text-primary">Find your people.</span>
              </h2>
              <p className="mt-5 text-muted-foreground text-base sm:text-lg">
                Sign in with GitHub and post your first idea in under a minute. It's free.
              </p>
              <button
                onClick={signInWithGitHub}
                className="mt-8 inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg shadow-lg shadow-primary/30 hover:-translate-y-0.5 hover:shadow-primary/40 transition-all"
              >
                <Github className="w-5 h-5" />
                Get started
              </button>
            </div>
          </SpotlightCard>
        </div>
      </section>

      <BigFooter />
    </div>
  );
};

/* ---------- hero background: concentric rings + shooting stars on the OUTER rings ---------- */
const HeroBg = ({ reduce }) => {
  const cx = 850;
  const cy = 850;
  const ringR = [170, 290, 410, 530, 650, 770]; // inner → outer
  // stars only on the OUTER rings, sweeping symmetrically top → bottom, outer first
  const starRings = [
    { r: 770, dur: 6.6, delay: 0 },
    { r: 650, dur: 6.0, delay: 0.6 },
    { r: 530, dur: 5.5, delay: 1.2 },
  ];
  // a half-circle arc (top → bottom) down one side — follows the ring exactly
  const halfArc = (r, side) =>
    `M ${cx} ${cy - r} A ${r} ${r} 0 0 ${side === 'R' ? 1 : 0} ${cx} ${cy + r}`;

  return (
    <svg
      aria-hidden="true"
      className="absolute left-1/2 top-[28%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      width="1700" height="1700" viewBox="0 0 1700 1700" fill="none"
    >
      <g
        style={{
          maskImage: 'radial-gradient(circle at 850px 850px, #000 0, #000 55%, transparent 92%)',
          WebkitMaskImage: 'radial-gradient(circle at 850px 850px, #000 0, #000 55%, transparent 92%)',
        }}
      >
        {ringR.map((r, i) => (
          <circle
            key={r}
            cx={cx} cy={cy} r={r}
            fill="none"
            stroke={`hsl(var(--foreground) / ${(0.028 + i * 0.005).toFixed(3)})`}
            strokeWidth="1.5"
          />
        ))}
      </g>
      {!reduce &&
        starRings.map((ring, i) =>
          ['R', 'L'].map((side) => (
            <path
              key={`${i}-${side}`}
              d={halfArc(ring.r, side)}
              fill="none" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round"
              pathLength="1000" strokeDasharray="30 970"
              className="hero-star"
              style={{
                animationDuration: `${ring.dur}s`,
                animationDelay: `${ring.delay}s`,
                filter: 'drop-shadow(0 0 6px hsl(var(--primary)))',
              }}
            />
          ))
        )}
    </svg>
  );
};

/* ---------- steps: one comet tracing box → connector → box (measured) ---------- */
const StepsFlow = ({ reduce }) => {
  const containerRef = useRef(null);
  const boxRefs = useRef([]);
  const [route, setRoute] = useState({ d: '', w: 0, h: 0, on: false });

  useLayoutEffect(() => {
    const build = () => {
      const c = containerRef.current;
      if (!c) return;
      const cw = c.clientWidth;
      const ch = c.clientHeight;
      if (cw < 1024) {
        setRoute({ d: '', w: cw, h: ch, on: false });
        return;
      }
      const cr = c.getBoundingClientRect();
      const rad = 16;
      const segs = [];
      boxRefs.current.forEach((el, i) => {
        if (!el) return;
        const b = el.getBoundingClientRect();
        const x = b.left - cr.left;
        const y = b.top - cr.top;
        const w = b.width;
        const h = b.height;
        const mid = y + h / 2;
        segs.push(`${i === 0 ? 'M' : 'L'} ${x} ${mid}`);
        segs.push(
          `L ${x} ${y + rad} Q ${x} ${y} ${x + rad} ${y} L ${x + w - rad} ${y} Q ${x + w} ${y} ${x + w} ${y + rad} L ${x + w} ${mid}`
        );
      });
      setRoute({ d: segs.join(' '), w: cw, h: ch, on: true });
    };
    build();
    const ro = new ResizeObserver(build);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('resize', build);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', build);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {route.on && !reduce && (
        <svg
          aria-hidden="true"
          className="hidden lg:block absolute inset-0 z-10 pointer-events-none"
          width={route.w} height={route.h} viewBox={`0 0 ${route.w} ${route.h}`} fill="none"
        >
          <path d={route.d} stroke="hsl(var(--border))" strokeWidth="1.5" />
          <path
            d={route.d}
            pathLength="1000"
            stroke="hsl(var(--primary))"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="180 820"
            className="steps-comet"
            style={{ filter: 'drop-shadow(0 0 7px hsl(var(--primary)))' }}
          />
        </svg>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
        {steps.map((step, i) => (
          <div
            key={step.title}
            ref={(el) => (boxRefs.current[i] = el)}
            className="group relative rounded-2xl border border-border bg-card p-6 flex flex-col min-h-[200px]"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <step.icon className="w-6 h-6" />
              </div>
              <span
                className="step-num font-mono text-2xl font-bold text-border"
                style={{ animationDelay: `${[0.7, 2.59, 4.41, 6.3][i]}s` }}
              >
                0{i + 1}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mt-auto">{step.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ---------- compact animated dashboard preview ---------- */
const DashboardPreview = ({ reduce }) => {
  const linePath = 'M10 96 L46 82 L82 88 L118 60 L154 68 L190 40 L226 48 L262 22 L300 16';
  const areaPath = `${linePath} L300 112 L10 112 Z`;

  return (
    <SpotlightCard className="relative rounded-2xl border border-border bg-card p-4 overflow-hidden">
      <div className="foundry-glow absolute -left-20 -bottom-24 w-56 h-56 rounded-full blur-2xl pointer-events-none" />
      <div className="relative flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <KilnMark className="w-5 h-5 text-foreground" />
          <span className="font-display font-semibold text-foreground text-sm">Build dashboard</span>
        </div>
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-primary">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> live
        </span>
      </div>

      <div className="relative rounded-xl border border-border bg-background/40 p-3 mb-3">
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">contribution score</span>
        <svg viewBox="0 0 310 112" className="w-full h-auto mt-1">
          <defs>
            <linearGradient id="kilnArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.28" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[28, 56, 84].map((y) => (
            <line key={y} x1="10" y1={y} x2="300" y2={y} stroke="hsl(var(--border))" strokeWidth="1" />
          ))}
          <motion.path
            d={areaPath}
            fill="url(#kilnArea)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.7 }}
          />
          <motion.path
            id="kilnLine"
            d={linePath}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: reduce ? 1 : 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
          />
          {!reduce && (
            <circle r="3.5" opacity="0" fill="hsl(var(--primary))" style={{ filter: 'drop-shadow(0 0 5px hsl(var(--primary)))' }}>
              <animateMotion dur="4.5s" begin="1.6s" repeatCount="indefinite" calcMode="linear" keyPoints="0;1;1" keyTimes="0;0.62;1">
                <mpath href="#kilnLine" />
              </animateMotion>
              <animate attributeName="opacity" dur="4.5s" begin="1.6s" repeatCount="indefinite" values="0;1;1;0;0" keyTimes="0;0.08;0.5;0.62;1" />
              <animate attributeName="r" dur="4.5s" begin="1.6s" repeatCount="indefinite" values="1.5;3.5;3.5;5.5;1.5" keyTimes="0;0.08;0.5;0.62;1" />
            </circle>
          )}
        </svg>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {[
          { l: 'commits', v: 1284, p: '' },
          { l: 'merged PRs', v: 312, p: '' },
          { l: 'members', v: 4, p: '' },
        ].map((s) => (
          <div key={s.l} className="rounded-lg border border-border bg-background/40 p-2.5 text-center">
            <div className="font-mono text-lg font-semibold text-foreground tnum">
              <AnimatedCounter value={s.v} prefix={s.p} />
            </div>
            <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">{s.l}</div>
          </div>
        ))}
      </div>
    </SpotlightCard>
  );
};

/* ---------- features bento ---------- */
const Bento = ({ reduce, rise, stagger }) => (
  <motion.div
    variants={stagger}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.15 }}
    className="grid grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[168px] grid-flow-row-dense"
  >
    {/* big — GitHub scoring with live equalizer */}
    <motion.div variants={rise} className="col-span-2 row-span-2">
      <SpotlightCard className="group h-full rounded-2xl border border-border bg-card p-6 flex flex-col overflow-hidden hover:border-primary/50 transition-colors">
        <div className="inline-flex w-11 h-11 rounded-xl bg-primary/10 text-primary items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          <GitMerge className="w-5 h-5" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">GitHub-native scoring</h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          Contribution read straight from commits, merged PRs and closed issues — never self-reported.
        </p>
        <div className="bento-eq flex items-end gap-1.5 h-20 mt-auto pt-4">
          {Array.from({ length: 18 }).map((_, i) => (
            <span key={i} style={{ height: `${35 + ((i * 47) % 55)}%`, animationDelay: `${(i % 9) * 0.14}s` }} />
          ))}
        </div>
      </SpotlightCard>
    </motion.div>

    {/* AI pitches */}
    <motion.div variants={rise} className="col-span-2">
      <SpotlightCard className="group h-full rounded-2xl border border-border bg-card p-6 flex flex-col justify-center relative overflow-hidden hover:border-primary/50 transition-colors">
        <Sparkles className="absolute right-4 top-4 w-16 h-16 text-primary/10" />
        <div className="inline-flex w-11 h-11 rounded-xl bg-primary/10 text-primary items-center justify-center mb-3">
          <Sparkles className="w-5 h-5" />
        </div>
        <h3 className="text-base font-semibold text-foreground mb-1.5">AI-checked pitches</h3>
        <p className="text-sm text-muted-foreground max-w-md">
          Every application is screened for effort and relevance, so founders only read the real ones.
        </p>
      </SpotlightCard>
    </motion.div>

    {/* reputation with counter */}
    <motion.div variants={rise} className="col-span-2">
      <SpotlightCard className="group h-full rounded-2xl border border-border bg-card p-6 flex items-center gap-5 relative overflow-hidden hover:border-primary/50 transition-colors">
        <div className="foundry-glow absolute -right-10 -top-10 w-40 h-40 rounded-full blur-2xl pointer-events-none" />
        <div className="relative shrink-0">
          <div className="font-mono text-4xl font-semibold text-foreground tnum">
            <AnimatedCounter value={247} prefix="+" />
          </div>
          <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground mt-1">your score</div>
        </div>
        <div className="relative">
          <h3 className="text-base font-semibold text-foreground mb-1.5">A portable reputation</h3>
          <p className="text-sm text-muted-foreground">Your score follows you across every project, so good work compounds.</p>
        </div>
      </SpotlightCard>
    </motion.div>

    {/* workspace */}
    <motion.div variants={rise} className="col-span-1">
      <SpotlightCard className="group h-full rounded-2xl border border-border bg-card p-5 flex flex-col hover:border-primary/50 transition-colors">
        <div className="inline-flex w-10 h-10 rounded-xl bg-primary/10 text-primary items-center justify-center mb-3">
          <MessagesSquare className="w-5 h-5" />
        </div>
        <h3 className="text-sm font-semibold text-foreground mb-1">Team workspace</h3>
        <p className="text-xs text-muted-foreground">Slack, Discord & contacts in one place.</p>
      </SpotlightCard>
    </motion.div>

    {/* discovery */}
    <motion.div variants={rise} className="col-span-1">
      <SpotlightCard className="group h-full rounded-2xl border border-border bg-card p-5 flex flex-col hover:border-primary/50 transition-colors">
        <div className="inline-flex w-10 h-10 rounded-xl bg-primary/10 text-primary items-center justify-center mb-3">
          <Compass className="w-5 h-5" />
        </div>
        <h3 className="text-sm font-semibold text-foreground mb-1">Idea discovery</h3>
        <p className="text-xs text-muted-foreground">Filter the feed by the skills you have.</p>
      </SpotlightCard>
    </motion.div>

    {/* quality review */}
    <motion.div variants={rise} className="col-span-2">
      <SpotlightCard className="group h-full rounded-2xl border border-border bg-card p-6 flex flex-col justify-center hover:border-primary/50 transition-colors">
        <div className="inline-flex w-11 h-11 rounded-xl bg-primary/10 text-primary items-center justify-center mb-3">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <h3 className="text-base font-semibold text-foreground mb-1.5">Quality review</h3>
        <p className="text-sm text-muted-foreground max-w-md">
          Projects are checked against a real bar before they ship — logo, README, demo, no spam.
        </p>
      </SpotlightCard>
    </motion.div>
  </motion.div>
);

/* ---------- abstract animated motifs ---------- */
const Motif = ({ variant, reduce }) => (
  <motion.svg
    width="92" height="92" viewBox="0 0 96 96"
    className="shrink-0"
    animate={reduce ? {} : { y: [0, -5, 0] }}
    transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
    aria-hidden="true"
  >
    {variant === 'founder' ? (
      /* an idea radiating — concentric rings, a pulsing core, an orbiting spark */
      <>
        <circle cx="48" cy="48" r="34" fill="none" stroke="hsl(var(--primary) / 0.12)" strokeWidth="1.5" />
        <circle cx="48" cy="48" r="24" fill="none" stroke="hsl(var(--primary) / 0.22)" strokeWidth="1.5" />
        <circle cx="48" cy="48" r="14" fill="none" stroke="hsl(var(--primary) / 0.35)" strokeWidth="1.5" />
        <motion.circle
          cx="48" cy="48" r="6" fill="hsl(var(--primary))"
          animate={reduce ? {} : { scale: [1, 1.25, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '48px 48px' }}
        />
        <motion.g
          animate={reduce ? {} : { rotate: 360 }}
          transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '48px 48px' }}
        >
          <circle cx="48" cy="14" r="3" fill="hsl(var(--primary))" />
        </motion.g>
      </>
    ) : (
      /* a build in progress — a commit graph drawing itself */
      <>
        <line x1="32" y1="20" x2="32" y2="78" stroke="hsl(var(--primary) / 0.3)" strokeWidth="2" />
        <path d="M32 50 C32 40 48 42 60 36" fill="none" stroke="hsl(var(--primary) / 0.3)" strokeWidth="2" />
        {[
          { cx: 32, cy: 24, d: 0 },
          { cx: 32, cy: 48, d: 0.45 },
          { cx: 60, cy: 34, d: 0.9 },
          { cx: 32, cy: 70, d: 1.35 },
        ].map((n, i) => (
          <motion.circle
            key={i}
            cx={n.cx} cy={n.cy} r="5"
            fill="hsl(var(--card))" stroke="hsl(var(--primary))" strokeWidth="2.5"
            animate={reduce ? {} : { scale: [1, 1.35, 1], stroke: ['hsl(var(--primary) / 0.5)', 'hsl(var(--primary))', 'hsl(var(--primary) / 0.5)'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: n.d, repeatDelay: 0.4 }}
            style={{ transformOrigin: `${n.cx}px ${n.cy}px` }}
          />
        ))}
      </>
    )}
  </motion.svg>
);

/* ---------- founders / builders split card ---------- */
const SplitCard = ({ tag, title, points, mascot, reduce }) => (
  <motion.div
    initial={{ opacity: 0, y: reduce ? 0 : 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5 }}
  >
    <SpotlightCard className="relative h-full rounded-2xl border border-border bg-card p-7 sm:p-9 overflow-hidden">
      <div className="foundry-glow absolute -right-12 -top-12 w-44 h-44 rounded-full blur-2xl pointer-events-none" />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-primary">{tag}</span>
          <h3 className="font-display font-bold text-xl sm:text-2xl text-foreground mt-3 mb-5 max-w-[16rem]">{title}</h3>
        </div>
        <Motif variant={mascot} reduce={reduce} />
      </div>
      <ul className="relative space-y-3">
        {points.map((p) => (
          <li key={p} className="flex items-start gap-3 text-sm text-foreground">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
            {p}
          </li>
        ))}
      </ul>
    </SpotlightCard>
  </motion.div>
);

/* ---------- giant footer wordmark ---------- */
const KilnWordmark = () => {
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--mx', '-600px');
    el.style.setProperty('--my', '-600px');
  };
  const cls = 'font-display font-bold tracking-tighter leading-[0.8] text-[26vw] lg:text-[22vw]';
  return (
    <div className="relative select-none overflow-hidden" aria-hidden="true">
      <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="relative translate-y-[8%]">
        <div className={`kiln-outline ${cls}`}>KILN</div>
        <div className={`kiln-torch ${cls} absolute inset-0`}>KILN</div>
      </div>
    </div>
  );
};

const BigFooter = () => (
  <footer className="relative overflow-hidden border-t border-border bg-card/30">
    <div className="container mx-auto px-4 pt-14">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-8">
        <div className="lg:col-span-2 max-w-sm">
          <div className="flex items-center gap-2 text-foreground mb-4">
            <KilnMark className="w-7 h-7" />
            <span className="font-display font-bold text-xl">Kiln</span>
          </div>
          <p className="text-sm text-muted-foreground mb-5">
            Post an idea, find the people who'll actually build it, and ship it in the open.
          </p>
          <button
            onClick={signInWithGitHub}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <Github className="w-4 h-4" /> Get started
          </button>
        </div>

        <FooterCol
          heading="Explore"
          links={[['How it works', '#how-it-works'], ['The dashboard', '#dashboard'], ['Merit scoring', '#merit']]}
        />
        <FooterCol
          heading="Connect"
          links={[['Sign in with GitHub', null], ['Built by Priyansh', 'https://priyanshagarwal.me/']]}
        />
      </div>

      <KilnWordmark />

      <div className="relative flex flex-col sm:flex-row items-center justify-between gap-3 pt-5 pb-6 border-t border-border">
        <span className="font-mono text-xs text-muted-foreground">© {new Date().getFullYear()} Kiln</span>
        <span className="font-mono text-xs text-muted-foreground">raw ideas in · shipped products out</span>
      </div>
    </div>
  </footer>
);

const FooterCol = ({ heading, links }) => (
  <div>
    <h4 className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground mb-4">{heading}</h4>
    <ul className="space-y-2.5">
      {links.map(([label, href]) =>
        href === null ? (
          <li key={label}>
            <button onClick={signInWithGitHub} className="text-sm text-foreground hover:text-primary transition-colors">{label}</button>
          </li>
        ) : (
          <li key={label}>
            <a
              href={href}
              {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="text-sm text-foreground hover:text-primary transition-colors"
            >
              {label}
            </a>
          </li>
        )
      )}
    </ul>
  </div>
);

const SectionHead = ({ idx, title, noMargin }) => (
  <div className={`flex items-baseline gap-3 ${noMargin ? '' : 'mb-10'}`}>
    <span className="font-mono text-sm text-primary">{idx}</span>
    <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-foreground">{title}</h2>
  </div>
);

export default LandingPage;
