# DairyDan client

React app (Create React App conventions), scaffolded so far with the
authentication feature.

```
client/src/
├── api/          fetch wrappers (config.js: apiRequest, attaches JWT + base URL)
├── components/   shared/reusable UI (ProtectedRoute)
├── context/      AuthContext (login/register/logout, session persisted in localStorage)
├── pages/
│   └── auth/     Login, Signup, Unauthorized
└── styles/       global CSS variables (index.css)
```

Copy `client/.env.example` to `client/.env` and point `REACT_APP_API_URL` at
the running server (defaults to `http://localhost:5000/api`).

Role-specific dashboards, cattle/task/vet/report pages get added under
`pages/` by their own feature branches; `Dashboard.js` is a placeholder
landing page until those merge in.
