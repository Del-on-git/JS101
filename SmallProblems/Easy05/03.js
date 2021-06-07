/*
Write a function that takes an array as an argument and returns an array that
contains two elements, each of which is an array. Put the first half of the
original array elements in the first element of the return value, and put the
second half in the second element. If the original array contains an odd number
of elements, place the middle element in the first half array.

INPUT:  An array
OUTPUT: An array with two subarrays, the first element is the first half of the
        elements in the input array, the second element is the last half

RULES:
  1. Input can contain even or odd number of elements
  2. If input has an odd number of elements, the middle element is included
     in the first half
  3. Do not mutate the input
  4. Always return two subarrays
*/

function halvsies(inputArray) {
  let toSplit = JSON.parse(JSON.stringify(inputArray));

  return [toSplit.splice(0, Math.ceil(toSplit.length / 2)), toSplit];
}

console.log(halvsies([1, 2, 3, 4]));       // [[1, 2], [3, 4]]
console.log(halvsies([1, 5, 2, 4, 3]));    // [[1, 5, 2], [4, 3]]
console.log(halvsies([5]));                // [[5], []]
console.log(halvsies([]));                 // [[], []]