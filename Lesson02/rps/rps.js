//==========================================================DECLARATIONS & INITS
let readline = require('readline-sync');

const BACKEND = require('./rpsBackend.json');
const MESSAGES = BACKEND.MESSAGES;
const ERRORS = BACKEND.ERRORS;
const ART = BACKEND.ART;
const WIN = "You win!";
const LOSE = "You lose!";
const DRAW = "Draw!";
const NUM_CHOICES = 5;
const NUM_ROUNDS = 5;
const CRITERION = Math.ceil(NUM_ROUNDS / 2);
const ROCK = 'R';
const PAPER = 'P';
const SCISSORS = 'S';
const LIZZARD = 'L';
const SPOCK = 'K';
const MACHINE_CHOICES = ['R', 'P', 'S', 'L', 'K'];
const WINNING_OUTCOMES = {
  R: [ 'S', 'L' ],
  P: [ 'K', 'R' ],
  S: [ 'P', 'L' ],
  L: [ 'K', 'P '],
  K: [ 'S', 'R']
};

//========================================================GETTING USER SELECTION
function isValidChoice(choice) {
  if ( choice === ROCK
    || choice === PAPER
    || choice === SCISSORS
    || choice === LIZZARD
    || choice === SPOCK) {

    return true;

  } else {
    console.log(ERRORS.INVALID_CHOICE[0]
      + choice.toString() + ERRORS.INVALID_CHOICE[1]);

    return false;
  }
}

function getAndValidateUserChoice() {
  let input;

  do {
    input = readline.question(MESSAGES.PLAYER_CHOICE);
    input = input.toUpperCase();
  } while (!isValidChoice(input));

  return input;
}

//=====================================================GETTING MACHINE SELECTION
function getOpponentChoice() {
  let machineChoiceIdx = Math.floor(Math.random() * 10) % NUM_CHOICES;

  return MACHINE_CHOICES[machineChoiceIdx];
}

//======================================================================GAMEPLAY
function playMatch(scores) {
  let playerChoice;
  let opponentChoice;
  let result;

  playerChoice = getAndValidateUserChoice();
  opponentChoice = getOpponentChoice();
  result = getOutcome(playerChoice, opponentChoice);

  if (result === WIN) {
    scores.playerScore += 1;
    display(result, playerChoice, opponentChoice, scores);
  } else if (result === LOSE) {
    scores.opponentScore += 1;
    display(result, playerChoice, opponentChoice, scores);
  } else {
    display(result, playerChoice, opponentChoice, scores);
  }
}

function getOutcome(playerChoice, opponentChoice) {
  if (WINNING_OUTCOMES[playerChoice].includes(opponentChoice)) {
    return WIN;
  } else if (playerChoice === opponentChoice) {
    return DRAW;
  } else {
    return LOSE;
  }
}

function playRound() {
  let scores = { playerScore: 0, opponentScore: 0};
  let round = 1;

  while (scores.playerScore < CRITERION && scores.opponentScore < CRITERION) {
    console.log(MESSAGES.ROUND_PROMPT[0]
      + round + MESSAGES.ROUND_PROMPT[1]);
    playMatch(scores);
    round++;
  }

  declareWinner(scores);

  if (playAgain()) {
    console.clear();
    playRound();
  } else {
    console.log(MESSAGES.GOODBYE);
  }
}

function display(result, playerChoice, opponentChoice, scores) {
  console.log(ART[playerChoice][opponentChoice]);
  console.log(ART[result]);
  console.log(`You: ${scores.playerScore}, Machine: ${scores.opponentScore}`);
}

function declareWinner(scores) {
  if (scores.playerScore > scores.opponentScore) {
    console.log(ART["Congratulations"]);
  } else {
    console.log(ART["Bummer"]);
  }
}

function playAgain() {
  let input = readline.question(MESSAGES.PLAY_AGAIN);
  input = input.toUpperCase();

  switch (input) {
    case 'Y':
      console.clear();
      return true;
    case 'N':
      return false;
    default:
      console.log(ERRORS['NOT_Y/N']);
      return playAgain();
  }
}

//=================================================================PROGRAM START
console.log(MESSAGES.GREET);
playRound();