//Given the following code, select the code snippets that return the value for
//the object property key three.

const ARR = [
  { one: '1', two: 2 },
  [ { four: 5, three: 6 }, 'three' ],
  'three',
  { 2: 'two', 3: 'three' }
];

console.log(ARR[1][0]['three']);
console.log(ARR[1][0].three);