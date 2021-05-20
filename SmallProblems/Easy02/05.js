/*
Write a program that prompts the user for two positive integers, and then prints
the results of the following operations on those two numbers: addition,
subtraction, product, quotient, remainder, and power. Do not worry about
validating the input.
*/
const PROMPT = "Enter an integer:\n>> ";

let readline = require('readline-sync');

let operations = {
  add: function (x, y) {console.log(`x + y: ${x + y}`)},
  sub: function (x, y) {console.log(`x - y: ${x - y}`)},
  mul: function (x, y) {console.log(`x * y: ${x * y}`)},
  div: function (x, y) {console.log(`x / y: ${x / y}`)},
  rem: function (x, y) {console.log(`x % y: ${x % y}`)},
  pow: function (x, y) {console.log(`x ** y ${Math.pow(x, y)}`)}
};

let getNum = () => Number.parseInt(readline.question(PROMPT), 10);

function doArithmetic() {
  let a = getNum();
  let b = getNum();

  Object.values(operations).forEach( func => func(a,b));
}

doArithmetic();