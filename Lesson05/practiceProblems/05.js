//Compute and display the total age of the male members of the family.

let munsters = {
  Herman: { age: 32, gender: 'male' },
  Lily: { age: 30, gender: 'female' },
  Grandpa: { age: 402, gender: 'male' },
  Eddie: { age: 10, gender: 'male' },
  Marilyn: { age: 23, gender: 'female'}
};

let answer = Object.keys(munsters).filter( (member) => {
  return munsters[member].gender === 'male';
}).reduce( (totalAge, member) => totalAge + munsters[member].age, 0);

console.log(answer);