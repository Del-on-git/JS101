//Implement a version of logInBox that uses wrapping for long strings.

function logInBox(str, maxWidth = 80) {
  let words = [];
  while (str.length > maxWidth) {
    words.push(str.slice(0, maxWidth));
    str = str.slice(maxWidth);
  }
  if (str !== '') words.push(str);
  if (words.length === 0) words.push('');

  const BAR = `+-${'-'.repeat(words[0].length)}-+`;
  const BLANK = `|${" ".repeat(words[0].length + 2)}|`;

  console.log(BAR);
  console.log(BLANK);
  console.log(`| ${words.shift()} |`);
  words.forEach(line => console.log(`| ${line.padEnd(maxWidth, ' ')} |`));
  console.log(BLANK);
  console.log(BAR);
}

logInBox('To boldly go where no one has gone before.');
logInBox('The purpose of this string is to show what happens when our inputs are entirely too long; subsequently, this should be a wrapped message in a box');
logInBox('we can wrap sentences if we want to, we can leave this line behind, and if your friends dont wrap because they cant wrap then their no friends of mine. We can newline if we want to, sometimes we have to start a new line below because we dont know how far this can go on.');
logInBox('');