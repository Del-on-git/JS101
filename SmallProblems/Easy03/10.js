/*
Write a function that takes a year as input and returns the century. The return
value should be a string that begins with the century number, and ends with
'st', 'nd', 'rd', or 'th' as appropriate for that number.

New centuries begin in years that end with 01. So, the years 1901 - 2000
comprise the 20th century.

INPUT: an integer representing a year
OUTPUT: a string comprised of a number with a suffix indicating a century

EXPLICIT RULES:
  1. A century starts in year 01

DATASTRUCTURE:
  An integer primitive that will be incremented by 100

ALGO:
  START
  SET counter to 1
  SET century to 1
  SET suffix to null
  WHILE year is less than counter
    increment counter by 100
    increment century by 1
  check last digit in century
    IF last digit is 1 and last 2 digits are not 11
      SET suffix to 'st'
    IF last digit is 2 and last 2 digits are not 12
      SET suffix to 'nd'
    IF last digit is 3 and last 2 digits are not 13
      SET suffix to 'rd'
    otherwise
      SET suffix to 'th'
  RETURN "century + suffix"
  END
*/
function determineSuffix(number) {
  switch (((number / 100) % 1) * 100) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

function century(year) {
  let counter = 0;
  let century = 0;
  while (year > counter) {
    counter += 100;
    century++;
  }

  let suffix = determineSuffix(century);

  return String(century) + suffix;
}

console.log(century(2000));        // "20th"
console.log(century(2001));        // "21st"
console.log(century(1965));        // "20th"
console.log(century(256));         // "3rd"
console.log(century(5));           // "1st"
console.log(century(10103));       // "102nd"
console.log(century(1052));        // "11th"
console.log(century(1127));        // "12th"
console.log(century(11201));       // "113th"