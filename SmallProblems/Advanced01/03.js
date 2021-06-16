function transpose(inputMatrix) {
  let newMatrix = [];

  inputMatrix[0].forEach(_ => newMatrix.push([]));

  for (let row = 0; row < inputMatrix.length; row++) {
    for (let col = 0; col < inputMatrix[0].length; col++) {
      newMatrix[col][row] = inputMatrix[row][col];
    }
  }

  return newMatrix;
}

console.log(transpose([[1, 2, 3, 4]]));            // [[1], [2], [3], [4]]
console.log(transpose([[1], [2], [3], [4]]));      // [[1, 2, 3, 4]]
console.log(transpose([[1]]));                     // [[1]]
console.log(transpose([[1, 2, 3, 4, 5], [4, 3, 2, 1, 0], [3, 7, 8, 6, 2]]));
// [[1, 4, 3], [2, 3, 7], [3, 2, 8], [4, 1, 6], [5, 0, 2]]