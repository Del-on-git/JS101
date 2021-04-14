let readline = require('readline-sync');
let BACKEND = require('./loanCalcBackend.json');
let MESSAGES = BACKEND.MESSAGES;
let ERRORS = BACKEND.ERRORS;

let loanTerms = {
  QUIT:  false,
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
  loan.ratePerPayment = Math.pow(1 +
    (loan.annualRate / loan.compoundingPeriodsPerYear),
    loan.compoundingPeriodsPerYear / loan.paymentsPerYear) - 1;
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

let isYnq = (input) => {
  if (input === 'Y' || input === 'N' || input === 'Q') {
    return true;
  } else {
    console.log(ERRORS.YNQ);
    return false;
  }
};

let ynq = (loan) => {
  let input;
  do {
    input = readline.question(MESSAGES.YNQ);
    input = input.trimStart().toUpperCase();
  } while (!isYnq(input));

  switch (input) {
    case 'Y':
      console.clear();
      return true;
    case 'N':
      return false;
    case 'Q':
      loan.QUIT = true;
      return false;
    default:
      console.log(ERRORS.YNQ);
      return ynq(loan);
  }
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

let confirmLoanAmount = (amount, loan) => {
  console.log(MESSAGES.CONFIRM_LOAN_AMOUNT + amount);
  return ynq(loan);
};

let getAndValidateLoanAmount = (loan) => {
  if (loan.QUIT) return undefined;
  console.log(MESSAGES.START_LOAN_AMOUNT);
  if (loan.QUIT) return undefined;
  let input;
  do {
    input = readline.question(MESSAGES.REQUEST_LOAN_AMOUNT);
    input = formatNumber(input);
  } while (!isValidLoanAmt(input));

  if (confirmLoanAmount(input, loan)) {
    loan.amount = input;
    return undefined;
  } else {
    return getAndValidateLoanAmount(loan);
  }
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

let confirmAPR = (percent, loan) => {
  console.log(MESSAGES.CONFIRM_APR[0] + percent + MESSAGES.CONFIRM_APR[1]);
  return ynq(loan);
};

let getAndValidateAPR = (loan) => {
  if (loan.QUIT) return undefined;
  console.log(MESSAGES.START_APR);
  if (loan.QUIT) return undefined;
  let input;
  do {
    input = readline.question(MESSAGES.REQUEST_APR);
    input = formatNumber(input);
  } while (!isValidAPR(input));

  if (confirmAPR(input, loan)) {
    loan.annualRate = input / 100;
    return undefined;
  } else {
    return getAndValidateAPR(loan);
  }
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

let confirmCompounding = (compoundings, loan) => {
  console.log(MESSAGES.CONFIRM_COMPOUNDING[0]
    + compoundings
    + MESSAGES.CONFIRM_COMPOUNDING[1]);
  return ynq(loan);
};

// eslint-disable-next-line max-lines-per-function
let getCustomCompounding = (loan) => {
  if (loan.QUIT) return undefined;
  let selection = readline.question(MESSAGES.SELECT_COMPOUNDING);
  let compounding;
  switch (selection) {
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
      compounding = BACKEND.COMPOUNDING_PERIODS[Number(selection)];
      if (confirmCompounding(compounding, loan)) {
        loan.compoundingPeriodsPerYear = compounding;
        return undefined;
      } else {
        return getCustomCompounding(loan);
      }
    case '8':
      do {
        compounding = readline.question(MESSAGES.GET_CUSTOM_COMPOUNDING);
        compounding = formatNumber(compounding);
      } while (!isValidCompounding(compounding));
      if (confirmCompounding(compounding, loan)) {
        loan.compoundingPeriodsPerYear = compounding;
        return undefined;
      } else {
        return getCustomCompounding(loan);
      }
    default:
      console.log(ERRORS.INVALID_SELECTION);
      return getCustomCompounding(loan);
  }
};

// eslint-disable-next-line max-lines-per-function
let getAndValidateCompounding = (loan) => {
  if (loan.QUIT) return undefined;
  let selection = readline.question(MESSAGES.START_COMPOUNDING);
  selection = selection.toUpperCase();
  switch (selection) {
    case 'Y':
      if (confirmCompounding(BACKEND.COMPOUNDING_PERIODS[0], loan)) {
        loan.compoundingPeriodsPerYear = BACKEND.COMPOUNDING_PERIODS[0];
        return undefined;
      } else {
        return getAndValidateCompounding(loan);
      }
    case 'N':
      return getCustomCompounding(loan);
    case 'Q':
      loan.QUIT = true;
      return undefined;
    default:
      console.log(ERRORS.YNQ);
      return getAndValidateCompounding(loan);
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
  if (loan.QUIT) return undefined;
  let input;
  do {
    input = readline.question(MESSAGES.REQUEST_DURATION_YEARS);
    input = formatNumber(input);
  } while (!isValidYear(input));

  loan.durationYears = input;
  return undefined;
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
  return undefined;
};

let confirmDuration = (loan) => {
  console.log(MESSAGES.CONFIRM_DURATIONS[0]
    + String(loan.durationYears)
    + MESSAGES.CONFIRM_DURATIONS[1]
    + String(loan.durationMonths)
    + MESSAGES.CONFIRM_DURATIONS[2]);

  return ynq(loan);
};

let getAndValidateDuration = (loan) => {
  if (loan.QUIT) return undefined;
  console.log(MESSAGES.START_DURATION);
  if (loan.QUIT) return undefined;
  getAndValidateYear(loan);
  getAndValidateMonths(loan);

  if (confirmDuration(loan)) {
    return undefined;
  } else {
    return getAndValidateDuration(loan);
  }
};

let confirmPPY = (PPY, loan) => {
  console.log(MESSAGES.CONFIRM_PPY[0] + PPY + MESSAGES.CONFIRM_PPY[1]);
  return ynq(loan);
};

let isValidPPY = (PPY) => {
  if (Number.isNaN(PPY)) {
    console.log(ERRORS.NAN);
    return false;
  } else if (PPY <= 0) {
    console.log(ERRORS.NEG_PPY);
    return false;
  } else {
    return true;
  }
};

let getAndValidatePaymentsPerYear = (loan) => {
  if (loan.QUIT) return undefined;
  let input;
  console.log(MESSAGES.PAY_PER_YEAR);
  do {
    input = readline.question(MESSAGES.REQUEST_PPY);
    input = formatNumber(input);
  } while (!isValidPPY(input));

  if (confirmPPY(input, loan)) {
    loan.paymentsPerYear = input;
    return undefined;
  } else {
    return getAndValidatePaymentsPerYear(loan);
  }
};

let displayResults = (loan) => {
  if (!loan.QUIT) {
    console.log(MESSAGES.REGULAR_PAYMENT + loan.paymentSize);
  }
};

let newLoan = (loan) => {
  if (!loan.QUIT) {
    console.log(MESSAGES.NEW_CALCULATION);
  }
};

let quitCheck = (method, object, quit) => {
  if (quit) {
    return undefined;
  } else {
    method(object);
    return undefined;
  }
};

//=================================================================PROGRAM START
console.log(MESSAGES.GREET);
if (ynq(loanTerms)) {
  do {
    quitCheck(getAndValidateLoanAmount, loanTerms, loanTerms.QUIT);
    quitCheck(getAndValidateAPR, loanTerms, loanTerms.QUIT);
    quitCheck(getAndValidateCompounding, loanTerms, loanTerms.QUIT);
    quitCheck(getAndValidateDuration, loanTerms, loanTerms.QUIT);
    quitCheck(getAndValidatePaymentsPerYear, loanTerms, loanTerms.QUIT);
    quitCheck(setRate, loanTerms, loanTerms.QUIT);
    quitCheck(setTotalPayments, loanTerms, loanTerms.QUIT);
    quitCheck(calcAmortization, loanTerms, loanTerms.QUIT);
    quitCheck(displayResults, loanTerms, loanTerms.QUIT);
    quitCheck(newLoan, loanTerms, loanTerms.QUIT);
  // eslint-disable-next-line no-unmodified-loop-condition
  } while (loanTerms.QUIT !== true && ynq(loanTerms) !== false);
}
console.log(MESSAGES.GOODBYE);
//===================================================================PROGRAM END