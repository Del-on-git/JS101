/*
Write a function that takes a floating point number representing an angle
between 0 and 360 degrees and returns a string representing that angle in
degrees, minutes, and seconds. You should use a degree symbol (˚) to represent
degrees, a single quote (') to represent minutes, and a double quote (") to
represent seconds. There are 60 minutes in a degree, and 60 seconds in a minute.

INPUT:  a floating point number representing an angle between 0 and 360
OUTPUT: a string representing degrees˚ minutes' seconds"

RULES:
  1. input is a real number between 0 and 360
  2. output is a string of integers delineated by degree-minute-second
  3. if input is 360, output may be either pent-zero or 360 quad-naught
  4. 60 minutes to a degree
  5. 60 seconds to a minute
  6. no further subdivision of the angle after seconds

DATASTRUCTURE:
  primitives; numbers and strings only

ALGO:
1. START
2. SET result = ''
3. concatenate result with integer part of input and degree sign
4. SET minute = 60 * remainder of input over 1
5. concatenate result with minute and '
6. SET second = 60 * remainder of input over 1
7. concatenate result with minute and "
8. RETURN result
*/

function dms(inputNum) {
  let result = "";

  result += String(Math.floor(inputNum)) + '˚';

  let minute = 60 * (inputNum % 1);

  result += String(Math.floor(minute)).padStart(2, '0') + "'";

  let second = 60 * (minute % 1);

  result += String(Math.floor(second)).padStart(2, '0') + '"';

  return result;
}

console.log(dms(30));           // 30°00'00"
console.log(dms(76.73));        // 76°43'48"
console.log(dms(254.6));        // 254°35'59"
console.log(dms(93.034773));    // 93°02'05"
console.log(dms(0));            // 0°00'00"
console.log(dms(360));          // 360°00'00" or 0°00'00"