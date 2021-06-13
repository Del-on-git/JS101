/*
Write a function that takes two array arguments, each containing a list of
numbers, and returns a new array containing the products of all combinations
of number pairs that exist between the two arrays. The returned array should be
sorted in ascending numerical order.

You may assume that neither argument will be an empty array.

INPUT: two non-empty arrays of numbers
OUTPUT: A single array sorted in ascending order containing the product of all
  element pairs

RULES:
  1. Always take in two non-empty arrays of numbers
  2. Always return a single array
  3. Each element in the first array must be multiplied against each
     element in the second

DATASTRUCTURE:
  Arrays

ALGORITHM:
1. SET products = []
2. WHILE we have not reached the end of the first array
3.  WHILE we have not reached the end of the second array
4.    push currentElement_array_1 * currentElementArray2 to products
5. sort products
6. return products
*/

function multiplyAllPairs(arr1, arr2) {
  let products = [];
  arr1.forEach(num => arr2.forEach(val => products.push(val * num)));

  products.sort((a, b) => a - b);

  return products;
}

console.log(multiplyAllPairs([2, 4], [4, 3, 1, 2]));    // [2, 4, 4, 6, 8, 8, 12, 16]