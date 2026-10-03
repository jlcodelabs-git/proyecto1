# AGENTS.md

Static web app "Diario de Estudio" — session tracker with study streak.

#t

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

## Memoria
- Al empezar, lee `MEMORY.md` para conocer el estado del proyecto y las decisiones
tomadas.
- Al terminar una tarea, actualízalo: estado actual, decisiones importantes (con su
porqué) y errores a evitar.
- Mantenlo breve (máximo ~50 líneas): resume o elimina lo que ya no aporte.
- Si algo se convierte en una regla permanente, propón moverlo a `AGENTS.md` en lugar de
dejarlo en la memoria.
- No guardes nunca datos sensibles (claves, tokens, datos personales).

Siempre: actualizar `MEMORY.md` al terminar cada tarea.
