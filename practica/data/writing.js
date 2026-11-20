// Banco de tareas de Writing (originales, formato B2 First).
// Lo usa la web (pestaña Writing) y también el comando /writing de Claude Code.
window.FCE = window.FCE || { exercises: [], drills: [], writing: [] };

FCE.writing.push(
  // ───────── PART 1 · Essay (obligatorio) ─────────
  { id: `w1-opportunities`, part: 1, type: `essay`, title: `Young people's opportunities`,
    prompt: `In your English class you have been talking about the opportunities young people have today. Now your English teacher has asked you to write an essay.\n\n"Young people today have fewer opportunities than their parents did." Do you agree?\n\nNotes — write about:\n1. jobs\n2. education\n3. ........ (your own idea)` },
  { id: `w1-city`, part: 1, type: `essay`, title: `City or countryside`,
    prompt: `In your English class you have been talking about where people live. Now your English teacher has asked you to write an essay.\n\nIs it better to live in a city or in the countryside?\n\nNotes — write about:\n1. transport\n2. cost of living\n3. ........ (your own idea)` },
  { id: `w1-tourism`, part: 1, type: `essay`, title: `Tourism`,
    prompt: `In your English class you have been talking about tourism. Now your English teacher has asked you to write an essay.\n\n"Tourism does more harm than good to the places people visit." Do you agree?\n\nNotes — write about:\n1. the local economy\n2. the environment\n3. ........ (your own idea)` },
  { id: `w1-lifeskills`, part: 1, type: `essay`, title: `Practical skills at school`,
    prompt: `In your English class you have been talking about education. Now your English teacher has asked you to write an essay.\n\n"Schools should teach practical life skills, such as cooking and managing money, instead of some academic subjects." Do you agree?\n\nNotes — write about:\n1. preparing for adult life\n2. time in the school timetable\n3. ........ (your own idea)` },
  { id: `w1-sport`, part: 1, type: `essay`, title: `Everyone should do sport`,
    prompt: `In your English class you have been talking about health. Now your English teacher has asked you to write an essay.\n\n"Everyone should do some kind of sport." Do you agree?\n\nNotes — write about:\n1. health\n2. enjoyment\n3. ........ (your own idea)` },
  { id: `w1-sundays`, part: 1, type: `essay`, title: `Shops on Sundays`,
    prompt: `In your English class you have been talking about shopping. Now your English teacher has asked you to write an essay.\n\n"All shops should be closed on Sundays." Do you agree?\n\nNotes — write about:\n1. shop workers\n2. family time\n3. ........ (your own idea)` },
  { id: `w1-remote`, part: 1, type: `essay`, title: `Working from home`,
    prompt: `In your English class you have been talking about work. Now your English teacher has asked you to write an essay.\n\n"Working from home is better than working in an office." Do you agree?\n\nNotes — write about:\n1. productivity\n2. relationships with colleagues\n3. ........ (your own idea)` },

  // ───────── PART 2 · Elegir uno ─────────
  { id: `w2-article-place`, part: 2, type: `article`, title: `A special place`,
    prompt: `You see this announcement in an English-language magazine:\n\nA PLACE THAT MEANS A LOT TO ME\nTell us about a place that is special to you. Where is it? Why is it important to you? Would other people enjoy visiting it?\nThe best articles will be published next month.\n\nWrite your article.` },
  { id: `w2-article-tech`, part: 2, type: `article`, title: `Could you live without your phone?`,
    prompt: `You see this announcement on an English-language website:\n\nCOULD YOU LIVE WITHOUT YOUR PHONE FOR A WEEK?\nWhat do you use your phone for most? What would you miss? What might be the advantages of a week without it?\nWe will publish the most interesting articles.\n\nWrite your article.` },
  { id: `w2-review-series`, part: 2, type: `review`, title: `A series worth watching`,
    prompt: `You see this announcement on an English-language website:\n\nREVIEWS WANTED: A SERIES WORTH WATCHING\nTell us about a TV series you have watched recently. What is it about? What did you like or dislike about it? Would you recommend it to other people?\n\nWrite your review.` },
  { id: `w2-review-cafe`, part: 2, type: `review`, title: `A café or restaurant`,
    prompt: `You see this notice in an English-language magazine:\n\nWHERE DO YOU LIKE TO EAT OUT?\nWrite a review of a café or restaurant you know. Describe the food, the atmosphere and the service, and say whether you would recommend it to young people.\n\nWrite your review.` },
  { id: `w2-email-visit`, part: 2, type: `email`, title: `A friend is visiting Argentina`,
    prompt: `You have received this email from your English-speaking friend Sam:\n\n"I'm finally coming to Argentina next month! I'll have about a week. What do you think I should see? And what's the weather like at that time of year – what should I pack? Also, is there any food I absolutely have to try?"\n\nWrite your email.` },
  { id: `w2-letter-job`, part: 2, type: `letter`, title: `Summer job application`,
    prompt: `You see this advertisement:\n\nINTERNATIONAL SUMMER CAMP — ASSISTANTS WANTED\nWe are looking for enthusiastic people to help organise activities for teenagers from all over the world. You need to speak English and have some experience with young people or sports.\nWrite to Ms Carter, the camp director, explaining why you would be suitable.\n\nWrite your letter of application.` },
  { id: `w2-report-facilities`, part: 2, type: `report`, title: `Student facilities`,
    prompt: `The director of the language school where you study wants to improve the facilities for students. She has asked you to write a report.\n\nIn your report you should describe the current facilities (for example, the library, the study rooms and the café), say which ones students use most, and recommend one improvement, explaining why.\n\nWrite your report.` },
);
