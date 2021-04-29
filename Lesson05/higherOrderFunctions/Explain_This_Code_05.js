console.log([{ a: 'ant', b: 'elephant' }, { c: 'cat', d: 'dog' }].filter(object => {
  return Object.keys(object).every(key => object[key][0] === key);
}));

/*
  Call to `filter` on the outer array of object literal
  `[{ a: 'ant', b: 'elephant' }, { c: 'cat', d: 'dog' }` returns An array
  containing only the sub-objects whose properties have keys that are start
  with the same letter as the value they contain; in this case
  `[{ c: 'cat', d: 'dog' }]`. The returned value is not used.

  Call to Object.keys on each sub-object returns an array of the keys in the
  current sub-object, which is used by the subsequent call to the `every` method
  on each element of the array returned by the prior call to `Object.keys`,
  which returns a boolean indicating whether the callback function returns
  values that are all truthy. Those booleans are explicitly returned as the
  result of the  callback in `filter`.

  Within each call to `every` there is a call to `[key]` on the current
  sub-object passed to `filter` which returns the value of the `key` property
  in the current sub-object, which is used By the subsequent invocation of the
  `[]` operator during a call to `[0]' on the value of the `key` property in the
  current sub-object which returns the value of the 0 index position of the
  `key` property's value in the current sub-object. That return value will be
  used by the strict equality comparison operator `===` on `object[key][0]` and
  `key` which returns a boolean indicating whether the value of the 0 index
  position of the `object[key]` property is strictly equal to the value of `key`
  which will be used by `every`.
*/