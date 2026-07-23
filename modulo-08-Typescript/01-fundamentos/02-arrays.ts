// ================================
// ARRAYS EN TYPESCRIPT
// ================================

// Sintaxis 1
const numeros: number[] = [1, 2, 3, 4, 5];
numeros.push(6);

// Sintaxis 2
const numerosAlt: Array<number> = [10, 20, 30];
numerosAlt.push(40);

// Arrays de tipos mixtos
const mixto: (string | number)[] = [1, "dos", 3, "cuatro"];
const arrayToFilter: (string | undefined)[] = [
  "uno",
  undefined,
  "tres",
  undefined,
];

// Tupla
const frutas: [string, string, string] = ["🍎", "🍌", "🍓"];
const frutasYnumber: [string, string, number] = ["🍎", "🍌", 7];

// Tipo de datos que siempre vamos a querer evitar: "any" (poner ratón por encima de la variable para ver el tipo que infiere TS)
let empty = [];
empty.push(1);
