/*
Using the multiply() function from the "Multiplying Two Numbers" problem, write
a function that computes the square of its argument (the square is the result of
multiplying a number by itself).
*/

let multiply = (a, b) => a * b;

let square = (x) => multiply(x, x);

console.log(square(5) === 25);
console.log(square(13) === 169);
console.log(square(-9) === 81);