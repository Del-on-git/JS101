/*
Write a function that returns a list of all substrings of a string. Order the
returned list by where in the string the substring begins. This means that all
substrings that start at index position 0 should come first, then all substrings
that start at index position 1, and so on. Since multiple substrings will occur
at each position, return the substrings at a given index from shortest to
longest.

You may (and should) use the leadingSubstrings function you wrote in the
previous exercise:

input: a single string
output: an array containing all substrings from the input arranged
        from shortest to longest, grouped by starting position in original input

rules:
  1. group strings in output by starting position of shortest substring in
      in subset

datastructure:
  an array

algorithm:
1. SET substrings = []
2. WHILE we have not reached the end of the inputString
3.  for the current character, call leadingSubstrings from current character to
      the end of the input string
4.  push the output of leadingSubstrings to substrings
5. RETURN substrings
*/

function leadingSubstrings(inputString) {
  let substrings = [];
  inputString.split('')
    .reduce((sub, char) => {
      substrings.push(sub + char);
      return sub + char;
    }, '');

  return substrings;
}

function substrings(inputString) {
  return inputString.split('')
    .map((_, idx) => leadingSubstrings(inputString.slice(idx)))
    .flat();
}

console.log(substrings('abcde'));

/* returns
[ "a", "ab", "abc", "abcd", "abcde",
  "b", "bc", "bcd", "bcde",
  "c", "cd", "cde",
  "d", "de",
  "e" ]
*/