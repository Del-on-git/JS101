//A human vs. cpu implementation of tic-tac-toe
let readline = require("readline-sync");

const BACKEND = require("./ticTacToe.json");
const MESSAGE = BACKEND.MESSAGES;
const ERROR = BACKEND.ERROR;

const SQUARES = {
  a:['  A1 ', '  A2 ', '  A3 '],
  b:['  B1 ', '  B2 ', '  B3 '],
  c:['  C1 ', '  C2 ', '  C3 ']
};
const BARS = {
  first:"-----|-----|-----",
  second:"-----|-----|-----",
  bottom:""
};
const EXS = "  X  ";
const OHS = "  O  ";
let USER;
let MACHINE;

function displayBoard() {
  let entries = Object.values(SQUARES);
  let separators = Object.values(BARS);

  console.clear();

  entries.forEach( (arr, idx) => {
    console.log(arr[0] + '|' + arr[1] + '|' + arr[2]);
    console.log(separators[idx]);
  });
}

function squareIsEmpty(square) {
  let space = square[0][1];
  console.log(square);
  if (space === EXS || space === OHS) {
    console.log(ERROR.NON_EMPTY_SQUARE);
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

  if (squareIsEmpty(choice)) { //TODO: Fix validation for non-empty squares.
    return choice;
  } else {
    return getAndValidateUserChoice();
  }
}

function insertChoice(choice, player) {
  console.log(choice);
  SQUARES[choice[0]][choice[1]] = player;
}

function insertUserChoice(choice) {
  insertChoice(choice, USER);
}

function insertMachineChoice(choice) {
  insertChoice(choice, MACHINE);
}

USER = EXS;
insertUserChoice(getAndValidateUserChoice());
displayBoard();
insertUserChoice(getAndValidateUserChoice());
displayBoard();