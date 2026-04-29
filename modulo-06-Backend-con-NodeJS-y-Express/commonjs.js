const { sum } = require(".math");

const result = sum(2, 3);
console.log(`The sum of 2 and 3 is: ${result}`);

/* en math.js */
const sum = (a, b) => a + b;
module.exports = { sum };
