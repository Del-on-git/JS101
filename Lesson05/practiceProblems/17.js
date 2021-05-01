//Each UUID consists of 32 hexadecimal characters (the digits 0-9 and the
//letters a-f) represented as a string. The value is typically broken into 5
//sections in an 8-4-4-4-12 pattern,
//e.g., 'f65c57f6-a6aa-17a8-faa1-a67f2dc9fa91'.

//Write a function that takes no arguments and returns a string that
//contains a UUID.

const HEX_CHARS = '0123456789abcdef'.split('');
const BASE = HEX_CHARS.length;

function randomNumber() {
  return Math.floor(Math.random() * BASE);
}

function generateHexChar() {
  return HEX_CHARS[randomNumber()];
}

function generateQuadruple() {
  let sequence = '';
  for (let idx = 0; idx < 4; idx++) {
    sequence += generateHexChar();
  }

  return sequence;
}

function generateOctuple() {
  return generateQuadruple() + generateQuadruple();
}

function generateDodectuple() {
  return generateOctuple() + generateQuadruple();
}

function generateUUID() {
  let uuid = generateOctuple() + '-';
  uuid += generateQuadruple() + '-';
  uuid += generateQuadruple() + '-';
  uuid += generateQuadruple() + '-';
  uuid += generateDodectuple();

  return uuid;
}

console.log(generateUUID());
console.log(generateUUID());
console.log(generateUUID());