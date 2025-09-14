# DevConnector

A full-stack MERN (MongoDB, Express, React, Node.js) social network for developers. Users can register, create and edit profiles, add experience and education, browse other developers, create posts, like/unlike, and comment. The app includes JWT auth, protected routes, Redux state management, Tailwind CSS UI, and a production build process ready for platforms like Heroku.

## Table of Contents
- [Tech Stack](#tech-stack)
- [Monorepo Layout](#monorepo-layout)
- [Prerequisites](#prerequisites)
- [Configuration](#configuration)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Environment Variables](#environment-variables)
- [Frontend (React)](#frontend-react)
- [Styling (Tailwind CSS)](#styling-tailwind-css)
- [Backend (Express API)](#backend-express-api)
- [API Endpoints](#api-endpoints)
- [Sample Payloads](#sample-payloads)
- [Password Change Feature](#password-change-feature)
- [Images & PWA Manifest](#images--pwa-manifest)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Screenshots

Landing

![Landing](./docs/screenshots/landing.png)

Posts

![Posts](./docs/screenshots/posts.png)

---

## Tech Stack
- Frontend: React 18/19 compatible, React Router v6+, Redux, Axios, Tailwind CSS
- Backend: Node.js, Express, JWT auth, express-validator, Mongoose (MongoDB)
- Database: MongoDB Atlas (or local MongoDB)
- Tooling: Concurrently, Nodemon

## Monorepo Layout
```
DevConnector/
  server.js                # Express app entry
  package.json             # Root scripts (server, client, dev, heroku-postbuild)
  config/
    default.json           # Local config (gitignored recommended)
    production.json        # Production config
  routes/
    api/
      users.js             # Register
      auth.js              # Login/auth
      profile.js           # Profile CRUD & GitHub
      posts.js             # Posts/likes/comments
      password.js          # Change password (PUT /api/password)
  models/
    User.js, Profile.js, Posts.js
  middleware/
    auth.js                # JWT auth middleware
  client/
    package.json           # CRA app
    public/
      index.html, manifest.json, favicon.ico, logo192.png, logo512.png
    src/
      index.js, App.js, store.js
      actions/, reducers/, components/
      utils/api.js, utils/setAuthToken.js
      styles/ (optional custom CSS)
      index.css            # Tailwind entry
```

## Prerequisites
- Node.js LTS (18+ recommended)
- npm (10+) or yarn
- MongoDB Atlas connection string (or local MongoDB)

## Configuration
App configuration is handled via the `config` package.

- `config/default.json` (local dev) – add values like:
```json
{
  "mongoURI": "YOUR_LOCAL_OR_ATLAS_URI",
  "jwtSecret": "your_jwt_secret",
  "githubClientId": "your_github_client_id",
  "githubSecret": "your_github_client_secret"
}
```
- `config/production.json` (already added; update with your production values) 

Note: `config/default.json` is added to `.gitignore`. Do not commit secrets.

## Installation
From the repository root:

```bash
# Install server deps
npm install

# Install client deps
cd client
npm install
```

## Running the App
Development (runs server and client together):
```bash
# From the repo root
npm run dev
```
- Server: http://localhost:5001 (default PORT fallback)
- Client (CRA dev server): http://localhost:3000

Direct scripts:
```bash
# API only
npm run server

# Frontend only
cd client && npm start
```

## Environment Variables
Common runtime variables:
- `PORT` – server port (defaults to 5001)
- `NODE_ENV` – set to `production` in deployed environments

Config-driven values (via `config` package):
- `mongoURI`, `jwtSecret`, `githubClientId`, `githubSecret`

## Frontend (React)
- React Router v6+ with a dedicated `CustomRoutes` component.
- Redux store in `client/src/store.js` with reducers under `client/src/reducers`.
- Actions under `client/src/actions`. API calls go through `client/src/utils/api.js`.
- Protected routes via `components/routing/PrivateRoute.js`.

Key routes in the UI:
- `/` Landing
- `/register`, `/login`
- `/dashboard` (protected)
- `/create-profile`, `/edit-profile` (protected)
- `/add-experience`, `/add-education` (protected)
- `/profiles`, `/profile/:id`
- `/posts`, `/post/:id` (protected)
- `/change-password` (protected)

## Styling (Tailwind CSS)
Tailwind is configured in the client app:
- `client/tailwind.config.js` – content globs and theme extensions
- `client/postcss.config.js` – Tailwind + Autoprefixer
- `client/src/index.css` – Tailwind entry with `@tailwind base; @tailwind components; @tailwind utilities;`

Usage:
- Import `./index.css` in `client/src/App.js`.
- Use utility classes (e.g., `btn btn-primary` via component layer or raw utilities like `px-4 py-2 bg-primary-600`).

## Backend (Express API)
- Entry: `server.js`
- JWT auth middleware: `middleware/auth.js`
- Mongo connection: `config/db.js`
- Static production serving: when `NODE_ENV=production`, Express serves `client/build` and falls back to `index.html` for non-API routes.

## API Endpoints
Auth & Users
- `POST /api/users` – Register
- `POST /api/auth` – Login (returns JWT)
- `GET /api/auth` – Load current user (requires token)

Profile
- `GET /api/profile/me` – Current user profile (token)
- `POST /api/profile` – Create/Update profile (token)
  - Accepts `skills` as a comma-separated string or an array
- `GET /api/profile` – All profiles
- `GET /api/profile/user/:user_id` – Profile by user id
- `DELETE /api/profile` – Delete profile & user (token)
- `PUT /api/profile/experience` – Add experience (token)
- `DELETE /api/profile/experience/:exp_id` – Remove experience (token)
- `PUT /api/profile/education` – Add education (token)
- `DELETE /api/profile/education/:edu_id` – Remove education (token)
- `GET /api/profile/github/:username` – Public GitHub repos

Posts & Comments
- `POST /api/posts` – Create post (token)
- `GET /api/posts` – Get posts (token)
- `GET /api/posts/:id` – Get post (token)
- `DELETE /api/posts/:id` – Delete post (token)
- `PUT /api/posts/like/:id` – Like (token)
- `PUT /api/posts/unlike/:id` – Unlike (token)
- `POST /api/posts/comment/:id` – Add comment (token)
- `DELETE /api/posts/comment/:id/:comment_id` – Remove comment (token)

Password
- `PUT /api/password` – Change password (token)
  - Body: `{ currentPassword, newPassword }`
  - Validations: min length 6, must contain letters and numbers, must differ from current

## Sample Payloads
Register
```json
{
  "name": "Alex Developer",
  "email": "alex@example.com",
  "password": "Welcome@Dev123"
}
```

Login
```json
{
  "email": "alex@example.com",
  "password": "Welcome@Dev123"
}
```

Create/Update Profile (JSON)
```json
{
  "company": "OpenSource Co.",
  "website": "https://alexdev.example.com",
  "location": "San Francisco, CA, USA",
  "status": "Senior Full Stack Developer",
  "skills": "JavaScript,TypeScript,React,Node.js,Express,MongoDB,Tailwind CSS,Docker",
  "bio": "Full stack engineer focused on developer tools, performance and DX.",
  "githubusername": "alexdev",
  "twitter": "https://twitter.com/alexdev",
  "facebook": "https://facebook.com/alexdev",
  "linkedin": "https://linkedin.com/in/alexdev",
  "youtube": "https://youtube.com/alexdev",
  "instagram": "https://instagram.com/alexdev"
}
```

Change Password (JSON)
```json
{
  "currentPassword": "Welcome@Dev123",
  "newPassword": "DevConnect2025!"
}
```

## Password Change Feature
- UI Route: `/change-password` (protected)
- Redux: actions under `client/src/actions/password.js`, reducer under `client/src/reducers/password.js`
- Backend: `routes/api/password.js`
- Validation: client and server provide accurate error messages and success feedback.

## Images & PWA Manifest
- Place app icons into `client/public/` as:
  - `logo192.png` – 192x192 PNG
  - `logo512.png` – 512x512 PNG
  - `favicon.ico` – ideally 32x32 ICO
- `client/public/manifest.json` references these. Clear cache or hard-reload if updates don’t appear.

## Deployment
Heroku-style postbuild is configured in root `package.json`:
```json
{
  "scripts": {
    "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
  }
}
```
Server serves React build in production (`server.js`). Ensure `NODE_ENV=production` and proper `PORT` are set by the platform.

Basic deploy checklist:
- Set config vars (`mongoURI`, `jwtSecret`, `githubClientId`, `githubSecret`)
- Ensure icons and manifest are correct
- Push to the platform; verify server logs for successful build and static serving

## Troubleshooting
- `TypeError: skills.split is not a function`: Send `skills` as a comma-separated string, or an array. The server supports both. Ensure client sends the intended format.
- Token/auth errors: Include header `x-auth-token: <JWT>` for protected routes.
- CORS/Proxy: In dev, CRA proxy or `client/src/utils/api.js` baseURL is used. Align ports (server default 5001).
- Tailwind `@tailwind` or `@apply` unknown: Ensure PostCSS + Tailwind are installed, `index.css` includes Tailwind directives, and CRA is running.

## Contributing
1. Fork the repo
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m "feat: add your feature"`
4. Push branch: `git push origin feature/your-feature`
5. Open a Pull Request

## License
MIT
