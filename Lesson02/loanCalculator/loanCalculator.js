let readline = require('readline-sync');
const BACKEND = require('./loanCalcBackend.json');
const MESSAGES = BACKEND.MESSAGES;
const ERRORS = BACKEND.ERRORS;

let loanTerms = {
  amount: null,
  annualRate: null,
  durationYears: null,
  durationMonths: null,
  ratePerPayment: null,
  totalPayments: null,
  compoundingPeriodsPerYear: null,
  paymentsPerYear: null,
  paymentSize: null
};

let setRate = (loan) => {
  let ratioOne = loan.annualRate / loan.compoundingPeriodsPerYear;
  let ratioTwo = loan.compoundingPeriodsPerYear / loan.paymentsPerYear;
  loan.ratePerPayment = Math.pow(1 + ratioOne, ratioTwo) - 1;
};

let setTotalPayments = (loan) => {
  let duration = loan.durationYears + (loan.durationMonths / 12);
  loan.totalPayments = duration * loan.paymentsPerYear;
};

let calcAmortization = (loan) => {
  let payment = loan.amount;
  if (loan.annualRate === 0) {
    payment /= loan.paymentsPerYear;
    loan.paymentSize = payment.toFixed(2);
  }
  payment *= loan.ratePerPayment;
  payment *= Math.pow(1 + loan.ratePerPayment, loan.totalPayments);
  payment /= (Math.pow(1 + loan.ratePerPayment, loan.totalPayments) - 1);
  loan.paymentSize = payment.toFixed(2);
};

let formatNumber = (num) => {
  num = num.split(',').join('').split(' ').join('');
  num = (num.trimStart() === '') ? NaN : parseFloat(num);
  return num;
};

let isValidLoanAmt = (num) => {
  if (Number.isNaN(num)) {
    console.log(ERRORS.NAN);
    return false;
  } else if (num < 0) {
    console.log(ERRORS.NEG_LOAN_AMT);
    return false;
  } else {
    return true;
  }
};

let getAndValidateLoanAmount = (loan) => {
  console.log(MESSAGES.START_LOAN_AMOUNT);
  if (loan.QUIT) return undefined;
  let input;
  do {
    input = readline.question(MESSAGES.REQUEST_LOAN_AMOUNT);
    input = formatNumber(input);
  } while (!isValidLoanAmt(input));

  loan.amount = input;
};

let isValidAPR = (num) => {
  if (Number.isNaN(num)) {
    console.log(ERRORS.NAN);
    return false;
  } else if (num < 0) {
    console.log(ERRORS.NEG_APR);
    return false;
  } else {
    return true;
  }
};

let getAndValidateAPR = (loan) => {
  console.log(MESSAGES.START_APR);
  if (loan.QUIT) return undefined;
  let input;
  do {
    input = readline.question(MESSAGES.REQUEST_APR);
    input = formatNumber(input);
  } while (!isValidAPR(input));

  loanTerms.annualRate = input / 100;
};

let isValidCompounding = (num) => {
  if (Number.isNaN(num)) {
    console.log(ERRORS.NAN);
    return false;
  } else if (num <= 0) {
    console.log(ERRORS.INVALID_COMPOUNDING);
    return false;
  } else {
    return true;
  }
};

let getCustomCompounding = (loan) => {
  let selection = parseInt(readline.question(MESSAGES.SELECT_COMPOUNDING), 10);
  let compounding;
  if (1 <= selection && selection <= 7) {
    loan.compoundingPeriodsPerYear = BACKEND
      .COMPOUNDING_PERIODS[Number(selection)];
  } else if (selection === 8) {
    do {
      compounding = readline.question(MESSAGES.GET_CUSTOM_COMPOUNDING);
      compounding = Number(compounding);
    } while (!isValidCompounding(compounding));
    loan.compoundingPeriodsPerYear = compounding;
  } else {
    console.log(ERRORS.INVALID_SELECTION);
    getCustomCompounding(loan);
  }
};

let getAndValidateCompounding = (loan) => {
  let selection = readline.question(MESSAGES.START_COMPOUNDING);
  selection = selection.toUpperCase();
  switch (selection) {
    case 'Y':
      loan.compoundingPeriodsPerYear = BACKEND.COMPOUNDING_PERIODS[0];
      break;
    case 'N':
      getCustomCompounding(loan);
      break;
    default:
      console.log(ERRORS.YNQ);
      getAndValidateCompounding(loan);
  }
};

let isValidYear = (year) => {
  if (Number.isNaN(year)) {
    console.log(ERRORS.NAN);
    return false;
  } else if (year < 0) {
    console.log(ERRORS.NEG_YEAR);
    return false;
  } else if ( year % 1 !== 0) {
    console.log(ERRORS.NON_INT_YEAR);
    return false;
  } else {
    return true;
  }
};

let getAndValidateYear = (loan) => {
  let input;
  do {
    input = readline.question(MESSAGES.REQUEST_DURATION_YEARS);
    input = formatNumber(input);
  } while (!isValidYear(input));

  loan.durationYears = input;
};

let isValidMonth = (month) => {
  if (Number.isNaN(month)) {
    console.log(ERRORS.NAN);
    return false;
  } else if (month < 1 && loanTerms.durationYears === 0) {
    console.log(ERRORS.NOT_ENOUGH_TIME);
    return false;
  } else if (month < 0) {
    console.log(ERRORS.NEG_MONTH);
    return false;
  } else if (month % 1 !== 0) {
    console.log(ERRORS.NON_INT_MONTH);
    return false;
  } else {
    return true;
  }
};

let getAndValidateMonths = (loan) => {
  if (loan.QUIT) return undefined;
  let input;
  do {
    input = readline.question(MESSAGES.REQUEST_DURATION_MONTHS);
    input = formatNumber(input);
  } while (!isValidMonth(input));

  loan.durationMonths = input;
};

let getAndValidateDuration = (loan) => {
  console.log(MESSAGES.START_DURATION);
  getAndValidateYear(loan);
  getAndValidateMonths(loan);
};

let isValidPaymentPerYear = (paymentsPerYear) => {
  if (Number.isNaN(paymentsPerYear)) {
    console.log(ERRORS.NAN);
    return false;
  } else if (paymentsPerYear <= 0) {
    console.log(ERRORS.NEG_PAYMENTS_PER_YEAR);
    return false;
  } else {
    return true;
  }
};

let getAndValidatePaymentsPerYear = (loan) => {
  let input;
  console.log(MESSAGES.PAY_PER_YEAR);
  do {
    input = readline.question(MESSAGES.REQUEST_PPY);
    input = formatNumber(input);
  } while (!isValidPaymentPerYear(input));

  loan.paymentsPerYear = input;
};

let displayResults = (loan) => {
  console.log(MESSAGES.REGULAR_PAYMENT + loan.paymentSize);
};

let calculateNewLoan = () => {
  let choice = readline.question(MESSAGES.NEW_CALCULATION);
  switch (choice.toUpperCase()) {
    case 'Y':
      return true;
    case 'N':
      return false;
    default:
      console.log(ERRORS.INVALID_SELECTION);
      return calculateNewLoan();
  }
};

//=================================================================PROGRAM START
console.log(MESSAGES.GREET);
do {
  getAndValidateLoanAmount(loanTerms);
  getAndValidateAPR(loanTerms);
  getAndValidateCompounding(loanTerms);
  getAndValidateDuration(loanTerms);
  getAndValidatePaymentsPerYear(loanTerms);
  setRate(loanTerms);
  setTotalPayments(loanTerms);
  calcAmortization(loanTerms);
  displayResults(loanTerms);
} while (calculateNewLoan());
console.log(MESSAGES.GOODBYE);
//===================================================================PROGRAM END