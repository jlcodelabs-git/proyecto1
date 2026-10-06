---
description: Revisa el código respetando AGENTS.md y la constitución
agent: plan
---
Revisa los cambios sin modificar archivos: $ARGUMENTS
Comprueba:
1. Que AGENTS.md se cumple: sin frameworks ni build, solo los 3 archivos de la
   app, texto de la UI en español, fechas locales (sin toISOString()), minutos
   como número > 0 y clave de localStorage `diarioDeEstudio` respetada.
2. Conflictos con docs/constitution.md si existe.
3. Errores probables: parseo de JSON sin try/catch, fechas en UTC, semanas en
   milisegundos.
Lista numerada de hallazgos, ordenados por gravedad. No propongas fixes todavía.
