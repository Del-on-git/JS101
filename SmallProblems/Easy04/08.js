/*
Write a function that takes a string consisting of zero or more space separated
words and returns an object that shows the number of words of different sizes.

Words consist of any sequence of non-space characters.

INPUT:  a string consisting of zero or more words
OUTPUT: an object with the frequency of words of a given length

RULES:
  1. Words are delineated by spaces
  2. An empty string returns an empty object

DATASTRUCTURE:
  An object

ALGO:
  1. START
  2. SET result = {}
  3. SET words = an array of space separated strings
  4. WHILE we haven't reached the end of words
  5.  IF the length of the word is a property of result, increment property
  6.  ELSE SET result['word length'] = 1
  7. END
*/

function wordSizes(inputStr) {
  let result = {};
  let words = inputStr.split(' ');

  words.forEach(word => {
    if (result.hasOwnProperty(word.length)) {
      result[word.length]++;
    } else {
      result[word.length] = 1;
    }
  });

  delete result['0'];

  return result;
}

console.log(wordSizes('Four score and seven.'));                       // { "3": 1, "4": 1, "5": 1, "6": 1 }
console.log(wordSizes('Hey diddle diddle, the cat and the fiddle!'));  // { "3": 5, "6": 1, "7": 2 }
console.log(wordSizes("What's up doc?"));                              // { "2": 1, "4": 1, "6": 1 }
console.log(wordSizes(''));                                            // {}