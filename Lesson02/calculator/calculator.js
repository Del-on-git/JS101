console.log("Welcome to the calculator!");
const readline = require('readline-sync');
let quit = 'N';
do {
  calculate();
  quit = readline.question("Would you like to calculate again? (Y/N): ");
} while(quit.toUpperCase() != 'N');
console.log("Thanks for calculating; goodbye!");

function calculate() {
  let calculator = {
                    x: 0,
                    y: 0,
                    '+': function() { return this.x + this.y; },
                    '-': function() { return this.x - this.y; },
                    '*': function() { return this.x * this.y; },
                    '/': function() { return (this.y != 0) ?
                                              this.x / this.y
                                              : "Division by zero not allowed!";
                                    }
                   }
  calculator['x'] = parseInt(readline.question('Enter a number: '));
  calculator['y'] = parseInt(readline.question('Enter a number: '));
  let operation = readline.question('Choose an operation (+, -, *, /): ');
  if (assertOperation(operation)) {
    let response = calculator[operation]();
    console.log(`Your result is ${response}\n`);
  } else {
    console.log('I do not understand this operation.');
  }
}

function assertOperation(str) {
  return str === '+' || str === '-' || str === '*' || str === '/';
}