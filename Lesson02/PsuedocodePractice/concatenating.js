//START
function mashStrings( arrayOfStrings ) {
  //SET return object equal to empty string
  let response = '';
  //FOR each element in the given array
  for (let x in arrayOfStrings) {
  //concatenate element from given array to end of return object
    response += arrayOfStrings[x];
  }
  //return final object
  return response;
  //END
}

//test client
let readline = require('readline-sync');
console.log(mashStrings(readline.question("Strings? ").split(' ')));