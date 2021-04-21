//Return a new string that swaps the case of all of the letters:

let munstersDescription = "The Munsters are creepy and spooky.";

function reverseCase(str) {
  str = str.split('');
  return str.reduce( (accum, currVal) => {
    if (currVal.toUpperCase() === currVal) {
      accum += currVal.toLowerCase();
    } else {
      accum += currVal.toUpperCase();
    }

    return accum;
  }, '');
}

console.log(reverseCase(munstersDescription));