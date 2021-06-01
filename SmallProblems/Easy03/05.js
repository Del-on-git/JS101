function triangle(num) {
  let drawing = [];
  let padding = 0;
  while (num) {
    drawing.push(''.padStart(padding++, ' ') + '*'.repeat(num--));
  }

  drawing.reverse().forEach(str => console.log(str));
}

triangle(5);
triangle(9);