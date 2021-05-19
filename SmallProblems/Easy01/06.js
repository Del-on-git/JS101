/*
Write a program that asks the user to enter an integer greater than 0, then asks
whether the user wants to determine the sum or the product of all numbers
between 1 and the entered integer, inclusive.
*/

let readline = require('readline-sync');

function getAndValidateNum() {
  let num = readline.question("Please enter an integer greater than 0: ");
  num = Number.parseInt(num, 10);
  if (Number.isNaN(num) || num === 0) {
    return getAndValidateNum();
  }

  return num;
}

function sumInts(num) {
  let sum = 0;
  for (let int = 0; int <= num; int++) {
    sum += int;
  }
  console.log(`The sum of integers from 1 to ${num} is ${sum}`);
}

function intProd(num) {
  let product = 1;
  for (let int = 1; int <= num; int++) {
    product *= int;
  }
  console.log(`The product of integers from 1 to ${num} is ${product}`);
}

function isValidInput(input) {
  return 'sp'.includes(input) && (input !== '');
}

function getAndValidateSelection() {
  let input;
  do {
    input = readline.question('Enter "s" to compute the sum, or "p" to compute the product. ').toLowerCase();
  } while (!isValidInput(input));

  switch (input) {
    case 's':
      return sumInts;
    case 'p':
      return intProd;
    default:
      console.log("Select 's' or 'p'");
      return getAndValidateSelection();
  }
}

let number = getAndValidateNum();
getAndValidateSelection()(number);