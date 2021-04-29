[[1, 2], [3, 4]].map(arr => {
  console.log(arr[0]);
  return arr[0];
});

/*
  The method call `map` is performed on the outer array of the literal
  `[[1, 2], [3, 4]]`. Each subarray will be passed as an argument to the
  callback function, and the parameter `arr` will be assigned to the value
  of those arguments iteratively. The callback function will first use the
  `[]` reference operator to return the value of the first element of each
  subarray to `console.log`, which will output the value of that element and
  return `undefined`. The callback function will then invoke the reference
  operator `[]` to return the value of the first element in each subarray as
  its own return value, which is then appended to the array that will be
  returned from the call to `map`. The array returned from `map` will be
  `[1, 3]` .
*/