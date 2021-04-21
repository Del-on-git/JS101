/*
Improve the following function so that it handles non-positive inputs:

function factors(number) {
  let divisor = number;
  let factors = [];
  do {
    if (number % divisor === 0) {
      factors.push(number / divisor);
    }
    divisor -= 1;
  } while (divisor !== 0);
  return factors;
}

*/

function factor(number) {
  if (number <= 0) {
    return [];
  } else if (number === 1) {
    return [1];
  }
  let divisor = 2;
  let factors = [1, number];
  while (divisor < number) {
    if (number % divisor === 0 && !factors.includes(divisor)) {
      factors = [divisor, number / divisor, ...factors];
    }
    divisor++;
  }

  return factors.sort((a, b) => a - b);
}

console.log(factor(330));