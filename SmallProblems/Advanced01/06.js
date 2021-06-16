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

function breakArray(rightArr) {
  let leftArr = rightArr.splice(0, rightArr.length / 2);

  if (rightArr.length < 1) {
    return leftArr;
  } else if (leftArr.length < 1) {
    return rightArr;
  } else {
    return merge(breakArray(leftArr), breakArray(rightArr));
  }
}

function mergeSort(inputArray) {
  let sortedArray = breakArray(JSON.parse(JSON.stringify(inputArray)));

  return sortedArray;
}

console.log(mergeSort([9, 5, 7, 1]));           // [1, 5, 7, 9]
console.log(mergeSort([5, 3]));                 // [3, 5]
console.log(mergeSort([6, 2, 7, 1, 4]));        // [1, 2, 4, 6, 7]

console.log(mergeSort(['Sue', 'Pete', 'Alice', 'Tyler', 'Rachel', 'Kim', 'Bonnie']));
// ["Alice", "Bonnie", "Kim", "Pete", "Rachel", "Sue", "Tyler"]

console.log(mergeSort([7, 3, 9, 15, 23, 1, 6, 51, 22, 37, 54, 43, 5, 25, 35, 18, 46]));
// [1, 3, 5, 6, 7, 9, 15, 18, 22, 23, 25, 35, 37, 43, 46, 51, 54]