function isPalindrome(str) {
  return str === str.split('').reverse().join('');
}

//input: a string
//output: an array whose elements are palindromic substrings
//rules:
//
//  Explicit requirements:
//    -Case matters. "Pop" is not a palindrome, "pop" is.
//    -Palindromes are contiguous sequences of characters
//
//  Implicit requirements:
//    -Empty strings return an empty array
//    -No palindromes return an empty array

function palindromicSubstrings(str) {
  let substrings = [];
  for (let startIdx = 0; startIdx < str.length; startIdx++) {
    for (let stopIdx = startIdx + 2; stopIdx <= str.length; stopIdx++) {
      if (isPalindrome(str.slice(startIdx, stopIdx))) {
        substrings.push(str.slice(startIdx, stopIdx));
      }
    }
  }
  return substrings;
}

console.log(palindromicSubstrings("I will crush your problem racecar"));
console.log(palindromicSubstrings("supercalifragilisticexpialidocious"));
console.log(palindromicSubstrings("abcddcbA"));
console.log(palindromicSubstrings("palindrome"));
console.log(palindromicSubstrings(""));