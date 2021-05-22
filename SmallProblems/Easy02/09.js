/*
The parseInt() method converts a string of numeric characters (including an
optional plus or minus sign) to an integer. The method takes 2 arguments where
the first argument is the string we want to convert and the second argument
should always be 10 for our purposes. parseInt() and the Number() method behave
similarly. In this exercise, you will create a function that does the same
thing.

Write a function that takes a string of digits and returns the appropriate
number as an integer. **You may not use any of the methods mentioned above.**

For now, do not worry about leading + or - signs, nor should you worry about
invalid characters; assume all characters will be numeric.

You may not use any of the standard conversion methods available in JavaScript,
such as String() and Number(). Your function should do this the old-fashioned
way and calculate the result by analyzing the characters in the string.
*/

// understanding the Problem
//  -Establish the rules and defined the boundaries of the problem
/*
Given a string of numeric characters, convert that string into a primitive
of type 'number'.
===========================================================EXPLICIT REQUIREMENTS
INPUT: a string literal composed of the characters 0-9
OUTPUT: a number whose value is equal to the natural interpretation of the str.

  1. Can't use String(), Number(), or Number.parseInt()
  2. Input will represent an unsigned integer value in decimal

===========================================================IMPLICIT REQUIREMENTS

  1. Trim whitespace?
  2. Handle leading zeros?
  3. Be able to handle integer overflow?

Data Structure: an object; keys are 0-9, values are values 0-9

Algo:
0. SET chars = [];
1. split input string into individual characters
2. iterate over each character and translate it to its numeric value
3. multiply the numeric value by the appropriate power of 10
4. add the product from 3 to a resultant number
5. return result
*/

function stringToInteger(str) {
  let digits = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
  };

  let chars = str.split('').reverse();
  return chars.reduce( (val, char, idx) => {
    return val + (digits[char] * Math.pow(10, idx));
  }, 0);
}

console.log(stringToInteger("4321") === 4321); // logs true
console.log(stringToInteger("570") === 570); // logs true