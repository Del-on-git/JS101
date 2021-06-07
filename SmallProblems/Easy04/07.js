/*
Write a function that takes an array of numbers and returns an array with the
same number of elements, but with each element's value being the running total
from the original array.

INPUT: An array of numbers
OUTPUT: Another array of the same length as the input, but the nth element
        is the sum of the first n elements

RULES:
  1. Always input an array of numbers
  2. Always output an array of numbers
  3. The nth element of the output array equals the sum of the first n elements
     of the input array
  4. An empty input should produce an empty output

DATASTRUCTURE:
  An array

ALGO:
  0. START
  1. SET result = []
  2. WHILE we haven't reached the end of the input
    3. push sum of all elements up to the current element (inclusive) to result
*/

function runningTotal(inputArr) {
  return inputArr.map((_, idx, thisArr) => {
    return thisArr.slice(0, idx + 1).reduce((sum, num) => sum + num, 0);
  });
}

console.log(runningTotal([2, 5, 13]));             // [2, 7, 20]
console.log(runningTotal([14, 11, 7, 15, 20]));    // [14, 25, 32, 47, 67]
console.log(runningTotal([3]));                    // [3]
console.log(runningTotal([]));                     // []