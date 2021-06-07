/*
Write another function that returns true if the string passed as an argument is
a palindrome, or false otherwise. This time, however, your function should be
case-insensitive, and should ignore all non-alphanumeric characters. If you
wish, you may simplify things by calling the isPalindrome function you wrote in
the previous exercise.

INPUT: a string
OUTPUT: a boolean that indicates if the input string is a palindrome

RULES:
  1. Always take in a string
  2. Always return a boolean value, nothing truthy
  3. Case doesn't matter: 'Mom' and 'mom' are both palindromes.

DATASTRUCTURE:
  Work with a string literal and an intermediary array

ALGO:
  START
  SET str = []
  WHILE we haven't reached the end of the input string,
    IF the current character is alphanumeric
      convert to lowercase and push to str
  return comparison between str concatenated and reverse str concatenated
  END
*/

function isRealPalindrome(inputStr) {
  const ALPHANUMS = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let str = [];

  inputStr.split('').forEach( char => {
    if (ALPHANUMS.includes(char.toLowerCase())) str.push(char.toLowerCase());
  });

  return str.join('') === str.reverse().join('');
}

console.log(isRealPalindrome('madam'));               // true
console.log(isRealPalindrome('Madam'));               // true (case does not matter)
console.log(isRealPalindrome("Madam, I'm Adam"));     // true (only alphanumerics matter)
console.log(isRealPalindrome('356653'));              // true
console.log(isRealPalindrome('356a653'));             // true
console.log(isRealPalindrome('123ab321'));            // false