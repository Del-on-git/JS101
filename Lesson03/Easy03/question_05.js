//The following function unnecessarily uses two return statements to return
//boolean values. Can you rewrite this function so it only has one return
//statement and does not explicitly use either true or false?

function isColorValid(color) {
  if (color === "blue" || color === "green") {
    return true;
  } else {
    return false;
  }
}

let validColor1 = (color) => {
  return (color === "blue" || color === "green") ? 1 : 0;
};

let validColor2 = (color) => {
  let answer = 0;
  if (color === "blue" || color === "green") {
    answer++;
  }
  return answer;
};

console.log(validColor1("blue"));
console.log(validColor1("green"));
console.log(validColor1("blurple"));
console.log(validColor2("blue"));
console.log(validColor2("green"));
console.log(validColor2("blurple"));