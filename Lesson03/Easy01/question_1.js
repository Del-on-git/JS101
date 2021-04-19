//Will the code below raise an error?

let numbers = [1, 2, 3];
numbers[6] = 5;
numbers[4];  // what will this line return?

/*
 * Original answer: the code on line 4 doesn't raise an error; instead it
 * returns [1, 2, 3, undefined, undefined, undefined, 5].
 *
 * numbers[4] => undefined
 *
 * Solution: numbers[6] = 5 actually returns 5, but extends numbers and leaves
 * <3 empty items> in indices 4-5. numbers[4] does return undefined.
 */