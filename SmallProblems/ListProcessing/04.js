/*
Write a function that takes a string argument and returns a list of substrings
of that string. Each substring should begin with the first letter of the word,
and the list should be ordered from shortest to longest.

INPUT: A single string
OUTPUT: An array containing all of the substrings from the first single
        character in the input to the full input string

RULES:
  1. Always take in a single string
  2. Always output an array of strings
  3. Strings should be sorted by length, shortest to longest

DATASTRUCTURE:
  An array

ALGO:
1. SET substrings = []
2. SET characters = inputString an array of characters
3. WHILE we have not reached the end of characters
4.  concatenate current character with substring of all previous characters
5.  push substring to substrings
6. RETURN substrings
*/

function leadingSubstrings(inputString) {
  let substrings = [];
  inputString.split('')
    .reduce((sub, char) => {
      substrings.push(sub + char);
      return sub + char;
    }, '');

  return substrings;
}

console.log(leadingSubstrings('abc'));      // ["a", "ab", "abc"]
console.log(leadingSubstrings('a'));        // ["a"]
console.log(leadingSubstrings('xyzzy'));    // ["x", "xy", "xyz", "xyzz", "xyzzy"]