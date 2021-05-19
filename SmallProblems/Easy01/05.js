/*
Create a simple tip calculator. The program should prompt for a bill amount and
a tip rate. The program must compute the tip, and then log both the tip and the
total amount of the bill to the console. You can ignore input validation and
assume that the user will enter numbers.

example:

What is the bill? 200
What is the tip percentage? 15

The tip is $30.00
The total is $230.00
*/

let readline = require('readline-sync');
let bill = readline.question("What is the billed amount? ");
let tipPercentage = readline.question("What is the tip percentage? ");

bill = Number.parseFloat(bill);
tipPercentage = Number.parseFloat(tipPercentage) / 100;

let tip = bill * tipPercentage;
let total = bill + tip;

console.log(`\nThe tip is $${tip.toFixed(2)}`);
console.log(`The total is $${total.toFixed(2)}`);