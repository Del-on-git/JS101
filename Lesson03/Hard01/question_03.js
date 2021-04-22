//what will each code snippet print?

//=====================================================================SNIPPET A
function messWithVarsA(one, two, three) {
  one = two;  //WHAT THESE LOCAL VARIABLES POINT AT DOES NOT CHANGE WHAT THE GLOBAL VARIABLE POINT AT
  two = three;//WHAT THESE LOCAL VARIABLES POINT AT DOES NOT CHANGE WHAT THE GLOBAL VARIABLE POINT AT
  three = one;//WHAT THESE LOCAL VARIABLES POINT AT DOES NOT CHANGE WHAT THE GLOBAL VARIABLE POINT AT
  //let's mutate one without referring to `one`
  three[1] = "This will appear in twoA, not threeA";
  two[1] = "This will appear in THREE, not TWO";
}

let oneA = ["one"];
let twoA = ["two"];
let threeA = ["three"];

messWithVarsA(oneA, twoA, threeA);

console.log("SNIPPET A =====================");
console.log(`one is: ${oneA}`);    //["two"]    X
console.log(`two is: ${twoA}`);    //["three"]  X
console.log(`three is: ${threeA}`);//["two"]    X


//=====================================================================SNIPPET B
function messWithVarsB(one, two, three) {
  one = ["two"];   //WHAT THESE LOCAL VARIABLES POINT AT DOES NOT CHANGE WHAT THE GLOBAL VARIABLES POINT AT
  two = ["three"]; //WHAT THESE LOCAL VARIABLES POINT AT DOES NOT CHANGE WHAT THE GLOBAL VARIABLES POINT AT
  three = ["one"]; //WHAT THESE LOCAL VARIABLES POINT AT DOES NOT CHANGE WHAT THE GLOBAL VARIABLES POINT AT
}

let oneB = ["one"];
let twoB = ["two"];
let threeB = ["three"];

messWithVarsB(oneB, twoB, threeB);

console.log("SNIPPET B =====================");
console.log(`one is: ${oneB}`);    //["two"]    X
console.log(`two is: ${twoB}`);    //["three"]  X
console.log(`three is: ${threeB}`);//["one"]    X


//=====================================================================SNIPPET C
function messWithVarsC(one, two, three) {
  one.splice(0, 1, "two");  //THIS IS MUTATING WHAT THE LOCAL VARIABLES POINT AT, AND THE GLOBAL VARIABLES HAPPEN TO STILL BE POINTING AT WHAT IS BEING MUTATED
  two.splice(0, 1, "three");//THIS IS MUTATING WHAT THE LOCAL VARIABLES POINT AT, AND THE GLOBAL VARIABLES HAPPEN TO STILL BE POINTING AT WHAT IS BEING MUTATED
  three.splice(0, 1, "one");//THIS IS MUTATING WHAT THE LOCAL VARIABLES POINT AT, AND THE GLOBAL VARIABLES HAPPEN TO STILL BE POINTING AT WHAT IS BEING MUTATED
}

let oneC = ["one"];
let twoC = ["two"];
let threeC = ["three"];

messWithVarsC(oneC, twoC, threeC);

console.log("SNIPPET C =====================");
console.log(`one is: ${oneC}`);    //["two"]    CORRECT
console.log(`two is: ${twoC}`);    //["three"]  CORRECT
console.log(`three is: ${threeC}`);//["one"]    CORRECT

//The moral of this story is if you want to swap pointers around, you have to
//do it in their originating scope.