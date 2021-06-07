/*
Write a function that returns true if the string passed as an argument is a
palindrome, or false otherwise. A palindrome reads the same forwards and
backwards. For this problem, the case matters and all characters matter.

INPUT: a string
OUTPUT: a boolean that indicates if the input string is a palindrome

RULES:
  1. Always take in a string
  2. Always return a boolean value, nothing truthy
  3. Case matters: 'Mom' is not a palindrome, but 'mom' is.

DATASTRUCTURE:
  Work with a string literal and an intermediary array

ALGO:
  START
  SET str =  to the input string
  SET str = to an array of the characters in str
  SET str = to the array from the previous line reversed
  SET str = to the characters from the reverse array concatenated together
  RETURN a comparision between str and the input string
  END
*/

let isPalindrome = str => str === str.split('').reverse().join('');

console.log(isPalindrome('madam'));               // true
console.log(isPalindrome('Madam'));               // false (case matters)
console.log(isPalindrome("madam i'm adam"));      // false (all characters matter)
console.log(isPalindrome('356653'));              // true