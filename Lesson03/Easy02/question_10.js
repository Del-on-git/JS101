//Write two one-line expressions to count the number of lower-case t characters
//in each of the following strings:

//Write two one-line expressions to count the number of lower-case t characters
//in each of the following strings:

let statement1 = "The Flintstones Rock!";
let statement2 = "Easy come, easy go.";

console.log(statement1.split('').filter((char) => char === 't').length);
console.log(statement2.split('').filter((char) => char === 't').length);

console.log(statement1.split('').map((ele) => (ele === 't' ? ele : [])).flat().length);
console.log(statement2.split('').map((ele) => (ele === 't' ? ele : [])).flat().length);

console.log(statement1.split('').reduce( (accum, curVal) => {
  if (curVal === 't') {
    accum++;
  }
  return accum;
}, []));