let readline = require('readline-sync');

const BACKEND = require('./rpsBackend.json');
const MESSAGES = BACKEND.MESSAGES;
const OUTCOMES = BACKEND.OUTCOMES;
const ERRORS = BACKEND.ERRORS;
const MACHINE_CHOICES = BACKEND.MACHINE_CHOICES;
const ROCK = 'R';
const PAPER = 'P';
const SCISSORS = 'S';
const DRAW = "Draw!";

function isValidChoice(choice) {
  if (choice === ROCK || choice === PAPER || choice === SCISSORS) {
    return true;
  } else {
    console.log(ERRORS.INVALID_CHOICE);
    return false;
  }
}

function getChoiceKey(choice) {
  let choiceKey;

  for (let key in OUTCOMES) {
    if (key[0] === choice) {
      choiceKey = key;
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
  let machineChoiceIdx = Math.floor(Math.random() * 10) % 3;

  return MACHINE_CHOICES[machineChoiceIdx];
}

function getOutcome(playerChoice, opponentChoice) {
  return OUTCOMES[playerChoice][opponentChoice];
}

function drawn(matchResult) {
  return matchResult === DRAW;
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

function display(result, playerChoice, opponentChoice) {
  //TODO: Write display
}

function play() {
  let matchResult;

  console.log(MESSAGES.GREET);

  do {
    let playerChoice = getAndValidateUserChoice();
    let opponentChoice = getOpponentChoice();

    matchResult = getOutcome(playerChoice, opponentChoice);

    display(matchResult, playerChoice, opponentChoice);

  } while (drawn(matchResult) || playAgain());

  console.log(MESSAGES.GOODBYE);
}

//================================================================PROGRAM START
play();