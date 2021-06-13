/*
Take the number 735291 and rotate it by one digit to the left, getting 352917.
Next, keep the first digit fixed in place and rotate the remaining digits to get
329175. Keep the first two digits fixed in place and rotate again to get 321759.
Keep the first three digits fixed in place and rotate again to get 321597.
Finally, keep the first four digits fixed in place and rotate the final two
digits to get 321579. The resulting number is called the maximum rotation of
the original number.

Write a function that takes an integer as an argument and returns the maximum
rotation of that integer. You can (and probably should) use the
rotateRightmostDigits function from the previous exercise.

INPUT: A number
OUTPUT: A number that is the result of iteratively rotating the digits
        rightmost-wise, from most significant digit to least significant

RULES:
  1. Always input a string of digits
  2. Always output a string of digits
  3. Rotate from most significant to least significant digit
  4. Leading zeros are dropped from the returned number

DATASTRUCTURE:
  number -> string -> array -> string -> number

ALGO:
  1. SET count = the number of digits in the input number
  2. WHILE count is greater than or equal to zero
  3.  SET input = rotateRightmostDigits(input, count)
  4.  decrement count
  5. RETURN input (modified)
*/

function rotateRightmostDigits(input, count) {
  let digits = String(input).split('');
  let toMove = digits.splice(digits.length - count, 1);
  digits.push(toMove);
  return Number(digits.join(''));
}

function maxRotation(number) {
  let count = String(number).split('').length;

  while (count >= 0) {
    number = rotateRightmostDigits(number, count);
    count--;
  }

  return number;
}

console.log(maxRotation(735291)     === 321579);
console.log(maxRotation(3)          === 3);
console.log(maxRotation(35)         === 53);
console.log(maxRotation(105)        === 15);
console.log(maxRotation(8703529146) === 7321609845);