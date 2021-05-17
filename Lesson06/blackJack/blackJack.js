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
let gameState = {
  playerHand: {
    total: 0,
    values: [],
    cards: [],
    BUSTED: false,
    SCORE: 0,
    IDENT: "PLAYER"
  },
  dealerHand: {
    total: 0,
    values: [],
    cards: [],
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
  gameState.DECK_POSITIONS = JSON.parse(JSON.stringify(MASTER_DECK_POSITIONS));

  let temp = [];
  while (gameState.DECK_POSITIONS.length > 0) {
    let idx = Math.floor(Math.random() * gameState.DECK_POSITIONS.length);
    temp.push(gameState.DECK_POSITIONS[idx]);
    gameState.DECK_POSITIONS.splice(idx, 1);
  }

  temp.forEach( element => gameState.DECK_POSITIONS.push(element));
}

function checkForReshuffle() {
  if (gameState.DECK_POSITIONS.length <= RESHUFFLE_LIMIT) {
    shuffleCards();
  }
}

function resetHands() {
  gameState.playerHand.total = 0;
  gameState.dealerHand.total = 0;

  gameState.playerHand.values = [];
  gameState.dealerHand.values = [];

  gameState.playerHand.cards.length = 0;
  gameState.dealerHand.cards.length = 0;

  gameState.playerHand.BUSTED = false;
  gameState.dealerHand.BUSTED = false;
}

function resetScores() {
  gameState.playerHand.SCORE = 0;
  gameState.dealerHand.SCORE = 0;
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
  player.cards.push(cardName.join(''));
}

function determineAceValue(player) {
  if (player.values + ACE_HIGH_VAL > OPTIMAL_SCORE) {
    player.values.push(ACE_LOW_VAL);
  } else {
    player.values.push(ACE_HIGH_VAL);
  }
}

function downgradeAces(player) {
  if (player.total > OPTIMAL_SCORE) {
    player.values.forEach( (val, idx) => {
      if (val === ACE_HIGH_VAL) {
        player.values[idx] = ACE_LOW_VAL;
      }
    });
  }

  tallyCards(player);
}

function updateHandValue(player, card) {
  if (FACECARDS.includes(card[1])) {
    player.values.push(FACECARD_VAL);
  } else if (card[1] === 'A') {
    determineAceValue(player);
  } else {
    player.values.push(Number.parseInt(card[1], 10));
  }

  tallyCards(player);
}

function tallyCards(player) {
  player.total = player.values.reduce( (sum, val) => sum + val, 0);
}

function dealCards() {
  for (let count = 0; count < 2; count++) {
    drawCard(gameState.playerHand);
    drawCard(gameState.dealerHand);
  }
}

function drawCard(player) {
  let card = gameState.DECK_POSITIONS.pop().split('.');
  updateHandCards(player, card);
  updateHandValue(player, card);
}

function isValidResponse(input) {
  if (VALID_REPSONSES.includes(input) && input !== '') {
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
  if (player.total > OPTIMAL_SCORE) {
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
      downgradeAces(player);
      return true;
    } else {
      console.clear();
      return false;
    }
  } else {
    while (player.total < DEALER_STOP) {
      drawCard(player);
      downgradeAces(player);
    }
    return undefined;
  }
}

function displayScore(player, dealer) {
  console.log(`DEALER SCORE: ${dealer.SCORE} <<>> PLAYER SCORE: ${player.SCORE}\n`);
}

function showDealerHandUpcardOnly() {
  console.log(MESSAGE.DEALER_SHOW_UPCARD_ONLY + gameState.dealerHand.cards[0] + '\n');
}

function showHand(player) {
  console.log(MESSAGE.TALLY_BAR);
  if (player.IDENT === "PLAYER") {
    console.log(MESSAGE.PLAYER_HAND_PROMPT + player.total);
  } else if (player.IDENT === "DEALER") {
    console.log(MESSAGE.DEALER_HAND_PROMPT + player.total);
  }
  console.log(MESSAGE.TALLY_BAR);

  player.cards.forEach( card => {
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
  } else if (player.values < dealer.values && !dealer.BUSTED) {
    declareForDealer(player, dealer);
  } else if (player.values < dealer.values && dealer.BUSTED) {
    declareForPlayer(player, dealer);
  } else if (dealer.values < player.values) {
    declareForPlayer(player, dealer);
  } else if (dealer.values === player.values) {
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
  showHand(gameState.playerHand);
  while (hitStay(gameState.playerHand) && !busted(gameState.playerHand)) {
    displayScore(gameState.playerHand, gameState.dealerHand);
    showDealerHandUpcardOnly();
    showHand(gameState.playerHand);
  }
  hitStay(gameState.dealerHand);
  displayScore(gameState.playerHand, gameState.dealerHand);
  busted(gameState.dealerHand);
  showHand(gameState.playerHand);
  showHand(gameState.dealerHand);
  determineWinner(gameState.dealerHand, gameState.playerHand);
  continueGame();
  checkForReshuffle();
}

function playGame() {
  console.clear();
  console.log(MESSAGE.GREET);
  shuffleCards();
  do {
    displayScore(gameState.playerHand, gameState.dealerHand);
    playHand();
  } while (noMatchWinner(gameState.playerHand, gameState.dealerHand));

  if (playAgain()) {
    playGame();
  }
}

playGame();