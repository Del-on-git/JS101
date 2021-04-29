let myArr = [[18, 7], [3, 12]].forEach(arr => {
  return arr.map(num => {
    if (num > 5) {
      return console.log(num);
    }
  });
});

/*
  The variable myArr is declared an initialized with the value returned from
  a call to the method `forEach` on the outer array of the literal
  `[[18, 7], [3, 12]]` . Since `forEach` always returns `undefined`, the
  value of `myArr` after this code executes will be `undefined`. The assignment
  operator `=` itself also returns `undefined`, and this value is not used.

  The callback function used in `forEach` accepts each sub-array from the
  literal `[[18, 7], [3, 12]]` as an argument, which is then used to call
  `map`. The array returned from `map` is explicitly returned by the callback
  function defined as a parameter of `forEach`, though this returned array will
  not be used. `map` will take each element in the sub-array it is called
  on, assign the value of that element to the parameter `num`  and perform a
  comparison with `num` in an `if` statement. If the current value of `num`
  is greater than 5, then the value of `num` is logged and the return of
  `console.log`, which is `undefined` is explicitly returned by `map` and
  therefore pushed to the array that will ultimately be returned explicitly
  by `map`. If the value of `num` is less than 5, then the code block for
  the `if` statement is not entered and nothing is explicitly returned by the
  callback function defined for `map`, which implicitly returns `undefined`
  for `map`.

  The return values for each call to `map` are [`undefined`, `undefined`]
*/