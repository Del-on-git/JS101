/* eslint-disable max-len */
//We have most of the Munster family in our ages object. Add entries for
//Marilyn and Spot to the object.

let ages = { Herman: 32, Lily: 30, Grandpa: 5843, Eddie: 10 };
let additionalAges = { Marilyn: 22, Spot: 237 };

let keys = Object.keys(additionalAges);
for (let idx in keys) {
  if (!ages.hasOwnProperty(keys[idx])) {
    ages[keys[idx]] = additionalAges[keys[idx]];
  }
}

console.log(ages);

//NOTE: The same outcome could be accomplished using
//Object.assign(ages, additionalAges), but Object.assign() will overwrite any
//enumerable property that's dupilicated in the first parameter from second
//parameter.