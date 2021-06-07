/*
Modify the wordSizes function from the previous exercise to exclude non-letters
when determining word size. For instance, the word size of "it's" is 3, not 4.
*/

function wordSizes(inputStr) {
  let result = {};
  let words = inputStr.split(' ');

  words = words.map(word => word.toLowerCase().replace(/[^a-z0-9]/g, ""));

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

console.log(wordSizes('Four score and seven.'));                       // { "3": 1, "4": 1, "5": 2 }
console.log(wordSizes('Hey diddle diddle, the cat and the fiddle!'));  // { "3": 5, "6": 3 }
console.log(wordSizes("What's up doc?"));                              // { "2": 1, "3": 1, "5": 1 }
console.log(wordSizes(''));                                            // {}