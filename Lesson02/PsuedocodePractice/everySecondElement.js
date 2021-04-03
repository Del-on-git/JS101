//START
function everySecondElement( inputArray ) {
  //SET outputArray = []
  let outputArray = [];
  //WHILE index <= length inputArray
  for(let x in inputArray) {
    //SET outputArray[n] = inputArray[index] IF index % 2 == 0
    if (x % 2 === 0 ) {
      outputArray.push(inputArray[x]);
    }
  }
  //RETURN outputArray
  return outputArray;
  //END
}

console.log(everySecondElement([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]));