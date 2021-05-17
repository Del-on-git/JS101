const BACKEND = require('./blackJack.json');
const MESSAGE = BACKEND.MESSAGES;
const ERROR = BACKEND.ERRORS;

const ACE_HIGH_VAL = 11;
const ACE_LOW_VAL = 1;
const FACECARDS = 'JQK';
const FACECARD_VAL = 10;
const OPTIMAL_SCORE = 21;
const DEALER_STOP = 17;
const VALID_REPSONSES = 'HS';
const WINNING_MATCH_SCORE = 5;
const DECK = {
  RANK: [
    '2 of ' ,'3 of ', '4 of ', '5 of ', '6 of ', '7 of ', '8 of ',
    '9 of ', '10 of ', 'Jack of ', 'Queen of ', 'King of ', 'Ace of '
  ],
  SUIT: ["Clubs", "Diamonds", "Hearts", "Spades"]
};
const MASTER_DECK_POSITIONS = [
  'C.2', 'C.3', 'C.4', 'C.5', 'C.6', 'C.7', 'C.8', 'C.9', 'C.10', 'C.J', 'C.Q', 'C.K', 'C.A',
  'D.2', 'D.3', 'D.4', 'D.5', 'D.6', 'D.7', 'D.8', 'D.9', 'D.10', 'D.J', 'D.Q', 'D.K', 'D.A',
  'H.2', 'H.3', 'H.4', 'H.5', 'H.6', 'H.7', 'H.8', 'H.9', 'H.10', 'H.J', 'H.Q', 'H.K', 'H.A',
  'S.2', 'S.3', 'S.4', 'S.5', 'S.6', 'S.7', 'S.8', 'S.9', 'S.10', 'S.J', 'S.Q', 'S.K', 'S.A'
];
const RESHUFFLE_LIMIT = Math.ceil(MASTER_DECK_POSITIONS.length * 0.5);

let readline = require('readline-sync');
let GAMESTATE = {
  PLAYER_HAND: {
    VALUE: 0,
    CARDS: [],
    BUSTED: false,
    SCORE: 0,
    IDENT: "PLAYER"
  },
  DEALER_HAND: {
    VALUE: 0,
    CARDS: [],
    BUSTED: false,
    SCORE: 0,
    IDENT: "DEALER"
  },
  DECK_POSITIONS: [
    'C.2', 'C.3', 'C.4', 'C.5', 'C.6', 'C.7', 'C.8', 'C.9', 'C.10', 'C.J', 'C.Q', 'C.K', 'C.A',
    'D.2', 'D.3', 'D.4', 'D.5', 'D.6', 'D.7', 'D.8', 'D.9', 'D.10', 'D.J', 'D.Q', 'D.K', 'D.A',
    'H.2', 'H.3', 'H.4', 'H.5', 'H.6', 'H.7', 'H.8', 'H.9', 'H.10', 'H.J', 'H.Q', 'H.K', 'H.A',
    'S.2', 'S.3', 'S.4', 'S.5', 'S.6', 'S.7', 'S.8', 'S.9', 'S.10', 'S.J', 'S.Q', 'S.K', 'S.A'
  ]
};

function shuffleCards() {
  GAMESTATE.DECK_POSITIONS = JSON.parse(JSON.stringify(MASTER_DECK_POSITIONS));

  let temp = [];
  while (GAMESTATE.DECK_POSITIONS.length > 0) {
    let idx = Math.floor(Math.random() * GAMESTATE.DECK_POSITIONS.length);
    temp.push(GAMESTATE.DECK_POSITIONS[idx]);
    GAMESTATE.DECK_POSITIONS.splice(idx, 1);
  }

  temp.forEach( element => GAMESTATE.DECK_POSITIONS.push(element));
}

function checkForReshuffle() {
  if (GAMESTATE.DECK_POSITIONS.length <= RESHUFFLE_LIMIT) {
    shuffleCards();
  }
}

function resetHands() {
  GAMESTATE.PLAYER_HAND.VALUE = 0;
  GAMESTATE.DEALER_HAND.VALUE = 0;

  GAMESTATE.PLAYER_HAND.CARDS.length = 0;
  GAMESTATE.DEALER_HAND.CARDS.length = 0;

  GAMESTATE.PLAYER_HAND.BUSTED = false;
  GAMESTATE.DEALER_HAND.BUSTED = false;
}

function resetScores() {
  GAMESTATE.PLAYER_HAND.SCORE = 0;
  GAMESTATE.DEALER_HAND.SCORE = 0;
}

function updateHandCards(player, card) {
  let cardName = [];
  DECK.RANK.forEach( str => {
    if (str.split(' ')[0] === card[1]) cardName.push(str);
    else if (str.split(' ')[0][0] === card[1]) cardName.push(str);
  });
  DECK.SUIT.forEach( str => {
    if (str[0] === card[0]) cardName.push(str);
  });
  player.CARDS.push(cardName.join(''));
}

function determineAceValue(player) {
  if (player.VALUE + ACE_HIGH_VAL > OPTIMAL_SCORE) {
    player.VALUE += ACE_LOW_VAL;
  } else {
    player.VALUE += ACE_HIGH_VAL;
  }
}

function updateHandValue(player, card) {
  if (FACECARDS.includes(card[1])) {
    player.VALUE += FACECARD_VAL;
  } else if (card[1] === 'A') {
    determineAceValue(player);
  } else {
    player.VALUE += Number.parseInt(card[1], 10);
  }
}

function dealCards() {
  for (let count = 0; count < 2; count++) {
    drawCard(GAMESTATE.PLAYER_HAND);
    drawCard(GAMESTATE.DEALER_HAND);
  }
}

function drawCard(player) {
  let card = GAMESTATE.DECK_POSITIONS.pop().split('.');
  updateHandCards(player, card);
  updateHandValue(player, card);
}

function isValidResponse(input) {
  if (VALID_REPSONSES.includes(input)) {
    return true;
  } else {
    console.log(ERROR.INVALID_HIT_STAY);
    return getAndValidateUserResponse();
  }
}

function getAndValidateUserResponse() {
  let input;
  do {
    input = readline.question(MESSAGE.HIT_OR_STAY).toUpperCase();
  } while (!isValidResponse(input));

  return input;
}

function busted(player) {
  if (player.VALUE > OPTIMAL_SCORE) {
    player.BUSTED = true;
    return true;
  }

  return false;
}

function hitStay(player) {
  if (player.IDENT === "PLAYER") {
    if (getAndValidateUserResponse() === 'H') {
      console.clear();
      drawCard(player);
      return true;
    } else {
      console.clear();
      return false;
    }
  } else {
    while (player.VALUE < DEALER_STOP) {
      drawCard(player);
    }
    return undefined;
  }
}

function displayScore(player, dealer) {
  console.log(`DEALER SCORE: ${dealer.SCORE} <<>> PLAYER SCORE: ${player.SCORE}\n`);
}

function showDealerHandUpcardOnly() {
  console.log(MESSAGE.DEALER_SHOW_UPCARD_ONLY + GAMESTATE.DEALER_HAND.CARDS[0] + '\n');
}

function showHand(player) {
  console.log(MESSAGE.TALLY_BAR);
  if (player.IDENT === "PLAYER") {
    console.log(MESSAGE.PLAYER_HAND_PROMPT + player.VALUE);
  } else if (player.IDENT === "DEALER") {
    console.log(MESSAGE.DEALER_HAND_PROMPT + player.VALUE);
  }
  console.log(MESSAGE.TALLY_BAR);

  player.CARDS.forEach( card => {
    console.log(`\t${card}`);
  });
  console.log(MESSAGE.TALLY_BAR);
}

function declareTie() {
  resetHands();
  console.log(MESSAGE.TIE);
}

function declareForPlayer(player, dealer) {
  resetHands();
  player.SCORE++;
  if (dealer.BUSTED) console.log(MESSAGE.DEALER_BUSTS);
  console.log(MESSAGE.PLAYER_WINS);
}

function declareForDealer(player, dealer) {
  resetHands();
  dealer.SCORE++;
  if (player.BUSTED) console.log(MESSAGE.PLAYER_BUSTS);
  console.log(MESSAGE.DEALER_WINS);
}

function determineWinner(dealer, player) {
  if (player.BUSTED) {
    declareForDealer(player, dealer);
  } else if (player.VALUE < dealer.VALUE && !dealer.BUSTED) {
    declareForDealer(player, dealer);
  } else if (player.VALUE < dealer.VALUE && dealer.BUSTED) {
    declareForPlayer(player, dealer);
  } else if (dealer.VALUE < player.VALUE) {
    declareForPlayer(player, dealer);
  } else if (dealer.VALUE === player.VALUE) {
    declareTie();
  }
}

function noMatchWinner(player, dealer) {
  if (player.SCORE >= WINNING_MATCH_SCORE) {
    displayScore(player, dealer);
    console.log(MESSAGE.PLAYER_GRAND_WINNER);
    return false;
  } else if (dealer.SCORE >= WINNING_MATCH_SCORE) {
    displayScore(player, dealer);
    console.log(MESSAGE.DEALER_GRAND_WINNER);
    return false;
  }

  return true;
}

function playAgain() {
  let input = readline.question(MESSAGE.PLAY_AGAIN).toUpperCase();
  switch (input) {
    case 'Y':
      resetHands();
      resetScores();
      checkForReshuffle();
      console.clear();
      return true;
    case 'N':
      console.log(MESSAGE.GOODBYE);
      return false;
    default:
      console.log(ERROR.INVALID_CONTINUE);
      return playAgain();
  }
}

function continueGame() {
  readline.question(MESSAGE.CONTINUE);
  console.clear();
}

function playHand() {
  dealCards();
  showDealerHandUpcardOnly();
  showHand(GAMESTATE.PLAYER_HAND);
  while (hitStay(GAMESTATE.PLAYER_HAND) && !busted(GAMESTATE.PLAYER_HAND)) {
    displayScore(GAMESTATE.PLAYER_HAND, GAMESTATE.DEALER_HAND);
    showDealerHandUpcardOnly();
    showHand(GAMESTATE.PLAYER_HAND);
  }
  hitStay(GAMESTATE.DEALER_HAND);
  displayScore(GAMESTATE.PLAYER_HAND, GAMESTATE.DEALER_HAND);
  busted(GAMESTATE.DEALER_HAND);
  showHand(GAMESTATE.PLAYER_HAND);
  showHand(GAMESTATE.DEALER_HAND);
  determineWinner(GAMESTATE.DEALER_HAND, GAMESTATE.PLAYER_HAND);
  continueGame();
  checkForReshuffle();
}

function playGame() {
  console.clear();
  console.log(MESSAGE.GREET);
  shuffleCards();
  do {
    displayScore(GAMESTATE.PLAYER_HAND, GAMESTATE.DEALER_HAND);
    playHand();
  } while (noMatchWinner(GAMESTATE.PLAYER_HAND, GAMESTATE.DEALER_HAND));

  if (playAgain()) {
    playGame();
  }
}

playGame();