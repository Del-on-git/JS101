//Sort the array of arrays in ascending order of the sum of their contents

let scores = [[3, 6, 4], [6, 8, 9], [1, 4, 2]];

console.log(scores);

let sum = (arr) => arr.reduce((accum, currVal) => accum + currVal, 0);

scores.sort( (a, b) => sum(a) - sum(b));

console.log(scores);