//Determine whether the name Dino appears in the strings below -- check each
//string separately):

let str1 = "Few things in life are as important as house training your pet dinosaur.";
let str2 = "Fred and Wilma have a pet dinosaur named Dino.";

let checkForDino = (str) => str.includes('Dino');

console.log(checkForDino(str1));
console.log(checkForDino(str2));