/*
Write a function that takes a string argument and returns a new string that
contains the value of the original string with all consecutive duplicate
characters collapsed into a single character.

INPUT: a string
OUTPUT: a string with all consecutive duplicates removed

EXPLICIT RULES:
  1. only remove consecutive duplicates
  2. leave characters in same relative order
  3. empty inputs should return empty outputs

IMPLICIT RULES:
  1. duplicate whitespace should still be collapsed
*/

function crunch(str) {
  let result = '';
  let charList = str.split('');
  let currChar = null;

  charList.forEach((char) => {
    if (currChar !== char) {
      result += char;
      currChar = char;
    }
  });

  return result;
}

console.log(crunch('ddaaiillyy ddoouubbllee'));    // "daily double"
console.log(crunch('4444abcabccba'));              // "4abcabcba"
console.log(crunch('ggggggggggggggg'));            // "g"
console.log(crunch('a'));                          // "a"
console.log(crunch(''));                           // ""