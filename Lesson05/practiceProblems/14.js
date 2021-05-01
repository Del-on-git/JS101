//Given the following data structure write some code to return an array
//containing the colors of the fruits and the sizes of the vegetables. The sizes
//should be uppercase, and the colors should be capitalized.

let obj = {
  grape: { type: 'fruit', colors: ['red', 'green'], size: 'small' },
  carrot: { type: 'vegetable', colors: ['orange'], size: 'medium' },
  apple: { type: 'fruit', colors: ['red', 'green'], size: 'medium' },
  apricot: { type: 'fruit', colors: ['orange'], size: 'medium' },
  marrow: { type: 'vegetable', colors: ['green'], size: 'large' },
};

console.log(Object.values(obj).map( produce => {
  switch (produce.type) {
    case 'fruit':
      return produce.colors.map( str => str.slice(0,1).toUpperCase()
      + str.slice(1));
    case 'vegetable':
      return produce.size.toUpperCase();
    default:
      return undefined;
  }
}));