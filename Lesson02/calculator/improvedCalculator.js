const MESSAGES = {
  WELCOME: 'Welcome to the calculator!',
  GOODBYE: 'Thanks for calculating; goodbye!',
  REQUEST_NUMBER: 'Enter a number: ',
  USER_PROMPT: '>> ',
  REQUEST_OPERATION: 'Choose an operation (+, -, *, /): ',
  AGAIN_PROMPT: 'Would you like to calculate again? (Y/N): ',
  UNKNOWN_OPERATION_ERR: 'ERROR: Unknown operation!',
  DIV_BY_ZERO_ERR: 'ERROR: Division by zero is not allowed!',
  NAN_ERR: 'ERROR: Value provided is not a number!'
};

let readline = require('readline-sync');

let values = {
  num1: null,
  num2: null,
  operation: '',
  result: null
};

let operation = (str) => {
  switch (str) {
    case '+':
      return (x, y) => x + y;
    case '-':
      return (x, y) => x - y;
    case '*':
      return (x, y) => x * y;
    case '/':
      return function(x, y) {
        return ( y === 0 ) ? MESSAGES.DIV_BY_ZERO_ERR : x / y;
      };
    default:
      return MESSAGES.UNKNOWN_OPERATION_ERR;
  }
};

let isNumber = (num) => {
  if (Number.isNaN(num)) {
    console.log(MESSAGES.NAN_ERR);
    return false;
  } else {
    return true;
  }
};

let isOp = (str) => {
  if (str === '+' || str === '-' || str === '*' || str === '/') {
    return true;
  } else {
    console.log(MESSAGES.UNKNOWN_OPERATION_ERR);
    return false;
  }
};

let getNum = () => {
  console.log(MESSAGES.REQUEST_NUMBER);
  let input = readline.question(MESSAGES.USER_PROMPT);
  return (input.trimStart() === '') ? NaN : parseFloat(input);
};

let getOp = () => {
  console.log(MESSAGES.REQUEST_OPERATION);
  return readline.question(MESSAGES.USER_PROMPT);
};

let repeat = () => {
  console.log(MESSAGES.AGAIN_PROMPT);
  return (readline.question(MESSAGES.USER_PROMPT).toUpperCase() !== 'N');
};

//=============================================================== PROGRAM START
console.log(MESSAGES.WELCOME);
do {
  do {
    values.num1 = getNum();
  } while (!isNumber(values.num1));

  do {
    values.num2 = getNum();
  } while (!isNumber(values.num2));

  do {
    values.operation = getOp();
  } while (!isOp(values.operation));

  values.result = operation(values.operation)(values.num1, values.num2);

  console.log(`\n${values.num1} ${values.operation} ${values.num2} = ${values.result}\n`);
} while (repeat());

console.log(MESSAGES.GOODBYE);
//================================================================= PROGRAM END