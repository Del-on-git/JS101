/*
Write a program that rotates an MxN matrix clockwise by 90 degrees

INPUT: An array of m subarrays with n elements each
OUTPUT: An array of n subarrays with m elements each

RULES:
1. The mth column of the input becomes the mth row of the output
2. The nth row of the input becomes the nth column of the output

DATASTRUCTURE:
  An array of n subarrays with m elements each

ALGO:
1. SET newMatrix = []
2. iterate over each element in inputMatrix, pushing [] to newMatrix for each
3. SET a counter = 0
4. WHILE counter is less than the number of elements of a row in inputMatrix
5.  push the counter-th element of each row to the counter-th row of newMatrix
6. RETURN newMatrix
*/

function rotate90(inputMatrix) {
  let newMatrix = [];
  inputMatrix[0].forEach(_ => newMatrix.push([]));

  for (let counter = 0; counter < newMatrix.length; counter++) {
    inputMatrix.forEach(row => newMatrix[counter].unshift(row[counter]));
  }

  return newMatrix;
}

let matrix1 = [
  [1, 5, 8],
  [4, 7, 2],
  [3, 9, 6],
];

let matrix2 = [
  [3, 7, 4, 2],
  [5, 1, 0, 8],
];

let newMatrix1 = rotate90(matrix1);
let newMatrix2 = rotate90(matrix2);
let newMatrix3 = rotate90(rotate90(rotate90(rotate90(matrix2))));

console.log(newMatrix1);      // [[3, 4, 1], [9, 7, 5], [6, 2, 8]]
console.log(newMatrix2);      // [[5, 3], [1, 7], [0, 4], [8, 2]]
console.log(newMatrix3);      // `matrix2` --> [[3, 7, 4, 2], [5, 1, 0, 8]]