//Given the following data structure, sort the array so that the sub-arrays are
//ordered based on the sum of the odd numbers that they contain.

let arr = [[1, 6, 7], [1, 5, 3], [1, 8, 3]];

arr.sort( (a, b) => {
  let oddsA = a.filter(num => num % 2);
  let oddsB = b.filter(num => num % 2);
  let sumA = oddsA.reduce((tot, curr) => tot + curr, 0);
  let sumB = oddsB.reduce((tot, curr) => tot + curr, 0);
  return sumA - sumB;
});

console.log(arr);