/*
Write a program that will ask for user's name. The program will then greet the
user. If the user writes "name!" then the computer yells back to the user.
*/

const YELL = "WHY ARE WE SCREAMING?";

let readline = require('readline-sync');

function greet() {
  let name = readline.question("What is your name? ");
  if (name.split('').reverse()[0] !== '!') {
    console.log(`Hello, ${name}.`);
  } else {
    name = name.slice(0,name.length - 1).toUpperCase();
    console.log(`HELL0, ${name}. ${YELL}`);
  }
}

greet();