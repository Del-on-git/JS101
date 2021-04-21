//write a program that outputs The Flintstones Rock! 10 times, with each line
//indented 1 space to the right of the line above it.

let str = "The Flintstones Rock!";

for (let padding = 0; padding < 10; padding++) {
  console.log(" ".repeat(padding) + str);
}