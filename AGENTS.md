# AGENTS.md

Static web app "Diario de Estudio" — session tracker with study streak.

## Rules that bite
- No frameworks, no libraries, no build step, no package.json. Do not add npm/tooling.
- Exactly three files: `index.html`, `styles.css`, `app.js`. New features go in these.
- Must work by double-clicking `index.html` (no server, no ES modules — `app.js` loads via plain `<script>`).
- All UI text in Spanish.

## Domain rules (easy to get wrong)
- Session = `{ id, fecha: "YYYY-MM-DD", tema, minutos }`; minutos must be > 0.
- Streak = consecutive days with ≥1 session ending today; if today has none, it still counts if yesterday has one (streak stays alive until the day ends).
- Always use local dates (`fechaLocal()` helper), never `toISOString()`/UTC.
- Persistence via localStorage key `diarioDeEstudio`; changing the key orphans existing user data.

## Verify by hand
- Open `index.html` in a browser; add sessions for today/yesterday and check the 🔥 counter and reload persistence.
