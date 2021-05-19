/*
Build a program that asks the user to enter the length and width of a room in
meters, and then logs the area of the room to the console in both square meters
and square feet.

Note: 1 square meter == 10.7639 square feet

Do not worry about validating the input at this time. Use the
readlineSync.prompt method to collect user input.
*/

const sqftToSqm = 10.7639;

let len = prompt("How many meters long is the room? ");
let wid = prompt("How many meters wide is the room? ");

console.log(`Area = ${len * wid * sqftToSqm} sq. ft.`);