# Refactorización de código en eCommerce basado en principios de código limpio

El sistema eCommerce gestiona productos con nombre, precio, stock y categoría. El objetivo es refactorizar y optimizar el código existente para aplicar conscientemente los principios de código limpio basados en YAGNI, DRY, SOLID y KISS. El sistema debe manejar productos con reglas claras y casos borde del dominio.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Principios de código limpio |
| **Nivel** | advanced-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 8 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y generará un ZIP listo para usar.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Un IDE o editor de código.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y generará un archivo ZIP descargable. Descárgalo y extráelo en la carpeta donde quieras trabajar.
- Verifica que el proyecto arranca sin errores.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no genera el ZIP automáticamente al terminar el análisis, escríbele: "genera el ZIP ahora".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Identificación de violaciones

**Objetivo:** Detectar violaciones de los principios de código limpio en el código existente.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Analiza el código existente para identificar violaciones de los principios YAGNI, DRY, SOLID y KISS.
- Documenta cada violación encontrada y su impacto en el sistema.

**Entregable:** Reporte de violaciones de principios de código limpio.

<details>
<summary>Pistas de conocimiento</summary>

- Revisa la documentación de los principios YAGNI, DRY, SOLID y KISS.
- Busca ejemplos de violaciones en código similar.

</details>

### Fase 2: Aplicación de soluciones

**Objetivo:** Aplicar soluciones profesionales para corregir las violaciones identificadas.

**Tiempo estimado:** 4 horas

**Instrucciones:**

- Propone soluciones para cada violación identificada en la fase anterior.
- Implementa las soluciones en el código y verifica que el sistema continúe funcionando correctamente.

**Entregable:** Código refactorizado con soluciones aplicadas para las violaciones de principios de código limpio.

<details>
<summary>Pistas de conocimiento</summary>

- Investiga patrones de diseño y buenas prácticas para aplicar soluciones.
- Realiza pruebas unitarias para verificar el correcto funcionamiento del código refactorizado.

</details>

### Fase 3: Optimización y revisión

**Objetivo:** Optimizar el código refactorizado y realizar una revisión final.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Optimiza el código refactorizado para mejorar su rendimiento y mantenibilidad.
- Realiza una revisión final del código para asegurar que cumple con los principios de código limpio y está libre de violaciones.

**Entregable:** Código optimizado y revisado que cumple con los principios de código limpio.

<details>
<summary>Pistas de conocimiento</summary>

- Investiga técnicas de optimización de código.
- Realiza una revisión de código con énfasis en los principios de código limpio.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué son los principios de código limpio y por qué son importantes en el desarrollo de software?
- **paraQueSirve**: ¿Cómo aplicaste los principios de código limpio para mejorar el código existente en el sistema eCommerce?
- **comoSeUsa**: ¿Qué soluciones aplicaste para corregir las violaciones de los principios de código limpio en el código?
- **erroresComunes**: ¿Qué errores comunes encontraste en el código existente y cómo los corregiste?
- **queDecisionesImplica**: ¿Qué decisiones tomaste durante la refactorización y optimización del código para asegurar que cumple con los principios de código limpio?

## Criterios de Evaluacion

- Identificación correcta de violaciones de principios de código limpio en el código existente.
- Aplicación de soluciones profesionales para corregir las violaciones identificadas.
- Optimización del código refactorizado para mejorar su rendimiento y mantenibilidad.
- Revisión final del código para asegurar que cumple con los principios de código limpio.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT). Devuelve un ZIP con el proyecto. Sirve si no tenes un agente en el IDE.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
npm install && npx tsc --noEmit
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
