/*
Write a program that solicits six numbers from the user and logs a message that
describes whether the sixth number appears among the first five numbers.

INPUT: 6 values from a user
OUTPUT: A statement about whether or not the 6th value has at least one
        other instance present among the first 5

EXAMPLES:

Enter the 1st number: 25
Enter the 2nd number: 15
Enter the 3rd number: 20
Enter the 4th number: 17
Enter the 5th number: 23
Enter the last number: 17

The number 17 appears in 25,15,20,17,23.

-----

Enter the 1st number: 25
Enter the 2nd number: 15
Enter the 3rd number: 20
Enter the 4th number: 17
Enter the 5th number: 23
Enter the last number: 18

The number 18 does not appear in 25,15,20,17,23.

RULES:
  1. The user must provide the inputs
  2. We only search the first 5 inputs for the 6th input
  3. We do not need to sort the inputs

QUESTIONS:
  1. What if the user inputs something other than a number?
  --Force user to input numbers only

DATA STRUCTURE:
  An array.

ALGO:
  SET userinputs to empty array
  FOR counter at zero, until counter is 5
    GET user input
    format input as a number
    IF input is NaN, post error and ask for valid input
    ELSE push input to userinputs array, increment counter
  search first five elements of userinputs for last element of userinputs
  IF search is successful, PRINT success message
  ELSE PRINT failure message
*/
const REQUESTS = [
  "Enter the 1st number: ",
  "Enter the 2nd number: ",
  "Enter the 3rd number: ",
  "Enter the 4th number: ",
  "Enter the 5th number: ",
  "Enter the last number: "
];

function searchInputs() {
  let userInputs = [];
  let readline = require('readline-sync');
  let input;
  for (let counter = 0; counter < 6;) {
    input = readline.question(REQUESTS[counter]);
    input = Number(input);
    if (!Number.isNaN(input)) {
      userInputs.push(input);
      counter++;
    } else {
      console.log("Error: Please enter a number");
    }
  }

  if (userInputs.slice(0, 5).includes(userInputs[5])) {
    console.log(`The number ${userInputs[5]} appears in ${userInputs.slice(0, 5)}`);
  } else {
    console.log(`The number ${userInputs[5]} does not appear in ${userInputs.slice(0, 5)}`);
  }
}

searchInputs();