let INTERNATIONAL_MESSAGES = require('./calculator_messages.json');

let readline = require('readline-sync');

let lang;

let MESSAGES;

let isValidLang = (str) => {
  if (str.trimStart() === '') {
    return false;
  }
  let choice = parseInt(str, 10);
  if (Number.isNaN(choice)) {
    return false;
  } else if (choice < 1 || choice > INTERNATIONAL_MESSAGES.LANG_CHOICE) {
    return false;
  } else {
    return true;
  }
};

let values = {
  num1: null,
  num2: null,
  op: '',
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

let getAndValidateNum = () => {
  let input;
  do {
    console.log(MESSAGES.REQUEST_NUMBER);
    input = readline.question(MESSAGES.USER_PROMPT);
    input =  (input.trimStart() === '') ? NaN : parseFloat(input);
  } while (!isNumber(input));
  return input;
};

let isOp = (str) => {
  if (str === '+' || str === '-' || str === '*' || str === '/') {
    return true;
  } else {
    console.log(MESSAGES.UNKNOWN_OPERATION_ERR);
    return false;
  }
};

let getAndValidateOp = () => {
  let input;
  do {
    console.log(MESSAGES.REQUEST_OPERATION);
    input = readline.question(MESSAGES.USER_PROMPT);
  } while (!isOp(input));
  return input;
};

let repeat = () => {
  let choice;
  do {
    console.log(MESSAGES.AGAIN_PROMPT);
    choice = readline.question(MESSAGES.USER_PROMPT);
    switch (choice.toUpperCase()) {
      case 'Y':
        console.clear();
        return true;
      case 'N':
        console.clear();
        return false;
      default:
        console.log(MESSAGES.INVALID_CHOICE);
    }
  } while (true);
};

//=============================================================== PROGRAM START
//Greet user, select valid language, set language to user selection
do {
  console.log(INTERNATIONAL_MESSAGES.GREETING);
  lang = readline.question(">> ");
} while (!isValidLang(lang));

MESSAGES = INTERNATIONAL_MESSAGES[lang];

//Begin calculator using selected language, calculate until user quits
console.log(MESSAGES.WELCOME);
do {
  values.num1 = getAndValidateNum();

  values.num2 = getAndValidateNum();

  values.op = getAndValidateOp();

  values.result = operation(values.op)(values.num1, values.num2);

  console.log(`\n${values.num1} ${values.op} ${values.num2} = ${values.result}\n`);

} while (repeat());
console.log(MESSAGES.GOODBYE);
//================================================================= PROGRAM END