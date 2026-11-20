// Drills de gramática — temas vistos en clase + errores frecuentes de Felipe.
// Cada drill: { id, topic, q (usar ___ para el hueco), hint, answers: [...], explain }
window.FCE = window.FCE || { exercises: [], drills: [], writing: [] };

FCE.drillTopics = {
  modals: `Modals of deduction`,
  conditionals: `Conditionals (3rd & mixed)`,
  wish: `Wish / hope / if only`,
  passive: `Passive voice`,
  causative: `Causative have/get`,
  relatives: `Relative clauses`,
  cleft: `Cleft sentences`,
  ability: `Ability (can / be able to)`,
  phrasal: `Phrasal verbs`,
  prepositions: `Dependent prepositions`,
  agreement: `Subject-verb agreement`,
};

[
  // Modals of deduction
  [`modals`, `Her car isn't here. She ___ already.`, `leave`, [`must have left`], `Certeza en pasado: must have + participio.`],
  [`modals`, `He ___ at home – I saw him at the gym five minutes ago.`, `be`, [`can't be`, `cannot be`, `couldn't be`], `Certeza negativa en presente: can't be.`],
  [`modals`, `I'm not sure where Jack is. He ___ to the shops.`, `go`, [`may have gone`, `might have gone`, `could have gone`], `Posibilidad en pasado: may/might/could have + participio.`],
  [`modals`, `You ___ Lisa yesterday – she's been in Paris all week.`, `see`, [`can't have seen`, `cannot have seen`, `couldn't have seen`], `Imposibilidad en pasado: can't have + participio.`],
  [`modals`, `All the lights are off. They ___ asleep.`, `be`, [`must be`], `Deducción lógica en presente: must be.`],
  [`modals`, `The ground is wet. It ___ during the night.`, `rain`, [`must have rained`], `Evidencia en el presente de algo pasado: must have + participio.`],

  // Conditionals
  [`conditionals`, `If you had told me, I ___ you.`, `help`, [`would have helped`, `could have helped`], `Third conditional: would have + participio.`],
  [`conditionals`, `If I ___ the bus, I wouldn't have been late.`, `not / miss`, [`hadn't missed`, `had not missed`], `Third conditional: if + past perfect.`],
  [`conditionals`, `If I had taken that job in London, I ___ there now.`, `live`, [`would be living`, `would live`], `Mixed: condición pasada → resultado PRESENTE (now): would + infinitivo.`],
  [`conditionals`, `If she ___ more organised, she wouldn't have forgotten the meeting.`, `be`, [`were`, `was`, `had been`], `Mixed: rasgo presente (were/was) → resultado pasado. "had been" también es correcto (3rd conditional).`],
  [`conditionals`, `Unless you ___, you'll miss the train.`, `hurry`, [`hurry`, `hurry up`], `"Unless" = if not, con verbo afirmativo en presente.`],
  [`conditionals`, `If you ___ me yesterday, I wouldn't have forgotten my appointment.`, `text`, [`had texted`], `Third conditional (ejemplo de clase): had texted... wouldn't have forgotten.`],

  // Wish / hope
  [`wish`, `I wish I ___ speak Japanese.`, `can`, [`could`], `Deseo presente: wish + pasado (can → could).`],
  [`wish`, `I hope you ___ a great time at the party tomorrow.`, `have`, [`have`, `will have`], `"hope" va con presente o futuro, NO con pasado como "wish".`],
  [`wish`, `I wish my neighbours ___ making so much noise.`, `stop`, [`would stop`], `Queja sobre el comportamiento de otros: wish + would.`],
  [`wish`, `If only I ___ harder at school!`, `study`, [`had studied`], `Arrepentimiento pasado: if only + past perfect.`],
  [`wish`, `I wish I ___ that to her yesterday.`, `not / say`, [`hadn't said`, `had not said`], `Pasado: wish + past perfect.`],
  [`wish`, `I wish I ___ cook better.`, `can`, [`could`], `Ejemplo de clase: "I wish I could cook better" (no "could better cook").`],

  // Passive
  [`passive`, `The bridge ___ in 1890.`, `build`, [`was built`], `Pasiva en pasado simple: was + participio.`],
  [`passive`, `A new hospital ___ in our town at the moment.`, `build`, [`is being built`], `Pasiva en present continuous: is being + participio.`],
  [`passive`, `The results ___ next week.`, `announce`, [`will be announced`, `are going to be announced`, `are to be announced`], `Pasiva en futuro: will be + participio.`],
  [`passive`, `It ___ that the festival is the oldest in Europe.`, `say`, [`is said`], `Pasiva de reporte: It is said that...`],
  [`passive`, `The painting is thought ___ in the 1970s.`, `steal`, [`to have been stolen`], `Reporte sobre acción pasada: is thought to have been + participio.`],
  [`passive`, `The festival is believed ___ in the Middle Ages.`, `originate`, [`to have originated`], `Ejemplo de clase: "is believed to HAVE originated".`],
  [`passive`, `The winter tyres on my car ___ .`, `just / replace`, [`have just been replaced`], `Pasiva en present perfect: have been + participio.`],

  // Causative
  [`causative`, `I need to get my car ___ before the trip.`, `service`, [`serviced`], `Causativo: get + objeto + PARTICIPIO.`],
  [`causative`, `We had our house ___ last summer.`, `paint`, [`painted`], `have + objeto + participio.`],
  [`causative`, `She had her handbag ___ while she was on the bus.`, `steal`, [`stolen`], `Causativo para algo malo que te pasa: had her bag stolen.`],
  [`causative`, `You should get your suit ___ for the wedding.`, `dry-clean`, [`dry-cleaned`, `dry cleaned`, `cleaned`], `Ejemplo de clase: get your suit dry-cleaned (participio, ¡no "dry clean"!).`],
  [`causative`, `We had a supply of logs ___ yesterday.`, `deliver`, [`delivered`], `Ejemplo de clase: had logs delivered.`],

  // Relative clauses
  [`relatives`, `The woman ___ car was stolen called the police.`, ``, [`whose`], `Posesivo: whose.`],
  [`relatives`, `That's the restaurant ___ we had our first date.`, ``, [`where`], `Lugar: where.`],
  [`relatives`, `My brother, ___ lives in Madrid, is a doctor.`, ``, [`who`], `Non-defining (entre comas), persona: who. Nunca "that" entre comas.`],
  [`relatives`, `Paris, ___ is the capital of France, is very expensive.`, ``, [`which`], `Non-defining, cosa: which (no that).`],
  [`relatives`, `Do you know the reason ___ she left?`, ``, [`why`, `that`], `"the reason why..."`],
  [`relatives`, `The book ___ I'm reading at the moment is fantastic.`, ``, [`that`, `which`], `Defining, cosa: that/which (también se puede omitir).`],

  // Cleft sentences
  [`cleft`, `___ I really need at the moment is a new tablet.`, ``, [`what`], `"What + sujeto + verbo + is..." para dar énfasis.`],
  [`cleft`, `It was Michael ___ stole the book from the shop.`, ``, [`who`, `that`], `"It was + persona + who/that..."`],
  [`cleft`, `It ___ last year that she took out a bank loan.`, ``, [`was`], `"It was + momento + that..."`],
  [`cleft`, `What happens ___ that the main character loses his job.`, ``, [`is`], `"What happens IS that..."`],
  [`cleft`, `What I don't know ___ what time the shop opens.`, ``, [`is`], `Cleft con "What": el verbo es "is".`],

  // Ability
  [`ability`, `I will ___ to come tomorrow.`, `can`, [`be able`], `No existe "will can": will be able to.`],
  [`ability`, `Despite the noise, I ___ to sleep.`, `manage`, [`managed`], `Logro puntual en pasado: managed to / was able to (no "could").`],
  [`ability`, `I'd love to ___ to play the piano.`, `can`, [`be able`], `Después de "to" no puede ir "can": to be able to.`],
  [`ability`, `When I was five, I ___ swim.`, `can`, [`could`], `Habilidad general en el pasado: could.`],

  // Phrasal verbs
  [`phrasal`, `We had to ___ off the trip because of the weather.`, `= cancel`, [`call`], `"call off" = cancelar.`],
  [`phrasal`, `I can't put ___ with this noise any longer.`, `= tolerate`, [`up`], `"put up with" = tolerar.`],
  [`phrasal`, `He came ___ with a brilliant idea.`, `= think of`, [`up`], `"come up with" = ocurrírsele.`],
  [`phrasal`, `We've run ___ of milk.`, `= have no more`, [`out`], `"run out of" = quedarse sin.`],
  [`phrasal`, `I really look ___ to my grandmother; she's so brave.`, `= admire`, [`up`], `"look up to" = admirar.`],
  [`phrasal`, `We set ___ early to avoid the traffic.`, `= start a journey`, [`off`, `out`], `"set off/out" = salir de viaje.`],
  [`phrasal`, `Don't let one bad result put you ___.`, `= discourage`, [`off`], `"put someone off" = desanimar.`],
  [`phrasal`, `She takes ___ her mother – they have the same smile.`, `= resemble`, [`after`], `"take after" = parecerse (a un familiar).`],
  [`phrasal`, `Can you find ___ what time the film starts?`, `= discover`, [`out`], `"find out" = averiguar.`],
  [`phrasal`, `The plane took ___ two hours late.`, `= left the ground`, [`off`], `"take off" = despegar.`],
  [`phrasal`, `I get ___ really well with my colleagues.`, `= have a good relationship`, [`on`, `along`], `"get on/along with" = llevarse bien.`],
  [`phrasal`, `Could you look ___ my dog while I'm away?`, `= take care of`, [`after`], `"look after" = cuidar.`],

  // Dependent prepositions
  [`prepositions`, `It depends ___ the weather.`, ``, [`on`], `DEPEND ON — ¡nunca "depend in"! (error marcado en clase).`],
  [`prepositions`, `She's very good ___ maths.`, ``, [`at`], `good/bad AT.`],
  [`prepositions`, `I'm interested ___ learning Italian.`, ``, [`in`], `interested IN.`],
  [`prepositions`, `He apologised ___ being late.`, ``, [`for`], `apologise FOR.`],
  [`prepositions`, `I agree ___ you completely.`, ``, [`with`], `agree WITH someone.`],
  [`prepositions`, `Are you afraid ___ spiders?`, ``, [`of`], `afraid OF.`],
  [`prepositions`, `She succeeded ___ passing the exam.`, ``, [`in`], `succeed IN + -ing.`],
  [`prepositions`, `I'm not used ___ getting up so early.`, ``, [`to`], `be used TO + -ing.`],
  [`prepositions`, `This book reminds me ___ my childhood.`, ``, [`of`], `remind someone OF.`],
  [`prepositions`, `She's responsible ___ the whole project.`, ``, [`for`], `responsible FOR.`],
  [`prepositions`, `I'm looking forward ___ seeing you.`, ``, [`to`], `look forward TO + -ing.`],

  // Subject-verb agreement & errores frecuentes
  [`agreement`, `Everyone ___ the answer.`, `know`, [`knows`], `"Everyone/everybody" es singular → knows.`],
  [`agreement`, `All these activities ___ me disconnect from my routine.`, `help`, [`help`], `Sujeto plural → help (error de tu article: "activities helps").`],
  [`agreement`, `Neither of my friends ___ football.`, `like`, [`likes`], `"Neither of..." → verbo singular en inglés formal.`],
  [`agreement`, `The news ___ very good today.`, `be`, [`is`], `"news" es incontable → is.`],
  [`agreement`, `I ___ with you – it's a great idea.`, `agree`, [`agree`], `"I agree", NUNCA "I'm agree" (marcado en el speaking del mockup).`],
  [`agreement`, `Every time my friends ___ a new game, I'm the first to say yes.`, `recommend`, [`recommend`], `"my friends" es plural → recommend (sin -s).`],
  [`agreement`, `One of the main problems ___ the lack of privacy.`, `be`, [`is`], `El sujeto es "One" → is.`],
  [`agreement`, `People ___ to spend more time online nowadays.`, `tend`, [`tend`], `"people" es plural → tend.`],
].forEach(([topic, q, hint, answers, explain]) => {
  // id estable derivado del texto (no del orden), para que el cuaderno de errores no se rompa al agregar drills
  let h = 0; for (const c of q) h = (h * 31 + c.charCodeAt(0)) | 0;
  FCE.drills.push({ id: `d-${topic}-${(h >>> 0).toString(36)}`, topic, q, hint, answers, explain });
});
