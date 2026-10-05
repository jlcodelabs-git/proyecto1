# MEMORY.md — Diario de Estudio
Memoria del proyecto entre sesiones. Máximo ~50 líneas: resume o elimina lo que ya no
aporte.
## Estado actual
- Datos en localStorage (`diarioDeEstudio`); preferencia de tema en `diarioDeEstudioTema`.
- v1 funcionando: registrar sesiones (fecha, tema, minutos), racha actual y lista de
  sesiones.
- Modo oscuro con botón toggle (persiste en localStorage, clase `oscuro` en body).
- Total de minutos estudiados esta semana, visible bajo la racha.
- Config ajena al proyecto: el shell fish ahora usa Starship (instalado en `~/.local/bin`, init en `~/.config/fish/config.fish`); prompt antiguo en `~/.config/fish/fish_prompt.fish.bak`.

## Decisiones (y por qué)
- Sin backend ni dependencias: cualquiera debe poder abrirlo con doble clic.
- Fecha editable en el formulario: permite registrar días pasados y ver la racha crecer.
- Semana = lunes a hoy, total en minutos: convención española/ISO y coherente con `s.minutos`.
- Rediseño (frontend-design): estética cuaderno de bitácora — Spectral, papel/tinta, sello
  circular rojo como héroe de racha, campos subrayados. Tema claro/oscuro vía variables CSS
  en `body` / `body.oscuro` (no reglas por elemento).
## Aprendizajes y errores a evitar
- Node del sistema es v10 (apt, focal): `npx skills` falla con "Unexpected identifier". Usar
  Node 22 descargado en `/tmp/node-v22.17.0-linux-arm64/bin` anteponiéndolo al PATH.
- Se instaló la skill `frontend-design` (anthropics/skills) en `.agents/skills/` vía
  `npx skills add ... --skill frontend-design`.
## Próximos pasos
- La app NO tiene "mejor racha" (probado 2026-10-05 con CDP): si se pide, hay que
  implementarla (derivarla de las sesiones o guardarla en localStorage).
## Notas de entorno
- Chromium 154 vía snap usable headless (`--remote-debugging-port=9222`); CDP con
  Node 22 en `/tmp/node-v22.17.0-linux-arm64/bin`. Probado OK 2026-10-05: racha 3,
  consola limpia.
- Scripts git en `~/.local/bin/` (`git-up`, `git-up.bat`): add+commit+push con mensaje
  interactivo. Van fuera del proyecto: AGENTS.md fija exactamente 3 archivos.
