# BlogsSpot Angular frontend

Minimal Angular frontend for BlogsSpot.

Setup

1. From `frontend/` run:

```bash
npm install
npx ng serve --open
```

2. The app expects the backend API at `http://localhost:5000/api`. Update `src/environments/environment.ts` if needed.

Features

- Login / Register (JWT stored in localStorage)
- View all blogs (public)
- Create and edit blogs when logged in
