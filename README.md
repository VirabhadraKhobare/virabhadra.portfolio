# virabhadra.portfolio

Premium full stack developer portfolio for Virbhadra Khobare.

## Stack

- Frontend: React, Vite, Tailwind CSS, Framer Motion, React Router DOM, Axios
- Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, Nodemailer

## Project Layout

- `frontend` - React portfolio, blog pages, and admin dashboard UI
- `backend` - Express API, MongoDB models, auth, CRUD, and analytics

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables:

- Copy `backend/.env.example` to `backend/.env`
- Copy `frontend/.env.example` to `frontend/.env`

3. Seed the admin user:

```bash
npm run seed
```

4. Start both apps:

```bash
npm run dev
```

## Environment Variables

Backend variables:

- `PORT` - API port
- `CLIENT_URL` - Frontend origin for CORS and sitemap links
- `MONGODB_URI` - MongoDB Atlas or local Mongo connection string
- `JWT_SECRET` - Signing secret for admin authentication
- `JWT_EXPIRES_IN` - JWT expiry, for example `7d`
- `ADMIN_EMAIL` - Seeded admin login email
- `ADMIN_PASSWORD` - Seeded admin login password
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` - Optional email delivery

Frontend variables:

- `VITE_API_URL` - API base URL, for example `http://localhost:5000/api`

## Main Features

- Premium hero with typing effect, orbit animation, and glass UI
- About, skills, projects, experience, certificates, achievements, services, blog, and contact sections
- Light and dark themes with persistence
- Multi-language toggle with persisted state
- GitHub stats integration and AI portfolio chatbot
- Backend blog, contact, analytics, and admin dashboard
- JWT-secured admin access and MongoDB-backed CRUD models

## Deployment

### 1. Deploy Backend on Render

1. Push this repository to GitHub.
2. In Render, create a new Web Service from the repo.
3. Render settings:
	- Root Directory: `backend`
	- Build Command: `npm install`
	- Start Command: `npm start`
4. Add backend environment variables in Render:
	- `NODE_ENV=production`
	- `PORT=5000` (Render also provides a port internally)
	- `MONGODB_URI=<your_mongodb_atlas_connection_string>`
	- `JWT_SECRET=<long_random_secret>`
	- `JWT_EXPIRE=7d`
	- `CLIENT_URL=https://<your-vercel-domain>`
	- `SERVER_URL=https://<your-render-service>.onrender.com`
	- `COOKIE_SECRET=<long_random_cookie_secret>`
	- Optional stats values:
	  - `GITHUB_USERNAME`, `GITHUB_TOKEN`
	  - `LEETCODE_USERNAME`, `CODEFORCES_HANDLE`, `HACKERRANK_HANDLE`
	  - `ACHIEVEMENTS_REFRESH_MS=43200000`
	- Optional mail values:
	  - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`
	- Admin seed/login values:
	  - `ADMIN_EMAIL`, `ADMIN_PASSWORD`
5. Deploy and verify:
	- `https://<your-render-service>.onrender.com/api/health`

Note: You can also use the included root-level `render.yaml` blueprint for faster setup.

### 2. Deploy Frontend on Vercel

1. In Vercel, import the same GitHub repository.
2. Set project root to `frontend`.
3. Build settings:
	- Build Command: `npm run build`
	- Output Directory: `dist`
4. Add frontend environment variables in Vercel:
	- `VITE_API_URL=https://<your-render-service>.onrender.com/api`
	- `VITE_BACKEND_URL=https://<your-render-service>.onrender.com`
5. Deploy.

The included `frontend/vercel.json` handles SPA rewrites for React Router routes.

### 3. Final Production Wiring

1. Copy your Vercel production URL.
2. Update Render `CLIENT_URL` with that exact URL and redeploy backend.
3. If you use a Vercel preview domain as well, add both URLs comma-separated in `CLIENT_URL`.
4. Confirm from browser:
	- Frontend loads
	- API calls succeed
	- `GET /api/health` returns `{ "status": "ok" }`
