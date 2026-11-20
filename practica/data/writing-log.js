// Registro de puntajes de Writing. Lo actualiza el comando /writing de Claude Code (agrega una línea por corrección).
// Criterios Cambridge B2 First: cada uno de 0 a 5 → total /20 por texto.
window.FCE = window.FCE || { exercises: [], drills: [], writing: [] };
FCE.writingLog = [
  { date: `2026-09-24`, taskId: null, task: `Essay: buying your first house`, type: `essay`, content: 4, communicative: 2, organisation: 3, language: 2, source: `profesor` },
  { date: `2026-11-18`, taskId: null, task: `Mockup Part 1: essay (social media)`, type: `essay`, content: 4, communicative: 4, organisation: 2, language: 3, source: `mockup` },
  { date: `2026-11-18`, taskId: null, task: `Mockup Part 2: article (free time)`, type: `article`, content: 3, communicative: 4, organisation: 5, language: 3, source: `mockup` },
];
