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

- Frontend: Vercel or Netlify
- Backend: Render or Railway
- Database: MongoDB Atlas

Set `CLIENT_URL` to the deployed frontend and `VITE_API_URL` to the deployed backend API.
