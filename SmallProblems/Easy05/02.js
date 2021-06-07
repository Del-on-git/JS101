/*
Write a function that takes two arrays as arguments and returns an array
containing the union of the values from the two. There should be no duplication
of values in the returned array, even if there are duplicates in the original
arrays. You may assume that both arguments will always be arrays.

INPUT:  Two arrays
OUTPUT: A single array containing all the unique values from both input arrays

RULES:
  1. Two arrays provided as inputs
  2. Each element in the output array is unique
  3. Elements in the output array should be sorted

DATASTRUCTURE:
  An array

ALGO:
1. START
2. push both inputs to the array inputValues and flatten
3. SET result = []
4. WHILE we haven't reached the end of inputValues
5.  IF current element of inputValues is not in result, push current element
*/

function union(inputArray1, inputArray2) {
  let inputValues = [inputArray1, inputArray2].flat();
  let result = [];

  inputValues.forEach(value => {
    if (!result.includes(value)) {
      result.push(value);
    }
  });

  return result;
}

console.log(union([1, 3, 5], [3, 6, 9]));    // [1, 3, 5, 6, 9]
console.log(union([1, 3, 3, 6], [0, 3, 5])); // [1, 3, 6, 0, 5]
console.log(union([1, 3, 3, 6], [0, [3, 5]])); // [ 1, 3, 6, 0, [ 3, 5 ] ]
console.log(union([], [])); // []
console.log(union([1, 2, 3], [2, 3, 4], [3, 4, 2, 1])); // [1, 2, 3, 4]