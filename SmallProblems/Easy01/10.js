/*
Write a function that computes the sum of all numbers between 1 and some other
number, inclusive, that are multiples of 3 or 5. For instance, if the supplied
number is 20, the result should be 98 (3 + 5 + 6 + 9 + 10 + 12 + 15 + 18 + 20).

You may assume that the number passed in is an integer greater than 1.
*/

let readline = require('readline-sync');

function sumMultsOf3Or5(num) {
  let result = 0;

  for ( let val = 1; val <= num; val++ ) {
    if (val % 3 === 0 || val % 5 === 0) result += val;
  }

  return result;
}

console.log(sumMultsOf3Or5(20));