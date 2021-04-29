[[1, 2], [3, 4]].map(arr => {
  return arr.map(num => num * 2);
});

/*
  The method `map` is called on the outer array of the literal
  `[[1, 2], [3, 4]]`. The parameter `arr` is iteratively assigned to each
  sub-array, which is then passed to the callback function defined in the
  outer call of `map`, which will explicitly return the new array created
  by the inner call of `map`. The inner call of `map` iteratively assigns the
  contents of `arr` to the parameter `num` and then
  implicitly returns the value of the `num` argument multiplied by 2. Each of
  the return values for the inner call to `map` is placed into the array
  explicitly returned by the outercall. The object returned by the outer
  call to `map` will be:

  [[2, 4], [6, 8]]
*/