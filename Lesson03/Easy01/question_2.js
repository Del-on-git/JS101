//How can you determine whether a given string ends with an exclamation mark (!)?

let endsWithBang1 = (str) => str.slice(-1) === '!';

let endsWithBang2 = (str) => str.split('').reverse()[0] === '!';

let readline = require('readline-sync');

let test = readline.question("Give a string: ");
console.log(`EWB1: ${endsWithBang1(test)}`);
console.log(`EWB2: ${endsWithBang2(test)}`);