/*
Write a function that takes one argument, a positive integer, and returns a
string of alternating '1's and '0's, always starting with a '1'. The length of
the string should match the given integer.
*/

console.log(stringy(6));    // "101010"
console.log(stringy(9));    // "101010101"
console.log(stringy(4));    // "1010"
console.log(stringy(7));    // "1010101"

function stringy(number) {
  let result = '';
  let one =   '1';
  let zero =  '0';

  for (let count = 0; count < number; count++) {
    result += (count % 2 === 0 ? one : zero);
  }

  return result;
}