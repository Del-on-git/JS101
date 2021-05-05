//=====================================DECLARATION AND INITIALIZATION OF GLOBALS
let readline = require("readline-sync");
let SQUARES = {
  a:['  A1 ', '  A2 ', '  A3 '],
  b:['  B1 ', '  B2 ', '  B3 '],
  c:['  C1 ', '  C2 ', '  C3 ']
};
let DEFEND_ATTEMPTS = 0;

const MAX_DEFEND_ATTEMPTS = 9;
const BACKEND = require("./ticTacToe.json");
const MESSAGE = BACKEND.MESSAGES;
const ERROR = BACKEND.ERROR;
const MAX_NUM_PLAYS = 9;
const USER_MARKER = "  X  ";
const MACHINE_MARKER = "  O  ";
const WINNING_VERTICAL = ['000', '111', '222'];
const WINNING_HORIZONTAL = ['aaa', 'bbb', 'ccc'];
const WINNING_DIAGONAL_1 = ['a0', 'b1', 'c2'];
const WINNING_DIAGONAL_2 = ['a2', 'b1', 'c0'];
const VERT_THREATS = ['00', '11', '22'];
const HORIZ_THREATS = ['aa', 'bb', 'cc'];
const DIAG_THREATS = {
  1:['a0', 'b1'],
  2:['b1', 'c2'],
  3:['a0', 'c2'],
  4:['a2', 'b1'],
  5:['b1', 'c0'],
  6:['a2', 'c0']
};
const CHOICES = {
  USER:[],
  MACHINE:[]
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
//=========================================================GAME BOARD MANAGEMENT
function displayBoard() {
  let entries = Object.values(SQUARES);
  let separators = Object.values(BARS);

  //console.clear();

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
    DEFEND_ATTEMPTS = 0;
    return true;
  }
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

//=======================================================USER POSITION SELECTION
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

//====================================================MACHINE POSITION SELECTION
function detectVerticalThreat() {

  let columns = CHOICES.USER.flat()
    .filter( val => typeof (val) === 'number')
    .join('');

  if (VERT_THREATS.some( str => columns.includes(str))) {
    let threat = VERT_THREATS.filter( str => columns.includes(str))[0][0];
    return threat;
  }

  return false;
}

function detectHorizontalThreat() {

  let rows = CHOICES.USER.flat()
    .filter( val => typeof (val) === 'string')
    .join('');

  if (HORIZ_THREATS.some(str => rows.includes(str))) {
    let threat = HORIZ_THREATS.filter(str => rows.includes(str))[0][0];
    return threat;
  }

  return false;
}

function detectDiagonalThreat() {
  let diagonals = [];
  CHOICES.USER.forEach(arr => diagonals.push(arr.join('')));
  if (Object.values(DIAG_THREATS)
    .some(arr => arr.every(str => diagonals.includes(str)))) {

    let threat = Object.values(DIAG_THREATS)
      .filter(arr => arr.every(str => diagonals.includes(str)));

    return threat;
  }

  return false;
}

function selectHorizontal(threat) {
  let choice = [];
  choice[0] = threat;
  choice[1] = SQUARES[threat].reduce((result, square, idx) => {
    if (square !== USER_MARKER) {
      result += idx;
    }
    return result;
  }, 0);
  console.log(`DEFENDING H WITH: ${choice}`);//=================================================DEBUG
  return choice;
}

function selectVertical(threat) {
  let choice = [];
  choice[1] = Number.parseInt(threat, 10);
  Object.keys(SQUARES).forEach(row => {
    if (SQUARES[row][choice[1]] !== USER_MARKER) {
      choice[0] = row;
    }
  });
  console.log(`DEFENDING V WITH: ${choice}`);//=================================================DEBUG
  return choice;
}

function selectDiagonal(threat) {
  let choice = [];
  let alpha = ['a', 'b', 'c']; // FIX THIS! DOESN'T WORK AFTER ONE SELECTION FROM ALL THREE COLUMNS OR ROWS!!!!!
  let num = ['1', '2', '3'];

  choice[0] = alpha.filter(char => !threat.join('').includes(char));
  choice[1] = num.filter(char => !threat.join('').includes(char));
  choice[1] = Number.parseInt(choice[1], 10);
  console.log(`DEFENDING D WITH: ${choice}`);//=================================================DEBUG
  return choice;
}

function defend() {
  let threat;

  if ((threat = detectVerticalThreat())) {
    return selectVertical(threat);
  } else if ((threat = detectHorizontalThreat())) {
    return selectHorizontal(threat);
  } else if ((threat = detectDiagonalThreat())) {
    return selectDiagonal(threat);
  }

  return threat;
}

function playRandom() {
  let choice = [];
  choice.push('abc'[Math.floor(Math.random() * 3)]);
  choice.push([0,1,2][Math.floor(Math.random() * 3)]);

  console.log("Playing Random");//==============================================DEBUG
  return choice;
}

function generateMachineChoice() {
  let choice;

  do {
    choice = defend();
    DEFEND_ATTEMPTS++;
    if (!choice || DEFEND_ATTEMPTS >= MAX_DEFEND_ATTEMPTS) {
      choice = playRandom();
      DEFEND_ATTEMPTS = 0;
    }
  } while (!squareIsEmpty(choice, MACHINE_MARKER));

  return choice;
}

//==============================================================DETERMINE WINNER
function vertWin(numbers) {
  return WINNING_VERTICAL.some( str => numbers.includes(str));
}

function horzWin(letters) {
  return WINNING_HORIZONTAL.some( str => letters.includes(str));
}

function diagWin(choices) {
  let diaOne = choices.filter(arr => WINNING_DIAGONAL_1.includes(arr.join('')));
  let diaTwo = choices.filter(arr => WINNING_DIAGONAL_2.includes(arr.join('')));

  return diaOne.length === 3 || diaTwo.length === 3;
}

function isMachineWinner() {
  if (CHOICES.MACHINE.length < 3) {
    return false;
  }

  let columns = CHOICES.MACHINE.flat()
    .sort()
    .filter(item => typeof (item) === 'number')
    .join('');

  let rows = CHOICES.MACHINE.flat()
    .sort()
    .filter(item => typeof (item) === 'string')
    .join('');

  if (vertWin(columns) || horzWin(rows) || diagWin(CHOICES.MACHINE)) {
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

  let columns = CHOICES.USER.flat()
    .sort()
    .filter(item => typeof (item) === 'number')
    .join('');

  let rows = CHOICES.USER.flat()
    .sort()
    .filter(item => typeof (item) === 'string')
    .join('');

  if (vertWin(columns) || horzWin(rows) || diagWin(CHOICES.USER)) {
    displayBoard();
    console.log(MESSAGE.USER_WINS);
    return true;
  } else {
    return false;
  }
}

//======================================================================GAMEPLAY
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

//=================================================================START PROGRAM
play();