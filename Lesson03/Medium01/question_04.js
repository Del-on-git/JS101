//What's the difference between these two functions?

function addToRollingBuffer1(buffer, maxBufferSize, newElement) {
  buffer.push(newElement);
  if (buffer.length > maxBufferSize) {
    buffer.shift();
  }
  return buffer;
}

function addToRollingBuffer2(buffer, maxBufferSize, newElement) {
  buffer = buffer.concat(newElement);
  if (buffer.length > maxBufferSize) {
    buffer.shift();
  }
  return buffer;
}

//ATRB1 will mutate the buffer passed to it as an argument,
//while ATRB2 will create a new object and then point the local variable
// `buffer` to that new object, leaving the object passed as a parameter
//unchanged

let testBuffer = [1,2,3,4];
console.log(`Original buffer: ${testBuffer} 
ATRB2: ${addToRollingBuffer2(testBuffer, 2 * testBuffer.length, "whackamole")}`);
console.log(`Original buffer: ${testBuffer} 
ATRB1: ${addToRollingBuffer1(testBuffer, 2 * testBuffer.length, "WHACKAMOLE")}`);
console.log(testBuffer);