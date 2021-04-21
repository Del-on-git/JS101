//Write three different ways to remove all of the elements from the following
//array:

let numbers = [1, 2, 3, 4];

console.log(numbers.filter((num) => num !== num));
console.log(numbers.map((num) => []).flat());
console.log(numbers.reduce( (accum, currVal) => {
  return accum;
}, []));
console.log(numbers);