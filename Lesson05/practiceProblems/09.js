//Given the following data structure, return a new array with the same
//structure, but with the subarrays ordered -- alphabetically or numerically as
//appropriate -- in ascending order.

let arr = [['b', 'c', 'a'], [2, 1, 3], ['blue', 'black', 'green']];

arr.forEach( element => {
  if (typeof (element[0]) === 'number') {
    element.sort( (a,b) => a - b);
  } else {
    element.sort();
  }
});

console.log(arr);