let readline = require('readline-sync');

const BACKEND = require('./rpsBackend.json');
const MESSAGES = BACKEND.MESSAGES;
const OUTCOMES = BACKEND.OUTCOMES;
const ERRORS = BACKEND.ERRORS;
const ART = BACKEND.ART;
const MACHINE_CHOICES = BACKEND.MACHINE_CHOICES;
const NUM_CHOICES = 5;
const NUM_ROUNDS = 5;
const CRITERION = Math.ceil(NUM_ROUNDS / 2);
const ROCK = 'R';
const PAPER = 'P';
const SCISSORS = 'S';
const LIZZARD = 'L';
const SPOCK = 'K';

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

function getChoiceKey(choice) {
  let choiceKey;

  for (let key in OUTCOMES) {
    if (key[0] === choice) {
      choiceKey = key;
      break;
    }
  }

  return choiceKey;
}

function getAndValidateUserChoice() {
  let input;

  do {
    input = readline.question(MESSAGES.PLAYER_CHOICE);
    input = input.toUpperCase();
  } while (!isValidChoice(input));

  return getChoiceKey(input);
}

function getOpponentChoice() {
  let machineChoiceIdx = Math.floor(Math.random() * 10) % NUM_CHOICES;

  return MACHINE_CHOICES[machineChoiceIdx];
}

function getOutcome(playerChoice, opponentChoice) {
  return OUTCOMES[playerChoice][opponentChoice];
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

function display(result, playerChoice, opponentChoice, scores) {
  console.log(ART[playerChoice][opponentChoice]);
  console.log(ART[result]);
  console.log(`You: ${scores.playerScore}, Machine: ${scores.opponentScore}`);
}

function playMatch(scores) {
  let playerChoice;
  let opponentChoice;
  let result;

  playerChoice = getAndValidateUserChoice();
  opponentChoice = getOpponentChoice();
  result = getOutcome(playerChoice, opponentChoice);

  if (result === "You win!") {
    scores.playerScore += 1;
    display(result, playerChoice, opponentChoice, scores);
  } else if (result === "You lose!") {
    scores.opponentScore += 1;
    display(result, playerChoice, opponentChoice, scores);
  } else {
    display(result, playerChoice, opponentChoice, scores);
  }
}

function declareWinner(scores) {
  if (scores.playerScore > scores.opponentScore) {
    console.log(ART["Congratulations"]);
  } else {
    console.log(ART["Bummer"]);
  }
}

function playRound() {
  let scores = { playerScore: 0, opponentScore: 0};

  while (scores.playerScore < CRITERION && scores.opponentScore < CRITERION) {
    playMatch(scores);
  }

  declareWinner(scores);

  if (playAgain()) {
    console.clear();
    playRound();
  } else {
    console.log(MESSAGES.GOODBYE);
  }
}

//================================================================PROGRAM START
console.log(MESSAGES.GREET);
playRound();