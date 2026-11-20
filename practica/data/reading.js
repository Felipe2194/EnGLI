// Reading — Parts 5-7. Textos originales.
window.FCE = window.FCE || { exercises: [], drills: [], writing: [] };

// ───────────────────────── PART 5 · Multiple choice ─────────────────────────
FCE.exercises.push({
  id: `rd5-01`, part: `rd5`, title: `Learning to listen to the mountain`,
  text: `When I first joined the mountain rescue team at nineteen, I thought I knew everything there was to know about the hills. I had grown up in a village at the foot of the mountains, and I had been climbing since before I could ride a bike. So when Davie Munro, the team leader, told me on my first day that I would spend my first six months "mostly making tea and carrying bags", I was, to put it mildly, disappointed. I had imagined myself abseiling down cliffs to rescue stranded climbers, not standing in a car park holding a flask.

It took me a long time to understand what Davie was trying to teach me. Rescue work, I eventually discovered, is only partly about physical skill. Far more important is the ability to make good decisions when you are cold, tired and frightened – and that, Davie believed, could only be learnt by watching people who had been doing it for years. "Anyone can climb," he told me once. "What I need to know is whether you'll still be thinking clearly at three in the morning, in the dark, when the person you're looking for isn't where they're supposed to be."

My first real call-out came in the middle of February. A walker had failed to return from a hike, and his wife had raised the alarm at about nine in the evening. I remember feeling a mixture of excitement and dread as we drove up the valley. The weather was appalling: snow was falling heavily, and the wind was so strong that it was difficult to stand. I expected us to head straight up the mountain. Instead, Davie spent almost forty minutes in the car park, studying maps and talking to the walker's wife. At the time, I found this unbearable. Every minute we waited felt like a minute wasted.

It was only later that I realised how much those forty minutes mattered. From his conversation with the wife, Davie had learnt that her husband had recently injured his knee and that he tended to avoid steep ground. Rather than searching the main path, which most walkers use, he sent us to a lower route through the forest. We found the man just after midnight, sheltering under a rock, cold but unhurt. Had we followed the main path, we would probably have walked straight past him.

I have been a member of the team for twelve years now, and I have taken part in more rescues than I can count. People sometimes ask me what the most important quality for a rescuer is, expecting me to say strength or courage. My answer always surprises them: patience. The mountain does not care how fit you are or how brave you feel. What it rewards is the willingness to stop, listen and think before you act. It is a lesson I still remind myself of every time the phone rings.`,
  questions: [
    { q: `How did the writer feel when Davie described his first six months in the team?`, options: [`relieved that he would not be put in danger`, `angry that he was being treated unfairly`, `disappointed because it did not match what he had imagined`, `confused about what the job really involved`], answer: 2, explain: `"I was, to put it mildly, disappointed. I had imagined myself abseiling down cliffs..."` },
    { q: `What did Davie believe about the ability to make good decisions?`, options: [`It could be taught in a classroom.`, `It developed by observing experienced rescuers.`, `It was less important than climbing skill.`, `It was something people were born with.`], answer: 1, explain: `"...could only be learnt by watching people who had been doing it for years."` },
    { q: `What does Davie's comment "Anyone can climb" suggest about him?`, options: [`He did not value climbing skills at all.`, `He was mainly interested in how people behave under pressure.`, `He doubted the writer's ability as a climber.`, `He thought night rescues were too dangerous.`], answer: 1, explain: `Le importa si vas a "pensar con claridad a las 3 de la mañana" → bajo presión. La A es demasiado extrema ("at all").` },
    { q: `During the first call-out, how did the writer feel about the time spent in the car park?`, options: [`It was useful for preparing equipment.`, `It was hard to accept because he wanted to act.`, `It was necessary because of the bad weather.`, `It gave him a chance to calm down.`], answer: 1, explain: `"I found this unbearable. Every minute we waited felt like a minute wasted."` },
    { q: `Why did Davie send the team to the lower route?`, options: [`It was the route that most walkers used.`, `The weather on the main path was too dangerous.`, `He had learnt about the walker's condition and habits.`, `The walker's wife had told him exactly where to look.`], answer: 2, explain: `Sabía de la rodilla lesionada y que evitaba terreno empinado. La D es trampa: ella no le dijo dónde buscar.` },
    { q: `In the final paragraph, the writer suggests that`, options: [`people are often surprised by the quality he thinks is most important.`, `physical strength becomes more important with experience.`, `he no longer feels nervous when he is called out.`, `courage is the quality he values most in others.`], answer: 0, explain: `"My answer always surprises them: patience."` },
  ],
});

// ───────────────────────── PART 6 · Gapped text ─────────────────────────
FCE.exercises.push({
  id: `rd6-01`, part: `rd6`, title: `The secret life of city foxes`,
  text: `Twenty years ago, seeing a fox in the middle of a city would have been unusual. Today, in many European cities, it is almost an everyday event. Foxes can be spotted crossing busy roads, sleeping in parks and even sunbathing on garage roofs. [1]

The answer, according to wildlife experts, lies largely in the food we throw away. Cities produce enormous amounts of waste, and foxes are extremely adaptable eaters. [2] As a result, a city fox can often find more to eat in a single street than its country cousin can find in an entire field.

Urban foxes have also changed their behaviour in other ways. Studies have shown that they are generally less afraid of people than rural foxes. [3] Researchers believe this boldness is the result of city foxes learning that humans rarely pose a threat.

Not everyone is pleased about their arrival, however. [4] Others complain about the noise foxes make at night, particularly during the winter breeding season, when their screams can be mistaken for those of a person in distress.

There have also been occasional stories in the press about foxes entering homes. Such incidents are very rare, but they tend to attract a great deal of attention. [5] Experts point out that foxes generally avoid conflict and will run away if they feel threatened.

So what should you do if a fox moves into your neighbourhood? Wildlife organisations advise against feeding them, as this can make them dependent on humans. [6] Ultimately, though, most experts agree that foxes are now a permanent part of city life – and that learning to live alongside them is the only realistic option.`,
  sentences: {
    A: `In fact, a recent survey found that foxes are now more common in some cities than in the surrounding countryside.`,
    B: `Some will even approach a person who is eating outdoors, hoping to be offered something.`,
    C: `Instead, they recommend making sure rubbish bins are securely closed so that foxes are not encouraged to visit.`,
    D: `But how did an animal so closely associated with the countryside end up living among us?`,
    E: `This has led some people to believe that foxes are a danger to humans, although there is little evidence to support this view.`,
    F: `They will happily eat anything from leftover pizza to insects, fruit and small birds.`,
    G: `Some residents are annoyed when foxes dig up their gardens or tear open rubbish bags.`,
  },
  answers: [`D`, `F`, `B`, `G`, `E`, `C`],
  explains: [
    `"The answer..." en el párrafo siguiente necesita una PREGUNTA antes → D.`,
    `"adaptable eaters" → F da ejemplos de lo que comen; "As a result" sigue lógicamente.`,
    `"less afraid of people" → B da un ejemplo; "this boldness" se refiere a ese comportamiento.`,
    `"Others complain..." necesita un "Some..." antes → G.`,
    `"Such incidents... attract attention" → E ("This has led some people to believe...") y luego "Experts point out" lo contradice.`,
    `"advise against feeding them" → C empieza con "Instead, they recommend..."`,
  ],
  extra: `A`,
});

// ───────────────────────── PART 7 · Multiple matching ─────────────────────────
FCE.exercises.push({
  id: `rd7-01`, part: `rd7`, title: `My first job`,
  sections: {
    A: { title: `Lucía`, text: `My first job was in a small café near my university. I only worked there at weekends, but it taught me more than any of my lectures. The owner, an elderly man called Mr Ferris, was incredibly strict about cleanliness – I must have wiped the same tables a thousand times. At first I couldn't see the point, but I later understood that customers notice those details. What I found hardest was dealing with rude customers without losing my temper. I've since become a teacher, and the patience I developed in that café has been invaluable in the classroom. I still go back for coffee sometimes, although Mr Ferris retired years ago.` },
    B: { title: `Tom`, text: `I spent the summer after school working as an assistant at a children's camp. I'd applied mainly because a friend was going, but she dropped out a week before it started, so I arrived knowing absolutely nobody. The first few days were awful – I was homesick and convinced I'd made a mistake. Then something changed. I was put in charge of the drama group, and watching the kids perform at the end of the summer was one of the proudest moments of my life. The pay was terrible, to be honest, but I'd do it again tomorrow. It was that summer that made me realise I wanted to work with young people.` },
    C: { title: `Priya`, text: `I got my first job through my uncle, who managed a large insurance office. I'll admit I didn't have to go through any kind of interview, which made me feel slightly guilty, especially as some of my colleagues had applied several times before being accepted. The work itself was fairly repetitive – mostly entering data into spreadsheets – but I was surprised by how much I enjoyed the routine. I liked knowing exactly what was expected of me. The best part was my colleagues, who were incredibly welcoming. I left after a year to go to university, but I'm still in touch with two of them.` },
    D: { title: `Marcus`, text: `I started delivering newspapers when I was fourteen. I had to get up at half past five every morning, even in the middle of winter, which was tough. My parents thought I'd give up within a week, so I was determined to prove them wrong. I kept the job for three years in the end. It wasn't exciting, but it gave me my first taste of independence: I saved every penny and eventually bought myself a second-hand guitar. Looking back, I think the job taught me the value of money. I'm much more careful with it than most of my friends.` },
  },
  questions: [
    { q: `says that a skill they developed has been useful in their current job?`, answer: `A`, explain: `"the patience I developed in that café has been invaluable in the classroom."` },
    { q: `explains that the job helped them decide on a career?`, answer: `B`, explain: `"It was that summer that made me realise I wanted to work with young people."` },
    { q: `felt uncomfortable about the way they got the job?`, answer: `C`, explain: `"I didn't have to go through any kind of interview, which made me feel slightly guilty."` },
    { q: `wanted to show that other people's expectations were wrong?`, answer: `D`, explain: `"My parents thought I'd give up within a week, so I was determined to prove them wrong."` },
    { q: `did not at first understand the reason for a task?`, answer: `A`, explain: `"At first I couldn't see the point..."` },
    { q: `found that their main reason for applying no longer existed when they started?`, answer: `B`, explain: `"I'd applied mainly because a friend was going, but she dropped out."` },
    { q: `enjoyed something they might have been expected to find boring?`, answer: `C`, explain: `"fairly repetitive... but I was surprised by how much I enjoyed the routine."` },
    { q: `has stayed in contact with people they worked with?`, answer: `C`, explain: `"I'm still in touch with two of them." (Lucía vuelve al café, pero Mr Ferris ya no está.)` },
    { q: `used their earnings to buy something?`, answer: `D`, explain: `"I saved every penny and eventually bought myself a second-hand guitar."` },
    { q: `mentions that the job was badly paid?`, answer: `B`, explain: `"The pay was terrible, to be honest..."` },
  ],
});
