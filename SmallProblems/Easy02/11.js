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

console.log(integerToString(4321));        // "4321"
console.log(integerToString(0));           // "0"
console.log(integerToString(5000));        // "5000"
console.log(integerToString(1234567890));  // "1234567890"