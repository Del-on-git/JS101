//A human vs. cpu implementation of tic-tac-toe
let readline = require("readline-sync");

const BACKEND = require("./ticTacToe.json");
const MESSAGE = BACKEND.MESSAGES;
const ERROR = BACKEND.ERROR;

let SQUARES = {
  a:['  A1 ', '  A2 ', '  A3 '],
  b:['  B1 ', '  B2 ', '  B3 '],
  c:['  C1 ', '  C2 ', '  C3 ']
};
const SQUARES_FOR_RESET = {
  a:['  A1 ', '  A2 ', '  A3 '],
  b:['  B1 ', '  B2 ', '  B3 '],
  c:['  C1 ', '  C2 ', '  C3 ']
};
const BARS = {
  first:"-----|-----|-----",
  second:"-----|-----|-----",
  bottom:""
};
const MAX_NUM_PLAYS = 9;
const WINNING_VERTICAL = ['000', '111', '222'];
const WINNING_HORIZONTAL = ['aaa', 'bbb', 'ccc'];
const WINNING_DIAGONAL_1 = ['a0', 'b1', 'c2'];
const WINNING_DIAGONAL_2 = ['a2', 'b1', 'c0'];
const USER_MARKER = "  X  ";
const MACHINE_MARKER = "  O  ";
const CHOICES = {
  USER:[],
  MACHINE:[]
};

function displayBoard() {
  let entries = Object.values(SQUARES);
  let separators = Object.values(BARS);

  console.clear();

  entries.forEach( (arr, idx) => {
    console.log(arr[0] + '|' + arr[1] + '|' + arr[2]);
    console.log(separators[idx]);
  });
}

function squareIsEmpty(square, playerMarker) {
  let space = SQUARES[square[0]][square[1]];
  if (space === USER_MARKER || space === MACHINE_MARKER) {
    if (playerMarker === USER_MARKER) {
      console.log(ERROR.NON_EMPTY_SQUARE);
    }

    return false;
  } else {
    return true;
  }
}

function isValidChoice(choice) {
  if (choice.length !== 2) {
    console.log(ERROR.INVALID_CHOICE);
    return false;
  } else if (!'ABCabc'.includes(choice[0])) {
    console.log(ERROR.INVALID_CHOICE);
    return false;
  } else if (!'123'.includes(choice[1])) {
    console.log(ERROR.INVALID_CHOICE);
    return false;
  } else {
    return true;
  }
}

function formatUserChoice(choice) {
  choice[0] = choice[0].toLowerCase();
  choice[1] = Number.parseInt(choice[1], 10) - 1;
  return choice;
}

function getAndValidateUserChoice() {
  let choice;
  do {
    choice = readline.question(MESSAGE.REQ_USER_CHOICE);
  } while (!isValidChoice(choice));

  choice = formatUserChoice(choice.split(''));

  if (squareIsEmpty(choice, USER_MARKER)) {
    return choice;
  } else {
    return getAndValidateUserChoice();
  }
}

function generateMachineChoice() {
  let choice = [];

  do {
    choice = [];
    choice.push('abc'[Math.floor(Math.random() * 3)]);
    choice.push([0,1,2][Math.floor(Math.random() * 3)]);
  } while (!squareIsEmpty(choice, MACHINE_MARKER));

  return choice;
}

function insertChoice(choice, playerMarker) {
  SQUARES[choice[0]][choice[1]] = playerMarker;
}

function insertUserChoice(choice) {
  CHOICES.USER.push(choice);
  insertChoice(choice, USER_MARKER);
}

function insertMachineChoice(choice) {
  CHOICES.MACHINE.push(choice);
  insertChoice(choice, MACHINE_MARKER);
}

function vertWin(numbers) {
  return WINNING_VERTICAL.some( str => numbers.includes(str));
}

function horzWin(letters) {
  return WINNING_HORIZONTAL.some( str => letters.includes(str));
}

function diagWin(choices) {
  let diagOne = choices.filter( arr => WINNING_DIAGONAL_1.includes(arr.join('')));
  let diagTwo = choices.filter( arr => WINNING_DIAGONAL_2.includes(arr.join('')));

  return diagOne.length === 3 || diagTwo.length === 3;
}

function isMachineWinner() {
  if (CHOICES.MACHINE.length < 3) {
    return false;
  }

  let numbers = CHOICES.MACHINE.flat().sort().filter(item => typeof (item) === 'number').join('');
  let letters = CHOICES.MACHINE.flat().sort().filter(item => typeof (item) === 'string').join('');
  if (vertWin(numbers) || horzWin(letters) || diagWin(CHOICES.MACHINE)) {
    displayBoard();
    console.log(MESSAGE.MACHINE_WINS);
    return true;
  } else {
    return false;
  }
}

function isUserWinner() {
  if (CHOICES.USER.length < 3) {
    return false;
  }

  let numbers = CHOICES.USER.flat().sort().filter(item => typeof (item) === 'number').join('');
  let letters = CHOICES.USER.flat().sort().filter(item => typeof (item) === 'string').join('');
  if (vertWin(numbers) || horzWin(letters) || diagWin(CHOICES.USER)) {
    displayBoard();
    console.log(MESSAGE.USER_WINS);
    return true;
  } else {
    return false;
  }
}

function isBoardFull() {
  if (CHOICES.USER.length + CHOICES.MACHINE.length === MAX_NUM_PLAYS) {
    displayBoard();
    console.log(MESSAGE.TIE);
    return true;
  } else {
    return false;
  }
}

function resetBoard() {
  SQUARES = JSON.parse(JSON.stringify(SQUARES_FOR_RESET));
  CHOICES.USER = [];
  CHOICES.MACHINE = [];
}

function playMatch() {
  do {
    displayBoard();

    let userPlays = getAndValidateUserChoice();
    insertUserChoice(userPlays);
    if (isUserWinner()) {
      break;
    } else if (isBoardFull()) {
      break;
    }

    let cpuPlays = generateMachineChoice();
    insertMachineChoice(cpuPlays);
    if (isMachineWinner()) {
      break;
    }
  } while (!isBoardFull());
}

function playAgain() {
  let response = readline.question(MESSAGE.PLAY_AGAIN);
  switch (response.toUpperCase()) {
    case 'Y':
      resetBoard();
      return true;
    case 'N':
      console.log(MESSAGE.GOODBYE);
      return false;
    default:
      console.log(ERROR.INVALID_CHOICE);
      return playAgain();
  }
}

function play() {
  do {
    playMatch();
  } while (playAgain());
}

play();