function getMadLibs() {
  let readline = require('readline-sync');
  let noun = readline.question("Need a noun: ");
  let verb = readline.question("Need a verb: ");
  let adjective = readline.question("Need an adjective: ");
  let adverb = readline.question("Need an adverb: ");

  console.log(` Do you ${verb} your ${adjective} ${noun} ${adverb}?\n That's hilarious! The ${adjective} ${noun} ${verb}s ${adverb} over the lazy ${noun}.\n The ${noun} ${adverb} ${verb}s up ${adjective} Joe's turtle.`);
}

getMadLibs();