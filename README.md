# Welcome to Your Miaoda Project
Miaoda Application Link URL
    URL:https://medo.dev/projects/app-c331x9fzkmwx

# Lassa Fever Surveillance Platform

Real-time Lassa Fever surveillance, outbreak tracking, and predictive analytics across Nigeria — built with React 18 + TypeScript + Vite + Tailwind CSS + Supabase.

---

## Project Structure

```
project-root/
├── index.html              ← Vite entry (points to /src/main.tsx)
├── vite.config.ts          ← Vite config (React + SVGR + path alias)
├── package.json            ← Scripts: dev / build / preview
├── vercel.json             ← SPA rewrite rules for Vercel
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── src/
│   ├── main.tsx            ← React DOM entry point
│   ├── App.tsx             ← Root component
│   ├── index.css           ← Global styles + design tokens
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── sections/       ← 8 page sections
│   │   ├── common/         ← DataEntryModal, PageMeta, RouteGuard
│   │   └── ui/             ← shadcn/ui components
│   ├── db/supabase.ts      ← Supabase client
│   ├── contexts/
│   ├── hooks/
│   ├── lib/
│   └── types/
└── public/
    ├── favicon.png
    └── robots.txt
```

---

## Local Development

### Prerequisites
- Node.js >= 18
- pnpm (`npm install -g pnpm`)

### Setup

```bash
# 1. Install dependencies
pnpm install

# 2. Create your environment file
cp .env.example .env

# 3. Fill in your Supabase credentials in .env
#    VITE_SUPABASE_URL=https://your-project.supabase.co
#    VITE_SUPABASE_ANON_KEY=your-anon-key

# 4. Start the dev server
pnpm dev
# Opens at http://localhost:5173
```

### Build for production

```bash
pnpm run build
# Outputs to dist/
```

### Preview production build locally

```bash
pnpm run preview
# Opens at http://localhost:4173
```

---

## Deploying to Vercel

### Step 1 — Import the project

1. Push your project to a GitHub / GitLab / Bitbucket repository
2. Go to vercel.com → Add New Project → import your repo
3. Vercel will auto-detect Vite as the framework

### Step 2 — Set environment variables

In Vercel → Project → Settings → Environment Variables, add:

| Name                    | Value                                |
|-------------------------|--------------------------------------|
| VITE_SUPABASE_URL       | https://your-project.supabase.co     |
| VITE_SUPABASE_ANON_KEY  | your-anon-public-key                 |

Both variables must be prefixed with VITE_ — Vite only exposes variables with this prefix to the browser bundle.

### Step 3 — Deploy

Click Deploy. Vercel will run:

```
pnpm install
vite build
```

and publish the contents of dist/ automatically.

The included vercel.json handles SPA routing — all paths are rewritten to index.html so React Router works correctly on direct URL access and page refresh.

---

## Environment Variables Reference

| Variable               | Required | Description                             |
|------------------------|----------|-----------------------------------------|
| VITE_SUPABASE_URL      | Yes      | Your Supabase project URL               |
| VITE_SUPABASE_ANON_KEY | Yes      | Supabase anonymous/public key           |

---

## Tech Stack

| Layer         | Technology                        |
|---------------|-----------------------------------|
| UI Framework  | React 18 + TypeScript             |
| Build Tool    | Vite 5                            |
| Styling       | Tailwind CSS 3 + shadcn/ui        |
| Charts        | Recharts                          |
| Maps          | Leaflet                           |
| Backend       | Supabase (PostgreSQL + RLS)       |
| Deployment    | Vercel                            |

---

## Troubleshooting

### "Failed to resolve /src/main.tsx from index.html"
Cause: The src/ folder is missing — you likely extracted an older zip or only partial files.
Fix: Re-download the latest export from the platform and extract the full zip, keeping the directory structure intact.

### Build fails with miaoda plugin error
Cause: You have an old vite.config.ts that imports miaodaDevPlugin.
Fix: Replace vite.config.ts with the current version (no miaoda-sc-plugin import).

### 404 on page refresh in production
Cause: Missing vercel.json rewrite rules.
Fix: Make sure vercel.json is at the project root.

### Blank page after deploy
Cause: Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY env vars in Vercel.
Fix: Add both variables in Vercel → Project Settings → Environment Variables, then redeploy.
