//Perform the same transformation of sorting the subarrays we did in the
//previous exercise with one difference; sort the elements in descending order.

let arr = [['b', 'c', 'a'], [2, 1, 3], ['blue', 'black', 'green']];

arr.forEach( element => {
  if (typeof (element) === 'number') {
    element.sort( (a, b) => b - a);
  } else {
    element.sort().reverse();
  }
});

console.log(arr);