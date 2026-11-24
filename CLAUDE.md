# EnGLI — Preparación B2 First (Cambridge FCE)

Felipe rinde el **B2 First el 12/12/2026**. Este proyecto reúne su material de estudio y una herramienta de práctica.
Responder en **español**; los ejercicios y las correcciones van en inglés.

## Estructura
- `FCE/`: libros (Complete First, Exam Booster, practice tests con key), guías de writing, mockups y escritos corregidos (`.docx`). Es material de referencia: no se modifica.
- `clases/`: apuntes de clase en Markdown (los temas de gramática que vieron, ejercicios del libro y essays con correcciones del profesor).
- `practica/`: web local de práctica. Se abre `practica/index.html` con doble clic: no necesita servidor ni dependencias.
  - `data/uoe.js`: Use of English Parts 1–4 · `data/reading.js`: Reading Parts 5–7 · `data/drills.js`: drills de gramática.
  - `data/writing.js`: banco de tareas de writing · `data/writing-log.js`: puntajes de writing (lo actualiza `/writing`).
  - `data/phrasal.js`: drills de phrasal verbs (frases originales sobre la lista de engxam, topics `pv*`).
  - `data/booster.js`: los 21 exam tasks de Reading & UoE y 8 tareas de writing del **Exam Booster** (Cambridge), con las respuestas de su key. Tiene copyright: está en `.gitignore`, existe **sólo en local** y la app funciona sin él (en Vercel no aparece). Ids `eb-*`, campo `source`. Las tareas de writing `eb-w*` también valen para `/writing` cuando se trabaja en local.
  - El progreso de los ejercicios se guarda en el `localStorage` del navegador (se puede exportar desde la pestaña Progreso).
- `writing/`: `historial/` (una corrección por archivo) y `errores-frecuentes.md`.
- `.claude/skills/writing/`: el comando `/writing` (propone tareas y corrige con los criterios de Cambridge).

## Perfil (último mockup, 18/11/2026: global 174, B2 Grade B)
- Reading 177 (B) · **Use of English 170 (C)** · Listening 180 (C1) · **Writing 168 (C)** · Speaking 173 (B).
- Prioridad: Use of English (Parts 2–4) y Writing (Organisation y Language).
- Gramática vista en clase: modals of deduction, third y mixed conditionals, wish/hope/if only, passive (incluida la de reporte: "is believed to have…"), causative have/get, relative clauses, cleft sentences, able to, phrasal verbs, word formation.
- Errores recurrentes: ver `writing/errores-frecuentes.md`.

## Puntaje: referencia oficial del curso = https://cambridgescore.com/fce
Implementado en `practica/app.js` (`PAPERS`, `toScale`, `gradeOf`) y verificado contra su mockup: 177/170/180/168/173 → 174.
- Marks por ítem: Reading P1 (el multiple-choice cloze de UoE **suma a Reading**) = 1, P5 y P6 = 2, P7 = 1 (/42). UoE P2 y P3 = 1, P4 = 2 o 1 si es parcial (/28). Listening = 1 (/30). Writing = suma de los 8 criterios (/40). Speaking = suma de los 5 criterios × 2.4 (/60).
- La escala sale por interpolación lineal. Anclas para 160 / 180: Reading 24/37 · UoE 18/24 · Listening 18/27 · Writing 24/34 · Speaking 36/54. Máximo = 190.
- Grados: 180+ A (C1) · 173–179 B · 160–172 C (B2) · 140–159 Level B1. El global es el promedio de las 5 partes, redondeado.

## Agregar ejercicios
Cuando Felipe pida ejercicios nuevos, escribilos **originales** (no copiar los textos de los libros de `FCE/`), al nivel y con el formato real del B2 First, y agregalos al archivo `data/*.js` que corresponda con `FCE.exercises.push({...})`. Usá template literals (backticks). Los `id` tienen que ser únicos (`uoe2-05`, `rd6-02`, …). Los huecos se marcan en el texto como `[1]`, `[2]`, …

- **uoe1**: `{ id, part:'uoe1', title, text, items:[{ options:[4], answer:<índice 0-3>, explain }] }`. 8 huecos.
- **uoe2**: `items:[{ answers:['which','that'], explain }]`. Una palabra por hueco; listar todas las alternativas válidas. 8 huecos.
- **uoe3**: `items:[{ word:'SUCCESS', answers:['unsuccessful'], explain }]`. 8 huecos.
- **uoe4**: `items:[{ s1, key, before, after, answers:[...], explain }]`. 6 ítems. Respuestas de 2 a 5 palabras con la key word, todas las variantes (las contracciones se normalizan solas).
- **rd5**: `{ text, questions:[{ q, options:[4], answer, explain }] }`. 6 preguntas.
- **rd6**: `{ text (con [1]…[6]), sentences:{A..G}, answers:['D',…], explains:[…], extra:'A' }`.
- **rd7**: `{ sections:{ A:{title,text}, … }, questions:[{ q, answer:'B', explain }] }`. 10 preguntas.
- **drills** (en `drills.js`): `[topic, 'frase con ___', 'pista', ['respuestas'], 'explicación']`; los topics están en `FCE.drillTopics`.

Las explicaciones van en español, breves, y nombran la regla. Antes de terminar, verificá que el JS cargue: `node -e "global.window=global;require('./practica/data/uoe.js')"`.
