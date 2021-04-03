console.log("Welcome to the calculator!");
const readline = require('readline-sync');
let quit = 'N';
do {
  calculate();
  quit = readline.question("Would you like to calculate again? (Y/N): ");
} while(quit.toUpperCase() != 'N');
console.log("Thanks for calculating; goodbye!");

function calculate() {
  let values = { x:0, y:0 };
  let calculator = (f, obj) => {
    switch(f) {
      case '+':
        return obj['x'] + obj['y'];
      case '-':
        return obj['x'] - obj['y'];
      case '*':
        return obj['x'] * obj['y'];
      case '/':
        return (obj['y'] != 0) ? obj['x'] / obj['y'] : "Division by zero not allowed!";
      default:
        return "Calculator does not understand this operation."
    }
  }
  values['x'] = parseInt(readline.question('Enter a number: '));
  values['y'] = parseInt(readline.question('Enter a number: '));
  let response = calculator(readline.question('Choose an operation (+, -, * /): '), values);
  console.log(`Your result is ${response}\n`);
}
