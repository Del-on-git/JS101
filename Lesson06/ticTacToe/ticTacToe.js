//=====================================DECLARATION AND INITIALIZATION OF GLOBALS
let readline = require("readline-sync");
let STATE = {
  SQUARES: ['     ', '     ', '      ', '     ', '     ', '     ', '     ', '     ', '     '],
  SCORE: {
    USER: 0,
    MACHINE: 0
  },
  MACHINE_PREF: null
};

const BACKEND = require("./ticTacToe.json");
const MESSAGE = BACKEND.MESSAGES;
const ERROR = BACKEND.ERROR;
const HELP = BACKEND.HELP;
const WINNING_MATCH_SCORE = 5;
const VALID_CHOICES = '123456789Mm';
const PREF_OFFENSIVE_SQUARES = [4, 0, 2, 6, 8];
const PREF_DEFENSIVE_SQUARE = [4, 1, 3, 5, 7];
const MARKERS = {
  USER:"  X  ",
  MACHINE:"  O  "
};
const DIAGONAL_COORDS = [[0, 4, 8], [6, 4, 2]];
const HORIZON_COORDS = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
const VERTICAL_COORDS = [[0, 3, 6], [1, 4, 7], [2, 5, 8]];
const SQUARES_FOR_RESET = ['     ', '     ', '      ', '     ', '     ', '     ', '     ', '     ', '     '];
const BARS = {
  first:"-----|-----|-----",
  second:"-----|-----|-----",
  bottom:""
};

//=========================================================GAME STATE MANAGEMENT
function displayScores() {
  console.log(`Human: ${STATE.SCORE.USER}, CPU: ${STATE.SCORE.MACHINE}`);
}

function displayBoard() {
  console.clear();
  console.log(`\n${STATE.SQUARES[0]}|${STATE.SQUARES[1]}|${STATE.SQUARES[2]}`);
  console.log(BARS.first);
  console.log(`${STATE.SQUARES[3]}|${STATE.SQUARES[4]}|${STATE.SQUARES[5]}`);
  console.log(BARS.second);
  console.log(`${STATE.SQUARES[6]}|${STATE.SQUARES[7]}|${STATE.SQUARES[8]}\n`);
  displayScores();
}

function displayMap() {
  console.log(HELP.MAP);
  displayBoard();
}

function squareIsEmpty(square, playerMarker) {
  let space = STATE.SQUARES[square];
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
  STATE.SQUARES[choice] = playerMarker;
}

function isBoardFull() {
  if (STATE.SQUARES.every( element => {
    return element === MARKERS.USER || element === MARKERS.MACHINE;
  })) {
    displayBoard();
    console.log(MESSAGE.TIE);
    readline.question(MESSAGE.CONTINUE);
    return true;

  } else {
    return false;
  }
}

function resetBoard() {
  STATE.SQUARES = JSON.parse(JSON.stringify(SQUARES_FOR_RESET));
  STATE.MACHINE_PREF = null;
}

function resetScores() {
  STATE.SCORE.USER = 0;
  STATE.SCORE.MACHINE = 0;
}

//=======================================================USER POSITION SELECTION
function isValidChoice(choice) {
  if (VALID_CHOICES.includes(choice))  return true;
  else {
    console.log(ERROR.INVALID_CHOICE);
    return false;
  }
}

function formatChoice(choice) {
  if (!Number.isNaN(Number.parseInt(choice, 10))) {
    return --choice;
  } else {
    return choice.toLowerCase();
  }
}

function getAndValidateUserChoice() {
  let choice;
  do {
    choice = readline.question(MESSAGE.REQ_USER_CHOICE);
  } while (!isValidChoice(choice));

  choice = formatChoice(choice);

  if (choice === VALID_CHOICES[VALID_CHOICES.length - 1]) {
    displayMap();
    return getAndValidateUserChoice();
  } else if (squareIsEmpty(choice, MARKERS.USER)) {
    return choice;
  } else {
    return getAndValidateUserChoice();
  }
}

//==============================================================MACHINE STRATEGY
//*********************************************STRATEGY BACKEND*****************
function identifyUnblockedPairs(candidates, targetMarker, opposingMarker) {
  candidates = candidates.filter( arr => {
    return (arr.reduce( (count, idx) => {
      if (STATE.SQUARES[idx] === targetMarker) {
        count++;
      }
      return count;
    }, 0)) === 2 && !arr.includes(opposingMarker);
  });

  return candidates;
}

function identifyThirdPosition(candidates, targetMarker) {
  let position = [];
  candidates.forEach( arr => {
    arr.forEach( element => {
      if (squareIsEmpty(element) && STATE.SQUARES[element] !== targetMarker) {
        position.push(element);
      }
    });
  });

  return position;
}

function detectVerticals(targetMarker, opposingMarker) {
  let verticals = VERTICAL_COORDS;
  verticals = identifyUnblockedPairs(verticals, targetMarker, opposingMarker);

  return identifyThirdPosition(verticals, targetMarker);
}

function detectHorizontals(targetMarker, opposingMarker) {
  let horiz = HORIZON_COORDS;
  horiz = identifyUnblockedPairs(horiz, targetMarker, opposingMarker);

  return identifyThirdPosition(horiz, targetMarker);
}

function detectDiagonals(targetMarker, opposingMarker) {
  let diagonals = DIAGONAL_COORDS;
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

function selectCrisis(crises) {
  let crisis;
  let candidates = Object.values(crises).flat().filter( itm => {
    return typeof (itm) !== 'boolean';
  });
  if (candidates.length === 1) {
    return candidates[0];
  } else {
    crisis = candidates[Math.floor(Math.random() * (candidates.length - 1))];
    return crisis;
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
    options: STATE.MACHINE_PREF.filter( pos => squareIsEmpty(pos,)),
    exist: null,
    centerFree: null
  };
  plays.exist = (plays.options.length > 0);
  plays.centerFree = (plays.exist && plays.options.includes(4));

  return plays;
}

function chooseCorner(corners) {
  if (STATE.SQUARES[0] === MARKERS.USER && squareIsEmpty(8)) {
    return 8;
  } else if (STATE.SQUARES[8] === MARKERS.USER && squareIsEmpty(0)) {
    return 0;
  } else if (STATE.SQUARES[6] === MARKERS.USER && squareIsEmpty(2)) {
    return 2;
  } else if (STATE.SQUARES[2] === MARKERS.USER && squareIsEmpty(6)) {
    return 6;
  } else {
    return corners[Math.floor(Math.random() * corners.length)];
  }
}

//*************************************STRATEGY OF LAST RESORT******************
function playRandom() {
  return Math.floor(Math.random() * 9);
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
function detectVictory(orientation, playerMarker) {
  return orientation.some( arr => arr.every( entry => {
    return STATE.SQUARES[entry] === playerMarker;
  }));
}

function vertWin(playerMarker) {
  return detectVictory(VERTICAL_COORDS, playerMarker);
}

function horzWin(playerMarker) {
  return detectVictory(HORIZON_COORDS, playerMarker);
}

function diagWin(playerMarker) {
  return detectVictory(DIAGONAL_COORDS, playerMarker);
}

function isWinner(player) {
  let marker = MARKERS[player];
  let tests = [vertWin, horzWin, diagWin];
  let checks = [];

  tests.forEach( func => checks.push(func(marker)));
  if (checks.some( bool => bool)) {
    let winner = (player === "USER" ? "USER_WINS" : "MACHINE_WINS");
    STATE.SCORE[player]++;
    displayBoard();
    console.log(MESSAGE[winner]);
    readline.question(MESSAGE.CONTINUE);
    return true;
  } else {
    return false;
  }
}

function playerWonMatch() {
  if (STATE.SCORE.USER === WINNING_MATCH_SCORE
    || STATE.SCORE.MACHINE === WINNING_MATCH_SCORE) {
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
    console.log(MESSAGE.USER_FIRST);
    STATE.MACHINE_PREF = PREF_DEFENSIVE_SQUARE;
    return userTurn;
  } else {
    console.log(MESSAGE.MACHINE_FIRST);
    STATE.MACHINE_PREF = PREF_OFFENSIVE_SQUARES;
    return machineTurn;
  }
}

function playRound() {
  let firstPlayer = determinePlayOrder();
  let secondPlayer;
  if (firstPlayer === userTurn)  secondPlayer = machineTurn;
  else  secondPlayer = userTurn;

  do {
    if (!firstPlayer()) {
      displayBoard();
      if (secondPlayer()) {
        displayBoard();
        break;
      }
    } else {
      displayBoard();
      break;
    }
    displayBoard();
  } while (true);

  resetBoard();
}

function playMatch() {
  do {
    displayBoard();
    playRound();
  } while (!playerWonMatch());

  if (STATE.SCORE.USER === WINNING_MATCH_SCORE) {
    console.log(MESSAGE.USER_GRAND_WINNER);
  } else {
    console.log(MESSAGE.MACHINE_GRAND_WINNER);
  }

  if (playAgain()) {
    playMatch();
  }
}
//=================================================================START PROGRAM
playMatch();