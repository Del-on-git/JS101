let readline = require('readline-sync');

const BACKEND = require('./rpsBackend.json');
const MESSAGES = BACKEND.MESSAGES;
const OUTCOMES = BACKEND.OUTCOMES;
const ERRORS = BACKEND.ERRORS;
const ROCK = 'R';
const PAPER = 'P';
const SCISSORS = 'S';

function isValidChoice(choice) {
  if (choice === ROCK || choice === PAPER || choice === SCISSORS) {
    return true;
  } else {
    console.log(ERRORS.INVALID_CHOICE);
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

function opponentChoice() {
  //TODO: generate a random number between 0 and 2 inclusive
}