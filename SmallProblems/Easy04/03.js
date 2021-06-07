/*
Build a program that logs when the user will retire and how many more years the
user has to work until retirement.

EXAMPLES:
What is your age? 30
At what age would you like to retire? 70

It's 2017. You will retire in 2057.
You have only 40 years of work to go!

INPUT: a string representing the current age of the user, and another string
      indicating the users prospective retirement age
OUTPUT: a string indicating the current year, the year user retires, and the
        difference between thsoe two years.

RULES:
  1. User gives two numbers, both integers
  2. Return the current year and the year for retirement
  3. Return the integer difference between those two years

DATASTRUCTURE:
  Primitive values, an array in a helper function
*/

function getYear() {
  let dateStrings = new Date().toString().split(' ');

  return Number(dateStrings[3]);
}

let formatAge = ageStr => Math.floor(Number(ageStr));

function whenWillRetire() {
  let readline = require('readline-sync');
  let currAge = readline.question("What is your age? ");
  let retirementAge = readline.question("At what age would you like to retire? ");

  currAge = formatAge(currAge);
  retirementAge = formatAge(retirementAge);

  let currYear = getYear();
  let yearDiff = retirementAge - currAge;
  let retYear = currYear + yearDiff;

  console.clear();
  console.log(`It's ${currYear}. You will retire in ${retYear}`);
  console.log(`You have only ${yearDiff} years of work to go!`);
}

whenWillRetire();