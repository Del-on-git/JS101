//=====================================DECLARATION AND INITIALIZATION OF GLOBALS
let readline = require("readline-sync");
let GAMESTATE = {
  SQUARES: [
    ['  00 ', '  01 ', '  02 '],
    ['  10 ', '  11 ', '  12 '],
    ['  20 ', '  21 ', '  22 ']
  ],
  SCORE: {
    USER: 0,
    MACHINE: 0
  }
};

const BACKEND = require("./ticTacToe.json");
const MESSAGE = BACKEND.MESSAGES;
const ERROR = BACKEND.ERROR;
const WINNING_MATCH_SCORE = 5;
const PREF_SQUARES = [[1, 1], [0, 0], [0, 2], [2, 2], [2, 0]];
const MARKERS = {
  USER:"  X  ",
  MACHINE:"  O  "
};
const DIAGONAL_COORDS = [
  [[1, 1], [0, 0], [2, 2]],
  [[2, 0], [0, 2], [1, 1]]
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

//=========================================================GAME STATE MANAGEMENT
function displayScores() {
  console.log(`Human: ${GAMESTATE.SCORE.USER}, Terminator: ${GAMESTATE.SCORE.MACHINE}`);
}

function displayBoard() {
  console.clear();
  displayScores();

  let entries = Object.values(GAMESTATE.SQUARES);
  let separators = Object.values(BARS);

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
    return true;
  }
}

function insertChoice(choice, playerMarker) {
  GAMESTATE.SQUARES[choice[0]][choice[1]] = playerMarker;
  displayBoard();
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
    resetBoard();
    return true;

  } else {
    return false;
  }
}

function resetBoard() {
  GAMESTATE.SQUARES = JSON.parse(JSON.stringify(SQUARES_FOR_RESET));
}

function resetScores() {
  GAMESTATE.SCORE.USER = 0;
  GAMESTATE.SCORE.MACHINE = 0;
}

function verticalScan() {
  let verticals = [];
  let arr = [];
  for (let col = 0; col < GAMESTATE.SQUARES.length; col++) {
    for (let row = 0; row < GAMESTATE.SQUARES.length; row++) {
      arr.push(GAMESTATE.SQUARES[row][col]);
    }
    verticals.push(arr);
    arr = [];
  }

  return verticals;
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

function formatCoordinates(choice) {
  choice[0] = Number.parseInt(choice[0], 10);
  choice[1] = Number.parseInt(choice[1], 10);
  return choice;
}

function getAndValidateUserChoice() {
  let choice;
  do {
    choice = readline.question(MESSAGE.REQ_USER_CHOICE);
  } while (!isValidChoice(choice));

  choice = formatCoordinates(choice.split(''));

  if (squareIsEmpty(choice, MARKERS.USER)) {
    return choice;
  } else {
    return getAndValidateUserChoice();
  }
}

//==============================================================MACHINE STRATEGY
//*********************************************STRATEGY BACKEND*****************
function identifyUnblockedPairs(candidates, targetMarker, opposingMarker) {
  return candidates.filter( arr => {
    return (arr.reduce( (num, mark) => {
      if (mark === targetMarker) {
        num++;
      }
      return num;
    }, 0) === 2 && !arr.includes(opposingMarker));
  });
}

function identifyThirdPosition(candidates, targetMarker) {
  let position = [];
  candidates.forEach( arr => {
    arr.forEach( element => {
      if (element !== targetMarker) {
        position.push([element.trim()[0], element.trim()[1]]);
      }
    });
  });

  position.forEach( (arr) => {
    arr.forEach( (element, idx) => {
      arr[idx] = Number.parseInt(element, 10);
    });
  });

  return position;
}

function detectVerticals(targetMarker, opposingMarker) {
  let verticals = verticalScan();
  verticals = identifyUnblockedPairs(verticals, targetMarker, opposingMarker);

  return identifyThirdPosition(verticals, targetMarker);
}

function detectHorizontals(targetMarker, opposingMarker) {
  let horiz = GAMESTATE.SQUARES;
  horiz = identifyUnblockedPairs(horiz, targetMarker, opposingMarker);

  return identifyThirdPosition(horiz, targetMarker);
}

function detectDiagonals(targetMarker, opposingMarker) {
  let diagonals = [];
  diagonals.push(DIAGONAL_COORDS[0].map(arr => {
    return GAMESTATE.SQUARES[arr[0]][arr[1]];
  }));
  diagonals.push(DIAGONAL_COORDS[1].map(arr => {
    return GAMESTATE.SQUARES[arr[0]][arr[1]];
  }));
  diagonals = identifyUnblockedPairs(diagonals, targetMarker, opposingMarker);

  return identifyThirdPosition(diagonals, targetMarker);
}

function doesCrisisExist(candidates) {
  return Object.values(candidates).some( arr => {
    if (arr !== null) {
      return arr.length > 0;
    }
    return false;
  });
}

function redundantPositions(crises) {
  let duplicates = [];
  let candidates = Object.values(crises).map( arr => {
    return JSON.stringify(arr);
  });

  while (candidates.length > 0) {
    let element = candidates.pop();
    if (candidates.includes(element) && !duplicates.includes(element)) {
      duplicates.push(element);
    }
  }

  return duplicates[0];
}

function selectCrisis(crisis) {
  let threat;
  let candidates = Object.values(crisis).flat().filter( itm => {
    return typeof (itm) !== 'boolean';
  });

  if (candidates.length === 1) {
    threat = candidates[0];
    return threat;
  } else if ((threat = redundantPositions(candidates))) {
    return threat;
  } else {
    threat = candidates[Math.floor(Math.random() * (candidates.length - 1))];
    return threat;
  }
}

//***********************************************OFFENSIVE PLAY*****************
function detectVerticalOpportunities() {
  return detectVerticals(MARKERS.MACHINE, MARKERS.USER);
}

function detectHorizontalOpportunities() {
  return detectHorizontals(MARKERS.MACHINE, MARKERS.USER);
}

function detectDiagonalOpportunities() {
  return detectDiagonals(MARKERS.MACHINE, MARKERS.USER);
}

function detectOpportunities() {
  let opportunities = {
    vertical: detectVerticalOpportunities(),
    horizontal: detectHorizontalOpportunities(),
    diagonal: detectDiagonalOpportunities(),
    exist: null
  };

  opportunities.exist = doesCrisisExist(opportunities);

  return opportunities;
}

//***********************************************DEFENSIVE PLAY*****************
function detectVerticalThreats() {
  return detectVerticals(MARKERS.USER, MARKERS.MACHINE);
}

function detectHorizontalThreats() {
  return detectHorizontals(MARKERS.USER, MARKERS.MACHINE);
}

function detectDiagonalThreats() {
  return detectDiagonals(MARKERS.USER, MARKERS.MACHINE);
}

function detectThreats() {
  let threats = {
    vertical: detectVerticalThreats(),
    horizontal: detectHorizontalThreats(),
    diagonal: detectDiagonalThreats(),
    exist: null
  };

  threats.exist = doesCrisisExist(threats);

  return threats;
}

function detectPreferentialSquares() {
  let plays = {
    options: PREF_SQUARES.filter( arr => squareIsEmpty(arr,)),
    exist: null,
    centerFree: null
  };

  plays.exist = (plays.options.length > 0);
  plays.centerFree = (plays.exist && plays.options[0].join('') === '11');

  return plays;
}

function chooseCorner(corners) {
  let cn1 = PREF_SQUARES[1];
  let cn2 = PREF_SQUARES[2];
  let cn3 = PREF_SQUARES[3];
  let cn4 = PREF_SQUARES[4];
  if (GAMESTATE.SQUARES[cn1[0]][cn1[1]] === MARKERS.USER
    && squareIsEmpty(cn3)) {
    return cn3;
  } else if (GAMESTATE.SQUARES[cn3[0]][cn3[1]] === MARKERS.USER
    && squareIsEmpty(cn1)) {
    return cn1;
  } else if (GAMESTATE.SQUARES[cn2[0]][cn2[1]] === MARKERS.USER
    && squareIsEmpty(cn4)) {
    return cn4;
  } else if (GAMESTATE.SQUARES[cn4[0]][cn4[1]] === MARKERS.USER
    && squareIsEmpty(cn2)) {
    return cn2;
  } else { return corners[Math.floor(Math.random() * corners.length)] }
}

//*************************************STRATEGY OF LAST RESORT******************
function playRandom() {
  let choice = [];
  for (let idx = 0; idx < 2; idx++) {
    choice.push([0,1,2][Math.floor(Math.random() * 3)]);
  }

  return choice;
}

//********************************************EXECUTE STRATEGY******************
function generateMachineChoice() {
  let opportunities = detectOpportunities();
  let threats = detectThreats();
  let pref = detectPreferentialSquares();
  let choice;
  if (opportunities.exist) choice = selectCrisis(opportunities);
  else if (threats.exist) choice = selectCrisis(threats);
  else if (pref.exist) {
    if (pref.centerFree) {
      choice = pref.options[0];
    } else {
      choice = chooseCorner(pref.options);
    }
  } else {
    do {
      choice = playRandom();
    } while (!squareIsEmpty(choice, MARKERS.MACHINE));
  }
  return choice;
}

//==============================================================DETERMINE WINNER
function vertWin(playerMarker) {
  let verticals = verticalScan();

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
    GAMESTATE.SCORE[player]++;
    resetBoard();
    return true;
  } else {
    return false;
  }
}

function playerWonMatch() {
  if (GAMESTATE.SCORE.USER === WINNING_MATCH_SCORE
    || GAMESTATE.SCORE.MACHINE === WINNING_MATCH_SCORE) {
    resetScores();
    return true;
  } else {
    return false;
  }
}

//======================================================================GAMEPLAY
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

function userTurn() {
  let userPlays = getAndValidateUserChoice();
  insertChoice(userPlays, MARKERS.USER);
  if (isWinner("USER") || isBoardFull()) {
    return true;
  } else {
    return false;
  }
}

function machineTurn() {
  let cpuPlays = generateMachineChoice();
  insertChoice(cpuPlays, MARKERS.MACHINE);
  if (isWinner("MACHINE") || isBoardFull()) {
    return true;
  } else {
    return false;
  }
}

function determinePlayOrder() {
  let coinFlip = Math.floor(Math.random() * 10) % 2;
  if (coinFlip) {
    console.log("User Plays First");
    return userTurn;
  } else {
    console.log("Machine Plays First");
    return machineTurn;
  }
}

function playRound() {
  let firstPlayer = determinePlayOrder();
  let secondPlayer;
  if (firstPlayer === userTurn) {
    secondPlayer = machineTurn;
  } else {
    secondPlayer = userTurn;
  }

  do {
    displayBoard();
  } while (!firstPlayer() && !secondPlayer());
}

function playMatch() {
  do {
    playRound();
  } while (!playerWonMatch());

  if (playAgain()) {
    playMatch();
  }
}

//=================================================================START PROGRAM
playMatch();