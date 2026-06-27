// ============================================================
// Preview mode — DEV ONLY. Lets the app render every authed page
// with mock data and no backend, for design iteration / screenshots.
// Enabled when localStorage 'kiln_preview' === '1' or ?preview=1.
// The screenshot pipeline (shoot.mjs) sets the flag before navigating.
// ============================================================
import axios from 'axios';
import supabase from './supabase';

export function isPreview() {
  if (!import.meta.env.DEV) return false;
  try {
    const u = new URL(window.location.href);
    if (u.searchParams.get('preview') === '1') {
      localStorage.setItem('kiln_preview', '1');
      return true;
    }
    return localStorage.getItem('kiln_preview') === '1';
  } catch {
    return false;
  }
}

const AV = (s) => `https://i.pravatar.cc/200?u=${s}`;

const FAKE_SESSION = {
  access_token: 'preview-token',
  refresh_token: 'preview-refresh',
  expires_at: Math.floor(Date.now() / 1000) + 3600,
  token_type: 'bearer',
  provider_token: 'preview-gh-token',
  user: {
    id: 'preview-user-id',
    email: 'avery@kiln.dev',
    user_metadata: {
      user_name: 'averystone',
      full_name: 'Avery Stone',
      name: 'Avery Stone',
      avatar_url: AV('avery'),
    },
    app_metadata: { provider: 'github' },
  },
};

// ---------- mock data ----------
const ideas = [
  { id: 'i1', title: 'Ledgerlite — a deliberately very long startup idea title to test truncation and wrapping behaviour', idea_desc: 'A dead-simple double-entry ledger for indie founders who hate spreadsheets. Looking for a frontend partner who cares about clean UX and snappy interactions, plus a longer description here to test how the card clamps multi-line text without breaking the layout or pushing the button down inconsistently.', dev_req: 'React, TypeScript, Postgres, Tailwind, Node, GraphQL, Stripe, Redis, Docker, AWS', status: 'open', created_at: '2026-06-20T10:00:00Z', founder: { full_name: 'Aria Mehta', avatar_url: AV('aria') } },
  { id: 'i2', title: 'Forge UI', idea_desc: 'An open component library generated straight from your design tokens. Need someone who lives and breathes accessibility and developer experience.', dev_req: 'CSS, Accessibility, Figma API', status: 'open', created_at: '2026-06-18T10:00:00Z', founder: { full_name: 'Kenji Rao', avatar_url: AV('kenji') } },
  { id: 'i3', title: 'Standup Bot', idea_desc: 'Async standups that summarise themselves. Backend-heavy with a sprinkle of LLMs. Looking for someone who enjoys clean APIs.', dev_req: 'Node, LLMs, Slack API', status: 'open', created_at: '2026-06-15T10:00:00Z', founder: { full_name: 'Sofia Lund', avatar_url: AV('sofia') } },
  { id: 'i4', title: 'Mapline', idea_desc: 'Turn any spreadsheet of addresses into a shareable, live map in seconds. Frontend-leaning with some geo work.', dev_req: 'Vue, Mapbox, Node', status: 'open', created_at: '2026-06-10T10:00:00Z', founder: { full_name: 'Diego Park', avatar_url: AV('diego') } },
  { id: 'i5', title: 'Crate', idea_desc: 'One-click reproducible dev environments for open-source repos. Systems-y, Rust + containers.', dev_req: 'Rust, Docker, Linux', status: 'closed', created_at: '2026-05-28T10:00:00Z', founder: { full_name: 'Noor Ali', avatar_url: AV('noor') } },
  { id: 'i6', title: 'Practa', idea_desc: 'Spaced-repetition for engineering interviews, built on real pull requests. Python + a bit of ML.', dev_req: 'Python, LLMs, Postgres', status: 'open', created_at: '2026-05-20T10:00:00Z', founder: { full_name: 'Liam Shaw', avatar_url: AV('liam') } },
];

const profile = {
  id: 'preview-user-id',
  full_name: 'Avery Stone',
  email: 'avery@kiln.dev',
  description: 'Full-stack builder who ships fast and sweats the details. Into dev-tools, fintech, and the occasional weekend game jam.',
  skills: 'React, TypeScript, Node, Postgres, Tailwind, Figma, Rust',
  avatar_url: AV('avery'),
  github_url: 'https://github.com/averystone',
  portfolio_url: 'https://averystone.dev',
  resume_url: 'https://example.com/resume.pdf',
};

const stats = {
  applications_sent: { total: 14, accepted: 5, pending: 6, rejected: 3 },
  applications_received: { total: 22, accepted: 8, pending: 9, rejected: 5 },
  ideas_posted: 4,
};

const projectStats = {
  ratings: [
    { project_id: 'p2', project: 'Forge UI', role: 'author', date: '2026-01-20', rating: 88, totalRating: 88 },
    { project_id: 'p3', project: 'Standup Bot', role: 'contributor', date: '2026-02-15', rating: 64, totalRating: 152 },
    { project_id: 'p1', project: 'Ledgerlite', role: 'author', date: '2026-05-01', rating: 142, totalRating: 294 },
  ],
  totalCommits: 1284,
  totalIssues: 86,
  totalPRs: 312,
  mergedPRs: 247,
};

const authoredProjects = [
  { id: 'p1', title: 'Ledgerlite — a sample company name that runs quite long', project_type: 'web app', repo_url: 'https://github.com/averystone/ledgerlite', project_link: 'https://ledgerlite.app', duration: 96, created_at: '2026-02-01', date: '2026-05-01', dev_req: 'React, TypeScript, Postgres, Tailwind, Stripe, Vite', idea_desc: 'A dead-simple double-entry ledger for indie founders. Shipped with a clean import flow and reconciliation that actually works.', video_url: '', logo_url: 'https://picsum.photos/seed/ledger/300/620', rating: 142, role: 'author' },
  { id: 'p2', title: 'Forge UI', project_type: 'library', repo_url: 'https://github.com/averystone/forge-ui', project_link: '', duration: 60, created_at: '2026-01-01', date: '2026-03-01', dev_req: 'CSS, Accessibility, Figma API, Rollup', idea_desc: 'An open component library generated from design tokens, with full keyboard and screen-reader support.', video_url: '', logo_url: 'https://picsum.photos/seed/forge/640/200', rating: 88, role: 'author' },
];

const contributedProjects = [
  { id: 'p3', title: 'Standup Bot', project_type: 'team', repo_url: 'https://github.com/sofia/standup-bot', project_link: 'https://standupbot.io', duration: 40, created_at: '2026-01-15', date: '2026-02-01', dev_req: 'Node, LLMs, Slack API', idea_desc: 'Async standups that summarise themselves — contributed the summarisation pipeline and Slack integration.', logo_url: 'https://picsum.photos/seed/standup/400/400', rating: 64, role: 'contributor' },
];

const userIdeas = [
  { id: 'i1', title: 'Ledgerlite', idea_desc: ideas[0].idea_desc, dev_req: ideas[0].dev_req, created_at: '2026-06-20T10:00:00Z', status: 'open', completion_status: null, founder: profile },
  { id: 'i9', title: 'Mapline', idea_desc: 'A live map from any spreadsheet.', dev_req: 'Vue, Mapbox', created_at: '2026-05-10T10:00:00Z', status: 'closed', completion_status: null, founder: profile },
  { id: 'i10', title: 'Crate', idea_desc: 'Reproducible dev environments.', dev_req: 'Rust, Docker', created_at: '2026-04-01T10:00:00Z', status: 'open', completion_status: 'review', founder: profile },
];

const applicationsSent = [
  { id: 'a1', status: 'accepted', pitch: 'I built a similar reconciliation engine last year and can move fast on the import flow. Keen to pair on the data model.', created_at: '2026-06-21T10:00:00Z', idea: { id: 'i2', title: 'Forge UI', idea_desc: 'An open component library generated straight from your design tokens. Need someone who lives and breathes accessibility and developer experience.', dev_req: 'CSS, Accessibility, Figma API', founder: { full_name: 'Kenji Rao', avatar_url: AV('kenji') } }, founder: { full_name: 'Kenji Rao', avatar_url: AV('kenji') } },
  { id: 'a2', status: 'pending', pitch: 'Strong Slack API background, shipped two bots to 10k+ workspaces. Happy to own the integration end-to-end.', created_at: '2026-06-19T10:00:00Z', idea: { id: 'i3', title: 'Standup Bot', idea_desc: 'Async standups that summarise themselves. Backend-heavy with a sprinkle of LLMs.', dev_req: 'Node, LLMs, Slack API', founder: { full_name: 'Sofia Lund', avatar_url: AV('sofia') } }, founder: { full_name: 'Sofia Lund', avatar_url: AV('sofia') } },
  { id: 'a3', status: 'rejected', pitch: 'Frontend-leaning, comfortable with Mapbox and large datasets. Would love to help with the live map.', created_at: '2026-06-12T10:00:00Z', idea: { id: 'i4', title: 'Mapline', idea_desc: 'Turn any spreadsheet of addresses into a shareable, live map in seconds.', dev_req: 'Vue, Mapbox, Node', founder: { full_name: 'Diego Park', avatar_url: AV('diego') } }, founder: { full_name: 'Diego Park', avatar_url: AV('diego') } },
];

const applicationsReceived = [
  { id: 'r1', status: 'pending', pitch: 'I shipped a similar double-entry engine last year and can move fast on the import flow and reconciliation. Would love to own the data model with you and get a first cut live this month.', created_at: '2026-06-22T10:00:00Z', profile: { full_name: 'Marco Diaz', avatar_url: AV('marco'), github_url: 'https://github.com/marcodiaz', portfolio_url: 'https://marco.dev', resume_url: 'https://example.com/r.pdf', skills: 'React, Node, Postgres', description: 'Backend-leaning full-stack dev who likes clean data models.' } },
  { id: 'r2', status: 'accepted', pitch: 'Frontend specialist obsessed with fast, accessible UIs. My portfolio has a couple of fintech dashboards with heavy tables — exactly this kind of work.', created_at: '2026-06-21T10:00:00Z', profile: { full_name: 'Priya Nair', avatar_url: AV('priya'), github_url: 'https://github.com/priyanair', portfolio_url: 'https://priya.design', skills: 'React, TypeScript, Tailwind', description: 'Design-minded frontend engineer.' } },
  { id: 'r3', status: 'rejected', pitch: 'Keen to help, mostly backend. Comfortable with Postgres and queues, can take on the sync layer.', created_at: '2026-06-18T10:00:00Z', profile: { full_name: 'Tom Becker', avatar_url: AV('tom'), github_url: 'https://github.com/tombecker', skills: 'Go, Postgres', description: 'Backend engineer.' } },
];

const team = {
  id: 't1',
  repo_name: 'ledgerlite',
  repo_url: 'https://github.com/averystone/ledgerlite',
  repo_owner: 'averystone',
  updated_at: '2026-06-25T10:00:00Z',
  member_profiles: [
    { id: 'm1', full_name: 'Avery Stone', email: 'avery@kiln.dev', avatar_url: AV('avery'), joined_at: '2026-04-01', github_url: 'https://github.com/averystone', github_username: 'averystone' },
    { id: 'm2', full_name: 'Priya Nair', email: 'priya@kiln.dev', avatar_url: AV('priya'), joined_at: '2026-04-15', github_url: 'https://github.com/priyanair', github_username: 'priyanair' },
    { id: 'm3', full_name: 'Marco Diaz', email: 'marco@kiln.dev', avatar_url: AV('marco'), joined_at: '2026-05-02', github_url: 'https://github.com/marcodiaz', github_username: 'marcodiaz' },
  ],
};

const repoStats = {
  commitCount: 1284,
  issueCount: 86,
  pullCount: 312,
  isCached: false,
  lastUpdated: '2026-06-26T18:30:00Z',
  dailyCommits: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [{ label: 'Commits', data: [12, 19, 8, 22, 15, 6, 17], backgroundColor: '#9DCB1A', borderRadius: 6 }],
  },
};

const adminSubmissions = [
  {
    id: 's1', idea_id: 'i1', title: 'Ledgerlite', repo_name: 'ledgerlite',
    description: 'A dead-simple double-entry ledger for indie founders. Submitting for review — logo, README, demo video and live link are all attached.',
    logo_url: '', project_link: 'https://ledgerlite.app', repo_url: 'https://github.com/averystone/ledgerlite',
    video_url: 'https://www.youtube.com/embed/aqz-KE-bpKQ', start_date: '2026-02-01',
    repo_stats: { commitCount: 1284, issueCount: 86, pullCount: 312 },
    mem_stats: [
      { full_name: 'Avery Stone', avatar_url: AV('avery'), github_username: 'averystone', commits: 642, open_pull_requests: 3, closed_pull_requests: 12, merged_pull_requests: 128, open_issues: 2, closed_issues: 44, inactive_days: 0, joined_at: '2026-04-01' },
      { full_name: 'Priya Nair', avatar_url: AV('priya'), github_username: 'priyanair', commits: 318, open_pull_requests: 1, closed_pull_requests: 8, merged_pull_requests: 96, open_issues: 0, closed_issues: 21, inactive_days: 2, joined_at: '2026-04-15' },
      { full_name: 'Marco Diaz', avatar_url: AV('marco'), github_username: 'marcodiaz', commits: 224, open_pull_requests: 0, closed_pull_requests: 5, merged_pull_requests: 58, open_issues: 1, closed_issues: 17, inactive_days: 0, joined_at: '2026-05-02' },
    ],
  },
  {
    id: 's2', idea_id: 'i6', title: 'Practa', repo_name: 'practa',
    description: 'Spaced-repetition for engineering interviews built on real PRs. README and demo attached, no open blocking issues.',
    logo_url: '', project_link: 'https://practa.dev', repo_url: 'https://github.com/liamshaw/practa',
    video_url: '', start_date: '2026-03-10',
    repo_stats: { commitCount: 540, issueCount: 12, pullCount: 88 },
    mem_stats: [
      { full_name: 'Liam Shaw', avatar_url: AV('liam'), github_username: 'liamshaw', commits: 410, open_pull_requests: 2, closed_pull_requests: 6, merged_pull_requests: 64, open_issues: 1, closed_issues: 9, inactive_days: 5, joined_at: '2026-03-10' },
    ],
  },
];

// ---------- endpoint router ----------
function matchMock(url, method) {
  const u = url;
  if (u.includes('/admin/submissions') && method === 'get') return { success: true, data: adminSubmissions };
  if (u.includes('/idealist/verify-onboarding')) return { success: true, onboarding: true };
  if (u.includes('/data/application-stats/')) return { success: true, data: { total: 3, accepted: 1, pending: 1, rejected: 1 } };
  if (u.includes('/application/details/')) return { success: true, data: applicationsReceived };
  if (u.includes('/manage-team/check-team/')) return { success: true, exists: true, data: team };
  if (u.includes('/manage-team/get-team/')) return { success: true, data: team };
  if (u.includes('/github/repo-stats/')) return { success: true, data: repoStats };
  if (u.includes('/github/member-stats/')) {
    const gh = (u.match(/member-stats\/[^/]+\/[^/]+\/([^/?]+)/) || [])[1];
    const byUser = {
      averystone: { commits: 642, mergedPRs: 128, closedIssues: 44, total: 294 },
      priyanair: { commits: 318, mergedPRs: 96, closedIssues: 21, total: 188 },
      marcodiaz: { commits: 224, mergedPRs: 58, closedIssues: 17, total: 121 },
    };
    return { success: true, data: { ...(byUser[gh] || { commits: 0, mergedPRs: 0, closedIssues: 0, total: 0 }), lastUpdated: '2026-06-26T18:30:00Z', isCached: false } };
  }
  if (u.includes('/manage-team/')) return { success: true };
  if (u.includes('/profile/get-project-details')) return { success: true, data: [...authoredProjects, ...contributedProjects] };
  if (u.includes('/profile/get-project-stats')) return { success: true, data: projectStats };
  if (u.includes('/profile/details')) return { success: true, data: profile };
  if (u.includes('/data/stats')) return { success: true, data: stats };
  if (u.includes('/application/user')) return { data: applicationsSent, error: null };
  if (u.includes('/idea/user')) return { success: true, data: userIdeas };
  if (/\/api\/idea\/[^/]+(\?|$)/.test(u) && !u.includes('/user')) return { success: true, data: ideas[0] };
  if (u.includes('/api/idea')) return { success: true, data: ideas };
  if (u.includes('/validate/idea')) return { success: true, title: { isValid: true }, description: { isValid: true }, devReq: { isValid: true }, additionalDetails: { isValid: true } };
  return undefined;
}

export function installPreview() {
  // mark <html> so styles/components can react if needed
  document.documentElement.setAttribute('data-preview', '1');
  try { localStorage.setItem('provider_token', 'preview-gh-token'); } catch {}

  // --- stub Supabase auth ---
  supabase.auth.getSession = async () => ({ data: { session: FAKE_SESSION }, error: null });
  supabase.auth.getUser = async () => ({ data: { user: FAKE_SESSION.user }, error: null });
  supabase.auth.onAuthStateChange = (cb) => {
    setTimeout(() => cb('INITIAL_SESSION', FAKE_SESSION), 0);
    return { data: { subscription: { unsubscribe() {} } } };
  };
  supabase.auth.signInWithOAuth = async () => ({ data: {}, error: null });
  supabase.auth.signOut = async () => ({ error: null });

  // --- stub supabase.from(...).select()... chains ---
  const ok = (data) => Promise.resolve({ data, error: null });
  supabase.from = () => {
    const chain = {
      select: () => chain,
      insert: () => chain,
      update: () => chain,
      delete: () => chain,
      eq: () => chain,
      order: () => chain,
      limit: () => chain,
      single: () => ok(profile),
      maybeSingle: () => ok(profile),
      then: (res, rej) => ok([]).then(res, rej),
    };
    return chain;
  };

  // --- mock axios backend calls ---
  axios.defaults.adapter = async (config) => {
    const url = config.url || '';
    const out = matchMock(url, (config.method || 'get').toLowerCase());
    const data = out === undefined ? { success: true, data: [] } : out;
    return { data, status: 200, statusText: 'OK', headers: {}, config, request: {} };
  };

  // eslint-disable-next-line no-console
  console.log('[kiln] preview mode on — mock data, no backend');
}
