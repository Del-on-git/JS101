let loanTerms = {
  amount: 0,
  annualRate: 0,
  durationYears: 0,
  durationMonths: 0,
  ratePerPayment: 0,
  totalPayments: 0,
  compoundingPeriodsPerYear: 0,
  paymentsPerYear: 0
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
  return payment;
};
//greet user: "Welcome to the Loanly Calculator! I'll help you navigate your future loan. Please be sure to read the prompts carefully before responding, and try to have fun! You can press 'Q' at any time to quit. Ready? (Press 'Y' to continue)."
//Prompt for 'Y'.
//"Great! Let's get started by asking a few simple questions. First, how much would you like to borrow?"

//"Loan amount: " <== getAndValidateLoanAmount() from user
  //strip any commas or sigils
  //convert to number
  //validate input
  //"Okay, got it. Just to be sure, you would like to borrow the following amount (Y to confirm, N to reenter): "
  //IF No, log "Alright, let's try again", clear console and loop back to top of getLoanAmount()
  //ELSE store input in loanData.amount

//"Let's move on to interest. What's your APR? Give it as a percentage without the '5' (i.e. '5' instead of '0.05' for 5%)."
//"APR: " <== getAndValidateAPR() from user
  //strip % if necessary
  //convert to number
  //validate input
  //"Let's double check. Your APR for this loan will be " + input."
  //"Is that correct? (Y to confirm, N to reenter): "
  //SET loanData.annualRate = input

//"Will this loan be compounded monthly? Y for 'yes', N for 'no; the default is 'yes'"
//IF Y
  //SET loanData.compoundingPeriodsPerYear = 12
//ELSE
  //"Okay, here are some other compounding options. Select the number that corresponds to your loan:"
  //1) Annually = 1
  //2) Semi-annually = 2
  //3) Quarterly = 4
  //4) Semi-monthly = 6
  //5) Biweekly = 26
  //6) Weekly = 52
  //7) Daily = 365
  //8) Other
  //getAndValidateCompChoice()
  //IF user chooses 8
    //"Enter the number of compouding periods per year as a whole number: "
    //validate input
    //SET loanData.compoundingPeriodsPerYear = input
  //ELSE
    //SET loanData.compoundingPeriodsPerYear = compoundingPeriods[choice]
//"Whew; almost done! Let's be sure we got this right: Your loan should be compounded "+loanTerms.compoundingPeriodsPerYear+" per year."
//"Y to confirm, N to reenter: "

//"Last question: How long will you be repaying this loan?"
//"Years: "
//"Months: "

//Display amortization.