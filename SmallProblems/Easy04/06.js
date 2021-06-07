/*
Write a function that returns true if its integer argument is palindromic, or
false otherwise. A palindromic number reads the same forwards and backwards.

INPUT: A number
OUTPUT: A boolean that indicates if the number is a palindrome

RULES:
  1. Always take in a number
  2. Always output a boolean
  3. 11 is a palindromic number
  4. 12 is not a palindromic number
  5. Single digits are always palindrome
  6. Negative numbers are never palindromes?

DATASTRUCTURE:
  Number -> String -> Array

ALGO:
  START
  SET compareMe1 = input converted to a string
  SET compareMe2 = to an array of the characters from compareMe1
  SET compareMe2 = to previous array reversed
  SET compareMe2 = to previous array concatenated to string
  return compareMe1 === compareMe2
  END
*/

function isPalindromicNumber(num) {
  let compareMe1 = String(num);
  let compareMe2 = compareMe1.split('').reverse().join('');

  return compareMe1 === compareMe2;
}

console.log(isPalindromicNumber(34543));        // true
console.log(isPalindromicNumber(123210));       // false
console.log(isPalindromicNumber(22));           // true
console.log(isPalindromicNumber(5));            // true