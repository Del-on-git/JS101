const BACKEND = require('./blackJack.json');
const MESSAGE = BACKEND.MESSAGES;

const ACE_HIGH_VAL = 11;
const ACE_LOW_VAL = 1;
const FACECARDS = 'JQK';
const FACECARD_VAL = 10;
const OPTIMAL_SCORE = 21;
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

let GAMESTATE = {
  PLAYER_HAND: {
    VALUE: 0,
    CARDS: []
  },
  DEALER_HAND: {
    VALUE: 0,
    CARDS: []
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

function drawCard(player) {
  let card = GAMESTATE.DECK_POSITIONS.pop().split('.');
  updateHandCards(player, card);
  updateHandValue(player, card);
}

function dealCards() {
  shuffleCards();
  for (let count = 0; count < 2; count++) {
    drawCard(GAMESTATE.PLAYER_HAND);
    drawCard(GAMESTATE.DEALER_HAND);
  }
}

function showDealerHandNoHoleCard() {
  console.log(MESSAGE.DEALER_SHOWING_NO_HOLE + GAMESTATE.DEALER_HAND.CARDS[0] + '\n');
}

function showPlayerHand() {
  console.log(MESSAGE.PLAYER_HAND);
  GAMESTATE.PLAYER_HAND.CARDS.forEach( card => {
    console.log(`\t${card}`);
  });
  console.log(MESSAGE.TALLY_BAR);
  console.log(`${MESSAGE.PLAYER_VALUE}\t${GAMESTATE.PLAYER_HAND.VALUE}`);
}

function playHand() {
  dealCards();
  showDealerHandNoHoleCard();
  showPlayerHand();
}

playHand();