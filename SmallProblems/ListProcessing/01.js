/*
Write a function that takes one argument, a positive integer, and returns the
sum of its digits. Do this without using for, while, or do...while loops -
nstead, use a series of method calls to perform the sum.

INPUT: A natural number
OUTPUT: A number that is the sum of the individual digits of the input


*/

function sum(inputNum) {
  return String(inputNum).split('')
    .reduce((sum, char) => sum + Number(char), 0);
}

console.log(sum(23) === 5);
console.log(sum(496) === 19);
console.log(sum(123456789) === 45);