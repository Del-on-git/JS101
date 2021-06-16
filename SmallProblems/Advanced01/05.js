function merge(arr1, arr2) {
  let stopLength = arr1.length + arr2.length;
  let val1 = arr1.shift();
  let val2 = arr2.shift();
  let merged = [];

  while (merged.length < stopLength) {
    if ((val2 < val1) || val1 === undefined) {
      merged.push(val2);
      val2 = arr2.shift();
    } else if ((val1 < val2) || val2 === undefined) {
      merged.push(val1);
      val1 = arr1.shift();
    }
  }

  return merged;
}

console.log(merge([1, 5, 9], [2, 6, 8]));      // [1, 2, 5, 6, 8, 9]
console.log(merge([1, 1, 3], [2, 2]));         // [1, 1, 2, 2, 3]
console.log(merge([], [1, 4, 5]));             // [1, 4, 5]
console.log(merge([1, 4, 5], []));             // [1, 4, 5]