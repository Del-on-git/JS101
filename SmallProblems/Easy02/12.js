function integerToString(num) {
  let digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  let numCopy = num;
  let result = '';
  let pow = 0;
  while (Math.trunc(num / Math.pow(10, pow)) > 9) pow++;

  while (pow >= 0) {
    result += digits[Math.trunc(numCopy / Math.pow(10, pow))];
    numCopy %= Math.pow(10, pow);
    pow--;
  }

  return result;
}

function signedIntegerToString(num) {
  let result;
  if (num < 0) result = '-';
  else if (num > 0) result = '+';
  else result = '';

  return result + integerToString(Math.abs(num));
}

console.log(signedIntegerToString(4321) === "+4321");
console.log(signedIntegerToString(-123) === "-123");
console.log(signedIntegerToString(0) === "0");