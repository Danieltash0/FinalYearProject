# DairyDan client

Not scaffolded yet. Generate it with Create React App from inside `client/`:

```
npx create-react-app .
```

(Or swap in Vite if preferred — either works with the existing `npm run client`
script at the repo root, as long as the dev server still runs on `npm start`.)

Suggested structure once scaffolded:

```
client/src/
├── api/          fetch wrappers, one hook per resource (useCattle, useTasks, ...)
├── components/   shared/reusable UI
├── context/      AuthContext etc.
├── pages/        route-level views, grouped by module (cattle/, tasks/, vet/, ...)
└── styles/       CSS
```
