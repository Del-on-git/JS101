/*
Given a string that consists of some words and an assortment of non-alphabetic
characters, write a function that returns that string with all of the
non-alphabetic characters replaced by spaces. If one or more non-alphabetic
characters occur in a row, you should only have one space in the result
(i.e., the result string should never have consecutive spaces).

INPUT: a string that may include non-alphabetic characters
OUTPUT: a string that only contains spaces and non-alphabetic characters

EXPLICIT REQUIREMENTS:
  1. All non-alphabetic characters, except spaces, must be removed
  2. Consectutive non-alphabetic characters should be replaced by a single space

IMPLICIT REQUIREMENTS:
  1. Punctuation will be removed
  2. Relative order of alphabetic characters will be preserved
  3. Cases do not change
  4. Result does not have to look like properly formatted English

DATASTRUCTURE:
  Work in a flat array; return a string

ALGO:
  START
  SET workingArray to split up INPUT
  SET result to empty array
  iterrate through chars in workingArray
    IF char is alphabetic
     push char to result
    ELSE
     IF last element of result is not a space
      push space to result
     ELSE
      don't do anything
  RETURN result
  END
*/

function cleanUp(phrase) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  let result = [];
  let workingArray = phrase.split('');

  workingArray.forEach( char => {
    if (alphabet.includes(char.toLowerCase())) {
      result.push(char);
    } else if (result[result.length - 1] !== ' ') {
      result.push(' ');
    }
  });

  return result.join('');
}

console.log(cleanUp("---what's my +*& line?"));    // " what s my line "