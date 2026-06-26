// Local design-screenshot pipeline: drives the system Chrome headless against
// the dev server, captures each route at given viewports/themes to PNGs.
// In-app routes use preview mode (mock data + stubbed auth, dev only).
// Usage: node shoot.mjs                 (all shots)
//        node shoot.mjs profile         (filter by label/path substring)
import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'fs';

const CHROME = process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BASE = process.env.BASE || 'http://localhost:5173';
const OUT =
  process.env.OUT ||
  'C:/Users/buddy/AppData/Local/Temp/claude/D--Personal-Projects-CoFoundry/cd1da7e0-7984-474f-ab69-07d657cc5b81/scratchpad/shots';
mkdirSync(OUT, { recursive: true });

const filter = process.argv[2] || '';

// [path, label, theme, width, height, fullPage, preview]
const SHOTS = [
  ['/idealist', 'idealist', 'light', 1440, 1000, true, true],
  ['/idealist', 'idealist', 'dark', 1440, 1000, true, true],
  ['/post-idea', 'post-idea', 'light', 1440, 1000, true, true],
  ['/onboarding', 'onboarding', 'light', 1440, 1000, true, true],
  ['/profile', 'profile', 'light', 1440, 1000, true, true],
  ['/profile', 'profile', 'dark', 1440, 1000, true, true],
  ['/details/i1', 'idea-details', 'light', 1440, 1000, true, true],
  ['/manage-team/i1', 'manage', 'light', 1440, 1000, true, true],
  ['/creators-lab/i1', 'creators-lab', 'light', 1440, 1000, true, true],
  ['/admin', 'admin', 'light', 1440, 1000, true, true],
  ['/idealist', 'idealist', 'light', 390, 844, true, true],
  ['/profile', 'profile', 'light', 390, 844, true, true],
];

const shots = SHOTS.filter(([p, label]) => !filter || label.includes(filter) || p.includes(filter));

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--hide-scrollbars', '--force-color-profile=srgb'],
});

for (const [path, label, theme, w, h, full, preview] of shots) {
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
  await new Promise((r) => setTimeout(r, 3200)); // let auth stub + fetch + anims settle
  const file = `${OUT}/${label}-${theme}-${w}x${h}.png`;
  await page.screenshot({ path: file, fullPage: full });
  console.log('shot', file);
  await page.close();
}

await browser.close();
console.log('done ->', OUT);
