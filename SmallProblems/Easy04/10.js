/*
Given a string of words separated by spaces, write a function that swaps the
first and last letters of every word.

You may assume that every word contains at least one letter, and that the string
will always contain at least one word. You may also assume that each string
contains nothing but words and spaces, and that there are no leading, trailing,
or repeated spaces.

INPUT:  string of space-separated 'words'
OUTPUT: string of space-separated 'words' with the first and last characters
        swapped

RULES:
  1. Words are strings of characters separated by spaces
  2. Every word is at least 1 character long
  3. No consecutive spaces, no leading spaces, no trailing spaces

DATASTRUCTURE:
  An array of strings from the input, concatenated before return

ALGO:
1. START
2. SET words = 'words' from inputString
3. WHILE we haven't reached the end of words
4.  SET firstChar = word[0]
5.  SET lastChar = word[last index]
6.  SET word = lastChar + word slice from index 1 to last index - 1 + firstChar
7. RETURN words concatenated
8. END
*/

function swap(inputStr) {
  let words = inputStr.split(' ');

  return words.map(word => {
    if (word.length > 1) {
      let firstChar = word[0];
      let lastChar = word[word.length - 1];

      return lastChar + word.slice(1, word.length - 1) + firstChar;
    } else {
      return word;
    }
  }).join(' ');
}

console.log(swap('Oh what a wonderful day it is'));  // "hO thaw a londerfuw yad ti si"
console.log(swap('Abcde'));                          // "ebcdA"
console.log(swap('a'));                              // "a"