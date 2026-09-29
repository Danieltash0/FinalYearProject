# DairyDan client

React 18 app (Create React App layout, `npm start` on port 3000). API calls go to `/api/...`
and are proxied to the Express server on port 5000 (see `"proxy"` in `package.json`).

```
client/src/
├── api/          config.js (fetch wrapper) and useCattle.js (cattle hook)
├── components/   Navbar, Footer, ProtectedRoute, CattleCard, Modal, Loader
├── context/      AuthContext (session, roles, dashboardPathFor)
├── pages/
│   ├── Landing.js
│   ├── auth/       Login, Signup, Unauthorized
│   ├── dashboard/  Dashboard (shared by the four roles)
│   └── cattle/     CattleList, AddCattle, EditCattle, CattleProfile, CattleForm
└── styles/       variables.css (COWCO palette), App.css
```

Later modules (tasks, milking, vet, reports, admin) add their own folders under `pages/`
and a hook per resource under `api/`.
