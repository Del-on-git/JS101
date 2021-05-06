//=====================================DECLARATION AND INITIALIZATION OF GLOBALS
let readline = require("readline-sync");
let GAMESTATE = {
  SQUARES: [
    ['  00 ', '  01 ', '  02 '],
    ['  10 ', '  11 ', '  12 '],
    ['  20 ', '  21 ', '  22 ']
  ]
};

const BACKEND = require("./ticTacToe.json");
const MESSAGE = BACKEND.MESSAGES;
const ERROR = BACKEND.ERROR;
const MARKERS = {
  USER:"  X  ",
  MACHINE:"  O  "
};
const DIAGONAL_COORDS = [
  [[0, 0], [1, 1], [2, 2]],
  [[2, 0], [1, 1], [0, 2]]
];
const SQUARES_FOR_RESET = [
  ['  00 ', '  01 ', '  02 '],
  ['  10 ', '  11 ', '  12 '],
  ['  20 ', '  21 ', '  22 ']
];
const BARS = {
  first:"-----|-----|-----",
  second:"-----|-----|-----",
  bottom:""
};

//=========================================================GAME BOARD MANAGEMENT
function displayBoard() {
  let entries = Object.values(GAMESTATE.SQUARES);
  let separators = Object.values(BARS);

  console.clear();

  entries.forEach( (arr, idx) => {
    console.log(arr[0] + '|' + arr[1] + '|' + arr[2]);
    console.log(separators[idx]);
  });
}

function squareIsEmpty(square, playerMarker) {
  let space = GAMESTATE.SQUARES[square[0]][square[1]];
  if (space === MARKERS.USER || space === MARKERS.MACHINE) {
    if (playerMarker === MARKERS.USER) {
      console.log(ERROR.NON_EMPTY_SQUARE);
    }

    return false;
  } else {
    GAMESTATE.DEFEND_ATTEMPTS = 0;
    return true;
  }
}

function insertChoice(choice, playerMarker) {
  GAMESTATE.SQUARES[choice[0]][choice[1]] = playerMarker;
}

function isBoardFull() {
  if (GAMESTATE.SQUARES.every( arr => {
    return arr.every( element => {
      return element === MARKERS.USER || element === MARKERS.MACHINE;
    });
  })
  ) {
    displayBoard();
    console.log(MESSAGE.TIE);
    return true;

  } else {
    return false;
  }
}

function resetBoard() {
  GAMESTATE.SQUARES = JSON.parse(JSON.stringify(SQUARES_FOR_RESET));
}

//=======================================================USER POSITION SELECTION
function isValidChoice(choice) {
  if (choice.length !== 2) {
    console.log(ERROR.INVALID_CHOICE);
    return false;
  } else if (!'012'.includes(choice[0]) || !'012'.includes(choice[1])) {
    console.log(ERROR.INVALID_CHOICE);
    return false;
  } else {
    return true;
  }
}

function formatUserChoice(choice) {
  choice[0] = Number.parseInt(choice[0], 10);
  choice[1] = Number.parseInt(choice[1], 10);
  return choice;
}

function getAndValidateUserChoice() {
  let choice;
  do {
    choice = readline.question(MESSAGE.REQ_USER_CHOICE);
  } while (!isValidChoice(choice));

  choice = formatUserChoice(choice.split(''));

  if (squareIsEmpty(choice, MARKERS.USER)) {
    return choice;
  } else {
    return getAndValidateUserChoice();
  }
}

//====================================================MACHINE POSITION SELECTION
function defend() {
//TODO: Completely rethink defend strategy; start with detection

}

function playRandom() {
  let choice = [];
  for (let idx = 0; idx < 2; idx++) {
    choice.push([0,1,2][Math.floor(Math.random() * 3)]);
  }

  return choice;
}

function generateMachineChoice() {
  let choice;

  do {
    choice = playRandom();
  } while (!squareIsEmpty(choice, MARKERS.MACHINE));

  return choice;
}

//==============================================================DETERMINE WINNER
function vertWin(playerMarker) {
  let verticals = [];
  let arr = [];
  for (let col = 0; col < GAMESTATE.SQUARES.length; col++) {
    for (let row = 0; row < GAMESTATE.SQUARES.length; row++) {
      arr.push(GAMESTATE.SQUARES[row][col]);
    }
    verticals.push(arr);
    arr = [];
  }

  return verticals.some( arr => arr.every( entry => entry === playerMarker));
}

function horzWin(playerMarker) {
  return GAMESTATE.SQUARES.some( arr => {
    return arr.every( entry => entry === playerMarker);
  });
}

function diagWin(playerMarker) {
  return DIAGONAL_COORDS.some( arr => {
    return arr.every( entry => {
      return GAMESTATE.SQUARES[entry[0]][entry[1]] === playerMarker;
    });
  });
}

function isWinner(player) {
  let marker = MARKERS[player];
  let tests = [vertWin, horzWin, diagWin];
  let checks = [];

  tests.forEach( func => checks.push(func(marker)));
  if (checks.some( bool => bool)) {
    let winner = (player === "USER" ? "USER_WINS" : "MACHINE_WINS");
    displayBoard();
    console.log(MESSAGE[winner]);
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
    insertChoice(userPlays, MARKERS.USER);
    if (isWinner("USER")) {
      break;
    } else if (isBoardFull()) {
      break;
    }

    let cpuPlays = generateMachineChoice();
    insertChoice(cpuPlays, MARKERS.MACHINE);
    if (isWinner("MACHINE")) {
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