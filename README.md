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
# virabhadra.portfolio

Professional full‑stack portfolio for Virabhadra Khobare — React + Vite frontend with an Express + MongoDB API backend.

Live demo

- Frontend: https://virabhadra-portfolio-frontend.vercel.app/

Tech stack

- Frontend: React, Vite, Tailwind CSS, Framer Motion, React Router, Axios
- Backend: Node.js, Express, MongoDB + Mongoose, JWT authentication, Nodemailer

Quick start (local)

1. Install dependencies:

```bash
npm install
```

2. Create environment files:

- Copy `backend/.env.example` → `backend/.env` and fill values
- Copy `frontend/.env.example` → `frontend/.env` and fill values

3. Seed admin user (optional):

```bash
cd backend
npm run seed
```

4. Start both apps in development:

```bash
# root
npm run dev
```

Environment variables (high level)

- Backend (set on Render / production): `MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL` (set to your Vercel URL), `SERVER_URL`, `COOKIE_SECRET`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`.
- Optional: `GITHUB_TOKEN`, `LEETCODE_USERNAME`, `CODEFORCES_HANDLE`, `SMTP_*` for email delivery.
- Frontend (set on Vercel): `VITE_API_URL` = `https://<your-render-service>.onrender.com/api`, `VITE_BACKEND_URL` = `https://<your-render-service>.onrender.com`.

Deployment

1. Frontend: deploy the `frontend` folder to Vercel (Framework: Vite).
	- Build Command: `npm run build`
	- Output Directory: `dist`
	- Add Vercel env vars: `VITE_API_URL` and `VITE_BACKEND_URL`.

2. Backend: deploy the `backend` folder on Render as a Web Service.
	- Build: `npm install`
	- Start: `npm start`
	- Use the included `render.yaml` as a blueprint, and set production env vars on Render.

Verification

- Frontend: open https://virabhadra-portfolio-frontend.vercel.app/ (live demo)
- API health: `https://<your-render-service>.onrender.com/api/health` should return `{ "status": "ok" }`

Notes

- Keep all `SECRET` / `TOKEN` values private and set them only in the platform's environment settings (Render / Vercel). Do not commit real secrets to the repository.
- If you want, share your Render service URL and I will add the exact `CLIENT_URL` and `VITE_API_URL` values into this README for convenience.

---
Updated: production frontend added and docs refined.
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
