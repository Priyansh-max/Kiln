// Local design-screenshot pipeline: drives the system Chrome headless against
// the dev server, captures each route (in preview mode for authed pages) to PNGs.
// Usage: node shoot.mjs            (all)
//        node shoot.mjs profile    (filter by label/path substring)
import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'fs';

const CHROME = process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BASE = process.env.BASE || 'http://localhost:5173';
const OUT =
  process.env.OUT ||
  'C:/Users/buddy/AppData/Local/Temp/claude/D--Personal-Projects-CoFoundry/cd1da7e0-7984-474f-ab69-07d657cc5b81/scratchpad/shots';
mkdirSync(OUT, { recursive: true });

const filter = process.argv[2] || '';

// each: { path, label, theme='light', w=1440, h=1000, full=true, preview=true, clicks=[] }
const SHOTS = [
  { path: '/idealist', label: 'idealist' },
  { path: '/idealist', label: 'idealist', theme: 'dark' },
  { path: '/idealist', label: 'idealist', w: 390, h: 844 },
  { path: '/post-idea', label: 'post-idea' },
  { path: '/onboarding', label: 'onboarding' },
  { path: '/profile', label: 'profile-applications' },
  { path: '/profile', label: 'profile-applications', theme: 'dark' },
  { path: '/profile', label: 'profile-posted', clicks: ['Your Ideas'] },
  { path: '/profile', label: 'profile-authored', clicks: ['Authored'] },
  { path: '/profile', label: 'profile-contributed', clicks: ['Contributed'] },
  { path: '/profile', label: 'profile-applications', w: 390, h: 844 },
  { path: '/details/i1', label: 'idea-details' },
  { path: '/manage-team/i1', label: 'manage-overview' },
  { path: '/manage-team/i1', label: 'manage-details', clicks: ['Details'] },
  { path: '/manage-team/i1', label: 'manage-contact', clicks: ['Contact'] },
  { path: '/manage-team/i1', label: 'manage-submit', clicks: ['Submit'] },
  { path: '/creators-lab/i1', label: 'creators-lab' },
  { path: '/admin', label: 'admin' },
];

const shots = SHOTS.filter((s) => !filter || s.label.includes(filter) || s.path.includes(filter));

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--hide-scrollbars', '--force-color-profile=srgb'],
});

async function clickByText(page, text) {
  await page.evaluate((t) => {
    const els = [...document.querySelectorAll('button, a, [role=tab]')];
    const el = els.find((e) => (e.textContent || '').trim().toLowerCase().includes(t.toLowerCase()));
    if (el) el.click();
  }, text);
}

for (const s of shots) {
  const { path, label, theme = 'light', w = 1440, h = 1000, full = true, preview = true, clicks = [] } = s;
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
  await page.evaluateOnNewDocument(
    (t, pv) => {
      try {
        localStorage.setItem('theme', t);
        if (pv) localStorage.setItem('kiln_preview', '1');
        else localStorage.removeItem('kiln_preview');
      } catch {}
    },
    theme,
    preview
  );
  try {
    await page.goto(BASE + path, { waitUntil: 'domcontentloaded', timeout: 30000 });
  } catch (e) {
    console.error('goto issue', path, e.message);
  }
  await new Promise((r) => setTimeout(r, 3000));
  for (const c of clicks) {
    await clickByText(page, c);
    await new Promise((r) => setTimeout(r, 1300));
  }
  const file = `${OUT}/${label}-${theme}-${w}x${h}.png`;
  await page.screenshot({ path: file, fullPage: full });
  console.log('shot', file);
  await page.close();
}

await browser.close();
console.log('done ->', OUT);
