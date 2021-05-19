/*
Write a function that takes two strings as arguments, determines the length of
the two strings, and then returns the result of concatenating the shorter
string, the longer string, and the shorter string once again. You may assume
that the strings are of different lengths.
*/

function shortLongShort(str1, str2) {
  let short = (str1.length < str2.length ? str1 : str2);
  let long = (short === str1 ? str2 : str1);

  return short + long + short;
}

let readline = require('readline-sync');

console.log(shortLongShort(readline.question("short: "), readline.question("long: ")));