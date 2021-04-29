//How would you sort this array by length of words?

let words = ['go', 'ahead', 'and', 'jump'];

console.log(words);

words.sort( (word1, word2) => {
  return word1.length - word2.length;
});

console.log(words);