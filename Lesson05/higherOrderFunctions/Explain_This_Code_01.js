[[1, 2], [3, 4]].map(arr => console.log(arr[0]));
// 1
// 3
// => [undefined, undefined]

/*
  A call to the method `map` is performed on the outer array literal
  `[[1, 2], [3, 4]]` without side effects. The return value of this call
  will eventually be a new array, the elements of which will be determined by
  the return values of the callback function passed as an argument to `map`.

  The callback function passed as an argument to map takes a single parameter,
  named `arr`.  In this invocation, `arr` will be iteratively assigned to each
  element in the array literal `[[1, 2], [3, 4]]`, and passed as a local
  variable to the arrow function. Once inside the function, the `[]` reference
  operator will return the value of the first element of each
  subarray in the literal `[[1, 2], [3, 4]]`, which will then output the
  value of that element by a call to `console.log()`.  The method `console.log`
  always returns `undefined`, and as such each iteration of the callback
  function will also return `undefined`, which will be logged as the nth
  element of the array eventually returned by `map`.

  The return value of this line of code will be `[undefined, undefined]`.
*/