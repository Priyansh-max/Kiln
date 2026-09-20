import priyanshAvatar from '../assets/priyansh-github.png';

const avatar = (name, background = '18181b', color = 'fafafa') => {
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" rx="100" fill="#${background}"/><text x="100" y="116" text-anchor="middle" font-family="Arial, sans-serif" font-size="72" font-weight="700" fill="#${color}">${initials}</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

export const PRIYANSH_DEMO_PROFILE = {
  id: 'demo-priyansh-agarwal',
  full_name: 'Priyansh Agarwal',
  email: '',
  avatar_url: priyanshAvatar,
  description: 'Open Source Contributor @AOSSIE-Org | Software Engineer @ SixDIndia | Full Stack and Generative AI Engineer | Core AI/ML | CP',
  skills: 'Open Source, Full Stack, Generative AI, Core AI/ML, Competitive Programming',
  github_url: 'https://github.com/Priyansh-max',
  github_username: 'Priyansh-max',
  portfolio_url: 'https://priyanshh.tech',
  resume_url: '',
};

export const DEMO_PROJECTS = [
  {
    id: 'demo-supacron',
    title: 'Supacron',
    idea_desc: 'A guided Cloudflare-first CLI that lets founders schedule secure Supabase jobs without wrestling with provider commands or credentials.',
    dev_req: 'Node.js, Cloudflare Workers, Supabase, CLI UX, Security',
    additional_info: 'The demo team is focused on safe provider automation, interactive recovery, and a simple install-to-deploy experience.',
    status: 'open',
    completion_status: null,
    project_type: 'team',
    project_link: 'https://github.com',
    repo_url: 'https://github.com',
    logo_url: '',
    duration: 42,
    created_at: '2026-07-18T09:30:00.000Z',
    date: '2026-08-29T09:30:00.000Z',
    role: 'author',
    rating: 92,
  },
  {
    id: 'demo-interview-buddy',
    title: 'Interview Buddy',
    idea_desc: 'A private Windows meeting copilot that combines microphone and system audio into a chronological transcript and streams useful answers in real time.',
    dev_req: 'Rust, Windows Audio, React, Realtime APIs, WebSockets',
    additional_info: 'The product runs as a background worker with a lightweight dashboard and prioritizes low-latency, speaker-agnostic assistance.',
    status: 'open',
    completion_status: null,
    project_type: 'team',
    project_link: 'https://github.com',
    repo_url: 'https://github.com',
    logo_url: '',
    duration: 35,
    created_at: '2026-08-04T13:15:00.000Z',
    date: '2026-09-08T13:15:00.000Z',
    role: 'author',
    rating: 88,
  },
  {
    id: 'demo-reviewdale',
    title: 'ReviewDale Benchmark',
    idea_desc: 'A data-quality pipeline that collects benchmark results, verifies extraction completeness, and publishes trustworthy product comparisons.',
    dev_req: 'Python, Scrapy, BigQuery, Cloud Run, Data Quality',
    additional_info: 'The workflow includes count-based fidelity gates, resumable collection jobs, and observable merge decisions.',
    status: 'closed',
    completion_status: null,
    project_type: 'team',
    project_link: 'https://github.com',
    repo_url: 'https://github.com',
    logo_url: '',
    duration: 51,
    created_at: '2026-06-10T07:45:00.000Z',
    date: '2026-07-31T07:45:00.000Z',
    role: 'contributor',
    rating: 84,
  },
];

const people = {
  priyansh: PRIYANSH_DEMO_PROFILE,
  aisha: {
    id: 'demo-person-aisha',
    full_name: 'Aisha Khan',
    email: 'aisha.khan@example.com',
    avatar_url: avatar('Aisha Khan', '7c3aed'),
    github_url: 'https://github.com',
    portfolio_url: 'https://example.com',
    description: 'Frontend engineer focused on accessible product experiences and design systems.',
    skills: 'React, TypeScript, Accessibility, Design Systems',
    github_username: 'aisha-demo',
  },
  daniel: {
    id: 'demo-person-daniel',
    full_name: 'Daniel Brooks',
    email: 'daniel.brooks@example.com',
    avatar_url: avatar('Daniel Brooks', '0369a1'),
    github_url: 'https://github.com',
    portfolio_url: 'https://example.com',
    description: 'Backend engineer who builds reliable APIs, queues, and developer tooling.',
    skills: 'Node.js, PostgreSQL, Redis, Cloudflare',
    github_username: 'daniel-demo',
  },
  priya: {
    id: 'demo-person-priya',
    full_name: 'Priya Nair',
    email: 'priya.nair@example.com',
    avatar_url: avatar('Priya Nair', 'be123c'),
    github_url: 'https://github.com',
    portfolio_url: 'https://example.com',
    description: 'Data engineer interested in observable pipelines and trustworthy analytics.',
    skills: 'Python, BigQuery, Scrapy, Data Quality',
    github_username: 'priya-demo',
  },
  lucas: {
    id: 'demo-person-lucas',
    full_name: 'Lucas Martin',
    email: 'lucas.martin@example.com',
    avatar_url: avatar('Lucas Martin', '047857'),
    github_url: 'https://github.com',
    portfolio_url: 'https://example.com',
    description: 'Systems engineer working on native audio, streaming, and performance.',
    skills: 'Rust, Windows, WebSockets, Audio Systems',
    github_username: 'lucas-demo',
  },
  mei: {
    id: 'demo-person-mei',
    full_name: 'Mei Chen',
    email: 'mei.chen@example.com',
    avatar_url: avatar('Mei Chen', 'c2410c'),
    github_url: 'https://github.com',
    portfolio_url: 'https://example.com',
    description: 'Product-minded ML engineer building practical realtime AI experiences.',
    skills: 'Python, Realtime AI, Evaluation, Product Engineering',
    github_username: 'mei-demo',
  },
  arjun: {
    id: 'demo-person-arjun',
    full_name: 'Arjun Mehta',
    email: 'arjun.mehta@example.com',
    avatar_url: avatar('Arjun Mehta', '4338ca'),
    github_url: 'https://github.com',
    portfolio_url: 'https://example.com',
    description: 'Full-stack developer who enjoys shipping simple tools for complex workflows.',
    skills: 'React, Node.js, Supabase, DevOps',
    github_username: 'arjun-demo',
  },
};

const application = (id, profile, status, pitch) => ({ id, profile, status, pitch });

export const DEMO_APPLICATIONS_BY_PROJECT = {
  'demo-supacron': [
    application('demo-app-1', people.aisha, 'accepted', 'I would shape the guided setup into an accessible, confidence-building flow and build a reusable component system for every provider interaction.'),
    application('demo-app-2', people.daniel, 'pending', 'I have built deployment CLIs and queue-backed services. I can help harden provider calls, retries, and failure recovery while keeping the command surface small.'),
    application('demo-app-3', people.mei, 'rejected', 'I can add evaluation tooling around generated configuration and help measure where users get stuck during setup.'),
  ],
  'demo-interview-buddy': [
    application('demo-app-4', people.lucas, 'accepted', 'My native Windows and realtime streaming experience maps directly to audio capture, buffering, and low-latency transcript delivery.'),
    application('demo-app-5', people.priya, 'pending', 'I can build telemetry that measures transcription delay, answer latency, and session reliability without storing sensitive meeting content.'),
    application('demo-app-6', people.aisha, 'accepted', 'I would own the compact dashboard, streaming answer states, keyboard accessibility, and clear recovery UI when a provider disconnects.'),
  ],
  'demo-reviewdale': [
    application('demo-app-7', people.priya, 'accepted', 'I have hands-on experience with BigQuery merge pipelines and data-quality gates. I can make completeness failures explainable and actionable.'),
    application('demo-app-8', people.arjun, 'accepted', 'I can help make campaign runs resumable and expose operational status through a clean internal dashboard.'),
    application('demo-app-9', people.daniel, 'rejected', 'I would focus on request orchestration, caching, and rate-limit handling across the collection pipeline.'),
  ],
};

const member = (person, joinedAt, stats) => ({ ...person, joined_at: joinedAt, stats });

const projectTeams = {
  'demo-supacron': [
    member(people.priyansh, '2026-07-18T09:30:00.000Z', { commits: 72, open_issues: 3, closed_issues: 22, open_prs: 2, closed_prs: 17, merged_prs: 15, last_commit: '2026-09-20T07:45:00.000Z' }),
    member(people.aisha, '2026-07-22T10:00:00.000Z', { commits: 38, open_issues: 2, closed_issues: 14, open_prs: 1, closed_prs: 11, merged_prs: 10, last_commit: '2026-09-18T15:20:00.000Z' }),
    member(people.daniel, '2026-07-25T10:00:00.000Z', { commits: 47, open_issues: 1, closed_issues: 19, open_prs: 2, closed_prs: 13, merged_prs: 12, last_commit: '2026-09-19T11:40:00.000Z' }),
    member(people.arjun, '2026-08-01T10:00:00.000Z', { commits: 29, open_issues: 3, closed_issues: 9, open_prs: 1, closed_prs: 8, merged_prs: 7, last_commit: '2026-09-17T08:10:00.000Z' }),
  ],
  'demo-interview-buddy': [
    member(people.priyansh, '2026-08-04T13:15:00.000Z', { commits: 68, open_issues: 3, closed_issues: 21, open_prs: 2, closed_prs: 18, merged_prs: 16, last_commit: '2026-09-20T08:05:00.000Z' }),
    member(people.lucas, '2026-08-06T10:00:00.000Z', { commits: 54, open_issues: 4, closed_issues: 17, open_prs: 2, closed_prs: 15, merged_prs: 13, last_commit: '2026-09-20T06:30:00.000Z' }),
    member(people.mei, '2026-08-09T10:00:00.000Z', { commits: 31, open_issues: 2, closed_issues: 12, open_prs: 1, closed_prs: 9, merged_prs: 8, last_commit: '2026-09-19T17:05:00.000Z' }),
    member(people.aisha, '2026-08-12T10:00:00.000Z', { commits: 26, open_issues: 1, closed_issues: 10, open_prs: 1, closed_prs: 8, merged_prs: 8, last_commit: '2026-09-18T13:45:00.000Z' }),
  ],
  'demo-reviewdale': [
    member(people.priyansh, '2026-06-10T07:45:00.000Z', { commits: 57, open_issues: 2, closed_issues: 24, open_prs: 1, closed_prs: 16, merged_prs: 15, last_commit: '2026-09-17T10:20:00.000Z' }),
    member(people.priya, '2026-06-15T10:00:00.000Z', { commits: 63, open_issues: 2, closed_issues: 26, open_prs: 1, closed_prs: 18, merged_prs: 17, last_commit: '2026-09-16T09:15:00.000Z' }),
    member(people.arjun, '2026-06-20T10:00:00.000Z', { commits: 41, open_issues: 3, closed_issues: 16, open_prs: 2, closed_prs: 12, merged_prs: 11, last_commit: '2026-09-15T12:25:00.000Z' }),
    member(people.mei, '2026-06-27T10:00:00.000Z', { commits: 24, open_issues: 1, closed_issues: 8, open_prs: 1, closed_prs: 7, merged_prs: 6, last_commit: '2026-09-14T16:50:00.000Z' }),
  ],
};

const repoMetrics = {
  'demo-supacron': { commitCount: 186, issueCount: 73, pullCount: 55 },
  'demo-interview-buddy': { commitCount: 179, issueCount: 70, pullCount: 56 },
  'demo-reviewdale': { commitCount: 185, issueCount: 82, pullCount: 58 },
};

const commitSeries = {
  'demo-supacron': [9, 14, 8, 17, 12, 19, 11],
  'demo-interview-buddy': [7, 11, 15, 10, 18, 13, 16],
  'demo-reviewdale': [12, 9, 16, 14, 11, 20, 15],
};

export const DEMO_PROFILE_STATS = {
  applications_sent: { total: 8, accepted: 4, pending: 2, rejected: 2 },
  applications_received: { total: 9, accepted: 5, pending: 2, rejected: 2 },
  ideas_posted: 2,
};

export const DEMO_PROJECT_STATS = {
  ratings: [
    { project: 'Supacron', project_id: 'demo-supacron', rating: 92, totalRating: 92, date: '2026-08-29', role: 'author' },
    { project: 'Interview Buddy', project_id: 'demo-interview-buddy', rating: 88, totalRating: 180, date: '2026-09-08', role: 'author' },
    { project: 'ReviewDale Benchmark', project_id: 'demo-reviewdale', rating: 84, totalRating: 264, date: '2026-09-16', role: 'contributor' },
  ],
  totalCommits: 550,
  totalIssues: 225,
  totalPRs: 169,
  mergedPRs: 138,
};

export const DEMO_USER_APPLICATIONS = [
  {
    id: 'demo-user-app-1',
    status: 'accepted',
    pitch: 'I can help make the collection pipeline observable, resumable, and safe to operate as its workload grows.',
    idea: { ...DEMO_PROJECTS[2], completion_status: 'approved', founder: people.priya },
  },
  {
    id: 'demo-user-app-2',
    status: 'pending',
    pitch: 'I would contribute the deterministic orchestration layer and the dashboard states for a reliable realtime experience.',
    idea: { ...DEMO_PROJECTS[1], founder: people.mei },
  },
];

export const getDemoProfile = () => ({ ...PRIYANSH_DEMO_PROFILE });

export const getDemoProject = (projectId) =>
  DEMO_PROJECTS.find((project) => project.id === projectId) || null;

export const getDemoProjectBundle = (projectId) => {
  const project = getDemoProject(projectId);
  if (!project) return null;

  const members = projectTeams[projectId] || [];
  const metrics = repoMetrics[projectId];
  const commits = commitSeries[projectId] || [];

  return {
    project,
    applications: DEMO_APPLICATIONS_BY_PROJECT[projectId] || [],
    team: {
      id: `demo-team-${projectId}`,
      idea_id: projectId,
      repo_name: project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      repo_url: project.repo_url,
      repo_owner: 'demo-founder',
      updated_at: '2026-09-20T08:30:00.000Z',
      whatsapp_url: 'https://wa.me/0000000000',
      slack_url: 'https://slack.com',
      discord_url: 'https://discord.gg/demo',
      member_profiles: members,
    },
    repoStats: {
      ...metrics,
      lastUpdated: '2026-09-20T08:30:00.000Z',
      isCached: false,
    },
    dailyCommitData: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Commits',
        data: commits,
        backgroundColor: 'rgba(132, 204, 22, 0.72)',
        borderRadius: 6,
      }],
    },
  };
};

export const isDemoProjectId = (projectId) => projectId?.startsWith('demo-');
