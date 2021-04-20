//Given a string, return a new string that replaces every occurrence of the
//word "important" with "urgent":

let advice = "Few things in life are as important as house training your pet dinosaur.";

function updateSeriousness(str) {
  str = str.split(' ');
  str = str.map((word) => (word === 'important' ? 'urgent' : word ));
  return str.join(' ');
}

console.log(updateSeriousness(advice));