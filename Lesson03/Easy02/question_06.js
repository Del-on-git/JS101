//Create a new array that contains all of the given values,
//but in an un-nested format:

let flintstones = ["Fred", "Wilma", ["Barney", "Betty"], ["Bambam", "Pebbles"]];

let flatstones = flintstones.flat();

console.log(flatstones);