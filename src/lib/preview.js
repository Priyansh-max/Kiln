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
  { id: 'i1', title: 'Ledgerlite', idea_desc: 'A dead-simple double-entry ledger for indie founders who hate spreadsheets. Looking for a frontend partner who cares about clean UX and snappy interactions.', dev_req: 'React, TypeScript, Postgres', status: 'open', created_at: '2026-06-20T10:00:00Z', founder: { full_name: 'Aria Mehta', avatar_url: AV('aria') } },
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
  { id: 'p1', title: 'Ledgerlite', project_type: 'web app', repo_url: 'https://github.com/averystone/ledgerlite', project_link: 'https://ledgerlite.app', duration: 96, created_at: '2026-02-01', date: '2026-05-01', dev_req: 'React, TypeScript, Postgres, Tailwind, Stripe, Vite', idea_desc: 'A dead-simple double-entry ledger for indie founders. Shipped with a clean import flow and reconciliation that actually works.', video_url: '', logo_url: '', rating: 142, role: 'author' },
  { id: 'p2', title: 'Forge UI', project_type: 'library', repo_url: 'https://github.com/averystone/forge-ui', project_link: '', duration: 60, created_at: '2026-01-01', date: '2026-03-01', dev_req: 'CSS, Accessibility, Figma API, Rollup', idea_desc: 'An open component library generated from design tokens, with full keyboard and screen-reader support.', video_url: '', logo_url: '', rating: 88, role: 'author' },
];

const contributedProjects = [
  { id: 'p3', title: 'Standup Bot', project_type: 'bot', repo_url: 'https://github.com/sofia/standup-bot', project_link: 'https://standupbot.io', duration: 40, created_at: '2026-01-15', date: '2026-02-01', dev_req: 'Node, LLMs, Slack API', idea_desc: 'Async standups that summarise themselves — contributed the summarisation pipeline and Slack integration.', rating: 64, role: 'contributor' },
];

const userIdeas = [
  { id: 'i1', title: 'Ledgerlite', idea_desc: ideas[0].idea_desc, dev_req: ideas[0].dev_req, created_at: '2026-06-20T10:00:00Z', status: 'open', completion_status: null, founder: profile },
  { id: 'i9', title: 'Mapline', idea_desc: 'A live map from any spreadsheet.', dev_req: 'Vue, Mapbox', created_at: '2026-05-10T10:00:00Z', status: 'closed', completion_status: null, founder: profile },
  { id: 'i10', title: 'Crate', idea_desc: 'Reproducible dev environments.', dev_req: 'Rust, Docker', created_at: '2026-04-01T10:00:00Z', status: 'open', completion_status: 'review', founder: profile },
];

const applicationsSent = [
  { id: 'a1', status: 'accepted', pitch: 'I built a similar reconciliation engine last year and can move fast on the import flow. Keen to pair on the data model.', created_at: '2026-06-21T10:00:00Z', idea: { id: 'i2', title: 'Forge UI', founder: { full_name: 'Kenji Rao', avatar_url: AV('kenji') } }, founder: { full_name: 'Kenji Rao', avatar_url: AV('kenji') } },
  { id: 'a2', status: 'pending', pitch: 'Strong Slack API background, shipped two bots to 10k+ workspaces. Happy to own the integration end-to-end.', created_at: '2026-06-19T10:00:00Z', idea: { id: 'i3', title: 'Standup Bot', founder: { full_name: 'Sofia Lund', avatar_url: AV('sofia') } }, founder: { full_name: 'Sofia Lund', avatar_url: AV('sofia') } },
  { id: 'a3', status: 'rejected', pitch: 'Frontend-leaning, comfortable with Mapbox and large datasets. Would love to help with the live map.', created_at: '2026-06-12T10:00:00Z', idea: { id: 'i4', title: 'Mapline', founder: { full_name: 'Diego Park', avatar_url: AV('diego') } }, founder: { full_name: 'Diego Park', avatar_url: AV('diego') } },
];

// ---------- endpoint router ----------
function matchMock(url, method) {
  const u = url;
  if (u.includes('/idealist/verify-onboarding')) return { success: true, onboarding: true };
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
