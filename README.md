# Novora Solutions — Frontend

React + Vite marketing site and admin CMS UI for Novora Solutions.

## Related repository

**API backend:** [novora-solutions-website-backend](https://github.com/rishisankhla/novora-solutions-website-backend)

The frontend talks to the backend exclusively via HTTP (`/api/v1`). No database or server logic lives in this repo.

## Quick start

```bash
cp .env.example .env

# Install & run frontend + backend together (required for CMS content)
npm install
npm run dev:all
```

> **Important:** `npm run dev` alone only starts the frontend. Team, blog, and portfolio need the API on port 5000 — use `npm run dev:all`.

- Frontend: http://localhost:3000
- API (sibling repo): http://localhost:5000

Or run separately in two terminals:

```bash
# Terminal 1 — backend repo (../novora-solutions-website-backend)
npm run dev

# Terminal 2 — this repo
npm run dev
```

## Environment

| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | API base path. Default `/api/v1` (proxied to :5000 in dev) |

All server secrets (MongoDB, JWT, SMTP, Supabase) belong in the **backend** `.env`.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Vite dev server |
| `npm run dev:api` | Start sibling backend |
| `npm run dev:all` | Frontend + backend concurrently |
| `npm run build` | Production build → `dist/` |

## Admin

http://localhost:3000/admin — requires backend running and seeded admin user (`npm run seed` in backend repo).

## Production

Set `VITE_API_URL` to your deployed API (e.g. `https://api.novorasolutions.com/api/v1`) and ensure backend `CLIENT_ORIGIN` matches your frontend domain.
