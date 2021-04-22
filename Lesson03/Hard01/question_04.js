//Improve the following function so that it only accepts addresses with 4
//values separated by dots and so that it returns a false condition;

function isDotSeparatedIpAddress(inputString) {
  let dotSeparatedWords = inputString.split(".");
  let isAddress = true;
  if (dotSeparatedWords.length !== 4) {
    isAddress = false;
  } else {
    dotSeparatedWords.forEach(element => {
      if (element < 0 || element > 255 ) {
        isAddress = false;
      }
    });
  }
  return isAddress;
}

console.log(isDotSeparatedIpAddress(''));
console.log(isDotSeparatedIpAddress('1.2.3'));
console.log(isDotSeparatedIpAddress('1.2.3.4.5'));
console.log(isDotSeparatedIpAddress('1.2.3.4'));