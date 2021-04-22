//Will the following functions return the same results?

function first() {
  return {
    prop1: "hi there"
  };
}

function second() {
  return
  {
    prop1: "hi there"
  };
}

console.log(first());
console.log(second());

//No. The JavaScript engine interprets the newline at line 10 as an implied
//semicolon. when `second()` runs, it prints `undefined`.