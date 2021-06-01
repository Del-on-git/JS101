function logInBox(str, maxWidth = 80) {
  if (str.length > maxWidth) str = str.slice(0, maxWidth);

  const LEFT_CORNER = "*-";
  const RIGHT_CORNER = "-*";
  const SIDE = "|";
  const BLANK = " ".repeat(str.length + 2);

  let padding = "-".repeat(str.length);

  console.log(LEFT_CORNER + padding + RIGHT_CORNER);
  console.log(`${SIDE}${BLANK}${SIDE}`);
  console.log(`${SIDE} ${str} ${SIDE}`);
  console.log(`${SIDE}${BLANK}${SIDE}`);
  console.log(LEFT_CORNER + padding + RIGHT_CORNER);
}

logInBox('To boldly go where no one has gone before.');
logInBox('The purpose of this string is to show what happens when our inputs are entirely too long; subsequently, this should be a truncated message in a box');
logInBox('');