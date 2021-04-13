let readline = require('readline-sync');
let BACKEND = require('./loanCalcBackend.json');
let MESSAGES = BACKEND.MESSAGES;
let ERRORS = BACKEND.ERRORS;
let QUIT = false;

let loanTerms = {
  amount: 0,
  annualRate: 0,
  durationYears: 0,
  durationMonths: 0,
  ratePerPayment: 0,
  totalPayments: 0,
  compoundingPeriodsPerYear: 0,
  paymentsPerYear: 0,
  paymentSize: 0
};

let setRate = (apr, numCompounding, payPerYear) => {
  return Math.pow(1 + (apr / numCompounding), numCompounding / payPerYear) - 1;
};

let setTotalPayments = (durationYears, durationMonths) => {
  return (12 * durationYears) + durationMonths;
};

let calcAmortization = (loan) => {
  let payment = loan.amount;
  payment *= loan.ratePerPayment;
  payment *= Math.pow(1 + loan.ratePerPayment, loan.totalPayments);
  payment /= (Math.pow(1 + loan.ratePerPayment, loan.totalPayments) - 1);
  return Number(payment.toFixed(2));
};

let isYnq = (input) => {
  if (input === 'Y' || input === 'N' || input === 'Q') {
    return true;
  } else {
    console.log(ERRORS.YNQ);
    return false;
  }
};

let ynq = () => {
  let input;
  do {
    input = readline.question(MESSAGES.YNQ);
    input = input.trimStart().toUpperCase();
  } while (!isYnq(input));

  switch (input) {
    case 'Y':
      return true;
    case 'N':
      return false;
    case 'Q':
      QUIT = true;
      return false;
    default:
      console.log(ERRORS.YNQ);
      return ynq();
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

let confirmLoanAmount = (amount) => {
  console.log(MESSAGES.CONFIRM_LOAN_AMOUNT + amount);
  return ynq();
};

let getAndValidateLoanAmount = () => {
  if (QUIT) return undefined;
  let input;
  do {
    input = readline.question(MESSAGES.REQUEST_LOAN_AMOUNT);
    input = formatNumber(input);
  } while (!isValidLoanAmt(input));

  if (confirmLoanAmount(input)) {
    return input;
  } else {
    return getAndValidateLoanAmount();
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

let confirmAPR = (percent) => {
  console.log(MESSAGES.CONFIRM_APR + percent + "%");
  return ynq();
};

let getAndValidateAPR = () => {
  if (QUIT) return undefined;
  let input;
  do {
    input = readline.question(MESSAGES.REQUEST_APR);
    input = formatNumber(input);
  } while (!isValidAPR(input));

  if (confirmAPR(input)) {
    return input / 100;
  } else {
    return getAndValidateAPR();
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

let confirmCompounding = (compoundings) => {
  console.log(MESSAGES.CONFIRM_COMPOUNDING + compoundings + " times per year.");
  return ynq();
};

// eslint-disable-next-line max-lines-per-function
let getCustomCompounding = () => {
  if (QUIT) return undefined;
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
      if (confirmCompounding(compounding)) {
        return compounding;
      } else {
        return getCustomCompounding();
      }
    case '8':
      do {
        compounding = readline.question(MESSAGES.GET_CUSTOM_COMPOUNDING);
        compounding = formatNumber(compounding);
      } while (!isValidCompounding(compounding));
      if (confirmCompounding(compounding)) {
        return compounding;
      } else {
        return getCustomCompounding();
      }
    default:
      console.log(ERRORS.INVALID_SELECTION);
      return getCustomCompounding();
  }
};

// eslint-disable-next-line max-lines-per-function
let getAndValidateCompounding = () => {
  if (QUIT) return undefined;
  let selection = readline.question(MESSAGES.START_COMPOUNDING);
  selection = selection.toUpperCase();
  switch (selection) {
    case 'Y':
      if (confirmCompounding(BACKEND.COMPOUNDING_PERIODS[0])) {
        return BACKEND.COMPOUNDING_PERIODS[0];
      } else {
        return getAndValidateCompounding();
      }
    case 'N':
      return getCustomCompounding();
    case 'Q':
      QUIT = true;
      return undefined;
    default:
      console.log(ERRORS.YNQ);
      return getAndValidateAPR();
  }
};

let confirmDurationYear = (years) => {
  console.log(MESSAGES.CONFIRM_DURATION + years + " years?");
  return ynq();
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

let getAndValidateYear = () => {
  if (QUIT) return undefined;
  let input;
  do {
    input = readline.question(MESSAGES.REQUEST_DURATION_YEARS);
    input = formatNumber(input);
  } while (!isValidYear(input));

  if (confirmDurationYear(input)) {
    return input;
  } else {
    return getAndValidateYear();
  }
};

let confirmDurationMonth = (months) => {
  console.log(MESSAGES.CONFIRM_DURATION + months + " months?");
  return ynq();
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

let getAndValidateMonths = () => {
  if (QUIT) return undefined;
  let input;
  do {
    input = readline.question(MESSAGES.REQUEST_DURATION_MONTHS);
    input = formatNumber(input);
  } while (!isValidMonth(input));

  if (confirmDurationMonth(input)) {
    return input;
  } else {
    return getAndValidateMonths();
  }
};

let confirmPPY = (PPY) => {
  console.log(MESSAGES.CONFIRM_PPY + PPY + " payments per year?");
  return ynq();
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

let getAndValidatePaymentsPerYear = () => {
  if (QUIT) return undefined;
  let input;
  console.log(MESSAGES.PAY_PER_YEAR);
  do {
    input = readline.question(MESSAGES.REQUEST_PPY);
    input = formatNumber(input);
  } while (!isValidPPY(input));

  if (confirmPPY(input)) {
    return input;
  } else {
    return getAndValidatePaymentsPerYear();
  }
};

//=================================================================PROGRAM START
console.log(MESSAGES.GREET);
if (ynq()) {
  do {
    console.clear();
    if (!QUIT) {
      console.log(MESSAGES.START_LOAN_AMOUNT);
      loanTerms.amount = getAndValidateLoanAmount();
    }
    if (!QUIT) {
      console.log(MESSAGES.START_APR);
      loanTerms.annualRate = getAndValidateAPR();
    }
    if (!QUIT) {
      loanTerms.compoundingPeriodsPerYear = getAndValidateCompounding();
    }
    if (!QUIT) {
      console.log(MESSAGES.START_DURATION);
      loanTerms.durationYears = getAndValidateYear();
      loanTerms.durationMonths = getAndValidateMonths();
    }
    if (!QUIT) {
      loanTerms.paymentsPerYear = getAndValidatePaymentsPerYear();
    }
    if (!QUIT) {
      loanTerms.totalPayments = setTotalPayments(loanTerms.durationYears,
        loanTerms.durationMonths);

      loanTerms.ratePerPayment = setRate(loanTerms.annualRate,
        loanTerms.compoundingPeriodsPerYear, loanTerms.paymentsPerYear);

      loanTerms.paymentSize = calcAmortization(loanTerms);

      console.log(MESSAGES.REGULAR_PAYMENT + loanTerms.paymentSize + '\n');
    }
    if (!QUIT) {
      console.log(MESSAGES.NEW_CALCULATION);
    }
  // eslint-disable-next-line no-unmodified-loop-condition
  } while (QUIT !== true && ynq() !== false);
}
console.log(MESSAGES.GOODBYE);
//===================================================================PROGRAM END

//Display amortization.
