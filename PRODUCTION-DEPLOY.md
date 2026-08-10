# Frontend production deploy

## Netlify or Vercel

| Setting | Value |
|---------|--------|
| Repo | `novora-solutions-website-react-app` |
| Branch | **`main`** |
| Build | `npm run build` |
| Publish directory | `dist` |
| Node version | 20 |

## Environment

```env
VITE_API_URL=/api/v1
```

## API proxy

Requests to `/api/*` proxy to Render:

`https://novora-solutions-website-backend.onrender.com`

Configured in:
- `netlify.toml`
- `vercel.json`
- `public/_redirects`

## Custom domain

Point `novorasolutions.com` and `www.novorasolutions.com` to your host. HTTPS redirects are in `public/_redirects`.

## After deploy — verify

- [ ] `https://novorasolutions.com/team` — 5 team photos visible
- [ ] `https://novorasolutions.com/careers` — job listings load (needs backend seeded)
- [ ] `https://novorasolutions.com/contact` — form submits
- [ ] `https://novorasolutions.com/admin` — admin login works

Backend must be healthy first — see `../novora-solutions-website-backend/PRODUCTION-DEPLOY.md`.
