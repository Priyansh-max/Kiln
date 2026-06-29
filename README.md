<div align="center">

# 🔥 Kiln

### **Post a project/product idea, find the people who'll actually build it, and ship it on GitHub.**

*An idea → a team that builds · Commits & merged PRs → measurable merit — your contribution, on the record.*
**Merit you can measure.**

<br/>

[![Get Started](https://img.shields.io/badge/⚡_GET_STARTED-84CC16?style=for-the-badge&labelColor=1E2A14&color=84CC16)](#-getting-started)

![version](https://img.shields.io/badge/version-1.0.0-84CC16?style=flat-square&labelColor=222)
![license](https://img.shields.io/badge/license-MIT-84CC16?style=flat-square&labelColor=222)
![platform](https://img.shields.io/badge/platform-Web-84CC16?style=flat-square&labelColor=222)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-1A1A1A?style=for-the-badge&logo=vite&logoColor=646CFF)
![Tailwind](https://img.shields.io/badge/Tailwind-0B1120?style=for-the-badge&logo=tailwindcss&logoColor=38BDF8)
![Supabase](https://img.shields.io/badge/Supabase-1C1C1C?style=for-the-badge&logo=supabase&logoColor=3ECF8E)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Gemini](https://img.shields.io/badge/Gemini-1A1A1A?style=for-the-badge&logo=googlegemini&logoColor=8E75FF)

</div>

---

## ✨ What is Kiln?

A **kiln** is where raw clay is fired into something solid. This one does the same for ideas.

Most startup ideas die in a notes app because the one person who had them couldn't build them alone. **Kiln** fixes the matching problem: founders post ideas, builders find the ones worth their time and apply, teams form, and the actual work happens **on GitHub** — where commits and merged PRs are public, verifiable proof of who did what.

No vanity metrics. The only score that counts is the work you shipped.

---

## 🔭 How it works

| | | |
|---|---|---|
| **1 · Post** | A founder posts an idea with the problem, the stack, and the skills they need. |
| **2 · Find** | Builders browse open ideas and apply to the ones they want to ship. |
| **3 · Build** | The founder accepts a team and work moves to a connected GitHub repo. |
| **4 · Measure** | Commits, merged PRs and activity are pulled straight from GitHub into a merit score — fair, transparent, abuse-resistant. |

---

## 🧰 Features

- 🪧 **Idea board** — post, browse, and filter startup ideas by stack and required skills.
- 🤝 **Apply & assemble** — builders apply; founders review applications and accept/reject to form a team.
- 🐙 **GitHub-native** — repos, commits, issues and PRs synced live via the GitHub API.
- 🏆 **Merit scoring** — distinct, transparent point formulas for authors, direct contributors, and open-source PR contributors.
- 📊 **Team dashboards** — repo activity, commit charts, and team breakdowns for every project.
- 👤 **Profiles & leaderboard** — authored vs. contributed work, with a CreatorsLab leaderboard.
- 🛡️ **Admin review** — projects pass a quality checklist (logo, demo link, README, video proof) before they count.
- 🤖 **AI assist** — Google Gemini helps validate and sharpen idea submissions.
- 📧 **Email notifications** — applicants and founders stay in the loop on status changes.

---

## 🏆 Merit, measured

Points reward real, sustained contribution and penalize spam — scored differently per role:

- **Project Author** — completion bonus + active days + team size + merged PRs − spam penalty.
- **Contributor** (direct commit access) — active days + valid commits − inactive days.
- **Open-Source Contributor** (PRs) — active days + merged PRs − inactive days.

Projects must clear a **quality checklist** (logo, deployment/demo link, accurate description, README, video proof) to be accepted.

---

## 🛠️ Tech Stack

**Frontend** — React 18 · Vite · Tailwind CSS · shadcn/ui · Framer Motion · ApexCharts / Chart.js
**Backend** — Node.js · Express · Octokit (GitHub API) · Nodemailer
**Data & Auth** — Supabase (Postgres + Auth) · Redis (caching)
**AI** — Google Gemini

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** 18+
- A **Supabase** project (URL + keys)
- A **Google Gemini** API key
- *(Optional)* a **Redis** instance for backend caching

### 1. Clone

```bash
git clone https://github.com/Priyansh-max/FindMyTeam.git
cd FindMyTeam
```

### 2. Configure environment

Create a `.env` in the project root:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_BACKEND_URL=http://localhost:5000
```

And a `backend/.env`:

```env
PORT=5000
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
GEMINI_API_KEY=your_gemini_api_key
ADMIN_USER_ID=your_admin_user_id
EMAIL_USER=your_email
EMAIL_APP_PASSWORD=your_email_app_password
REDIS_URL=your_redis_url
BACKEND_URL=http://localhost:5000
```

### 3. Run the frontend

```bash
npm install
npm run dev
```

### 4. Run the backend

```bash
cd backend
npm install
npm run dev
```

The app runs on Vite's dev server (default `http://localhost:5173`) and talks to the backend on `http://localhost:5000`.

---

## 📁 Project Structure

```
.
├── src/              # React app — pages, components, UI
│   ├── pages/        # Landing, Ideas, IdeaDetails, Profile, Manage, Admin, CreatorsLab…
│   ├── components/   # Feature + shared UI components
│   └── lib/          # Helpers
├── backend/          # Express API
│   ├── routes/       # ideas, applications, github, manage-team, admin, profile…
│   ├── controllers/  # Route logic
│   └── services/     # GitHub, email, scoring, etc.
└── supabase/         # Database config
```

---

## 🤝 Contributing

Contributions are welcome — Kiln is built on the idea that good work should be visible. Open an issue to discuss a change, or fork, branch, and send a PR.

---

## 📄 License

Released under the [MIT License](LICENSE.md). © 2026 Priyansh Agarwal.

<div align="center">
<br/>
<sub>Built to turn raw ideas into shipped software. 🔥</sub>
</div>
