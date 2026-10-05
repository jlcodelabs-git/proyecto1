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
## Aprendizajes y errores a evitar
- (vacío por ahora)
## Próximos pasos
- (vacío por ahora)
